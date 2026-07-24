import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { HiCode, HiDeviceMobile, HiChip, HiShare, HiCamera, HiChat } from 'react-icons/hi'

const services = [{
  category: 'Desarrollo de Software', icon: HiCode, color: '#F97316',
  items: [
    { title: 'Páginas Web', desc: 'Landing pages, sitios corporativos, e-commerce y plataformas web con diseño moderno y alto rendimiento.', icon: HiCode },
    { title: 'Aplicaciones Móviles', desc: 'Apps nativas y multiplataforma para iOS y Android con experiencias de usuario excepcionales.', icon: HiDeviceMobile },
    { title: 'Agentes de IA', desc: 'Implementación de asistentes inteligentes, chatbots y automatizaciones con inteligencia artificial.', icon: HiChip },
  ],
}, {
  category: 'Marketing en Redes', icon: HiShare, color: '#F5EDD6',
  items: [
    { title: 'Facebook Ads', desc: 'Campañas publicitarias segmentadas para maximizar tu alcance y conversiones en Facebook.', icon: HiShare },
    { title: 'Instagram Marketing', desc: 'Construcción de marca visual, contenido estratégico y growth hacking en Instagram.', icon: HiCamera },
    { title: 'WhatsApp Business', desc: 'Automatización de ventas, chatbots y estrategias de conversión directa por WhatsApp.', icon: HiChat },
  ],
}]

function ServiceCard({ item, index }) {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: '-80px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTilt({ x: -((e.clientY - rect.top) / rect.height - 0.5) * 12, y: ((e.clientX - rect.left) / rect.width - 0.5) * 12 })
  }
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })
  const Icon = item.icon

  return (
    <motion.div ref={cardRef} initial={{ opacity: 0, y: 60 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className="group relative bg-[#121212] border border-[#F97316]/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-[#F97316]/30 hover:shadow-xl hover:shadow-[#F97316]/5">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#F97316]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-5 group-hover:bg-[#F97316]/20 transition-all duration-300">
          <Icon className="text-[#F97316]" size={22} />
        </div>
        <h3 className="text-lg font-['DM_Sans',sans-serif] font-semibold text-[#F5EDD6] mb-3 group-hover:text-[#F97316] transition-colors duration-300">{item.title}</h3>
        <p className="text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3] leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  )
}

export default function ServicesSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.03, 0])

  return (
    <section id="servicios" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 bg-[#F97316] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <span className="text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.25em] uppercase">Lo que hacemos</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-['Anton',sans-serif] text-[#F5EDD6] mt-3 tracking-tight">SERVICIOS<span className="text-[#F97316]">.</span></h2>
          <p className="text-[#A3A3A3] font-['DM_Sans',sans-serif] mt-4 max-w-xl mx-auto">De la estrategia a la ejecución. Te acompañamos en cada paso.</p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {services.map((group, gi) => (
            <div key={gi}>
              <motion.div initial={{ opacity: 0, x: gi === 0 ? -80 : 80 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-full bg-[#F97316]/10 flex items-center justify-center">
                  <group.icon className="text-[#F97316]" size={26} />
                </div>
                <div>
                  <span className="text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.2em] uppercase">{gi === 0 ? '01' : '02'} — Servicio</span>
                  <h2 className="text-3xl sm:text-4xl font-['Anton',sans-serif] text-[#F5EDD6] tracking-tight">{group.category}</h2>
                </div>
              </motion.div>
              <div className="grid sm:grid-cols-2 gap-4">
                {group.items.map((item, ii) => <ServiceCard key={ii} item={item} index={ii} />)}
              </div>
            </div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mt-20 text-center">
          <a href="/#contacto"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F97316] text-[#0A0A0A] font-['DM_Sans',sans-serif] font-bold rounded-full hover:bg-[#EA580C] transition-all duration-300 hover:shadow-xl hover:shadow-[#F97316]/25 group">
            ¿Necesitas algo personalizado? <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
