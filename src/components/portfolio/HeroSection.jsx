import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiArrowDown, HiPlay } from 'react-icons/hi'

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -150])

  return (
    <section id="hero" ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A0E08] to-[#0A0A0A]" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, #F97316 1px, transparent 1px), radial-gradient(circle at 75% 75%, #F5EDD6 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <motion.div style={{ opacity, y: textY }} className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} className="mb-4">
          <span className="inline-block px-4 py-1.5 border border-[#F97316]/30 rounded-full text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-wider uppercase bg-[#F97316]/5">
            Desarrollo · Diseño · Marketing
          </span>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-['Anton',sans-serif] leading-[0.9] tracking-tighter text-[#F5EDD6] mb-6">
          DEV<br /><span className="text-[#F97316]">TRO</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
          className="text-lg sm:text-xl md:text-2xl font-['DM_Sans',sans-serif] text-[#A3A3A3] max-w-2xl mx-auto mb-4 leading-relaxed">
          Transformamos tu negocio con{' '}
          <span className="text-[#F5EDD6] font-semibold">desarrollo web</span>,{' '}
          <span className="text-[#F5EDD6] font-semibold">aplicaciones móviles</span> y{' '}
          <span className="text-[#F5EDD6] font-semibold">marketing digital</span>.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          className="text-[#8B5E3C] font-['DM_Sans',sans-serif] text-sm sm:text-base max-w-xl mx-auto mb-10 italic">
          Todo en un solo lugar. Sin complicaciones. Resultados reales.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contacto"
            className="group relative px-8 py-4 bg-[#F97316] text-[#0A0A0A] font-['DM_Sans',sans-serif] font-bold text-base rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#F97316]/30">
            <span className="relative z-10 flex items-center gap-2"><HiPlay size={20} />Inicia tu Proyecto</span>
          </a>
          <a href="#servicios"
            className="px-8 py-4 border border-[#F97316]/30 text-[#F5EDD6] font-['DM_Sans',sans-serif] font-medium text-base rounded-full hover:bg-[#F97316]/10 transition-all duration-300">
            Ver Servicios
          </a>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <motion.a href="#servicios" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[#A3A3A3] hover:text-[#F97316] transition-colors">
          <span className="text-xs font-['DM_Sans',sans-serif] tracking-widest uppercase">Scroll</span>
          <HiArrowDown size={18} />
        </motion.a>
      </motion.div>
    </section>
  )
}
