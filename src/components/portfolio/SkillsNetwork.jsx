import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'

const allSkills = [
  'React', 'Node.js', 'Express', 'MySQL', 'CSS', 'HTML', 'Stripe', 'Redux',
  'React Native', 'Firebase', 'TypeScript', 'API REST', 'Python', 'OpenAI',
  'WebSocket', 'MongoDB', 'D3.js', 'PostgreSQL', 'Tailwind', 'Git', 'Docker',
  'Next.js', 'GraphQL', 'AWS', 'Figma',
]

function SkillParticle({ position, label, index, connections }) {
  const meshRef = useRef()
  const glowRef = useRef()
  const pulseSpeed = 0.3 + Math.random() * 0.4
  const phase = Math.random() * Math.PI * 2

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return
    const t = state.clock.elapsedTime * pulseSpeed + phase
    const pulse = 0.6 + Math.sin(t) * 0.4
    meshRef.current.scale.setScalar(0.8 + Math.sin(t * 0.5) * 0.2)
    glowRef.current.material.opacity = pulse * 0.25
    const yOff = Math.sin(state.clock.elapsedTime * 0.4 + index) * 0.03
    meshRef.current.position.y = position[1] + yOff
    glowRef.current.position.y = position[1] + yOff
  })

  return (
    <group>
      <mesh ref={glowRef} position={position}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.2} />
      </mesh>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial
          color="#F5EDD6"
          emissive="#F97316"
          emissiveIntensity={0.6}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

function ConnectionLine({ start, end, phase }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    const pulse = 0.15 + Math.sin(state.clock.elapsedTime * 0.5 + phase) * 0.1
    ref.current.material.opacity = pulse
  })

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([start[0], start[1], start[2], end[0], end[1], end[2]])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#F97316" transparent opacity={0.1} />
    </line>
  )
}

function SkillsUniverse() {
  const groupRef = useRef()

  const { nodes, connections } = useMemo(() => {
    const n = allSkills.length
    const radius = 3.5
    const nodes = []
    const positions = []

    allSkills.forEach((skill, i) => {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius * (0.6 + Math.random() * 0.4)
      const x = Math.sin(phi) * Math.cos(theta) * r
      const y = Math.sin(phi) * Math.sin(theta) * r * 0.6
      const z = Math.cos(phi) * r * 0.5
      nodes.push({ skill, pos: [x, y, z], index: i })
      positions.push({ x, y, z })
    })

    const conn = []
    const connectionSet = new Set()

    for (let i = 0; i < n; i++) {
      const dists = []
      for (let j = 0; j < n; j++) {
        if (i === j) continue
        const dx = positions[i].x - positions[j].x
        const dy = positions[i].y - positions[j].y
        const dz = positions[i].z - positions[j].z
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        dists.push({ idx: j, dist: d })
      }
      dists.sort((a, b) => a.dist - b.dist)
      const neighbors = dists.slice(0, 4)
      neighbors.forEach((nbr) => {
        const key = Math.min(i, nbr.idx) + '-' + Math.max(i, nbr.idx)
        if (!connectionSet.has(key)) {
          connectionSet.add(key)
          conn.push({
            start: [positions[i].x, positions[i].y, positions[i].z],
            end: [positions[nbr.idx].x, positions[nbr.idx].y, positions[nbr.idx].z],
            phase: Math.random() * Math.PI * 2,
          })
        }
      })
    }

    return { nodes, connections: conn }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.04
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.04
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {connections.map((conn, i) => (
        <ConnectionLine key={i} start={conn.start} end={conn.end} phase={conn.phase} />
      ))}
      {nodes.map((node) => (
        <SkillParticle key={node.index} position={node.pos} label={node.skill} index={node.index} />
      ))}
    </group>
  )
}

export default function SkillsNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 6], fov: 50, near: 0.1, far: 15 }}
      dpr={[0.8, 1.2]}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[2, 3, 4]} intensity={0.5} color="#F97316" />
        <directionalLight position={[-2, -1, -2]} intensity={0.2} color="#F5EDD6" />
        <SkillsUniverse />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.85} intensity={0.4} mipmapBlur />
        </EffectComposer>
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  )
}
