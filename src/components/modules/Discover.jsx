import { motion } from 'framer-motion'
import { ModuleHeader, TheJob, SplitCompare, ComparePanel, FeatureList, CodeBlock, Takeaway } from '../ui'

function LineageGraph() {
  // Node width grows with label length so text never overflows its box.
  const w = label => Math.round(label.length * 6.4 + 20)
  const nodes = [
    { id: 'src', x: 20, y: 70, label: 'source', tone: 'src' },
    { id: 'stg', x: 150, y: 70, label: 'stg_orders', tone: 'model' },
    { id: 'int', x: 290, y: 40, label: 'int_orders', tone: 'model' },
    { id: 'fct', x: 290, y: 110, label: 'fct_revenue', tone: 'model' },
    { id: 'exp', x: 430, y: 75, label: 'revenue_dashboard', tone: 'exp' },
  ]
  const edges = [['src', 'stg'], ['stg', 'int'], ['stg', 'fct'], ['int', 'exp'], ['fct', 'exp']]
  const pos = Object.fromEntries(nodes.map(n => [n.id, n]))
  const fill = { src: '#e5e7eb', model: '#111827', exp: '#f97316' }
  const text = { src: '#374151', model: '#ffffff', exp: '#ffffff' }
  return (
    <div className="rounded-2xl border border-orange-200 ring-1 ring-orange-100 bg-white p-6 mt-6">
      <div className="text-xs font-semibold uppercase tracking-wide text-orange-500 mb-2">
        dbt platform — live lineage in the Catalog
      </div>
      <svg viewBox="0 0 580 160" className="w-full h-auto">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={pos[a].x + w(pos[a].label)} y1={pos[a].y + 12} x2={pos[b].x} y2={pos[b].y + 12}
            stroke="#f97316" strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.6 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.35 }}
          >
            <rect x={n.x} y={n.y} width={w(n.label)} height="24" rx="6" fill={fill[n.tone]} />
            <text x={n.x + w(n.label) / 2} y={n.y + 16} textAnchor="middle"
              fontSize="10" fontFamily="JetBrains Mono, monospace" fill={text[n.tone]}>{n.label}</text>
          </motion.g>
        ))}
      </svg>
      <p className="text-xs text-gray-400 mt-2">
        Column-level lineage updates on every run — trace any dashboard back to its source, live.
      </p>
    </div>
  )
}

export default function Discover() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Module 04"
        title="Discover & govern"
        intro="As a project grows, two questions get harder: where did this number come from, and who is allowed to change it? Documentation, lineage, and governance answer them — and this is where a control plane pulls furthest ahead of a self-hosted setup."
      />

      <TheJob>
        Let anyone trace a metric to its source, and let owners set contracts and access as the project
        scales across teams.
      </TheJob>

      <SplitCompare>
        <ComparePanel
          variant="core"
          title="Self-hosted dbt Core"
          subtitle="A static docs site you generate and host."
        >
          <FeatureList
            variant="core"
            items={[
              { label: 'Generate static docs', detail: 'dbt docs generate produces a point-in-time site from catalog.json and manifest.json' },
              { label: 'Host it yourself', detail: 'publish the site to S3, Netlify, or similar and keep it updated' },
              { label: 'Lineage is a snapshot', detail: 'the graph reflects the last generate, and stops at your project boundary' },
              { label: 'Governance by convention', detail: 'contracts and access rules rely on code review and team discipline' },
            ]}
          />
          <CodeBlock title="terminal — publishing docs">
{`$ dbt docs generate
$ `}<span className="tok-c"># upload target/ to a static host</span>{`
$ aws s3 sync target/ s3://my-dbt-docs/
   `}<span className="tok-c"># re-run and re-publish on every change</span>{`
   `}<span className="tok-c"># no cross-project lineage, no access control</span>
          </CodeBlock>
        </ComparePanel>

        <ComparePanel
          variant="platform"
          title="dbt platform as control plane"
          subtitle="A live catalog with governance built in."
        >
          <FeatureList
            variant="platform"
            items={[
              { label: 'Catalog & Explorer', detail: 'a live, searchable view of every model, test, and owner — always current' },
              { label: 'Column-level lineage', detail: 'trace a field end to end, powered by the Fusion engine' },
              { label: 'dbt Mesh', detail: 'reference models across projects with governed, cross-team dependencies' },
              { label: 'Contracts, versions & access', detail: 'enforce model contracts and control who can change what, at the platform level' },
            ]}
          />
          <CodeBlock title="model contract — enforced by the platform">
{`models:
  - name: fct_revenue
    `}<span className="tok-kw">config</span>{`:
      contract: {enforced: `}<span className="tok-num">true</span>{`}
      access: `}<span className="tok-str">protected</span>{`
    `}<span className="tok-c"># breaking changes are blocked, not just reviewed</span>
          </CodeBlock>
        </ComparePanel>
      </SplitCompare>

      <LineageGraph />

      <Takeaway>
        Self-hosted, discovery is a static site you regenerate and host, and governance leans on
        convention. The dbt platform turns both into living capabilities — a always-current catalog,
        column-level lineage, cross-project dbt Mesh, and enforced contracts — so trust in the data scales
        with the number of people depending on it.
      </Takeaway>
    </div>
  )
}
