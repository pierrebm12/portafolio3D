import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { AdaptiveDpr, Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'
import { useDevice } from '../../utils/useDevice'

const projects = [
  { name: 'E-Shop Pro', color: '#F97316', skills: ['React', 'Node.js', 'Express', 'MySQL', 'CSS', 'HTML', 'Stripe', 'Redux'] },
  { name: 'SocialFlow', color: '#F5EDD6', skills: ['React Native', 'Firebase', 'TypeScript', 'Redux', 'API REST', 'Node.js'] },
  { name: 'AI ChatBot', color: '#8B5E3C', skills: ['Python', 'OpenAI', 'Node.js', 'WebSocket', 'MongoDB', 'Express'] },
  { name: 'Dashboard KV', color: '#FAFAFA', skills: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'TypeScript', 'CSS'] },
  { name: 'FitApp', color: '#F97316', skills: ['React Native', 'Firebase', 'Redux', 'API REST', 'Stripe', 'MongoDB'] },
]

const skillToProjectType = {
  React: 'Web App', 'Node.js': 'API REST', Express: 'Backend API', MySQL: 'Base de Datos',
  CSS: 'Diseño UI', HTML: 'Landing Page', Stripe: 'E-Commerce', Redux: 'Estado Global',
  'React Native': 'App Móvil', Firebase: 'Backend Serverless', TypeScript: 'Código Escalable',
  'API REST': 'Microservicio', Python: 'Pipeline IA', OpenAI: 'Chatbot Inteligente',
  WebSocket: 'Tiempo Real', MongoDB: 'NoSQL Database', 'D3.js': 'Dataviz',
  PostgreSQL: 'Base Relacional', Tailwind: 'UI Responsive',
}

const PARTICLE_RADIUS = 0.16
const LINE_VISIBLE_DURATION = 3.0
const LINE_FADE_DURATION = 0.8
const LINE_OFF_DURATION = 2.0
const LINE_CYCLE = LINE_VISIBLE_DURATION + LINE_OFF_DURATION + LINE_FADE_DURATION * 2
const DRAG_DECAY = 0.92

const _v3 = new THREE.Vector3()

function getLineOpacity(t, phase) {
  const cycleT = ((t + phase) % LINE_CYCLE + LINE_CYCLE) % LINE_CYCLE
  if (cycleT < LINE_FADE_DURATION) return cycleT / LINE_FADE_DURATION
  if (cycleT < LINE_FADE_DURATION + LINE_VISIBLE_DURATION) return 1
  if (cycleT < LINE_FADE_DURATION + LINE_VISIBLE_DURATION + LINE_FADE_DURATION) return 1 - (cycleT - LINE_FADE_DURATION - LINE_VISIBLE_DURATION) / LINE_FADE_DURATION
  return 0
}

function updateLine(line, posA, posB, opacity) {
  if (!line || !line.parent) return
  const dx = posB.x - posA.x, dy = posB.y - posA.y, dz = posB.z - posA.z
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
  if (dist < 0.001) { line.visible = false; return }
  const inv = 1 / dist
  const ox = dx * inv * PARTICLE_RADIUS, oy = dy * inv * PARTICLE_RADIUS, oz = dz * inv * PARTICLE_RADIUS
  const arr = line.geometry.attributes.position.array
  arr[0] = posA.x + ox; arr[1] = posA.y + oy; arr[2] = posA.z + oz
  arr[3] = posB.x - ox; arr[4] = posB.y - oy; arr[5] = posB.z - oz
  line.geometry.attributes.position.needsUpdate = true
  line.material.opacity = opacity
  line.visible = opacity > 0.01
}

function Universe() {
  const { camera, pointer } = useThree()
  const groupRef = useRef()
  const lineRefs = useRef([])
  const labelGroupRefs = useRef([])
  const internalLineRefs = useRef(projects.map(() => []))
  const nodeRefs = useRef({})
  const meshRefs = useRef({})
  const dragOffsets = useRef({})
  const grabbed = useRef(null)
  const lastPointer = useRef(new THREE.Vector2())
  const { isMobile } = useDevice()

  const initialPositions = useMemo(() =>
    projects.map((_, ci) => {
      const angle = (ci / projects.length) * Math.PI * 2 - Math.PI / 2
      return { x: Math.cos(angle) * 2.6, y: Math.sin(angle * 2) * 0.4, z: Math.sin(angle) * 1.0 }
    }), [])

  const clusterData = useMemo(() => {
    return projects.map((proj, ci) => {
      const ip = initialPositions[ci]
      const orbit = proj.skills.map(() => ({
        theta: Math.random() * Math.PI * 2, phi: Math.acos(2 * Math.random() - 1),
        speed: 0.08 + Math.random() * 0.12, osc: Math.random() * Math.PI * 2,
      }))
      return { proj, cx: ip.x, cy: ip.y, cz: ip.z, orbit, worldPositions: proj.skills.map(() => new THREE.Vector3()) }
    })
  }, [initialPositions])

  const internalPairs = useMemo(() => {
    const all = []
    projects.forEach((proj, ci) => {
      const pairs = []
      for (let i = 0; i < proj.skills.length; i++)
        for (let j = i + 1; j < proj.skills.length; j++)
          pairs.push({ ci, si: i, sj: j })
      all.push(pairs)
    })
    return all
  }, [])

  const internalPhases = useMemo(() => {
    return internalPairs.map(pairs => pairs.map(() => Math.random() * LINE_CYCLE))
  }, [])

  const possibleConnections = useMemo(() => {
    const conns = []
    for (let ci = 0; ci < projects.length; ci++)
      for (let cj = ci + 1; cj < projects.length; cj++)
        for (let si = 0; si < projects[ci].skills.length; si++)
          for (let sj = 0; sj < projects[cj].skills.length; sj++)
            if (projects[ci].skills[si] === projects[cj].skills[sj]) {
              conns.push({ ci, si, cj, sj, phase: Math.random() * LINE_CYCLE, skill: projects[ci].skills[si], projectType: skillToProjectType[projects[ci].skills[si]] || projects[ci].skills[si] })
            }
    return conns
  }, [])

  const lineCount = possibleConnections.length

  const handlePointerDown = (ci, si) => (e) => {
    e.stopPropagation()
    grabbed.current = { ci, si }
    lastPointer.current.copy(pointer)
    const key = `${ci}-${si}`
    if (!dragOffsets.current[key]) dragOffsets.current[key] = new THREE.Vector3()
    document.body.style.cursor = 'grabbing'
  }

  const handlePointerUp = () => {
    grabbed.current = null
    document.body.style.cursor = ''
  }

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp)
    return () => window.removeEventListener('pointerup', handlePointerUp)
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05), t = state.clock.elapsedTime

    if (grabbed.current) {
      const dx = (pointer.x - lastPointer.current.x) * 4
      const dy = (pointer.y - lastPointer.current.y) * 4
      lastPointer.current.copy(pointer)
      _v3.set(dx, dy, 0).applyQuaternion(camera.quaternion)
      _v3.z = 0
      const key = `${grabbed.current.ci}-${grabbed.current.si}`
      const off = dragOffsets.current[key]
      if (off) {
        off.x += _v3.x * dt * 8
        off.y += _v3.y * dt * 8
      }
    }

    clusterData.forEach((cd, ci) => {
      cd.cx += Math.sin(t * 0.05 + ci * 1.1) * 0.0015
      cd.cy += Math.cos(t * 0.06 + ci * 0.7) * 0.0015
      cd.cz += Math.sin(t * 0.04 + ci * 1.3) * 0.0015
      const ip = initialPositions[ci]
      cd.cx += (ip.x - cd.cx) * 0.003
      cd.cy += (ip.y - cd.cy) * 0.003
      cd.cz += (ip.z - cd.cz) * 0.003
    })

    for (let i = 0; i < clusterData.length; i++) {
      for (let j = i + 1; j < clusterData.length; j++) {
        const a = clusterData[i], b = clusterData[j]
        const dx = a.cx - b.cx, dy = a.cy - b.cy, dz = a.cz - b.cz
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const minDist = 2.5
        if (dist < minDist && dist > 0.001) {
          const force = (minDist - dist) / minDist * 0.005, invDist = 1 / dist
          a.cx += dx * invDist * force; a.cy += dy * invDist * force; a.cz += dz * invDist * force
          b.cx -= dx * invDist * force; b.cy -= dy * invDist * force; b.cz -= dz * invDist * force
        }
      }
    }

    for (const key in dragOffsets.current) {
      if (grabbed.current && key === `${grabbed.current.ci}-${grabbed.current.si}`) continue
      const off = dragOffsets.current[key]
      if (off) {
        off.x *= DRAG_DECAY
        off.y *= DRAG_DECAY
        off.z *= DRAG_DECAY
        if (Math.abs(off.x) < 0.0001 && Math.abs(off.y) < 0.0001 && Math.abs(off.z) < 0.0001) {
          off.set(0, 0, 0)
        }
      }
    }

    clusterData.forEach((cd, ci) => {
      const childGroup = groupRef.current?.children[ci]
      if (childGroup) childGroup.position.set(cd.cx, cd.cy, cd.cz)
      cd.proj.skills.forEach((_, si) => {
        const o = cd.orbit[si]
        o.theta += dt * o.speed; o.phi += dt * o.speed * 0.3
        const r = 0.7 + Math.sin(t * 0.2 + o.osc) * 0.06
        const lx = Math.cos(o.theta) * Math.sin(o.phi) * r
        const ly = Math.cos(o.phi) * r * 0.5 + Math.sin(t * 0.12 + o.osc) * 0.06
        const lz = Math.sin(o.theta) * Math.sin(o.phi) * r

        const key = `${ci}-${si}`
        const doff = dragOffsets.current[key]
        const fx = doff ? doff.x : 0
        const fy = doff ? doff.y : 0
        const fz = doff ? doff.z : 0

        cd.worldPositions[si].set(cd.cx + lx + fx, cd.cy + ly + fy, cd.cz + lz + fz)
        const nodeGroup = nodeRefs.current[`${ci}-${si}`]
        if (nodeGroup) nodeGroup.position.set(lx + fx, ly + fy, lz + fz)
      })

      const phases = internalPhases[ci]
      const pairs = internalPairs[ci]
      const intLines = internalLineRefs.current[ci] || []
      pairs.forEach((pair, li) => {
        const line = intLines[li]
        if (!line) return
        const posA = cd.worldPositions[pair.si]
        const posB = cd.worldPositions[pair.sj]
        const opacity = getLineOpacity(t, phases[li])
        updateLine(line, posA, posB, opacity * 0.5)
      })
    })

    const refs = lineRefs.current, lg = labelGroupRefs.current
    let idx = 0
    possibleConnections.forEach((conn) => {
      const posA = clusterData[conn.ci].worldPositions[conn.si]
      const posB = clusterData[conn.cj].worldPositions[conn.sj]
      const dist = posA.distanceTo(posB)
      if (dist < 2.5 && idx < refs.length) {
        const line = refs[idx]
        if (line) {
          const baseOpacity = getLineOpacity(t, conn.phase)
          const distFactor = Math.max(0.05, 1 - dist / 2.5)
          updateLine(line, posA, posB, baseOpacity * distFactor * 0.7)
        }
        const g = lg[idx]
        if (g) {
          g.position.set((posA.x + posB.x) / 2, (posA.y + posB.y) / 2 + 0.18, (posA.z + posB.z) / 2)
          const intensity = Math.max(0, (1 - dist / 2.5))
          const baseOpacity = getLineOpacity(t, conn.phase)
          g.scale.setScalar(0.5 + intensity * 0.5)
          g.visible = baseOpacity > 0.01 && intensity > 0.05
        }
        idx++
      }
    })
    for (let i = idx; i < refs.length; i++) {
      if (refs[i]) refs[i].visible = false
      if (lg[i]) lg[i].visible = false
    }
  })

  const sphereSegs = isMobile ? 16 : 24

  return (
    <group ref={groupRef}>
      {clusterData.map((cd, ci) => (
        <group key={ci}>
          {cd.proj.skills.map((skill, si) => {
            const key = `${ci}-${si}`
            return (
              <group key={si} ref={(el) => { if (el) nodeRefs.current[`${ci}-${si}`] = el }}>
                <mesh
                  ref={(el) => { if (el) meshRefs.current[key] = el }}
                  onPointerDown={handlePointerDown(ci, si)}
                  style={{ cursor: 'grab' }}
                >
                  <sphereGeometry args={[PARTICLE_RADIUS, sphereSegs, sphereSegs]} />
                  <meshStandardMaterial color={cd.proj.color} emissive={cd.proj.color} emissiveIntensity={0.6} metalness={0.3} roughness={0.2} />
                </mesh>
                <Text position={[0, -0.18, 0]} fontSize={0.05} color="#A3A3A3" anchorX="center" anchorY="top" maxWidth={0.7}>{skill}</Text>
              </group>
            )
          })}
          <group position={[0, -1.3, 0]}>
            <Text fontSize={0.08} color={cd.proj.color} anchorX="center" anchorY="top" fontWeight={700}>{cd.proj.name}</Text>
          </group>
        </group>
      ))}

      {clusterData.flatMap((cd, ci) =>
        internalPairs[ci].map((_, li) => (
          <line key={`int-${ci}-${li}`} ref={(el) => { if (el) internalLineRefs.current[ci][li] = el }}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={new Float32Array(6)} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color={cd.proj.color} transparent opacity={0} />
          </line>
        ))
      )}
      {Array.from({ length: lineCount }).map((_, i) => (
        <group key={i}>
          <line ref={(el) => { if (el) lineRefs.current[i] = el }}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" count={2} array={new Float32Array(6)} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial color="#F97316" transparent opacity={0} />
          </line>
          <group ref={(el) => { if (el) labelGroupRefs.current[i] = el }} visible={false}>
            <Text fontSize={0.06} color="#F97316" anchorX="center" anchorY="middle" fontWeight={700}>
              {possibleConnections[i].projectType}
            </Text>
          </group>
        </group>
      ))}
    </group>
  )
}

function SkyDome() {
  const ref = useRef()
  const { isMobile } = useDevice()
  const count = isMobile ? 400 : 1200
  const pos = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 10 + Math.random() * 15, theta = Math.random() * Math.PI * 2, phi = Math.acos(2 * Math.random() - 1)
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = r * Math.cos(phi)
    }
    return p
  }, [count])
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.002 })
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#F5EDD6" transparent opacity={0.2} sizeAttenuation />
    </points>
  )
}

export default function SkillsNetwork() {
  const { isMobile } = useDevice()

  return (
    <Canvas
      camera={{ position: [0, 0.3, 6.5], fov: 50, near: 0.1, far: 30 }}
      dpr={isMobile ? [0.6, 1.0] : [1, 1.5]}
      gl={{
        alpha: true,
        antialias: !isMobile,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 3, 4]} intensity={0.5} color="#F97316" />
        <directionalLight position={[-2, -1, -2]} intensity={0.2} color="#F5EDD6" />
        <SkyDome />
        <Universe />
        {!isMobile && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.08} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
          </EffectComposer>
        )}
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  )
}
