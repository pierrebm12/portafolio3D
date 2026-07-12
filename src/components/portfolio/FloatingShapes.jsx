import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useDevice } from '../../utils/useDevice'

const configs = [
  { type: 'TorusKnotGeometry', color: '#F97316', emissive: '#EA580C', pos: [-4.5, 2.5, -3], scale: 1 },
  { type: 'IcosahedronGeometry', color: '#F5EDD6', emissive: '#D4C5A8', pos: [5.5, -2, -4], scale: 1 },
  { type: 'TorusGeometry', color: '#8B5E3C', emissive: '#6B4226', pos: [-3.5, -3.5, -5], scale: 1 },
  { type: 'OctahedronGeometry', color: '#FAFAFA', emissive: '#D4D4D4', pos: [5, 3.5, -2], scale: 1 },
  { type: 'DodecahedronGeometry', color: '#1A1A1A', emissive: '#333333', pos: [-5.5, -3, -4], scale: 1 },
  { type: 'TorusKnotGeometry', color: '#F5EDD6', emissive: '#E8D5A3', pos: [3.5, -4, -3], scale: 0.9 },
  { type: 'ConeGeometry', color: '#F97316', emissive: '#EA580C', pos: [-2, 4.5, -4], scale: 0.8 },
  { type: 'CylinderGeometry', color: '#D4C5A8', emissive: '#B8A87A', pos: [4, -3, -3.5], scale: 0.9 },
  { type: 'TorusGeometry', color: '#6B4226', emissive: '#4A2A16', pos: [-3, 3, -5.5], scale: 1.1 },
  { type: 'IcosahedronGeometry', color: '#FAFAFA', emissive: '#D4D4D4', pos: [2.5, 4, -3.5], scale: 0.8 },
  { type: 'OctahedronGeometry', color: '#F5EDD6', emissive: '#C6A15B', pos: [-5, 0.5, -2.5], scale: 0.7 },
  { type: 'DodecahedronGeometry', color: '#F97316', emissive: '#EA580C', pos: [4.5, -0.5, -5], scale: 0.9 },
]

const highResArgs = {
  TorusKnotGeometry: [
    [0.5, 0.18, 64, 8],
    [0.3, 0.1, 48, 6],
  ],
  IcosahedronGeometry: [[0.45, 0], [0.2, 0]],
  TorusGeometry: [
    [0.4, 0.12, 24, 32],
    [0.25, 0.06, 16, 24],
  ],
  OctahedronGeometry: [[0.4, 0], [0.3, 0]],
  DodecahedronGeometry: [[0.35, 0], [0.25, 0]],
  ConeGeometry: [[0.3, 0.5, 6]],
  CylinderGeometry: [[0.2, 0.3, 0.6, 8]],
}

const lowResArgs = {
  TorusKnotGeometry: [
    [0.5, 0.18, 32, 6],
    [0.3, 0.1, 24, 4],
  ],
  IcosahedronGeometry: [[0.45, 0], [0.2, 0]],
  TorusGeometry: [
    [0.4, 0.12, 16, 20],
    [0.25, 0.06, 12, 16],
  ],
  OctahedronGeometry: [[0.4, 0], [0.3, 0]],
  DodecahedronGeometry: [[0.35, 0], [0.25, 0]],
  ConeGeometry: [[0.3, 0.5, 4]],
  CylinderGeometry: [[0.2, 0.3, 0.6, 6]],
}

let argIndex = {}

export default function FloatingShapes() {
  const groupRef = useRef()
  const { isMobile } = useDevice()
  const argsMap = isMobile ? lowResArgs : highResArgs

  argIndex = {}
  configs.forEach((c) => {
    const key = c.type
    if (!(key in argIndex)) argIndex[key] = 0
    else argIndex[key]++
  })

  const geometries = useMemo(() => {
    const counts = {}
    return configs.map((c) => {
      const key = c.type
      const idx = counts[key] || 0
      counts[key] = (counts[key] || 0) + 1
      const args = (argsMap[key] || [c.args])[idx] || c.args
      return new THREE[c.type](...args)
    })
  }, [isMobile])

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
