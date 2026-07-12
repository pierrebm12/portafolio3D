import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi'

const faqs = [
  { q: '¿Cuánto tiempo toma desarrollar un sitio web?', a: 'Dependiendo de la complejidad, un sitio web puede tomar de 1 a 4 semanas. Las landing pages simples pueden estar listas en 5-7 días hábiles, mientras que proyectos más complejos como e-commerce pueden tomar de 3 a 6 semanas.' },
  { q: '¿Ofrecen servicios de marketing para negocios pequeños?', a: 'Sí, trabajamos con negocios de todos los tamaños. Diseñamos estrategias de marketing digital ajustadas a tu presupuesto, desde campañas locales en Facebook e Instagram hasta estrategias completas de Growth Marketing.' },
  { q: '¿Qué incluye la construcción de un perfil de WhatsApp Business?', a: 'Configuramos tu perfil profesional con catálogo de productos, respuestas automáticas, etiquetas de organización, estadísticas de mensajes y la integración de un chatbot con IA si lo requieres.' },
  { q: '¿Desarrollan aplicaciones móviles para iOS y Android?', a: 'Sí, desarrollamos apps nativas y multiplataforma con React Native y Flutter, cubriendo tanto iOS como Android con un solo código base, optimizando costos y tiempos de desarrollo.' },
  { q: '¿Cómo funcionan los agentes de IA?', a: 'Los agentes de IA son asistentes virtuales que pueden atender clientes, resolver dudas, agendar citas y procesar pedidos de forma autónoma 24/7. Los integramos con WhatsApp, web, Messenger y otras plataformas.' },
  { q: '¿Cuál es el proceso de trabajo?', a: '1. Consultoría inicial gratuita → 2. Propuesta y cotización → 3. Diseño y desarrollo → 4. Revisión y ajustes → 5. Lanzamiento → 6. Soporte continuo. Todo el proceso es transparente y con comunicación constante.' },
  { q: '¿Ofrecen garantía y soporte post-lanzamiento?', a: 'Sí, todos nuestros proyectos incluyen 30 días de soporte post-lanzamiento para asegurar que todo funcione correctamente. También ofrecemos planes de mantenimiento mensual para mantener tu sitio o app actualizada.' },
]

function FAQItem({ faq, index, isOpen, onToggle }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="border-b border-[#F97316]/10 last:border-0">
      <button onClick={onToggle} className="w-full flex items-center justify-between py-5 sm:py-6 text-left group">
        <span className="text-base sm:text-lg font-['DM_Sans',sans-serif] font-medium text-[#F5EDD6] group-hover:text-[#F97316] transition-colors pr-4">{faq.q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isOpen ? 'bg-[#F97316] text-[#0A0A0A]' : 'bg-[#F97316]/10 text-[#F97316]'}`}>
          <HiChevronDown size={16} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="pb-5 sm:pb-6 text-sm sm:text-base font-['DM_Sans',sans-serif] text-[#A3A3A3] leading-relaxed max-w-3xl">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <section id="faq" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#F97316]/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-14 text-center">
          <span className="text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.25em] uppercase">Resolvemos tus dudas</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-['Anton',sans-serif] text-[#F5EDD6] mt-3 tracking-tight">FAQ<span className="text-[#F97316]">.</span></h2>
          <p className="text-[#A3A3A3] font-['DM_Sans',sans-serif] mt-4 max-w-lg mx-auto">Todo lo que necesitas saber antes de empezar</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="bg-[#121212] border border-[#F97316]/10 rounded-2xl p-6 sm:p-8">
          {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />)}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-10 text-center">
          <p className="text-[#A3A3A3] font-['DM_Sans',sans-serif] text-sm">¿No encuentras lo que buscas?{' '}
            <a href="#contacto" className="text-[#F97316] hover:underline font-medium">Escríbenos directo</a></p>
        </motion.div>
      </div>
    </section>
  )
}
