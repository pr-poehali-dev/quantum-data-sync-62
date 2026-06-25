import { useReveal } from "@/hooks/use-reveal"

const partners = [
  {
    name: "Schüco",
    country: "Германия",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Sch%C3%BCco_logo.svg/320px-Sch%C3%BCco_logo.svg.png",
    description: "Мировой лидер в производстве алюминиевых профильных систем. Используем системы Schüco для фасадов премиум-класса и структурного остекления.",
  },
  {
    name: "ALUMIL",
    country: "Греция",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Alumil_logo.svg/320px-Alumil_logo.svg.png",
    description: "Европейский производитель алюминиевых систем нового поколения. Системы ALUMIL применяем для теплых фасадов и остекления коттеджей.",
  },
  {
    name: "AGC Glass",
    country: "Бельгия",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/AGC_Inc._logo.svg/320px-AGC_Inc._logo.svg.png",
    description: "Крупнейший в мире производитель архитектурного стекла. Поставляет закалённое, ламинированное и энергосберегающее стекло для наших объектов.",
  },
  {
    name: "РЕХАУ",
    country: "Германия",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Rehau_logo.svg/320px-Rehau_logo.svg.png",
    description: "Немецкий концерн — поставщик уплотнителей, термовставок и комплектующих для алюминиевых систем с тепловым разрывом.",
  },
  {
    name: "Siegenia",
    country: "Германия",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Siegenia_logo.svg/320px-Siegenia_logo.svg.png",
    description: "Производитель фурнитуры и механизмов для алюминиевых конструкций. Поставляет приводы раздвижных систем, петли и замки для премиум-объектов.",
  },
  {
    name: "Hydro",
    country: "Норвегия",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Hydro_logo.svg/320px-Hydro_logo.svg.png",
    description: "Крупнейший в мире поставщик алюминия. Обеспечивает нас сертифицированным алюминиевым профилем из переработанного сырья по стандартам ESG.",
  },
]

export function PartnersSection() {
  const { ref, isVisible } = useReveal(0.2)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start flex-col justify-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-10 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Партнёры
          </h2>
          <p className="font-mono text-sm text-foreground/50 md:text-base">/ Мировые производители</p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-foreground/8 md:grid-cols-3">
          {partners.map((partner, i) => (
            <div
              key={i}
              className={`group relative bg-background p-5 transition-all duration-700 hover:bg-foreground/5 md:p-6 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {/* Logo */}
              <div className="mb-4 flex h-10 items-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-7 max-w-[110px] object-contain opacity-40 grayscale transition-all duration-400 group-hover:opacity-80 group-hover:grayscale-0 md:h-8"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = "none"
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = "block"
                  }}
                />
                <span
                  className="hidden font-sans text-lg font-light text-foreground/60 group-hover:text-foreground"
                  style={{ display: "none" }}
                >
                  {partner.name}
                </span>
              </div>

              {/* Name + country */}
              <div className="mb-2 flex items-baseline gap-2">
                <span className="font-sans text-base font-light text-foreground md:text-lg">{partner.name}</span>
                <span className="font-mono text-[10px] text-foreground/30 uppercase tracking-widest">{partner.country}</span>
              </div>

              {/* Description */}
              <p className="font-mono text-[11px] leading-relaxed text-foreground/50 transition-colors duration-300 group-hover:text-foreground/70 md:text-xs">
                {partner.description}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-foreground/30 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
