import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#F97316]/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="relative group">
            <span className="text-2xl font-['Anton',sans-serif] tracking-wider text-[#F5EDD6]">
              DEV<span className="text-[#F97316]">TRO</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#F97316] transition-all duration-300 group-hover:w-full" />
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a key={link.href} href={link.href}
                className="text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3] hover:text-[#F97316] transition-colors duration-300 relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#F97316] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a href="#contacto"
              className="px-6 py-2.5 bg-[#F97316] text-[#0A0A0A] text-sm font-['DM_Sans',sans-serif] font-semibold rounded-full hover:bg-[#EA580C] transition-all duration-300 hover:shadow-lg hover:shadow-[#F97316]/25">
              Cotizar Ahora
            </a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-[#F5EDD6] hover:text-[#F97316] transition-colors">
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-[#F97316]/10 overflow-hidden">
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                  className="text-[#A3A3A3] hover:text-[#F97316] transition-colors py-2 font-['DM_Sans',sans-serif]">{link.label}</a>
              ))}
              <a href="#contacto" onClick={() => setMobileOpen(false)}
                className="mt-2 px-6 py-3 bg-[#F97316] text-[#0A0A0A] font-semibold rounded-full text-center hover:bg-[#EA580C] transition-all font-['DM_Sans',sans-serif]">Cotizar Ahora</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
