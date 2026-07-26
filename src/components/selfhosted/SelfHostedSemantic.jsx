import SelfHostedWalkthrough from './SelfHostedWalkthrough'
import { CodeBlock } from '../ui'

const sections = [
  {
    key: 'what',
    label: 'What it is',
    title: 'You can define metrics in Core — but nothing serves them',
    body: 'dbt Core supports MetricFlow: you can define semantic models and metrics in YAML. What it does not include is a running service to answer queries against those metrics, so nothing downstream can actually call them.',
    code: (
      <CodeBlock title="semantic_models.yml — a definition with no server behind it">
{`metrics:
  - name: revenue
    type: simple
    type_params:
      measure: order_total   `}<span className="tok-c"># defined… but not queryable by any tool</span>
      </CodeBlock>
    ),
    platform: 'The Semantic Layer runs as a governed service that resolves these definitions on demand.',
    catch: 'A metric you can define but not serve is just documentation.',
  },
  {
    key: 'problem',
    label: 'Problems it solves',
    title: 'Every tool re-derives the metric, and the numbers drift',
    body: 'Without a serving layer, each BI tool defines "revenue" in its own modeling layer. There is no shared source of truth, so the definitions quietly diverge and finance and marketing end up reporting different numbers for the same metric.',
    code: (
      <div className="mt-5">
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-xs font-semibold text-gray-500 mb-2">BI tool A · “Revenue”</div>
            <code className="text-[12.5px] font-mono text-gray-800">sum(order_total)</code>
            <p className="text-[11px] text-gray-400 mt-2">includes refunds</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-xs font-semibold text-gray-500 mb-2">BI tool B · “Revenue”</div>
            <code className="text-[12.5px] font-mono text-gray-800">sum(order_total) − sum(refund_amt)</code>
            <p className="text-[11px] text-gray-400 mt-2">excludes refunds</p>
          </div>
        </div>
        <p className="text-xs text-amber-700 mt-2">→ two dashboards, two different revenue numbers, and a meeting to reconcile them.</p>
      </div>
    ),
    platform: 'One governed definition means one answer, in every tool that asks.',
    catch: 'Reconciling why two dashboards disagree becomes a recurring, unwinnable chore.',
  },
  {
    key: 'how',
    label: 'How it works',
    title: 'MetricFlow can compile SQL at the CLI — but there is no endpoint',
    body: 'On the platform a query flows from a BI tool, app, or LLM through a connector or the MCP server into the Semantic Layer, which generates governed SQL and returns results. Self-hosted, the most you get is compiling SQL locally with the MetricFlow CLI — there is no service for anything to connect to.',
    code: (
      <CodeBlock title="mf — a local CLI, not a queryable API">
{`$ mf query --metrics revenue --group-by metric_time__month
$ `}<span className="tok-c"># prints to your terminal. No BI tool, app, or agent can call this.</span>
      </CodeBlock>
    ),
    platform: 'A JDBC/GraphQL API and native connectors serve metrics to BI, apps, and AI directly.',
    catch: 'There is no endpoint for downstream tools — the CLI helps a person, not a system.',
  },
  {
    key: 'serve',
    label: 'How you serve it',
    title: 'To serve metrics yourself, you rebuild and run an entire product',
    body: 'This is easy to underestimate. Giving your tools a trusted metrics endpoint self-hosted is not a config change — it is standing up and operating a service, indefinitely, that duplicates what the dbt Semantic Layer is.',
    code: (
      <div className="rounded-xl border border-orange-200 bg-orange-50/40 p-4 mt-5">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
          What "serving metrics yourself" actually means — build and run:
        </div>
        <ul className="space-y-1.5 text-sm text-gray-700">
          <li>• MetricFlow running as a long-lived, highly-available service — not a CLI</li>
          <li>• A query API (JDBC + GraphQL) for tools to call, with auth and rate limiting</li>
          <li>• A maintained connector for every BI tool — Tableau, Looker, Power BI, Excel</li>
          <li>• Caching, concurrency, and scaling to survive real dashboard traffic</li>
          <li>• Version-locking the service to your dbt project on every single deploy</li>
        </ul>
        <p className="text-[11px] text-gray-400 mt-3">In other words: rebuild, host, secure, and operate the dbt Semantic Layer as its own internal product.</p>
      </div>
    ),
    platform: 'A managed Semantic Layer API, native BI connectors, and governance ship out of the box.',
    catch: 'This is months of platform engineering to stand up — and an ongoing service to run — not a feature you configure.',
  },
]

export default function SelfHostedSemantic() {
  return <SelfHostedWalkthrough sections={sections} eyebrow="Self-hosted dbt Core" />
}
