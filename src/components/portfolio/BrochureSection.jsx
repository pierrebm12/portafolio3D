import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import {
  HiCode, HiChip, HiSupport, HiServer, HiDatabase, HiLink, HiShoppingCart,
  HiCog, HiSpeakerphone, HiTrendingUp, HiUsers, HiShieldCheck,
  HiBriefcase, HiBookOpen,
  HiChevronDown, HiSearch, HiStar, HiArrowRight, HiDownload, HiPrinter,
  HiX, HiCube, HiTemplate, HiColorSwatch, HiPhotograph, HiShare,
  HiCubeTransparent, HiHome, HiLightBulb, HiCollection
} from 'react-icons/hi'

const categories = [
  {
    id: 'desarrollo',
    label: 'Desarrollo de Software',
    icon: HiCode,
    color: '#F97316',
    bg: 'from-[#F97316]/10 to-[#EA580C]/5',
    services: [
      'Desarrollo de páginas web corporativas',
      'Desarrollo de páginas web empresariales',
      'Desarrollo de landing pages',
      'Desarrollo de tiendas virtuales (E-commerce)',
      'Desarrollo de plataformas administrativas',
      'Desarrollo de sistemas de gestión empresarial (ERP/CRM)',
      'Desarrollo de portales para entidades públicas y privadas',
      'Desarrollo de plataformas educativas',
      'Desarrollo de plataformas de reservas',
      'Desarrollo de plataformas de streaming',
      'Desarrollo de software a medida',
      'Aplicaciones móviles Android/iOS',
      'Aplicaciones web progresivas (PWA)',
      'Aplicaciones administrativas',
      'Aplicaciones para inventarios, ventas y facturación',
      'Sistemas de gestión de clientes',
    ]
  },
  {
    id: 'mantenimiento',
    label: 'Mantenimiento y Soporte Técnico',
    icon: HiSupport,
    color: '#22C55E',
    bg: 'from-[#22C55E]/10 to-[#16A34A]/5',
    services: [
      'Mantenimiento preventivo, correctivo y evolutivo',
      'Soporte técnico para páginas web, sistemas administrativos y aplicaciones',
      'Actualización de contenido y tecnologías',
      'Corrección de errores',
      'Optimización de velocidad y rendimiento',
      'Monitoreo continuo',
      'Backups y recuperación',
      'Migración de servidores y dominios',
      'Configuración SSL',
      'Administración completa de sitios',
      'Actualización de módulos',
      'Integración con APIs',
      'Automatización de procesos',
      'Implementación de nuevas funcionalidades',
    ]
  },
  {
    id: 'modernizacion',
    label: 'Modernización de Software',
    icon: HiChip,
    color: '#8B5CF6',
    bg: 'from-[#8B5CF6]/10 to-[#7C3AED]/5',
    services: [
      'Remasterización de páginas web',
      'Rediseño completo de interfaces',
      'Reconstrucción total de sitios web',
      'Reconstrucción de aplicaciones web',
      'Migración de tecnologías antiguas',
      'Refactorización de código',
      'Optimización de arquitectura',
      'Conversión a diseños modernos y responsivos',
    ]
  },
  {
    id: 'bases-datos',
    label: 'Bases de Datos',
    icon: HiDatabase,
    color: '#06B6D4',
    bg: 'from-[#06B6D4]/10 to-[#0891B2]/5',
    services: [
      'Diseño, creación y administración',
      'Optimización SQL',
      'Respaldos automáticos',
      'Recuperación de información',
      'Migración de bases de datos',
      'Replicación de datos',
      'Seguridad y control de datos',
    ]
  },
  {
    id: 'infraestructura',
    label: 'Infraestructura',
    icon: HiServer,
    color: '#F59E0B',
    bg: 'from-[#F59E0B]/10 to-[#D97706]/5',
    services: [
      'Hosting',
      'Registro y administración de dominios',
      'Configuración de VPS',
      'Administración de servidores',
      'Implementación en la nube',
      'Correo corporativo',
      'Configuración DNS',
      'CDN',
      'Seguridad informática',
    ]
  },
  {
    id: 'integraciones',
    label: 'Integraciones',
    icon: HiLink,
    color: '#EC4899',
    bg: 'from-[#EC4899]/10 to-[#DB2777]/5',
    services: [
      'WhatsApp',
      'Pasarelas de pago',
      'Facturación electrónica',
      'Redes sociales',
      'Google Maps',
      'APIs de terceros',
    ]
  },
  {
    id: 'ecommerce',
    label: 'Comercio Electrónico',
    icon: HiShoppingCart,
    color: '#14B8A6',
    bg: 'from-[#14B8A6]/10 to-[#0D9488]/5',
    services: [
      'Tiendas virtuales',
      'Catálogos',
      'Inventarios',
      'Pedidos',
      'Pagos en línea',
      'Carritos de compra',
      'Panel administrativo',
      'Reportes',
    ]
  },
  {
    id: 'automatizacion',
    label: 'Automatización',
    icon: HiCog,
    color: '#6366F1',
    bg: 'from-[#6366F1]/10 to-[#4F46E5]/5',
    services: [
      'Automatización empresarial',
      'Formularios inteligentes',
      'Documentos automáticos',
      'Reportes automáticos',
      'Correos automáticos',
      'Integración entre plataformas',
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing Digital',
    icon: HiSpeakerphone,
    color: '#F97316',
    bg: 'from-[#F97316]/10 to-[#EA580C]/5',
    services: [
      'Estrategias digitales',
      'Marketing para empresas',
      'Marketing en redes sociales',
      'Meta Ads',
      'Google Ads',
      'Embudos de venta',
      'Email Marketing',
      'Remarketing',
    ]
  },
  {
    id: 'posicionamiento',
    label: 'Posicionamiento y Crecimiento',
    icon: HiTrendingUp,
    color: '#22C55E',
    bg: 'from-[#22C55E]/10 to-[#16A34A]/5',
    services: [
      'SEO',
      'Posicionamiento local',
      'Google Business Profile',
      'Optimización de conversiones',
      'Análisis de competencia',
      'Escalamiento digital',
      'Captación de clientes',
      'Fortalecimiento de marca',
    ]
  },
  {
    id: 'redes-sociales',
    label: 'Redes Sociales',
    icon: HiUsers,
    color: '#EC4899',
    bg: 'from-[#EC4899]/10 to-[#DB2777]/5',
    services: [
      'Administración',
      'Creación de contenido',
      'Crecimiento orgánico',
      'Publicidad',
      'Gestión de comunidades',
      'Análisis de métricas',
    ]
  },
  {
    id: 'seguridad',
    label: 'Seguridad',
    icon: HiShieldCheck,
    color: '#EF4444',
    bg: 'from-[#EF4444]/10 to-[#DC2626]/5',
    services: [
      'Protección de sitios',
      'SSL',
      'Backups',
      'Protección contra malware',
      'Monitoreo y recuperación',
    ]
  },
  {
    id: 'consultoria',
    label: 'Consultoría Tecnológica',
    icon: HiBriefcase,
    color: '#8B5CF6',
    bg: 'from-[#8B5CF6]/10 to-[#7C3AED]/5',
    services: [
      'Transformación digital',
      'Arquitectura de software',
      'Optimización de procesos',
      'Escalabilidad',
      'Auditoría de software',
      'Capacitación',
    ]
  },
  {
    id: 'otros',
    label: 'Otros Servicios',
    icon: HiBookOpen,
    color: '#06B6D4',
    bg: 'from-[#06B6D4]/10 to-[#0891B2]/5',
    services: [
      'Diseño UI/UX',
      'Dashboards',
      'Gestión documental',
      'Códigos QR',
      'Reportes',
      'Sistemas multiusuario',
      'Desarrollo a medida',
      'Planes de mantenimiento mensual',
      'Soporte remoto y presencial',
    ]
  },
  {
    id: 'diseno-producto',
    label: 'Diseño de Producto',
    icon: HiCube,
    color: '#F97316',
    bg: 'from-[#F97316]/10 to-[#EA580C]/5',
    services: [
      'Diseño conceptual',
      'Desarrollo de nuevos productos',
      'Rediseño de productos',
      'Modelado 3D',
      'Renderizado',
      'Planos técnicos',
      'Prototipado digital',
      'Diseño centrado en el usuario',
    ]
  },
  {
    id: 'empaques-etiquetas',
    label: 'Diseño de Empaques y Etiquetas',
    icon: HiTemplate,
    color: '#22C55E',
    bg: 'from-[#22C55E]/10 to-[#16A34A]/5',
    services: [
      'Diseño estructural',
      'Diseño gráfico',
      'Etiquetas',
      'Mockups 3D',
      'Archivos para impresión',
      'Asesoría en materiales',
    ]
  },
  {
    id: 'identidad-visual',
    label: 'Identidad Visual y Branding',
    icon: HiColorSwatch,
    color: '#8B5CF6',
    bg: 'from-[#8B5CF6]/10 to-[#7C3AED]/5',
    services: [
      'Logotipos',
      'Manual de identidad',
      'Papelería',
      'Paleta de color y tipografía',
      'Piezas publicitarias',
      'Branding',
    ]
  },
  {
    id: 'diseno-grafico',
    label: 'Diseño Gráfico',
    icon: HiPhotograph,
    color: '#06B6D4',
    bg: 'from-[#06B6D4]/10 to-[#0891B2]/5',
    services: [
      'Flyers',
      'Brochures',
      'Catálogos',
      'Banners',
      'Vinilos',
      'Material POP',
      'Presentaciones',
    ]
  },
  {
    id: 'redes-visual',
    label: 'Diseño para Redes Sociales',
    icon: HiShare,
    color: '#EC4899',
    bg: 'from-[#EC4899]/10 to-[#DB2777]/5',
    services: [
      'Publicaciones',
      'Carruseles',
      'Historias',
      'Calendario de contenido',
      'Campañas',
      'Identidad visual',
    ]
  },
  {
    id: 'modelado-3d',
    label: 'Modelado y Visualización 3D',
    icon: HiCubeTransparent,
    color: '#14B8A6',
    bg: 'from-[#14B8A6]/10 to-[#0D9488]/5',
    services: [
      'Modelado 3D',
      'Renderizado',
      'Visualización de productos',
      'Animaciones básicas',
      'Mockups digitales',
    ]
  },
  {
    id: 'interiorismo',
    label: 'Diseño de Espacios e Interiorismo',
    icon: HiHome,
    color: '#F59E0B',
    bg: 'from-[#F59E0B]/10 to-[#D97706]/5',
    services: [
      'Diseño de interiores',
      'Distribución de espacios',
      'Mobiliario personalizado',
      'Visualización 3D',
      'Materiales y acabados',
    ]
  },
  {
    id: 'consultoria-diseno',
    label: 'Consultoría en Diseño',
    icon: HiLightBulb,
    color: '#6366F1',
    bg: 'from-[#6366F1]/10 to-[#4F46E5]/5',
    services: [
      'Consultoría',
      'Evaluación de identidad visual',
      'Asesoría en productos',
      'Comunicación visual',
      'Presentaciones comerciales',
    ]
  },
  {
    id: 'software-diseno',
    label: 'Software',
    icon: HiCollection,
    color: '#EF4444',
    bg: 'from-[#EF4444]/10 to-[#DC2626]/5',
    services: [
      'Rhino',
      'Blender',
      'Adobe Illustrator',
      'Adobe Photoshop',
      'Adobe InDesign',
      'CorelDRAW',
    ]
  },
]

const categoryDetails = {
  desarrollo: { desc: 'Soluciones de software a medida para transformar tu negocio', icon: HiCode },
  mantenimiento: { desc: 'Mantenimiento continuo y soporte técnico 24/7', icon: HiSupport },
  modernizacion: { desc: 'Moderniza tus sistemas heredados con tecnologías actuales', icon: HiChip },
  'bases-datos': { desc: 'Arquitectura de datos robusta y optimizada', icon: HiDatabase },
  infraestructura: { desc: 'Infraestructura cloud escalable y segura', icon: HiServer },
  integraciones: { desc: 'Conecta tus herramientas favoritas sin fricción', icon: HiLink },
  ecommerce: { desc: 'Vende online con plataformas completas y seguras', icon: HiShoppingCart },
  automatizacion: { desc: 'Automatiza procesos repetitivos y gana eficiencia', icon: HiCog },
  marketing: { desc: 'Estrategias digitales que convierten y escalan', icon: HiSpeakerphone },
  posicionamiento: { desc: 'Domina los resultados de búsqueda y crece orgánicamente', icon: HiTrendingUp },
  'redes-sociales': { desc: 'Construye comunidad y vende en redes sociales', icon: HiUsers },
  seguridad: { desc: 'Protege tu negocio con seguridad de nivel empresarial', icon: HiShieldCheck },
  consultoria: { desc: 'Guía experta para decisiones tecnológicas estratégicas', icon: HiBriefcase },
  otros: { desc: 'Servicios complementarios para tu transformación digital', icon: HiBookOpen },
  'diseno-producto': { desc: 'Diseño conceptual y desarrollo de productos tangibles', icon: HiCube },
  'empaques-etiquetas': { desc: 'Empaques funcionales y atractivos que potencian tu marca', icon: HiTemplate },
  'identidad-visual': { desc: 'Identidad visual coherente que conecta con tu audiencia', icon: HiColorSwatch },
  'diseno-grafico': { desc: 'Piezas gráficas profesionales para cualquier soporte', icon: HiPhotograph },
  'redes-visual': { desc: 'Contenido visual estratégico para redes sociales', icon: HiShare },
  'modelado-3d': { desc: 'Visualizaciones 3D fotorrealistas para tus productos', icon: HiCubeTransparent },
  interiorismo: { desc: 'Espacios funcionales y estéticamente inspiradores', icon: HiHome },
  'consultoria-diseno': { desc: 'Asesoría estratégica para potenciar tu comunicación visual', icon: HiLightBulb },
  'software-diseno': { desc: 'Herramientas profesionales para diseño y modelado', icon: HiCollection },
}

function CategoryCard({ category, index, isOpen, onToggle, searchTerm, onServiceClick }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const filteredServices = category.services.filter(s =>
    s.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setTilt({
      x: -((e.clientY - rect.top) / rect.height - 0.5) * 8,
      y: ((e.clientX - rect.left) / rect.width - 0.5) * 8
    })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  const Icon = category.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d'
      }}
      className={`group relative bg-[#121212] border rounded-2xl overflow-hidden transition-all duration-500 ${
        isOpen ? 'border-[#F97316]/30 shadow-2xl shadow-[#F97316]/10' : 'border-[#F97316]/10 hover:border-[#F97316]/30 hover:shadow-xl hover:shadow-[#F97316]/5'
      }`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${category.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isOpen ? 'opacity-100' : ''}`} />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-100 transition-opacity" style={{ backgroundColor: category.color }} />

      <div className="relative z-10 p-6">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-current text-[#0A0A0A]' : 'bg-current/10 text-current group-hover:bg-current/20'}`} style={{ backgroundColor: category.color }}>
            <Icon className="text-current" size={24} style={{ color: category.color }} />
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggle}
            className="shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A3A3A3] hover:text-[#F97316] hover:bg-white/10 transition-all"
            aria-label={isOpen ? `Cerrar ${category.label}` : `Expandir ${category.label}`}
          >
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <HiChevronDown size={16} />
            </motion.span>
          </motion.button>
        </div>

        <div>
          <span className="text-[10px] font-['DM_Sans',sans-serif] tracking-[0.2em] uppercase text-current mb-2 block" style={{ color: category.color }}>
            {index + 1 < 10 ? `0${index + 1}` : index + 1} — Categoría
          </span>
          <h3 className="text-xl font-['Anton',sans-serif] text-[#F5EDD6] tracking-tight mb-2 group-hover:text-current transition-colors">{category.label}</h3>
          <p className="text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3] mb-4 line-clamp-1">{categoryDetails[category.id]?.desc || ''}</p>
          <div className="flex items-center gap-2 text-xs font-['DM_Sans',sans-serif] text-[#F97316]">
            <HiStar size={12} /> {filteredServices.length} {filteredServices.length === 1 ? 'servicio' : 'servicios'}
            {searchTerm && <span className="text-[#A3A3A3]">(filtrados)</span>}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-white/5 bg-[#0A0A0A]/50"
          >
            <div className="p-6 pt-0">
              <div className="grid sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                {filteredServices.map((service, si) => (
                  <motion.button
                    key={si}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: si * 0.02 }}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onServiceClick(service, category)}
                    className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-left border border-white/5 hover:border-current/30 cursor-pointer"
                    style={{ borderColor: category.color }}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-current/10 group-hover:bg-current/20 transition-all" style={{ backgroundColor: category.color }}>
                      <HiArrowRight className="text-current" size={14} style={{ color: category.color }} />
                    </div>
                    <span className="text-sm font-['DM_Sans',sans-serif] text-[#F5EDD6] group-hover:text-current transition-colors">{service}</span>
                  </motion.button>
                ))}
              </div>
              {filteredServices.length === 0 && (
                <div className="py-8 text-center">
                  <HiSearch className="text-[#A3A3A3] mx-auto mb-2" size={24} />
                  <p className="text-[#A3A3A3] font-['DM_Sans',sans-serif]">No se encontraron servicios para "{searchTerm}"</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ServiceModal({ service, category, onClose }) {
  if (!service) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="absolute inset-0 bg-[#0A0A0A]/95 backdrop-blur-md" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#121212] border border-current/20 rounded-2xl shadow-2xl shadow-black/60"
          style={{ borderColor: category.color }}
        >
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-[#121212] to-transparent border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-current/10" style={{ backgroundColor: category.color }}>
                <category.icon className="text-current" size={20} style={{ color: category.color }} />
              </div>
              <span className="text-xs font-['DM_Sans',sans-serif] tracking-[0.15em] uppercase text-current" style={{ color: category.color }}>{category.label}</span>
            </div>
            <button onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#F5EDD6] hover:bg-current hover:text-[#0A0A0A] transition-all"
              style={{ backgroundColor: category.color }}
              aria-label="Cerrar modal"
            >
              <HiX size={18} />
            </button>
          </div>
          <div className="p-6 pb-8">
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-['Anton',sans-serif] text-[#F5EDD6] tracking-tight mb-4">{service}</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-current/10 text-current text-xs font-['DM_Sans',sans-serif] rounded-full" style={{ backgroundColor: category.color, color: category.color }}>
                {category.label}
              </span>
            </div>
            <div className="space-y-4 text-[#A3A3A3] font-['DM_Sans',sans-serif] leading-relaxed">
              <p>Este servicio forma parte de nuestra categoría <strong className="text-[#F5EDD6]">{category.label}</strong>. Incluye:</p>
              <ul className="list-disc list-inside space-y-2 pl-4">
                <li>Análisis de requisitos y consultoría inicial</li>
                <li>Diseño y arquitectura de la solución</li>
                <li>Desarrollo e implementación con mejores prácticas</li>
                <li>Pruebas de calidad y optimización</li>
                <li>Despliegue y puesta en marcha</li>
                <li>Capacitación y documentación</li>
                <li>Soporte post-lanzamiento (30 días incluidos)</li>
              </ul>
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-current text-[#0A0A0A] font-['DM_Sans',sans-serif] font-semibold rounded-full hover:opacity-90 transition-opacity" style={{ backgroundColor: category.color }}>
                  <HiArrowRight size={16} className="inline-block ml-1" /> Cotizar
                </button>
                <button className="px-4 py-2 border border-white/10 text-[#F5EDD6] font-['DM_Sans',sans-serif] font-medium rounded-full hover:border-current hover:text-current transition-all" style={{ borderColor: category.color }}>
                  <HiDownload size={16} className="inline-block mr-1" /> Detalles
                </button>
                <button className="px-4 py-2 border border-white/10 text-[#F5EDD6] font-['DM_Sans',sans-serif] font-medium rounded-full hover:border-current hover:text-current transition-all" style={{ borderColor: category.color }}>
                  <HiPrinter size={16} className="inline-block mr-1" /> Imprimir
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function BrochureSection() {
  const sectionRef = useRef(null)
  const [openCategory, setOpenCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [modalService, setModalService] = useState(null)
  const [modalCategory, setModalCategory] = useState(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.02, 0.02, 0])

  const toggleCategory = (id) => {
    setOpenCategory(openCategory === id ? null : id)
  }

  const handleServiceClick = (service, category) => {
    setModalService(service)
    setModalCategory(category)
  }

  const totalServices = categories.reduce((acc, cat) => acc + cat.services.length, 0)

  return (
    <section id="broshure" ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden">
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0 bg-gradient-to-b from-[#F97316] via-transparent to-[#8B5CF6] pointer-events-none" />

      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle at 20% 20%, #F97316 0.5px, transparent 0.5px), radial-gradient(circle at 80% 80%, #8B5CF6 0.5px, transparent 0.5px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 relative"
        >
          <span className="text-xs font-['DM_Sans',sans-serif] text-[#F97316] tracking-[0.25em] uppercase">Catálogo Completo</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-['Anton',sans-serif] text-[#F5EDD6] mt-3 tracking-tight">
            BROSHURE<span className="text-[#F97316">.</span>
          </h2>
          <p className="text-[#A3A3A3] font-['DM_Sans',sans-serif] mt-4 max-w-2xl mx-auto">
            Explora todos nuestros servicios organizados por categorías. Cada solución está diseñada para escalar tu negocio.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="relative w-full sm:w-80">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A3A3A3]" size={18} />
              <input
                type="text"
                placeholder="Buscar servicios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-[#0A0A0A] border border-[#F97316]/10 rounded-xl text-[#F5EDD6] placeholder-[#A3A3A3] font-['DM_Sans',sans-serif] text-sm focus:outline-none focus:border-[#F97316]/40 focus:ring-1 focus:ring-[#F97316]/20 transition-all"
              />
            </div>
            <div className="flex items-center gap-3 text-sm font-['DM_Sans',sans-serif] text-[#A3A3A3]">
              <HiBookOpen size={16} className="text-[#F97316]" />
              <span>{totalServices} servicios en {categories.length} categorías</span>
              <span className="w-px h-4 bg-white/10" />
              <span className="text-[#F97316] font-semibold">{categories.filter(c => c.services.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))).length} categorías coinciden</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
              isOpen={openCategory === category.id}
              onToggle={() => toggleCategory(category.id)}
              searchTerm={searchTerm}
              onServiceClick={handleServiceClick}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#121212] border border-[#F97316]/20 rounded-full">
            <HiStar className="text-[#F97316]" size={16} />
            <span className="text-sm font-['DM_Sans',sans-serif] text-[#F5EDD6]">¿No encuentras lo que buscas? </span>
            <a href="#contacto" className="text-[#F97316] hover:underline font-['DM_Sans',sans-serif] font-medium">Solicita un servicio personalizado</a>
            <HiArrowRight className="text-[#F97316]" size={14} />
          </div>
        </motion.div>
      </div>

      <ServiceModal
        service={modalService}
        category={modalCategory}
        onClose={() => { setModalService(null); setModalCategory(null); }}
      />
    </section>
  )
}