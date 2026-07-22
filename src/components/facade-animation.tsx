export function FacadeAnimation() {
  const cols = 8
  const rows = 5
  const width = 1000
  const height = 600

  return (
    <div className="pointer-events-none absolute inset-0 z-[6] overflow-hidden">
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        {Array.from({ length: rows + 1 }).map((_, r) => (
          <line
            key={`h-${r}`}
            x1={0}
            y1={(r * height) / rows}
            x2={width}
            y2={(r * height) / rows}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            style={{
              opacity: 0,
              animation: `mullionDraw 1.4s ease-out forwards, mullionSettle 2s ease-out forwards`,
              animationDelay: `${r * 110}ms, ${1400 + r * 110}ms`,
            }}
          />
        ))}
        {Array.from({ length: cols + 1 }).map((_, c) => (
          <line
            key={`v-${c}`}
            x1={(c * width) / cols}
            y1={0}
            x2={(c * width) / cols}
            y2={height}
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-foreground"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            style={{
              opacity: 0,
              animation: `mullionDraw 1.2s ease-out forwards, mullionSettle 2s ease-out forwards`,
              animationDelay: `${500 + c * 70}ms, ${1900 + c * 70}ms`,
            }}
          />
        ))}
      </svg>

      {/* Glass glint sweep */}
      <div
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
          backgroundSize: "250% 250%",
          animation: "glintFadeIn 1s ease-out 2.4s forwards, glintSweep 8s ease-in-out 2.4s infinite",
        }}
      />
    </div>
  )
}
