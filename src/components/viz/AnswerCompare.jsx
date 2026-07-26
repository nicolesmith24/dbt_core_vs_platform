import { Icon } from '../ui'

// Generic "time to answer / can you trust it?" comparison (deck slides 42–43).
// props: eyebrow, question, self:{time,trust,label,items}, platform:{time,trust,label,items}, footer
export default function AnswerCompare({ eyebrow, question, self, platform, footer }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      {eyebrow && <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">{eyebrow}</div>}
      <p className="text-base font-semibold text-gray-900 mb-5">{question}</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/40 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="pill pill-core">self-hosted dbt Core</span>
            <span className="text-right">
              <span className="block text-xl font-bold text-amber-700 leading-none">{self.time}</span>
              <span className="text-[11px] text-amber-700/80">trust: {self.trust}</span>
            </span>
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">{self.label}</div>
          <ul className="space-y-1.5">
            {self.items.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-gray-600">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-amber-100 text-amber-700 text-[10px] flex items-center justify-center shrink-0">{i + 1}</span>
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-orange-200 ring-1 ring-orange-100 bg-white p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="pill pill-platform">dbt platform</span>
            <span className="text-right">
              <span className="block text-xl font-bold text-orange-600 leading-none">{platform.time}</span>
              <span className="text-[11px] text-green-600 inline-flex items-center gap-1"><Icon name="check" className="w-3 h-3" /> {platform.trust}</span>
            </span>
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-400 mb-2">{platform.label}</div>
          <ul className="space-y-1.5">
            {platform.items.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
                <Icon name="check" className="w-4 h-4 shrink-0 mt-0.5 text-orange-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {footer && <p className="text-xs text-gray-400 mt-4">{footer}</p>}
    </div>
  )
}
