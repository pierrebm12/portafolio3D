import { useRef, lazy, Suspense } from 'react'
import { motion, useInView } from 'framer-motion'

const LazyNetwork = lazy(() => import('./SkillsNetwork'))

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-150px' })

  return (
    <section id="habilidades" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F97316]/[0.015] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 mb-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.25em] uppercase">
            Stack & Tecnologías
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-['Anton',sans-serif] text-[#F5EDD6] mt-3 tracking-tight">
            HABILIDADES<span className="text-[#F97316]">.</span>
          </h2>
        </motion.div>
      </div>

      {isInView && (
        <Suspense fallback={
          <div className="w-full h-[500px] sm:h-[600px] flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
            <div className="h-[500px] sm:h-[600px] md:h-[650px]">
              <LazyNetwork />
            </div>
          </div>
        </Suspense>
      )}
    </section>
  )
}
