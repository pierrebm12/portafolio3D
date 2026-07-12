import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { AdaptiveDpr } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'

function StarField() {
  const ref = useRef()
  const count = 800
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 25
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = r * Math.cos(phi)
    }
    return p
  }, [])
  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) s[i] = 0.02 + Math.random() * 0.08
    return s
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.005
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#F5EDD6" transparent opacity={0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function FloatingParticles() {
  const ref = useRef()
  const count = 200
  const [positions, velocities] = useMemo(() => {
    const p = new Float32Array(count * 3)
    const v = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 12
      p[i * 3 + 1] = (Math.random() - 0.5) * 8
      p[i * 3 + 2] = -3 + Math.random() * 4
      v[i * 3] = (Math.random() - 0.5) * 0.003
      v[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.003
    }
    return [p, v]
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const arr = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3]
      arr[i * 3 + 1] += velocities[i * 3 + 1]
      arr[i * 3 + 2] += velocities[i * 3 + 2]
      if (Math.abs(arr[i * 3]) > 6) velocities[i * 3] *= -1
      if (Math.abs(arr[i * 3 + 1]) > 4) velocities[i * 3 + 1] *= -1
      if (arr[i * 3 + 2] < -3 || arr[i * 3 + 2] > 1) velocities[i * 3 + 2] *= -1
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={new Float32Array(count).fill(0.02)} itemSize={1} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#F97316" transparent opacity={0.15} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  )
}

function Planet({ orbitRadius, size, color, emissive, speed, tilt = 0, offset = 0, hasRing = false }) {
  const groupRef = useRef()
  const initialAngle = useRef(Math.random() * Math.PI * 2)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime * speed + initialAngle.current + offset
    groupRef.current.position.x = Math.cos(t) * orbitRadius
    groupRef.current.position.z = Math.sin(t) * orbitRadius
    groupRef.current.rotation.y += delta * (speed * 0.5)
    groupRef.current.position.y = Math.sin(t * 0.7) * 0.15
  })

  return (
    <group ref={groupRef} rotation-x={tilt}>
      <mesh>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={0.4} metalness={0.4} roughness={0.6} />
      </mesh>
      {hasRing && (
        <mesh rotation-x={Math.PI / 2.5}>
          <ringGeometry args={[size * 1.6, size * 2.2, 48]} />
          <meshBasicMaterial color={emissive} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  )
}

function OrbitRing({ radius }) {
  const points = useMemo(() => {
    const pts = []
    const segments = 64
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius))
    }
    return pts
  }, [radius])

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
      <lineBasicMaterial color="#F97316" transparent opacity={0.06} />
    </line>
  )
}

function Sun() {
  const meshRef = useRef()
  const glowRef = useRef()
  const glowOuterRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.y += delta * 0.2
      meshRef.current.rotation.z += delta * 0.05
    }
    const t = state.clock.elapsedTime
    if (glowRef.current) {
      const pulse = 0.7 + Math.sin(t * 0.5) * 0.3
      glowRef.current.material.opacity = pulse * 0.12
    }
    if (glowOuterRef.current) {
      const pulse = 0.5 + Math.sin(t * 0.3 + 1) * 0.5
      glowOuterRef.current.material.opacity = pulse * 0.06
      glowOuterRef.current.scale.setScalar(1 + Math.sin(t * 0.2) * 0.1)
    }
  })

  return (
    <group>
      <mesh ref={glowOuterRef} scale={[5, 5, 5]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.06} />
      </mesh>
      <mesh ref={glowRef} scale={[3, 3, 3]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="#F97316" transparent opacity={0.15} />
      </mesh>
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[0.5, 0.2, 48, 8]} />
        <meshStandardMaterial
          color="#F97316" emissive="#EA580C" emissiveIntensity={0.8}
          metalness={0.9} roughness={0.1} envMapIntensity={2.5}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.15, 0]} />
        <meshBasicMaterial color="#F5EDD6" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}

function Universe({ mouse }) {
  const groupRef = useRef()

  const planets = useMemo(() => [
    { orbit: 4.0, size: 0.12, color: '#8B5E3C', emissive: '#6B4226', speed: 0.4, tilt: 0.1, hasRing: false },
    { orbit: 4.4, size: 0.22, color: '#F97316', emissive: '#EA580C', speed: 0.32, tilt: -0.1, hasRing: true },
    { orbit: 4.8, size: 0.18, color: '#F5EDD6', emissive: '#D4C5A8', speed: 0.25, tilt: -0.2, hasRing: true },
    { orbit: 5.2, size: 0.1, color: '#6B4226', emissive: '#4A2A16', speed: 0.18, tilt: 0.3, hasRing: false },
    { orbit: 5.6, size: 0.15, color: '#FAFAFA', emissive: '#D4D4D4', speed: 0.12, tilt: 0.15, hasRing: false },
    { orbit: 6.0, size: 0.2, color: '#D4C5A8', emissive: '#A0907A', speed: 0.08, tilt: -0.25, hasRing: true },
  ], [])

  const orbits = useMemo(() => planets.map(p => p.orbit), [planets])

  useFrame((state) => {
    if (!groupRef.current) return
    const mx = mouse.current.x * 0.15
    const my = mouse.current.y * 0.15
    groupRef.current.rotation.x = my * 0.08
    groupRef.current.rotation.y = mx * 0.08
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.05) * 0.08
  })

  return (
    <group ref={groupRef}>
      <Sun />
      {orbits.map((r, i) => <OrbitRing key={i} radius={r} />)}
      {planets.map((p, i) => (
        <Planet key={i} orbitRadius={p.orbit} size={p.size} color={p.color} emissive={p.emissive} speed={p.speed} tilt={p.tilt} offset={i * 0.8} hasRing={p.hasRing} />
      ))}
      <StarField />
      <FloatingParticles />
    </group>
  )
}

export default function HeroScene3D({ mouse, scroll }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 50, near: 0.1, far: 40 }}
        dpr={[0.5, 0.8]}
        gl={{ alpha: true, antialias: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <directionalLight position={[2, 4, 3]} intensity={0.5} color="#F97316" />
          <directionalLight position={[-2, 1, -1]} intensity={0.25} color="#F5EDD6" />
          <pointLight position={[0, 0, 0]} intensity={2} color="#F97316" distance={15} decay={1.2} />
          <Universe mouse={mouse} />
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  )
}
