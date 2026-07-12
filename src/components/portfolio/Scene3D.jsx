import { Canvas } from '@react-three/fiber'
import { Environment, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'
import FloatingShapes from './FloatingShapes'
import ParticleField from './ParticleField'

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 35 }}
      dpr={[0.8, 1.2]}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: 'transparent' }}

    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.0} color="#F97316" />
        <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#F5EDD6" />
        <pointLight position={[0, 0, 5]} intensity={0.6} color="#F97316" distance={12} decay={1.5} />
        <FloatingShapes />
        <ParticleField count={200} />
        <Environment preset="night" background={false} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.85} intensity={0.4} mipmapBlur />
        </EffectComposer>
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  )
}
