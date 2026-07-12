import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

const configs = [
  { type: 'TorusKnotGeometry', args: [0.5, 0.18, 128, 16], color: '#F97316', emissive: '#EA580C', pos: [-4, 2, -3], scale: 1, speed: 0.3 },
  { type: 'IcosahedronGeometry', args: [0.45, 0], color: '#F5EDD6', emissive: '#D4C5A8', pos: [5, -1.5, -4], scale: 1, speed: 0.2 },
  { type: 'TorusGeometry', args: [0.4, 0.12, 32, 64], color: '#8B5E3C', emissive: '#6B4226', pos: [-3, -3, -5], scale: 1, speed: 0.25 },
  { type: 'OctahedronGeometry', args: [0.4, 0], color: '#FAFAFA', emissive: '#D4D4D4', pos: [4.5, 3, -2], scale: 1, speed: 0.35 },
  { type: 'RingGeometry', args: [0.25, 0.5, 48], color: '#F97316', emissive: '#EA580C', pos: [0, 4, -6], scale: 1, speed: 0.15 },
  { type: 'DodecahedronGeometry', args: [0.4, 0], color: '#1A1A1A', emissive: '#333333', pos: [-5, -2.5, -4], scale: 1, speed: 0.2 },
  { type: 'TorusKnotGeometry', args: [0.35, 0.12, 64, 8], color: '#F5EDD6', emissive: '#E8D5A3', pos: [3, -3.5, -3], scale: 0.9, speed: 0.4 },
  { type: 'IcosahedronGeometry', args: [0.25, 0], color: '#F97316', emissive: '#EA580C', pos: [-4.5, 3.5, -5], scale: 1, speed: 0.3 },
]

export default function FloatingShapes({ scrollProgress = 0 }) {
  const groupRef = useRef()
  const geometries = useMemo(() => configs.map((c) => new THREE[c.type](...c.args)), [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const t = performance.now() / 1000
    groupRef.current.rotation.x = Math.sin(t * 0.04) * 0.15
    groupRef.current.rotation.y = Math.sin(t * 0.06) * 0.2
    groupRef.current.position.y = Math.sin(scrollProgress * Math.PI * 2.5) * 1.2
    groupRef.current.rotation.z = Math.sin(t * 0.02 + scrollProgress) * 0.1
  })

  return (
    <group ref={groupRef}>
      {configs.map((item, i) => (
        <Float key={i} speed={item.speed} rotationIntensity={1.2} floatIntensity={2}>
          <mesh position={item.pos} scale={item.scale}>
            <primitive object={geometries[i]} />
            <meshStandardMaterial color={item.color} emissive={item.emissive} emissiveIntensity={0.3} metalness={0.7} roughness={0.25} envMapIntensity={1.8} transparent opacity={0.85} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
