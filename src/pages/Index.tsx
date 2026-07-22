import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { MagneticButton } from "@/components/magnetic-button"
import { FacadeAnimation } from "@/components/facade-animation"
import Icon from "@/components/ui/icon"
import { useRef, useEffect, useState } from "react"

const NAV_ITEMS = ["Главная", "Проекты", "Услуги", "О нас", "Партнёры", "Контакты"]

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    document.getElementById(`section-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setCurrentSection(index)
    setMenuOpen(false)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        const containerHeight = container.clientHeight
        const scrollTop = container.scrollTop
        const newSection = Math.round(scrollTop / containerHeight)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 5) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })
    }

    container.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      container.removeEventListener("scroll", handleScroll)
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#0a0e1a"
            colorB="#1a2236"
            speed={0.3}
            detail={0.5}
            blend={80}
            coarseX={60}
            coarseY={60}
            mediumX={50}
            mediumY={50}
            fineX={20}
            fineY={20}
          />
          <ChromaFlow
            baseColor="#0d1220"
            upColor="#1e2d4a"
            downColor="#050709"
            leftColor="#0a1628"
            rightColor="#162038"
            intensity={0.7}
            radius={2.0}
            momentum={35}
            maskType="alpha"
            opacity={0.98}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <span className="font-display text-xl font-bold text-foreground">З</span>
          </div>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">Завод АК</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton variant="secondary" onClick={() => scrollToSection(5)}>
            Начать
          </MagneticButton>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all hover:bg-foreground/25 md:hidden"
          aria-label="Меню"
        >
          <Icon name={menuOpen ? "X" : "Menu"} size={20} className="text-foreground" />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {NAV_ITEMS.map((item, index) => (
          <button
            key={item}
            onClick={() => scrollToSection(index)}
            className={`font-display text-2xl font-medium transition-colors ${
              currentSection === index ? "text-foreground" : "text-foreground/60"
            }`}
          >
            {item}
          </button>
        ))}
        <div className="mt-4">
          <MagneticButton variant="primary" size="lg" onClick={() => scrollToSection(5)}>
            Начать
          </MagneticButton>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className={`relative z-10 h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section
          id="section-0"
          className="relative flex h-screen w-full shrink-0 snap-start flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24"
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://cdn.poehali.dev/projects/4cb08d0b-6818-4cdc-bdf5-5670606c7773/files/fc005d76-4ab3-43f8-9b7a-b538cb68bbdd.jpg"
              alt=""
              className="h-full w-full scale-105 object-cover animate-[heroZoom_20s_ease-out_forwards]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
          </div>

          <FacadeAnimation />

          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 backdrop-blur-md">
                <Icon name="Home" size={13} className="text-foreground/80" />
                <p className="font-mono text-xs text-foreground/90">Частным клиентам</p>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 backdrop-blur-md">
                <Icon name="Building2" size={13} className="text-foreground/80" />
                <p className="font-mono text-xs text-foreground/90">Бизнесу и застройщикам</p>
              </div>
            </div>

            <h1 className="mb-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-7xl lg:text-8xl">
              <span className="inline-block animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Завод
              </span>{" "}
              <span
                className="inline-block animate-in fade-in slide-in-from-bottom-8 bg-gradient-to-r from-foreground via-foreground to-foreground/60 bg-clip-text text-transparent duration-1000"
                style={{ animationDelay: "120ms" }}
              >
                Алюминиевых
              </span>{" "}
              <span
                className="inline-block animate-in fade-in slide-in-from-bottom-8 duration-1000"
                style={{ animationDelay: "240ms" }}
              >
                Конструкций
              </span>
            </h1>

            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-300 md:text-xl">
              <span className="text-pretty">
                Производим и монтируем алюминиевые светопрозрачные конструкции — от панорамного остекления частного дома до фасада бизнес-центра под ключ.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-500 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection(5)}
              >
                Рассчитать стоимость
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(2)}>
                Наши услуги
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-in fade-in duration-1000 delay-700">
            <div className="flex flex-col items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Листайте вниз</p>
              <div className="flex h-10 w-6 items-start justify-center rounded-full border border-foreground/20 bg-foreground/15 p-1.5 backdrop-blur-md">
                <div className="h-2 w-1.5 animate-bounce rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection id="section-1" />
        <ServicesSection id="section-2" />
        <AboutSection id="section-3" scrollToSection={scrollToSection} />
        <PartnersSection id="section-4" />
        <ContactSection id="section-5" />
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        @keyframes heroZoom {
          from { transform: scale(1.08); }
          to { transform: scale(1); }
        }
        @keyframes mullionDraw {
          from { opacity: 0; stroke-dashoffset: 1; }
          to { opacity: 0.14; stroke-dashoffset: 0; }
        }
        @keyframes mullionSettle {
          from { opacity: 0.14; }
          to { opacity: 0.05; }
        }
        @keyframes glintFadeIn {
          to { opacity: 1; }
        }
        @keyframes glintSweep {
          0% { background-position: 120% -20%; }
          45% { background-position: -20% 120%; }
          100% { background-position: -20% 120%; }
        }
      `}</style>
    </main>
  )
}