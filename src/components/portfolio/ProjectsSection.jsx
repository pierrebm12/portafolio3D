import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiExternalLink } from 'react-icons/hi'
import ProjectModal from './ProjectModal'

const projects = [
  { id: 1, title: 'Jeff Buitrago — Música en Vivo', category: 'Web Development', desc: 'Plataforma musical profesional con reproductor integrado, galería de videos, agenda de eventos en vivo y sistema de contacto directo.',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80', link: 'https://jeffmusic01.com/', tags: ['React', 'Next.js', 'Node.js', 'Música'] },
  { id: 2, title: 'Devtro 3D', category: 'Web Development', desc: 'Landing page inmersiva con experiencia 3D, portfolio interactivo y diseño multisensorial para agencia de desarrollo y marketing.',
    image: 'https://devtro3d.up.railway.app/_next/image?url=%2Fimages%2Fdevtro-logo.webp&w=1080&q=75', link: 'https://devtro3d.up.railway.app/', tags: ['React', 'Three.js', 'Tailwind', '3D'] },
  { id: 3, title: 'Móvil Express CO', category: 'E-Commerce', desc: 'E-commerce completo para venta de dispositivos móviles con catálogo, carrito de compras, pasarela de pago MercadoPago y panel administrativo.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', link: 'https://github.com/pierrebm12/Movil_express_CO', tags: ['Next.js', 'TypeScript', 'MySQL', 'MercadoPago'] },
  { id: 4, title: 'ServiCell App', category: 'Backend', desc: 'Backend API para aplicación móvil de servicios técnicos con NestJS, Prisma ORM, autenticación JWT y despliegue Docker.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80', link: 'https://github.com/pierrebm12/servicell_Backend', tags: ['NestJS', 'TypeScript', 'Prisma', 'Docker'] },
]

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const [modalProject, setModalProject] = useState(null)

  return (
    <section id="proyectos" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F97316]/[0.02] to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-16">
          <span className="text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.25em] uppercase">Nuestro trabajo</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-['Anton',sans-serif] text-[#F5EDD6] mt-3 tracking-tight">PROYECTOS<span className="text-[#F97316]">.</span></h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="group relative bg-[#121212] border border-[#F97316]/10 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-[#F97316]/5 hover:border-[#F97316]/30 transition-all duration-500 cursor-pointer"
              onClick={() => setModalProject(project)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={project.image} alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5 sm:p-6">
                <span className="text-[10px] font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.2em] uppercase">{project.category}</span>
                <h3 className="text-lg font-['DM_Sans',sans-serif] font-semibold text-[#F5EDD6] mt-2 group-hover:text-[#F97316] transition-colors">{project.title}</h3>
                <p className="text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3] mt-2 line-clamp-2 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 text-[10px] bg-[#F97316]/10 text-[#F97316] rounded-full font-['DM_Sans',sans-serif]">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center text-[#F5EDD6] hover:text-[#F97316] transition-all border border-white/5"
                  onClick={(e) => e.stopPropagation()}><HiExternalLink size={14} /></a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  )
}
