import { ModuleHeader, TheJob, PlatformSelfHostedToggle, CoreLens, OwnershipLedger } from '../ui'
import PlatformSemanticLayer from '../platform/SemanticLayer'
import SelfHostedSemantic from '../selfhosted/SelfHostedSemantic'
import { ledger } from '../../data/claims'

export default function SemanticLayer() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 04"
        title="The Semantic Layer"
        intro="Define a metric once and get the same answer everywhere — from a BI tool, an app, or an LLM. Here's how the dbt platform serves governed metrics, and what that same goal takes when you self-host dbt Core."
      />

      <PlatformSelfHostedToggle
        platform={<PlatformSemanticLayer />}
        selfhosted={<SelfHostedSemantic />}
        note="Same goal — switch to see why defining metrics isn't the same as serving them."
      />

      <CoreLens
        title="What self-hosting adds to your plate"
        intro="dbt Core can define metrics with MetricFlow, but there is no service to query them. Serving consistent metrics to every tool becomes a platform you'd have to build."
      />

      <TheJob>
        Give every tool, app, and AI one trusted definition of each metric — so revenue means the same thing in
        finance's dashboard and marketing's report.
      </TheJob>

      <OwnershipLedger items={ledger.semantic} title="What you're left to reconcile" />
    </div>
  )
}
