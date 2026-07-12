import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'

function Centerpiece({ mouse, scroll }) {
  const meshRef = useRef()
  const ringRef = useRef()
  const particlesRef = useRef()
  const clock = useRef(new THREE.Clock())

  const ringParticles = useMemo(() => {
    const count = 120
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2
      const r = 1.6 + Math.random() * 0.3
      pos[i * 3] = Math.cos(theta) * r
      pos[i * 3 + 1] = Math.sin(theta) * r * 0.3
      pos[i * 3 + 2] = Math.sin(theta) * 0.4
    }
    return pos
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const mx = mouse.current.x * 0.3
    const my = mouse.current.y * 0.3

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.25
      meshRef.current.rotation.y += delta * 0.35
      meshRef.current.rotation.z += delta * 0.1
      meshRef.current.position.x = mx + Math.sin(t * 0.3) * 0.3
      meshRef.current.position.y = my + Math.cos(t * 0.4) * 0.2
      meshRef.current.position.z = Math.sin(t * 0.15) * 0.3 - scroll.current * 0.5
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = 0.4 + Math.sin(t * 0.2) * 0.1
      ringRef.current.rotation.z += delta * 0.15
      ringRef.current.position.x = mx * 0.5
      ringRef.current.position.y = my * 0.5
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.08
      particlesRef.current.position.x = mx * 0.4
      particlesRef.current.position.y = my * 0.4
    }
  })

  return (
    <group>
      <group ref={ringRef}>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={120} array={ringParticles} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial size={0.03} color="#F97316" transparent opacity={0.6} sizeAttenuation blending={THREE.AdditiveBlending} />
        </points>
        <mesh rotation-x={Math.PI / 2.5} position-z={0.1}>
          <ringGeometry args={[1.5, 1.55, 64]} />
          <meshBasicMaterial color="#F97316" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2.5} position-z={-0.1}>
          <ringGeometry args={[1.6, 1.65, 64]} />
          <meshBasicMaterial color="#F5EDD6" transparent opacity={0.04} side={THREE.DoubleSide} />
        </mesh>
      </group>

      <group ref={meshRef}>
        <mesh scale={1.2}>
          <torusKnotGeometry args={[0.6, 0.22, 120, 16]} />
          <meshStandardMaterial
            color="#F97316" emissive="#EA580C" emissiveIntensity={0.5}
            metalness={0.85} roughness={0.15} envMapIntensity={2}
          />
        </mesh>
        <mesh scale={0.5} position={[1.2, 0.6, 0.3]}>
          <icosahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#F5EDD6" emissive="#D4C5A8" emissiveIntensity={0.3} metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh scale={0.4} position={[-1.1, -0.5, 0.4]}>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial color="#8B5E3C" emissive="#6B4226" emissiveIntensity={0.3} metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh scale={0.35} position={[-0.5, 1, -0.2]}>
          <dodecahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial color="#FAFAFA" emissive="#D4D4D4" emissiveIntensity={0.2} metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh scale={0.3} position={[0.8, -0.7, -0.3]}>
          <torusGeometry args={[0.25, 0.08, 24, 32]} />
          <meshStandardMaterial color="#F97316" emissive="#EA580C" emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={200} array={useMemo(() => {
            const p = new Float32Array(600)
            for (let i = 0; i < 200; i++) {
              p[i * 3] = (Math.random() - 0.5) * 8
              p[i * 3 + 1] = (Math.random() - 0.5) * 8
              p[i * 3 + 2] = (Math.random() - 0.5) * 5
            }
            return p
          }, [])} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.03} color="#F97316" transparent opacity={0.4} sizeAttenuation blending={THREE.AdditiveBlending} />
      </points>
    </group>
  )
}

function BackgroundGlow() {
  return (
    <mesh scale={[8, 8, 1]} position-z={-2}>
      <planeGeometry />
      <meshBasicMaterial color="#F97316" transparent opacity={0.03} />
    </mesh>
  )
}

export default function HeroScene3D({ mouse, scroll }) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 20 }}
        dpr={[0.8, 1.2]}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.5 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[3, 5, 4]} intensity={0.8} color="#F97316" />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#F5EDD6" />
          <pointLight position={[0, 0, 3]} intensity={1.2} color="#F97316" distance={8} decay={1.5} />
          <BackgroundGlow />
          <Centerpiece mouse={mouse} scroll={scroll} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.05} luminanceSmoothing={0.95} intensity={1.2} mipmapBlur />
          </EffectComposer>
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  )
}
