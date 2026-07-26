import { ModuleHeader, TheJob, PlatformSelfHostedToggle, CoreLens, OwnershipLedger, CustomerProof } from '../ui'
import DbtMesh from '../platform/DbtMesh'
import SelfHostedMesh from '../selfhosted/SelfHostedMesh'
import AnswerCompare from '../viz/AnswerCompare'
import { ledger, customers } from '../../data/claims'

export default function Mesh() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 03"
        title="Scaling with dbt Mesh"
        intro="Growing from one project to many: discovering existing models, referencing them across teams with governed dependencies, and protecting downstream consumers from breaking changes — on the dbt platform, then the same jobs self-hosted."
      />

      <PlatformSelfHostedToggle
        platform={<DbtMesh />}
        selfhosted={<SelfHostedMesh />}
        note="Same jobs — switch to see what sharing across teams takes when you self-host."
      />

      <CoreLens
        title="Where self-hosting hits a wall"
        intro="This is the bluntest gap in the guide: dbt Core has no real answer for sharing models across teams. There's no governed cross-project reference — only a monolith repo or brittle package imports — and governance falls back on convention that stops holding at scale. It's one of the clearest reasons organizations move to the dbt platform once they start building data products or scaling across teams."
      />

      <TheJob>
        Let many teams build on a shared foundation — finding, referencing, and safely versioning each other's
        models — instead of copying code or fighting one giant monolith.
      </TheJob>

      <div className="mb-8">
        <AnswerCompare
          eyebrow="A cross-team question you have to answer before shipping"
          question="“What breaks downstream if stg_salesforce changes?”"
          self={{
            time: '1–2 hours', trust: 'stale between deploys', label: 'You have to',
            items: [
              'Parse manifest.json and stand up a graph traversal',
              'Cross-reference semantic model + metric YAML by hand',
              'Re-run it on every deploy to stay current',
              'Build an API or dashboard to surface the result',
              'Hope nothing crosses a project boundary you can’t see',
            ],
          }}
          platform={{
            time: 'real-time', trust: 'live graph', label: 'The platform returns',
            items: [
              'Every affected model and metric, across projects',
              'Column-level blast radius before the change ships',
              'Environment-aware (prod vs. staging)',
              'Queryable mid-run, via the Discovery API',
            ],
          }}
          footer="At one project this is annoying; across many teams it's the question that decides whether a change is safe — and self-hosted, there's no reliable way to answer it."
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-2">
        <CustomerProof item={customers.axsTroubleshoot} />
        <CustomerProof item={customers.whoopDocs} />
        <CustomerProof item={customers.dishTroubleshoot} />
      </div>

      <OwnershipLedger items={ledger.mesh} title="What you coordinate yourself" />
    </div>
  )
}
