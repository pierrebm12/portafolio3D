import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiArrowLeft, HiArrowRight, HiExternalLink } from 'react-icons/hi'
import ProjectModal from './ProjectModal'

const projects = [
  { id: 1, title: '432 Hertz', category: 'Web Development', desc: 'Plataforma gastronómica multisensorial con experiencia 3D, reservas en línea y panel administrativo completo.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', link: '#', tags: ['React', 'Three.js', 'Node.js', 'MongoDB'] },
  { id: 2, title: 'SocialBoost', category: 'Marketing Digital', desc: 'Estrategia completa de redes sociales para marca de fitness, alcanzando 50K seguidores orgánicos en 3 meses.',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80', link: '#', tags: ['Facebook Ads', 'Instagram', 'Content Strategy'] },
  { id: 3, title: 'WhatsApp AI Bot', category: 'AI Agent', desc: 'Asistente inteligente para WhatsApp con IA generativa, automatización de ventas y atención al cliente 24/7.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&q=80', link: '#', tags: ['OpenAI', 'WhatsApp API', 'Node.js', 'TypeScript'] },
  { id: 4, title: 'FitApp Mobile', category: 'Mobile App', desc: 'Aplicación de fitness con rutinas personalizadas por IA, seguimiento de progreso y comunidad integrada.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80', link: '#', tags: ['React Native', 'Firebase', 'AI/ML', 'iOS/Android'] },
  { id: 5, title: 'E-Commerce Pro', category: 'Web Development', desc: 'Tienda online con catálogo dinámico, pasarela de pago, dashboard de analytics y gestión de inventario.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', link: '#', tags: ['Next.js', 'Stripe', 'Tailwind', 'PostgreSQL'] },
]

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [modalProject, setModalProject] = useState(null)

  const nextSlide = () => setCurrentIndex((p) => (p + 1) % projects.length)
  const prevSlide = () => setCurrentIndex((p) => (p - 1 + projects.length) % projects.length)

  useEffect(() => { const i = setInterval(nextSlide, 5000); return () => clearInterval(i) }, [])

  const visible = [
    projects[(currentIndex - 1 + projects.length) % projects.length],
    projects[currentIndex],
    projects[(currentIndex + 1) % projects.length],
  ]

  return (
    <section id="proyectos" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F97316]/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <span className="text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.25em] uppercase">Nuestro trabajo</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-['Anton',sans-serif] text-[#F5EDD6] mt-3 tracking-tight">PROYECTOS<span className="text-[#F97316]">.</span></h2>
        </motion.div>

        <div className="relative">
          <div className="flex items-center justify-center gap-4 sm:gap-8 perspective-[1200px]">
            {visible.map((project, i) => {
              const isCenter = i === 1
              return (
                <motion.div key={project.id} initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: isCenter ? 1 : 0.4, scale: isCenter ? 1 : 0.85, x: isCenter ? 0 : (i === 0 ? -20 : 20), rotateY: isCenter ? 0 : (i === 0 ? 15 : -15), z: isCenter ? 0 : -100 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative cursor-pointer ${isCenter ? 'z-20' : 'z-10 hidden sm:block'}`}
                  onClick={() => isCenter && setModalProject(project)}
                  style={{ transformStyle: 'preserve-3d' }}>
                  <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${isCenter ? 'w-[280px] sm:w-[380px] md:w-[480px] shadow-2xl shadow-[#F97316]/10 border border-[#F97316]/20' : 'w-[200px] md:w-[300px] border border-white/5'}`}>
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={project.image} alt={project.title}
                        className={`w-full h-full object-cover transition-transform duration-700 ${isCenter ? 'hover:scale-110' : ''}`} />
                    </div>
                    <div className={`p-4 sm:p-5 bg-[#121212] ${isCenter ? '' : 'backdrop-blur-sm'}`}>
                      <span className="text-[10px] font-['DM_Sans',sans-serif] text-[#F97316] tracking-wider uppercase">{project.category}</span>
                      <h3 className="text-base sm:text-lg font-['DM_Sans',sans-serif] font-semibold text-[#F5EDD6] mt-1">{project.title}</h3>
                      {isCenter && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-xs sm:text-sm text-[#A3A3A3] mt-2 line-clamp-2">{project.desc}</motion.p>}
                      {isCenter && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-1.5 mt-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-[10px] bg-[#F97316]/10 text-[#F97316] rounded-full font-['DM_Sans',sans-serif]">{tag}</span>
                        ))}
                      </motion.div>}
                    </div>
                    {isCenter && <div className="absolute top-3 right-3 flex gap-2">
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center text-[#F5EDD6] hover:text-[#F97316] hover:bg-[#0A0A0A] transition-all border border-white/5"
                        onClick={(e) => e.stopPropagation()}><HiExternalLink size={14} /></a>
                    </div>}
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-[#F97316]/30 flex items-center justify-center text-[#F5EDD6] hover:bg-[#F97316] hover:text-[#0A0A0A] hover:border-[#F97316] transition-all duration-300">
              <HiArrowLeft size={18} />
            </button>
            <div className="flex gap-2">
              {projects.map((_, i) => (
                <button key={i} onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-[#F97316] w-6' : 'bg-[#F97316]/30 hover:bg-[#F97316]/50'}`} />
              ))}
            </div>
            <button onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-[#F97316]/30 flex items-center justify-center text-[#F5EDD6] hover:bg-[#F97316] hover:text-[#0A0A0A] hover:border-[#F97316] transition-all duration-300">
              <HiArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  )
}
