import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { HiStar, HiLightningBolt, HiShieldCheck, HiChat } from 'react-icons/hi'

export default function CTASection() {
  const sectionRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.92])
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-1, 0, 1])

  const urgencyItems = [
    { icon: HiStar, text: 'Cupo limitado: Solo 5 proyectos por mes' },
    { icon: HiLightningBolt, text: 'Primera consultoría GRATIS por tiempo limitado' },
    { icon: HiShieldCheck, text: 'Resultados garantizados o te devolvemos tu inversión' },
  ]

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000) }

  return (
    <section id="contacto" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1A0E08] to-[#0A0A0A]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #F97316 0%, transparent 70%)' }} />
      <motion.div style={{ scale, rotate }} className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center mb-16">
          <span className="text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.25em] uppercase">¿Listo para el cambio?</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-['Anton',sans-serif] text-[#F5EDD6] mt-3 tracking-tight">
            TRANSFORMEMOS<br /><span className="text-[#F97316]">TU NEGOCIO</span>
          </h2>
          <p className="text-lg sm:text-xl font-['DM_Sans',sans-serif] text-[#A3A3A3] mt-4 max-w-2xl mx-auto">
            No dejes para mañana lo que puedes empezar hoy. Tu competencia ya está avanzando.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}>
            <div className="bg-[#121212] border border-[#F97316]/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-['DM_Sans',sans-serif] font-semibold text-[#F5EDD6] mb-6">Solicita tu consultoría gratuita</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Tu nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                  className="w-full px-4 py-3.5 bg-[#0A0A0A] border border-[#F97316]/10 rounded-xl text-[#F5EDD6] placeholder-[#A3A3A3] font-['DM_Sans',sans-serif] text-sm focus:outline-none focus:border-[#F97316]/40 focus:ring-1 focus:ring-[#F97316]/20 transition-all" />
                <input type="email" placeholder="Tu correo electrónico" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                  className="w-full px-4 py-3.5 bg-[#0A0A0A] border border-[#F97316]/10 rounded-xl text-[#F5EDD6] placeholder-[#A3A3A3] font-['DM_Sans',sans-serif] text-sm focus:outline-none focus:border-[#F97316]/40 focus:ring-1 focus:ring-[#F97316]/20 transition-all" />
                <textarea placeholder="Cuéntanos sobre tu proyecto..." rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required
                  className="w-full px-4 py-3.5 bg-[#0A0A0A] border border-[#F97316]/10 rounded-xl text-[#F5EDD6] placeholder-[#A3A3A3] font-['DM_Sans',sans-serif] text-sm focus:outline-none focus:border-[#F97316]/40 focus:ring-1 focus:ring-[#F97316]/20 transition-all resize-none" />
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 rounded-xl font-['DM_Sans',sans-serif] font-bold text-base transition-all duration-300 ${sent ? 'bg-green-600 text-white' : 'bg-[#F97316] text-[#0A0A0A] hover:bg-[#EA580C] hover:shadow-xl hover:shadow-[#F97316]/25'}`}>
                  {sent ? '✓ Mensaje enviado con éxito' : 'Enviar mensaje'}
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }} className="space-y-6">
            <div className="bg-[#121212] border border-[#F97316]/10 rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center"><HiLightningBolt className="text-[#F97316]" size={20} /></div>
                <h3 className="text-lg font-['DM_Sans',sans-serif] font-semibold text-[#F5EDD6]">Oferta por tiempo limitado</h3>
              </div>
              <div className="space-y-4">
                {urgencyItems.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#F97316]/10 flex items-center justify-center shrink-0 mt-0.5"><Icon className="text-[#F97316]" size={14} /></div>
                      <p className="text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3]">{item.text}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="bg-[#121212] border border-[#F97316]/10 rounded-2xl p-6 sm:p-8">
              <h3 className="text-lg font-['DM_Sans',sans-serif] font-semibold text-[#F5EDD6] mb-4">¿Prefieres contacto directo?</h3>
              <p className="text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3] mb-4">Escríbenos por WhatsApp y te responderemos en menos de 1 hora</p>
              <a href="https://wa.me/573138307231" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#121212] border border-[#F97316]/30 text-[#F5EDD6] font-['DM_Sans',sans-serif] font-medium rounded-full hover:bg-[#F97316] hover:text-[#0A0A0A] hover:border-[#F97316] transition-all duration-300">
                <HiChat size={18} /> WhatsApp Directo
              </a>
            </div>

            <div className="bg-gradient-to-r from-[#F97316]/10 to-transparent border border-[#F97316]/10 rounded-2xl p-6 sm:p-8">
              <p className="text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3] italic">"Devtro transformó nuestra presencia digital. En 2 semanas teníamos un sitio web profesional y campañas de marketing activas. Altamente recomendados."</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F97316]/20 flex items-center justify-center text-[#F97316] font-bold text-sm">MC</div>
                <div><p className="text-sm font-['DM_Sans',sans-serif] font-semibold text-[#F5EDD6]">María C.</p><p className="text-xs text-[#A3A3A3]">CEO, FitLife Studio</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
