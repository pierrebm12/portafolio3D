import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const configs = [
  { type: 'TorusKnotGeometry', args: [0.5, 0.18, 64, 8], color: '#F97316', emissive: '#EA580C', pos: [-4.5, 2.5, -3], scale: 1 },
  { type: 'IcosahedronGeometry', args: [0.45, 0], color: '#F5EDD6', emissive: '#D4C5A8', pos: [5.5, -2, -4], scale: 1 },
  { type: 'TorusGeometry', args: [0.4, 0.12, 24, 32], color: '#8B5E3C', emissive: '#6B4226', pos: [-3.5, -3.5, -5], scale: 1 },
  { type: 'OctahedronGeometry', args: [0.4, 0], color: '#FAFAFA', emissive: '#D4D4D4', pos: [5, 3.5, -2], scale: 1 },
  { type: 'DodecahedronGeometry', args: [0.35, 0], color: '#1A1A1A', emissive: '#333333', pos: [-5.5, -3, -4], scale: 1 },
  { type: 'TorusKnotGeometry', args: [0.3, 0.1, 48, 6], color: '#F5EDD6', emissive: '#E8D5A3', pos: [3.5, -4, -3], scale: 0.9 },
  { type: 'ConeGeometry', args: [0.3, 0.5, 6], color: '#F97316', emissive: '#EA580C', pos: [-2, 4.5, -4], scale: 0.8 },
  { type: 'CylinderGeometry', args: [0.2, 0.3, 0.6, 8], color: '#D4C5A8', emissive: '#B8A87A', pos: [4, -3, -3.5], scale: 0.9 },
  { type: 'TorusGeometry', args: [0.25, 0.06, 16, 24], color: '#6B4226', emissive: '#4A2A16', pos: [-3, 3, -5.5], scale: 1.1 },
  { type: 'IcosahedronGeometry', args: [0.2, 0], color: '#FAFAFA', emissive: '#D4D4D4', pos: [2.5, 4, -3.5], scale: 0.8 },
  { type: 'OctahedronGeometry', args: [0.3, 0], color: '#F5EDD6', emissive: '#C6A15B', pos: [-5, 0.5, -2.5], scale: 0.7 },
  { type: 'DodecahedronGeometry', args: [0.25, 0], color: '#F97316', emissive: '#EA580C', pos: [4.5, -0.5, -5], scale: 0.9 },
]

export default function FloatingShapes() {
  const groupRef = useRef()
  const geometries = useMemo(() => configs.map((c) => new THREE[c.type](...c.args)), [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const t = performance.now() / 1000
    groupRef.current.rotation.x = Math.sin(t * 0.02) * 0.08
    groupRef.current.rotation.y += delta * 0.06
    groupRef.current.position.y = Math.sin(t * 0.15) * 0.3
  })

  return (
    <group ref={groupRef}>
      {configs.map((item, i) => (
        <mesh key={i} position={item.pos} scale={item.scale}>
          <primitive object={geometries[i]} />
          <meshStandardMaterial color={item.color} emissive={item.emissive} emissiveIntensity={0.2} metalness={0.6} roughness={0.3} envMapIntensity={1.2} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  )
}
