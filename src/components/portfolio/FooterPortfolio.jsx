import { motion } from 'framer-motion'
import { HiHeart } from 'react-icons/hi'
import { FaInstagram, FaFacebook, FaWhatsapp, FaLinkedin } from 'react-icons/fa'

export default function FooterPortfolio() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-[#F97316]/10 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <span className="text-2xl font-['Anton',sans-serif] tracking-wider text-[#F5EDD6]">DEV<span className="text-[#F97316]">TRO</span></span>
            <p className="mt-4 text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3] max-w-sm leading-relaxed">Desarrollo, diseño y marketing todo en un solo lugar. Transformamos tu negocio digital con soluciones integrales que generan resultados reales.</p>
            <div className="flex gap-3 mt-6">
              {[{ icon: FaInstagram, href: '#', label: 'Instagram' }, { icon: FaFacebook, href: '#', label: 'Facebook' }, { icon: FaWhatsapp, href: '#', label: 'WhatsApp' }, { icon: FaLinkedin, href: '#', label: 'LinkedIn' }].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-10 h-10 rounded-full border border-[#F97316]/20 flex items-center justify-center text-[#A3A3A3] hover:text-[#F97316] hover:border-[#F97316] hover:bg-[#F97316]/5 transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-['DM_Sans',sans-serif] font-semibold text-[#F5EDD6] uppercase tracking-wider mb-4">Servicios</h4>
            <ul className="space-y-3">
              {['Desarrollo Web', 'Apps Móviles', 'Agentes IA', 'Marketing Redes', 'Consultoría'].map((s) => (
                <li key={s}><a href="#servicios" className="text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3] hover:text-[#F97316] transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-['DM_Sans',sans-serif] font-semibold text-[#F5EDD6] uppercase tracking-wider mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li><a href="mailto:hola@devtro.com" className="text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3] hover:text-[#F97316] transition-colors">hola@devtro.com</a></li>
              <li><a href="#" className="text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3] hover:text-[#F97316] transition-colors">+1 (555) 000-0000</a></li>
              <li><a href="#" className="inline-flex items-center gap-2 text-sm font-['DM_Sans',sans-serif] text-[#F97316] hover:text-[#EA580C] transition-colors font-medium"><FaWhatsapp size={14} /> WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          className="mt-12 pt-8 border-t border-[#F97316]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-['DM_Sans',sans-serif] text-[#A3A3A3]">&copy; {year} Devtro. Todos los derechos reservados.</p>
          <p className="text-xs font-['DM_Sans',sans-serif] text-[#5A5A5A] flex items-center gap-1">Desarrollado por <span className="text-[#F97316] font-semibold">Pierre Buitrago</span></p>
        </motion.div>
      </div>
    </footer>
  )
}
