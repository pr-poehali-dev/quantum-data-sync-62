export function FacadeAnimation() {
  const cols = 10
  const rows = 6
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
            strokeWidth="1"
            className="text-foreground/25"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            style={{ animation: "mullionDraw 1s ease-out forwards", animationDelay: `${r * 90}ms` }}
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
            strokeWidth="1"
            className="text-foreground/25"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
            style={{ animation: "mullionDraw 0.9s ease-out forwards", animationDelay: `${400 + c * 55}ms` }}
          />
        ))}
      </svg>

      {/* Glass glint sweep */}
      <div
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)",
          backgroundSize: "250% 250%",
          animation: "glintFadeIn 1s ease-out 1.6s forwards, glintSweep 7s ease-in-out 1.6s infinite",
        }}
      />
    </div>
  )
}
