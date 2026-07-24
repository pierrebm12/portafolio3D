import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('loading')
  const startTime = useRef(Date.now())

  useEffect(() => {
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime.current
      const raw = Math.min(elapsed / 2000, 1)
      setProgress(raw)

      if (raw >= 1) {
        clearInterval(timer)
        setPhase('complete')
        setTimeout(() => {
          onFinish()
        }, 600)
      }
    }, 30)

    return () => clearInterval(timer)
  }, [onFinish])

  const isComplete = phase === 'complete'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0A0A0A]"
      >
        <motion.div
          animate={isComplete ? { scale: 1.2, opacity: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-['Anton',sans-serif] tracking-tighter select-none">
              <span className="text-[#F5EDD6]">DEV</span>
              <span className="text-[#F97316]" style={{ textShadow: '0 0 60px rgba(249,115,22,0.3)' }}>TRO</span>
            </h1>
            <p className="text-[#A3A3A3] font-['DM_Sans',sans-serif] text-sm mt-4 tracking-[0.25em] uppercase">
              Desarrollo · Diseño · Marketing
            </p>
          </motion.div>

          <div className="mt-10 max-w-xs mx-auto">
            <div className="h-1 bg-[#121212] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#F97316] rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <p className="text-[10px] font-['DM_Sans',sans-serif] text-[#5A5A5A] mt-3 tracking-[0.2em] uppercase">
              {isComplete ? 'Listo' : 'Cargando...'}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}