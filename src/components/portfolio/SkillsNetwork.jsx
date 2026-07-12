import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'

const projects = [
  { name: 'E-Shop Pro', color: '#F97316', skills: ['React', 'Node.js', 'Express', 'MySQL', 'CSS', 'HTML', 'Stripe', 'Redux'] },
  { name: 'SocialFlow', color: '#F5EDD6', skills: ['React Native', 'Firebase', 'TypeScript', 'Redux', 'API REST', 'Node.js'] },
  { name: 'AI ChatBot', color: '#8B5E3C', skills: ['Python', 'OpenAI', 'Node.js', 'WebSocket', 'MongoDB', 'Express'] },
  { name: 'Dashboard KV', color: '#FAFAFA', skills: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'TypeScript', 'CSS'] },
  { name: 'FitApp', color: '#F97316', skills: ['React Native', 'Firebase', 'Redux', 'API REST', 'Stripe', 'MongoDB'] },
]

function Universe() {
  const groupRef = useRef()

  const clusterData = useMemo(() => {
    return projects.map((proj, ci) => {
      const angle = (ci / projects.length) * Math.PI * 2 - Math.PI / 2
      const cx = Math.cos(angle) * 3.8
      const cy = Math.sin(angle * 2) * 0.6
      const cz = Math.sin(angle) * 1.5
      const orbit = proj.skills.map(() => ({
        theta: Math.random() * Math.PI * 2,
        phi: Math.acos(2 * Math.random() - 1),
        speed: 0.12 + Math.random() * 0.2,
        osc: Math.random() * Math.PI * 2,
      }))
      return { proj, cx, cy, cz, orbit, worldPositions: proj.skills.map(() => new THREE.Vector3()) }
    })
  }, [])

  const possibleConnections = useMemo(() => {
    const conns = []
    for (let ci = 0; ci < projects.length; ci++) {
      for (let cj = ci + 1; cj < projects.length; cj++) {
        for (let si = 0; si < projects[ci].skills.length; si++) {
          for (let sj = 0; sj < projects[cj].skills.length; sj++) {
            if (projects[ci].skills[si] === projects[cj].skills[sj]) {
              conns.push({ ci, si, cj, sj, phase: Math.random() * Math.PI * 2 })
            }
          }
        }
      }
    }
    return conns
  }, [])

  const lineRefs = useRef([])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const t = state.clock.elapsedTime

    clusterData.forEach((cd, ci) => {
      cd.cx += Math.sin(t * 0.08 + ci) * 0.003
      cd.cy += Math.cos(t * 0.1 + ci * 0.7) * 0.003
      cd.cz += Math.sin(t * 0.06 + ci * 1.3) * 0.003
    })

    for (let i = 0; i < clusterData.length; i++) {
      for (let j = i + 1; j < clusterData.length; j++) {
        const a = clusterData[i], b = clusterData[j]
        const dx = a.cx - b.cx, dy = a.cy - b.cy, dz = a.cz - b.cz
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const minDist = 3.0
        if (dist < minDist && dist > 0.001) {
          const force = (minDist - dist) / minDist * 0.008
          const invDist = 1 / dist
          a.cx += dx * invDist * force; a.cy += dy * invDist * force; a.cz += dz * invDist * force
          b.cx -= dx * invDist * force; b.cy -= dy * invDist * force; b.cz -= dz * invDist * force
        }
      }
    }

    clusterData.forEach((cd) => {
      cd.proj.skills.forEach((_, si) => {
        const o = cd.orbit[si]
        o.theta += dt * o.speed
        o.phi += dt * o.speed * 0.3
        const r = 0.7 + Math.sin(t * 0.25 + o.osc) * 0.12
        const lx = Math.cos(o.theta) * Math.sin(o.phi) * r
        const ly = Math.cos(o.phi) * r * 0.4 + Math.sin(t * 0.15 + o.osc) * 0.08
        const lz = Math.sin(o.theta) * Math.sin(o.phi) * r
        cd.worldPositions[si].set(cd.cx + lx, cd.cy + ly, cd.cz + lz)
      })
    })

    const refs = lineRefs.current
    let lineIdx = 0
    possibleConnections.forEach((conn) => {
      const posA = clusterData[conn.ci].worldPositions[conn.si]
      const posB = clusterData[conn.cj].worldPositions[conn.sj]
      const dist = posA.distanceTo(posB)
      if (dist < 2.0 && lineIdx < refs.length) {
        const line = refs[lineIdx]
        if (line) {
          const arr = line.geometry.attributes.position.array
          arr[0] = posA.x; arr[1] = posA.y; arr[2] = posA.z
          arr[3] = posB.x; arr[4] = posB.y; arr[5] = posB.z
          line.geometry.attributes.position.needsUpdate = true
          const opacity = Math.max(0.05, (1 - dist / 2.0) * 0.6)
          const glow = 0.3 + Math.sin(t * 0.8 + conn.phase) * 0.2
          line.material.opacity = opacity * glow
          line.visible = true
        }
        lineIdx++
      }
    })
    for (let i = lineIdx; i < refs.length; i++) {
      if (refs[i]) refs[i].visible = false
    }
  })

  const lineCount = possibleConnections.length

  return (
    <group ref={groupRef}>
      {clusterData.map((cd, ci) => (
        <group key={ci}>
          {cd.proj.skills.map((skill, si) => {
            const o = cd.orbit[si]
            const r = 0.7
            const lx = Math.cos(o.theta) * Math.sin(o.phi) * r
            const ly = Math.cos(o.phi) * r * 0.4
            const lz = Math.sin(o.theta) * Math.sin(o.phi) * r
            const initPos = [lx, ly, lz]
            return (
              <group key={si} position={initPos}>
                <mesh>
                  <sphereGeometry args={[0.07, 12, 12]} />
                  <meshStandardMaterial color={cd.proj.color} emissive={cd.proj.color} emissiveIntensity={0.5} metalness={0.3} roughness={0.2} />
                </mesh>
                <Text position={[0, -0.12, 0]} fontSize={0.035} color="#A3A3A3" anchorX="center" anchorY="top" maxWidth={0.5}>
                  {skill}
                </Text>
              </group>
            )
          })}
          <group position={[0, -1.0, 0]}>
            <Text fontSize={0.06} color={cd.proj.color} anchorX="center" anchorY="top" fontWeight={700}>
              {cd.proj.name}
            </Text>
          </group>
        </group>
      ))}

      {Array.from({ length: lineCount }).map((_, i) => (
        <line key={i} ref={(el) => { if (el) lineRefs.current[i] = el }}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={2} array={new Float32Array(6)} itemSize={3} />
          </bufferGeometry>
          <lineBasicMaterial color="#F97316" transparent opacity={0} />
        </line>
      ))}
    </group>
  )
}

export default function SkillsNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 7.5], fov: 45, near: 0.1, far: 25 }}
      dpr={[0.8, 1.2]}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 3, 4]} intensity={0.5} color="#F97316" />
        <directionalLight position={[-2, -1, -2]} intensity={0.2} color="#F5EDD6" />
        <Universe />
        <EffectComposer>
          <Bloom luminanceThreshold={0.08} luminanceSmoothing={0.9} intensity={0.5} mipmapBlur />
        </EffectComposer>
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  )
}
