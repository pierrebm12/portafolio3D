import { Canvas } from '@react-three/fiber'
import { Environment, AdaptiveDpr } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Suspense } from 'react'
import * as THREE from 'three'
import FloatingShapes from './FloatingShapes'
import ParticleField from './ParticleField'
import { useDevice } from '../../utils/useDevice'

export default function Scene3D() {
  const { isMobile } = useDevice()

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 40 }}
      dpr={isMobile ? [0.5, 0.8] : [1, 1.5]}
      gl={{
        alpha: true,
        antialias: !isMobile,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.3,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 8, 5]} intensity={1.0} color="#F97316" />
        <directionalLight position={[-5, 3, -4]} intensity={0.5} color="#F5EDD6" />
        <FloatingShapes />
        <ParticleField count={isMobile ? 120 : 400} />
        <Environment preset="night" background={false} />
        {!isMobile && (
          <EffectComposer>
            <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={0.5} mipmapBlur />
          </EffectComposer>
        )}
        <AdaptiveDpr pixelated />
      </Suspense>
    </Canvas>
  )
}
