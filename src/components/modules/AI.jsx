import { ModuleHeader, TheJob, PlatformSelfHostedToggle, CoreLens, OwnershipLedger } from '../ui'
import SelfServiceDev from '../platform/SelfServiceDev'
import SelfHostedAI from '../selfhosted/SelfHostedAI'
import AgentGrounding from '../viz/AgentGrounding'
import { ledger } from '../../data/claims'

export default function AI() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 05"
        title="AI-ready data"
        intro="AI is only as trustworthy as the context you give it. The platform gives builders dbt Wizard and gives agents governed context through an MCP server — here's that experience, and what standing it up yourself would take in dbt Core."
      />

      <AgentGrounding />

      <PlatformSelfHostedToggle
        platform={<SelfServiceDev />}
        selfhosted={<SelfHostedAI />}
        note="Same ambition — switch to see what grounding AI in your data takes without the platform."
      />

      <CoreLens
        title="What self-hosting adds to your plate"
        intro="dbt Core has no in-product assistant. The open-source dbt MCP server does run against Core — but with no Semantic Layer or Discovery APIs behind it, it has little governed context to offer. Grounding AI in trustworthy data, and exposing it through real APIs, is yours to build."
      />

      <TheJob>
        Let AI build with your data — and answer questions about it — grounded in governed, trusted context
        rather than guesswork.
      </TheJob>

      <OwnershipLedger items={ledger.ai} title="What you'd build yourself" />
    </div>
  )
}
