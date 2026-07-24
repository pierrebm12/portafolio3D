import { useRef, useEffect, useState, lazy, Suspense } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { HiArrowDown, HiPlay, HiSparkles, HiArrowRight } from 'react-icons/hi'

const LazyHeroScene = lazy(() => import('./HeroScene3D'))

function MagneticButton({ children, href, className, ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const handleMouse = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.2, y: (e.clientY - r.top - r.height / 2) * 0.2 })
  }
  const reset = () => setPos({ x: 0, y: 0 })
  return (
    <motion.a ref={ref} href={href} onMouseMove={handleMouse} onMouseLeave={reset}
      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.1 }}
      className={className} {...props}>
      {children}
    </motion.a>
  )
}

export default function HeroSection() {
  const ref = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const scroll = useRef(0)
  const [sceneReady, setSceneReady] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.1])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -200])
  const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0.6, 0.3, 0])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 0.7, 0])

  const badgeScaleX = useSpring(1, { stiffness: 200, damping: 20 })
  const badgeScaleY = useSpring(1, { stiffness: 200, damping: 20 })
  const onBadgeMouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
    badgeScaleX.set(1 + (x - 0.5) * 0.08)
    badgeScaleY.set(1 + (y - 0.5) * 0.08)
  }
  const resetBadge = () => { badgeScaleX.set(1); badgeScaleY.set(1) }

  useEffect(() => {
    setSceneReady(true)
    const onMouse = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse, { passive: true })
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => { scroll.current = v })
    return () => unsub()
  }, [scrollYProgress])

  return (
    <section id="hero" ref={ref} className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#120A06] to-[#0A0A0A]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(249,115,22,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(245,237,214,0.03),transparent_50%)] pointer-events-none" />

      <motion.div
        style={{ opacity: glowOpacity }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#F97316]/[0.03] blur-[150px] pointer-events-none"
      />

      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, #F97316 0.5px, transparent 0.5px), radial-gradient(circle at 75% 75%, #F5EDD6 0.5px, transparent 0.5px)',
        backgroundSize: '40px 40px',
      }} />

      {sceneReady && (
        <Suspense fallback={null}>
          <LazyHeroScene mouse={mouse} />
        </Suspense>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/20 pointer-events-none z-[1]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none z-[1]" />

      <motion.div style={{ opacity: contentOpacity, scale: heroScale }} className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-8"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onMouseMove={onBadgeMouse}
            onMouseLeave={resetBadge}
            style={{ scaleX: badgeScaleX, scaleY: badgeScaleY }}
            className="inline-flex items-center gap-2 px-5 py-2 border border-[#F97316]/30 rounded-full text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.15em] uppercase bg-[#F97316]/5 backdrop-blur-sm"
          >
            <HiSparkles size={14} className="text-[#F97316]" />
            Desarrollo · Diseño · Marketing
          </motion.span>
        </motion.div>

        <motion.div style={{ y: textY }} className="relative mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-['Anton',sans-serif] leading-[0.85] tracking-tighter text-[#F5EDD6] select-none"
          >
            <span className="inline-block">DEV</span>
            <br />
            <span className="inline-block text-[#F97316] drop-shadow-[0_0_40px_rgba(249,115,22,0.3)]" style={{ textShadow: '0 0 60px rgba(249,115,22,0.15), 0 0 120px rgba(249,115,22,0.05)' }}>TRO</span>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-[#F97316]/50 to-transparent"
          />
        </motion.div>

        <motion.div style={{ y: subtitleY }}>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            className="text-base sm:text-lg md:text-xl font-['DM_Sans',sans-serif] text-[#A3A3A3] max-w-2xl mx-auto mb-3 leading-relaxed"
          >
            Transformamos tu negocio con{' '}
            <span className="text-[#F5EDD6] font-semibold">desarrollo</span>,{' '}
            <span className="text-[#F5EDD6] font-semibold">diseño</span> y{' '}
            <span className="text-[#F5EDD6] font-semibold">marketing</span>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-[#8B5E3C] font-['DM_Sans',sans-serif] text-xs sm:text-sm mb-10 italic"
          >
            Todo en un solo lugar. Sin complicaciones. Resultados reales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton href="/#contacto"
              className="group relative px-9 py-4 bg-[#F97316] text-[#0A0A0A] font-['DM_Sans',sans-serif] font-bold text-base rounded-full overflow-hidden shadow-lg shadow-[#F97316]/20 hover:shadow-[0_0_50px_rgba(249,115,22,0.3)] transition-shadow duration-300"
            >
              <span className="relative z-10 flex items-center gap-2">
                <HiPlay size={20} />
                Inicia tu Proyecto
                <HiArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#EA580C] to-[#F97316] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>
            <a href="/#servicios"
              className="group flex items-center gap-2 px-9 py-4 border border-[#F97316]/30 text-[#F5EDD6] font-['DM_Sans',sans-serif] font-medium text-base rounded-full hover:bg-[#F97316]/10 hover:border-[#F97316]/50 transition-all duration-300"
            >
              Ver Servicios
              <HiArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-10 right-10 z-10 hidden sm:block"
      >
        <p className="text-[10px] font-['DM_Sans',sans-serif] text-[#5A5A5A] tracking-[0.15em] uppercase">
          Desarrollado por <span className="text-[#8B5E3C] font-semibold">Pierre Buitrago</span>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.a href="/#servicios"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[#A3A3A3] hover:text-[#F97316] transition-colors group"
        >
          <motion.span className="text-[10px] font-['DM_Sans',sans-serif] tracking-[0.2em] uppercase group-hover:tracking-[0.25em] transition-all duration-300">
            Descubre
          </motion.span>
          <div className="relative">
            <HiArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
            <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-4 bg-gradient-to-b from-[#F97316] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ height: [0, 16] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.a>
      </motion.div>
    </section>
  )
}
