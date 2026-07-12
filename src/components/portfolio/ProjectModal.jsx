import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiExternalLink } from 'react-icons/hi'

export default function ProjectModal({ project, onClose }) {
  if (!project) return null
  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-[#0A0A0A]/90 backdrop-blur-md" />
        <motion.div initial={{ opacity: 0, scale: 0.9, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }} transition={{ type: 'spring', damping: 28, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#121212] border border-[#F97316]/20 rounded-2xl shadow-2xl shadow-black/60">
          <div className="sticky top-0 z-10 flex justify-end p-4 bg-gradient-to-b from-[#121212] to-transparent">
            <button onClick={onClose}
              className="w-10 h-10 rounded-full bg-[#F97316]/10 flex items-center justify-center text-[#F5EDD6] hover:bg-[#F97316] hover:text-[#0A0A0A] transition-all">
              <HiX size={18} />
            </button>
          </div>
          <div className="px-6 pb-8 -mt-4">
            <div className="aspect-video rounded-xl overflow-hidden mb-6 border border-[#F97316]/10">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="px-3 py-1 bg-[#F97316]/10 text-[#F97316] text-xs font-['DM_Sans',sans-serif] rounded-full">{project.category}</span>
              {project.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-3 py-1 bg-white/5 text-[#A3A3A3] text-xs font-['DM_Sans',sans-serif] rounded-full">{tag}</span>
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-['Anton',sans-serif] text-[#F5EDD6] tracking-tight mb-4">{project.title}</h2>
            <p className="text-[#A3A3A3] font-['DM_Sans',sans-serif] leading-relaxed mb-6">{project.desc}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 bg-[#F97316]/5 border border-[#F97316]/10 text-[#F5EDD6] text-xs font-['DM_Sans',sans-serif] rounded-lg">{tag}</span>
              ))}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F97316] text-[#0A0A0A] font-['DM_Sans',sans-serif] font-semibold rounded-full hover:bg-[#EA580C] transition-all">
              <HiExternalLink size={18} /> Ver proyecto en vivo
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
