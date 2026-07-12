import { Canvas } from '@react-three/fiber'
import { Environment, AdaptiveDpr } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import FloatingShapes from './FloatingShapes'
import ParticleField from './ParticleField'

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 40 }}
      dpr={[0.5, 0.8]}
      gl={{ alpha: true, antialias: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 8, 5]} intensity={1.0} color="#F97316" />
        <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#F5EDD6" />
        <FloatingShapes />
        <ParticleField count={200} />
        <Environment preset="night" background={false} />
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  )
}
