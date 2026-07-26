import { ModuleHeader, TheJob, PlatformSelfHostedToggle, CoreLens, OwnershipLedger, CoreStrengthCallout, CustomerProof, Icon } from '../ui'
import SelfHostedSecurity from '../selfhosted/SelfHostedSecurity'
import { ledger, customers } from '../../data/claims'

const cardCls = 'bg-white border border-gray-200/60 rounded-2xl p-6 shadow-sm'

const roles = [
  { role: 'Admin', caps: 'Manage users, environments, billing' },
  { role: 'Developer', caps: 'Build & run in dev, open PRs' },
  { role: 'Deployer', caps: 'Trigger & manage production jobs' },
  { role: 'Analyst', caps: 'Read models, query the Semantic Layer' },
]
const auditLog = [
  { who: 'jdoe', act: 'deployed job "Daily prod build"', when: '6:04 AM' },
  { who: 'apatel', act: 'edited model fct_orders', when: 'Yesterday' },
  { who: 'admin', act: 'granted Deployer role to mlee', when: '2 days ago' },
]

function PlatformSecurityPanel() {
  return (
    <div className={cardCls}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-7 h-7 rounded-lg bg-gray-900 text-white flex items-center justify-center"><Icon name="lock" className="w-4 h-4" /></span>
            <span className="font-semibold text-gray-900 text-sm">Role-based access</span>
            <span className="ml-auto text-[11px] font-medium text-green-600 inline-flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> SSO via Okta
            </span>
          </div>
          <div className="rounded-xl border border-gray-200 divide-y divide-gray-100">
            {roles.map(r => (
              <div key={r.role} className="flex gap-3 px-3 py-2 text-sm">
                <span className="font-medium text-gray-900 w-24 shrink-0">{r.role}</span>
                <span className="text-gray-500">{r.caps}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Audit log</div>
          <div className="space-y-2">
            {auditLog.map((e, i) => (
              <div key={i} className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
                <span className="font-mono text-xs text-orange-600">{e.who}</span>
                <span className="text-gray-700"> {e.act}</span>
                <span className="block text-[11px] text-gray-400 mt-0.5">{e.when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-400 mt-4">
        Access, authentication, and a full audit trail are managed in one place — patched for you and backed by
        enterprise support and SLAs.
      </p>
    </div>
  )
}

export default function Security() {
  return (
    <div>
      <ModuleHeader
        eyebrow="Walkthrough · 06"
        title="Security & governance"
        intro="The least glamorous — and often most decisive — part of running dbt in an organization: who can do what, proving it for an audit, keeping the stack patched, and having someone to call when it breaks. Here's the managed picture, and what each piece takes self-hosted."
      />

      <PlatformSelfHostedToggle
        platform={<PlatformSecurityPanel />}
        selfhosted={<SelfHostedSecurity />}
        note="Switch to self-hosted to see what access, auth, and audit take without the platform."
      />

      <CoreLens
        title="What self-hosting adds to your plate"
        intro="dbt Core secures nothing above the warehouse. RBAC, SSO, audit logging, patching, and support are all things you assemble and operate — and the gaps get sharper the moment auditors or a security team get involved."
      />

      <TheJob>
        Give the right people the right access, satisfy security and audit requirements, and keep the whole stack
        patched — as the team grows and compliance expectations rise.
      </TheJob>

      <div className="mb-2 sm:max-w-sm">
        <CustomerProof item={customers.siemensGoverned} />
      </div>

      <OwnershipLedger items={ledger.security} title="What you secure yourself" />

      <CoreStrengthCallout title="Where self-hosting genuinely holds up">
        For a small, trusted team with no strict compliance mandate, warehouse grants and a shared repo can be
        entirely sufficient. The gap opens as the team grows, access needs to be scoped, and an auditor asks for
        a record of who changed what.
      </CoreStrengthCallout>
    </div>
  )
}
