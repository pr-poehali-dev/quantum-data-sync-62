import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"

const projects = [
  {
    number: "01",
    title: "Деловой центр «Северная Звезда»",
    category: "Стоечно-ригельный фасад",
    description: "Полное остекление фасада 12-этажного бизнес-центра. Стоечно-ригельная система с тепловым разрывом, структурные соединения, панорамное остекление атриума.",
    area: "2 800 м²",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/4cb08d0b-6818-4cdc-bdf5-5670606c7773/files/a39e48ce-d894-44aa-9079-b672b1a43193.jpg",
  },
  {
    number: "02",
    title: "ЖК «Резиденция Парк»",
    category: "Остекление коттеджей",
    description: "Панорамное остекление 48 коттеджей премиум-класса. Тёплые алюминиевые системы, раздвижные террасные двери, зимние сады с зенитными фонарями.",
    area: "48 объектов",
    year: "2024",
    image: "https://cdn.poehali.dev/projects/4cb08d0b-6818-4cdc-bdf5-5670606c7773/files/98779362-a18f-438b-86dc-a65880709db1.jpg",
  },
  {
    number: "03",
    title: "ТРЦ «Атлас»",
    category: "Структурный фасад",
    description: "Структурное остекление главного фасада торгово-развлекательного центра. Алюминиевые входные группы, раздвижные порталы, внутренние перегородки.",
    area: "5 600 м²",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/4cb08d0b-6818-4cdc-bdf5-5670606c7773/files/58b92b24-1f6e-4cb8-9782-d89397a10597.jpg",
  },
  {
    number: "04",
    title: "Офисный кампус «Технопарк»",
    category: "Зенитные фонари и перегородки",
    description: "Светопрозрачная кровля атриума площадью 900 м², алюминиевые перегородки open-space офисов, входные группы с автоматикой.",
    area: "3 200 м²",
    year: "2023",
    image: "https://cdn.poehali.dev/projects/4cb08d0b-6818-4cdc-bdf5-5670606c7773/files/77fa55ea-fee3-4169-b3f4-eecf94ac5802.jpg",
  },
]

export function WorkSection({ id }: { id?: string }) {
  const { ref, isVisible } = useReveal(0.2)
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      id={id}
      ref={ref}
      className="flex h-screen w-full shrink-0 snap-start flex-col justify-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-10 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Проекты
          </h2>
          <p className="font-mono text-sm text-foreground/50 md:text-base">/ Реализованные объекты</p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`group relative cursor-default overflow-hidden transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div
                className={`relative overflow-hidden transition-all duration-500 ${
                  hovered === i ? "h-48 md:h-64" : "h-36 md:h-48"
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <span className="absolute left-3 top-3 font-mono text-xs text-foreground/40">{project.number}</span>
                <span className="absolute right-3 top-3 font-mono text-xs text-foreground/40">{project.year}</span>
              </div>

              {/* Info */}
              <div className="border-b border-foreground/10 py-3 transition-colors duration-300 group-hover:border-foreground/20">
                <p className="mb-0.5 font-mono text-[10px] uppercase tracking-widest text-foreground/40">
                  {project.category}
                </p>
                <h3 className="mb-1 font-sans text-sm font-light leading-snug text-foreground md:text-base">
                  {project.title}
                </h3>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    hovered === i ? "max-h-24 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="pt-1 font-mono text-[11px] leading-relaxed text-foreground/60">
                    {project.description}
                  </p>
                </div>
                <p className="mt-1 font-mono text-xs text-foreground/30">{project.area}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}