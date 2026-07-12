import { Canvas } from '@react-three/fiber'
import { Environment, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'
import FloatingShapes from './FloatingShapes'
import ParticleField from './ParticleField'

export default function Scene3D({ scrollProgress = 0 }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50, near: 0.1, far: 35 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }} style={{ background: 'transparent' }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 8, 5]} intensity={1.0} color="#F97316" />
          <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#F5EDD6" />
          <pointLight position={[0, 0, 5]} intensity={0.6} color="#F97316" distance={12} decay={1.5} />
          <pointLight position={[-5, -3, 3]} intensity={0.3} color="#8B5E3C" distance={15} decay={1} />
          <FloatingShapes scrollProgress={scrollProgress} />
          <ParticleField count={500} scrollProgress={scrollProgress} />
          <Environment preset="night" background={false} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
            <ChromaticAberration offset={[0.001, 0.0005]} />
          </EffectComposer>
          <AdaptiveDpr pixelated />
        </Suspense>
      </Canvas>
    </div>
  )
}
