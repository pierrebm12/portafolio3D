import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr, Text } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'

const projectData = [
  {
    name: 'E-Shop Pro',
    color: '#F97316',
    skills: ['React', 'Node.js', 'Express', 'MySQL', 'CSS', 'HTML', 'Stripe', 'Redux'],
  },
  {
    name: 'SocialFlow',
    color: '#F5EDD6',
    skills: ['React Native', 'Firebase', 'TypeScript', 'Redux', 'API REST', 'Node.js'],
  },
  {
    name: 'AI ChatBot',
    color: '#8B5E3C',
    skills: ['Python', 'OpenAI', 'Node.js', 'WebSocket', 'MongoDB', 'Express'],
  },
  {
    name: 'Dashboard KV',
    color: '#FAFAFA',
    skills: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'TypeScript', 'CSS'],
  },
  {
    name: 'FitApp Mobile',
    color: '#F97316',
    skills: ['React Native', 'Firebase', 'Redux', 'API REST', 'Stripe', 'MongoDB'],
  },
]

function SkillNode({ position, label, color, isHovered, onHover }) {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const s = isHovered ? 1.3 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.08)
    if (glowRef.current) {
      glowRef.current.material.opacity = isHovered ? 0.4 : 0.1 + Math.sin(state.clock.elapsedTime * 0.5 + label.length) * 0.05
    }
  })

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
      <mesh
        ref={meshRef}
        onPointerEnter={() => onHover(label)}
        onPointerLeave={() => onHover(null)}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = 'default' }}
      >
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 0.8 : 0.3}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      <Text
        position={[0, -0.2, 0]}
        fontSize={0.045}
        color="#A3A3A3"
        anchorX="center"
        anchorY="top"
        font={undefined}
      >
        {label}
      </Text>
    </group>
  )
}

function ConnectionLine({ start, end, color, dashed = false }) {
  const points = useMemo(() => {
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
    const dir = new THREE.Vector3().subVectors(end, start)
    const len = dir.length()
    dir.normalize()
    const perp = new THREE.Vector3(-dir.y, dir.x, dir.z * 0.3).normalize()
    mid.add(perp.clone().multiplyScalar(len * 0.08))
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    return curve.getPoints(20)
  }, [start, end])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={Float32Array.from(points.flatMap(v => [v.x, v.y, v.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={dashed ? 0.12 : 0.2} />
    </line>
  )
}

function ProjectLabel({ position, name, color }) {
  const ref = useRef()
  useFrame((state) => {
    if (!ref.current) return
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.05
  })

  return (
    <group ref={ref} position={position}>
      <Text fontSize={0.08} color={color} anchorX="center" anchorY="middle" fontWeight={700}>
        {name}
      </Text>
    </group>
  )
}

function NeuralNetwork({ onSkillHover }) {
  const groupRef = useRef()
  const [hoveredSkill, setHoveredSkill] = useState(null)

  const { clusters, connections } = useMemo(() => {
    const clusterRadius = 2.8
    const numProjects = projectData.length
    const clusters = []
    const allNodes = []

    projectData.forEach((project, pi) => {
      const angle = (pi / numProjects) * Math.PI * 2 - Math.PI / 2
      const cx = Math.cos(angle) * clusterRadius
      const cz = Math.sin(angle) * clusterRadius
      const cy = Math.cos(angle * 2) * 0.5

      const skillPositions = []
      const count = project.skills.length
      project.skills.forEach((skill, si) => {
        const theta = (si / count) * Math.PI * 2
        const phi = Math.cos(si * 1.3) * 0.8
        const r = 0.7 + Math.sin(si * 0.7) * 0.15
        const sx = cx + Math.cos(theta) * Math.cos(phi) * r
        const sy = cy + Math.sin(phi) * r
        const sz = cz + Math.sin(theta) * Math.cos(phi) * r
        skillPositions.push({ skill, pos: new THREE.Vector3(sx, sy, sz), projectIdx: pi, color: project.color })
        allNodes.push({ skill, pos: new THREE.Vector3(sx, sy, sz), projectIdx: pi })
      })

      clusters.push({
        name: project.name,
        color: project.color,
        center: new THREE.Vector3(cx, cy, cz),
        skills: skillPositions,
      })
    })

    const conn = []
    clusters.forEach((cluster) => {
      const s = cluster.skills
      for (let i = 0; i < s.length; i++) {
        for (let j = i + 1; j < s.length; j++) {
          conn.push({ start: s[i].pos, end: s[j].pos, color: cluster.color, dashed: false })
        }
      }
    })

    for (let i = 0; i < allNodes.length; i++) {
      for (let j = i + 1; j < allNodes.length; j++) {
        if (allNodes[i].skill === allNodes[j].skill && allNodes[i].projectIdx !== allNodes[j].projectIdx) {
          conn.push({ start: allNodes[i].pos, end: allNodes[j].pos, color: '#F97316', dashed: true })
        }
      }
    }

    return { clusters, connections: conn }
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.05
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.05
  })

  const handleHover = (skill) => {
    setHoveredSkill(skill)
    if (onSkillHover) onSkillHover(skill)
  }

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => (
        <ConnectionLine key={i} start={conn.start} end={conn.end} color={conn.color} dashed={conn.dashed} />
      ))}
      {clusters.map((cluster, ci) => (
        <ProjectLabel key={`label-${ci}`} position={[cluster.center.x, cluster.center.y - 1.1, cluster.center.z]} name={cluster.name} color={cluster.color} />
      ))}
      {clusters.map((cluster) =>
        cluster.skills.map((s, si) => (
          <SkillNode key={`${s.skill}-${si}`} position={s.pos} label={s.skill} color={s.color} isHovered={hoveredSkill === s.skill} onHover={handleHover} />
        ))
      )}
    </group>
  )
}

export default function SkillsNetwork({ onSkillHover }) {
  return (
    <div className="w-full h-[500px] sm:h-[600px] md:h-[650px]">
      <Canvas
        camera={{ position: [0, 0.5, 5.5], fov: 45, near: 0.1, far: 20 }}
        dpr={[0.8, 1.2]}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[3, 4, 5]} intensity={0.7} color="#F97316" />
          <directionalLight position={[-3, -2, -2]} intensity={0.3} color="#F5EDD6" />
          <NeuralNetwork onSkillHover={onSkillHover} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.85} intensity={0.3} mipmapBlur />
          </EffectComposer>
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  )
}
