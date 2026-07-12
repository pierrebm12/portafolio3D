import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const configs = [
  { type: 'TorusKnotGeometry', args: [0.5, 0.18, 64, 8], color: '#F97316', emissive: '#EA580C', pos: [-4, 2, -3], scale: 1 },
  { type: 'IcosahedronGeometry', args: [0.45, 0], color: '#F5EDD6', emissive: '#D4C5A8', pos: [5, -1.5, -4], scale: 1 },
  { type: 'TorusGeometry', args: [0.4, 0.12, 24, 32], color: '#8B5E3C', emissive: '#6B4226', pos: [-3, -3, -5], scale: 1 },
  { type: 'OctahedronGeometry', args: [0.4, 0], color: '#FAFAFA', emissive: '#D4D4D4', pos: [4.5, 3, -2], scale: 1 },
  { type: 'DodecahedronGeometry', args: [0.35, 0], color: '#1A1A1A', emissive: '#333333', pos: [-5, -2.5, -4], scale: 1 },
  { type: 'TorusKnotGeometry', args: [0.3, 0.1, 48, 6], color: '#F5EDD6', emissive: '#E8D5A3', pos: [3, -3.5, -3], scale: 0.9 },
]

export default function FloatingShapes() {
  const groupRef = useRef()
  const geometries = useMemo(() => configs.map((c) => new THREE[c.type](...c.args)), [])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const t = performance.now() / 1000
    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.1
    groupRef.current.rotation.y += delta * 0.08
    groupRef.current.position.y = Math.sin(t * 0.2) * 0.4
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
