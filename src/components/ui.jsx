import { motion } from 'framer-motion'

/* ────────────────────────────────────────────────────────────
   Icons (inline SVG, no dependency)
   ──────────────────────────────────────────────────────────── */

export function Icon({ name, className = 'w-4 h-4' }) {
  const paths = {
    wrench: <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.5 2.5-2-2 2.5-2.5Z" />,
    check: <path d="M20 6 9 17l-5-5" />,
    bolt: <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 17 9 5 9-5" /></>,
    git: <><circle cx="6" cy="6" r="2.5" /><circle cx="6" cy="18" r="2.5" /><circle cx="18" cy="8" r="2.5" /><path d="M6 8.5v7M18 10.5c0 4-6 2-6 5.5" /></>,
    compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    alert: <><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9 2 18a2 2 0 0 0 1.7 3h16.6A2 2 0 0 0 22 18L13.7 3.9a2 2 0 0 0-3.4 0Z" /></>,
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    server: <><rect x="3" y="4" width="18" height="7" rx="1.5" /><rect x="3" y="13" width="18" height="7" rx="1.5" /><path d="M7 7.5h.01M7 16.5h.01" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths[name] || null}
    </svg>
  )
}

/* ────────────────────────────────────────────────────────────
   Module scaffolding
   ──────────────────────────────────────────────────────────── */

export function ModuleHeader({ eyebrow, title, intro }) {
  return (
    <div className="max-w-3xl mb-10">
      {eyebrow && (
        <div className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">
          {eyebrow}
        </div>
      )}
      <h2 className="mb-4">{title}</h2>
      <p className="text-lg text-gray-500">{intro}</p>
    </div>
  )
}

export function TheJob({ children }) {
  return (
    <div className="glass-card p-5 mb-8 flex items-start gap-3">
      <div className="mt-0.5 shrink-0 w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center">
        <Icon name="bolt" className="w-4 h-4" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">The job to be done</div>
        <p className="text-gray-700 leading-relaxed">{children}</p>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   Side-by-side comparison
   ──────────────────────────────────────────────────────────── */

export function SplitCompare({ children }) {
  return <div className="grid md:grid-cols-2 gap-6 items-start">{children}</div>
}

export function ComparePanel({ variant = 'core', title, subtitle, children }) {
  const isPlatform = variant === 'platform'
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border bg-white overflow-hidden shadow-sm ${
        isPlatform ? 'border-orange-200 ring-1 ring-orange-100' : 'border-gray-200'
      }`}
    >
      <div className={`h-1.5 w-full ${isPlatform ? 'bg-gradient-to-r from-orange-500 to-orange-400' : 'bg-gray-300'}`} />
      <div className="p-6">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className={`pill ${isPlatform ? 'pill-platform' : 'pill-core'}`}>
            {isPlatform ? 'dbt platform' : 'self-hosted'}
          </span>
        </div>
        {subtitle && <p className="text-sm text-gray-500 mb-4">{subtitle}</p>}
        {children}
      </div>
    </motion.div>
  )
}

export function FeatureList({ variant = 'core', items }) {
  const isPlatform = variant === 'platform'
  return (
    <ul className="space-y-3 mt-4">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
            isPlatform ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'
          }`}>
            <Icon name={isPlatform ? 'check' : 'wrench'} className="w-3 h-3" />
          </span>
          <span className="text-sm text-gray-700 leading-snug">
            <span className="font-medium text-gray-900">{it.label}</span>
            {it.detail && <span className="text-gray-500"> — {it.detail}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}

/* ────────────────────────────────────────────────────────────
   Code / config block (dark, syntax-tinted)
   ──────────────────────────────────────────────────────────── */

export function CodeBlock({ title, children }) {
  return (
    <div className="code-block mt-5">
      <div className="code-head">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </span>
        {title && <span className="ml-2">{title}</span>}
      </div>
      <pre className="code-body"><code>{children}</code></pre>
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
   Takeaway strip
   ──────────────────────────────────────────────────────────── */

export function Takeaway({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-10 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 md:p-8"
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-xl bg-orange-500/20 text-orange-300 flex items-center justify-center">
          <Icon name="arrow" className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-orange-300 mb-2">The bottom line</div>
          <p className="text-white/90 text-[15px] leading-relaxed">{children}</p>
        </div>
      </div>
    </motion.div>
  )
}
