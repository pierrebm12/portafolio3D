import { useRef, lazy, Suspense } from 'react'
import { motion, useInView } from 'framer-motion'

const LazyNetwork = lazy(() => import('./SkillsNetwork'))

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-150px' })

  return (
    <section id="habilidades" ref={sectionRef} className="relative h-screen w-screen overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F97316]/[0.015] to-transparent pointer-events-none" />

      <div className="relative z-10 px-6 lg:px-10 pt-16 sm:pt-20">
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
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <div className="absolute inset-0 top-0">
            <LazyNetwork />
          </div>
        </Suspense>
      )}
    </section>
  )
}
