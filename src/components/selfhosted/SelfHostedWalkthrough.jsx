import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '../ui'

// Generic single-level self-hosted walkthrough: sub-tab nav + content card.
// `sections` = [{ key, label, title, body, code?, platform, catch? }]
export default function SelfHostedWalkthrough({ sections, eyebrow }) {
  const [key, setKey] = useState(sections[0].key)
  const s = sections.find(x => x.key === key)

  return (
    <div className="w-full space-y-5">
      <div className="flex gap-2 flex-wrap">
        {sections.map(sec => (
          <button key={sec.key} onClick={() => setKey(sec.key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              key === sec.key ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}>
            {sec.label}
          </button>
        ))}
      </div>

      <motion.div key={key}
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
        className="bg-white border border-gray-200 rounded-xl p-6 md:p-8">
        {eyebrow && <div className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{eyebrow}</div>}
        <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{s.title}</h4>
        <p className="text-gray-600 leading-relaxed">{s.body}</p>

        {s.code && s.code}

        <div className="mt-4 flex items-start gap-2 text-sm text-gray-500 rounded-lg bg-gray-50 border border-gray-200 px-3 py-2">
          <Icon name="check" className="w-4 h-4 shrink-0 mt-0.5 text-orange-500" />
          <span><span className="font-medium text-gray-700">On the dbt platform:</span> {s.platform}</span>
        </div>

        {s.catch && (
          <div className="mt-3 flex items-start gap-2 text-sm rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-amber-800">
            <Icon name="alert" className="w-4 h-4 shrink-0 mt-0.5" />
            <span><span className="font-semibold">The catch:</span> {s.catch}</span>
          </div>
        )}
      </motion.div>
    </div>
  )
}
