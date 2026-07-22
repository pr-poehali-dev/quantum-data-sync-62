import { useReveal } from "@/hooks/use-reveal"

export function ServicesSection({ id }: { id?: string }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      id={id}
      ref={ref}
      className="flex h-screen w-full shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Услуги
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Что мы делаем</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {[
            {
              title: "Стоечно-ригельные фасады",
              description: "Классические светопрозрачные фасады зданий на несущем каркасе. Применяются для офисных и торговых центров, аэропортов, гостиниц — любой формы и высоты",
              direction: "top",
            },
            {
              title: "Структурное остекление",
              description: "Безрамные фасады с невидимым крепежом — максимум стекла, минимум металла. Создают монолитную зеркальную поверхность премиум-класса",
              direction: "right",
            },
            {
              title: "Теплые алюминиевые системы",
              description: "Окна, двери, порталы и зимние сады из многокамерного алюминиевого профиля с термовставкой для коттеджей и жилых объектов",
              direction: "left",
            },
            {
              title: "Зенитные фонари и кровля",
              description: "Светопрозрачные кровельные конструкции: пирамиды, коньковые системы, плоские фонари. Обеспечивают естественное освещение без потерь тепла",
              direction: "bottom",
            },
            {
              title: "Внутренние перегородки",
              description: "Алюминиевые перегородки для офисов и торговых пространств: одинарные, двойные, с дверными блоками и фрамугами",
              direction: "top",
            },
            {
              title: "Входные группы",
              description: "Представительные входы из алюминия: распашные, раздвижные, маятниковые двери. Холодные и тёплые системы с доводчиками и автоматикой",
              direction: "right",
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{service.description}</p>
    </div>
  )
}