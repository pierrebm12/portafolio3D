import { useState, useRef, lazy, Suspense } from 'react'
import { motion, useInView } from 'framer-motion'

const LazyNetwork = lazy(() => import('./SkillsNetwork'))

const projectList = [
  { name: 'E-Shop Pro', skills: ['React', 'Node.js', 'Express', 'MySQL', 'CSS', 'HTML', 'Stripe', 'Redux'] },
  { name: 'SocialFlow', skills: ['React Native', 'Firebase', 'TypeScript', 'Redux', 'API REST', 'Node.js'] },
  { name: 'AI ChatBot', skills: ['Python', 'OpenAI', 'Node.js', 'WebSocket', 'MongoDB', 'Express'] },
  { name: 'Dashboard KV', skills: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Tailwind', 'TypeScript', 'CSS'] },
  { name: 'FitApp Mobile', skills: ['React Native', 'Firebase', 'Redux', 'API REST', 'Stripe', 'MongoDB'] },
]

export default function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="habilidades" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F97316]/[0.01] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.25em] uppercase">
            Stack & Tecnologías
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-['Anton',sans-serif] text-[#F5EDD6] mt-3 tracking-tight">
            HABILIDADES<span className="text-[#F97316]">.</span>
          </h2>
          <p className="text-[#A3A3A3] font-['DM_Sans',sans-serif] mt-4 max-w-xl">
            Cada proyecto es una red de tecnologías interconectadas. Pasa el cursor sobre un nodo para ver la skill.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 mb-6">
          {projectList.map((proj, i) => (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-[#121212] border border-[#F97316]/10 rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-[#F97316]" />
                <h3 className="text-sm font-['DM_Sans',sans-serif] font-semibold text-[#F5EDD6]">{proj.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {proj.skills.map((s) => (
                  <span
                    key={s}
                    className={`px-2 py-0.5 text-[10px] rounded-full font-['DM_Sans',sans-serif] transition-all duration-300 ${
                      hoveredSkill === s
                        ? 'bg-[#F97316] text-[#0A0A0A]'
                        : 'bg-[#F97316]/10 text-[#A3A3A3]'
                    }`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {isInView && (
            <Suspense fallback={
              <div className="w-full h-[500px] sm:h-[600px] bg-[#121212] rounded-2xl border border-[#F97316]/10 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-[#F97316] border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <div className="bg-[#121212] border border-[#F97316]/10 rounded-2xl p-4 sm:p-6">
                <LazyNetwork onSkillHover={setHoveredSkill} />
              </div>
            </Suspense>
          )}
        </motion.div>

        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-center"
          >
            <span className="text-sm font-['DM_Sans',sans-serif] text-[#F97316]">
              Explorando: <strong>{hoveredSkill}</strong>
            </span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
