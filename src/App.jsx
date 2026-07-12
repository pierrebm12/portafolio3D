import { Suspense, lazy } from 'react'
import Navbar from './components/portfolio/Navbar'
import HeroSection from './components/portfolio/HeroSection'
import SkillsSection from './components/portfolio/SkillsSection'
import ServicesSection from './components/portfolio/ServicesSection'
import ProjectsSection from './components/portfolio/ProjectsSection'
import FAQSection from './components/portfolio/FAQSection'
import CTASection from './components/portfolio/CTASection'
import FooterPortfolio from './components/portfolio/FooterPortfolio'

const LazyScene = lazy(() => import('./components/portfolio/Scene3D'))

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-[#F5EDD6] antialiased overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={<div className="absolute inset-0 bg-[#0A0A0A]" />}>
          <LazyScene />
        </Suspense>
      </div>
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <SkillsSection />
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
