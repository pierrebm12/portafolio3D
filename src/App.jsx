import { useRef, useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'
import Navbar from './components/portfolio/Navbar'
import HeroSection from './components/portfolio/HeroSection'
import ServicesSection from './components/portfolio/ServicesSection'
import ProjectsSection from './components/portfolio/ProjectsSection'
import FAQSection from './components/portfolio/FAQSection'
import CTASection from './components/portfolio/CTASection'
import FooterPortfolio from './components/portfolio/FooterPortfolio'
import Scene3D from './components/portfolio/Scene3D'

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const mainRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: mainRef, offset: ['start start', 'end end'] })

  useEffect(() => {
    const unsub = scrollYProgress.on('change', setScrollProgress)
    return () => unsub()
  }, [scrollYProgress])

  return (
    <div ref={mainRef} className="relative min-h-screen bg-[#0A0A0A] text-[#F5EDD6] antialiased overflow-x-hidden">
      <Scene3D scrollProgress={scrollProgress} />
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <FAQSection />
        <CTASection />
        <FooterPortfolio />
      </div>
      <div className="fixed bottom-6 right-6 z-50">
        <a href="#contacto"
          className="group flex items-center gap-2 px-5 py-3 bg-[#F97316] text-[#0A0A0A] rounded-full font-['DM_Sans',sans-serif] font-semibold text-sm shadow-lg shadow-[#F97316]/25 hover:shadow-xl hover:shadow-[#F97316]/30 transition-all duration-300 hover:scale-105">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A0A0A] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A0A0A]" />
          </span>
          Cotiza Ahora
        </a>
      </div>
    </div>
  )
}
