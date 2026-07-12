import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 500, scrollProgress = 0 }) {
  const meshRef = useRef()

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
      vel[i * 3] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003
    }
    return { positions: pos, velocities: vel }
  }, [count])

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3)
    const palette = [
      new THREE.Color('#F97316'),
      new THREE.Color('#F5EDD6'),
      new THREE.Color('#8B5E3C'),
      new THREE.Color('#FAFAFA'),
    ]
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b
    }
    return cols
  }, [count])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array
    const so = scrollProgress * 2
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3] + Math.sin(so + i) * 0.0005
      pos[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(so + i * 0.5) * 0.0005
      pos[i * 3 + 2] += velocities[i * 3 + 2]
      if (Math.abs(pos[i * 3]) > 10) velocities[i * 3] *= -1
      if (Math.abs(pos[i * 3 + 1]) > 10) velocities[i * 3 + 1] *= -1
      if (Math.abs(pos[i * 3 + 2]) > 7) velocities[i * 3 + 2] *= -1
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.y += delta * (0.02 + scrollProgress * 0.05)
    meshRef.current.rotation.x += delta * (0.01 + scrollProgress * 0.03)
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.035} vertexColors transparent opacity={0.8} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}
