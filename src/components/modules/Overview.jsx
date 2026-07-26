import { CustomerProof } from '../ui'
import { customers } from '../../data/claims'
import ControlPlane from '../viz/ControlPlane'
import MaturityJourney from '../viz/MaturityJourney'
import FeatureMatrix from '../viz/FeatureMatrix'

export default function Overview() {
  return (
    <div>
      {/* Framing */}
      <div className="max-w-3xl mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-3">Overview</div>
        <h2 className="mb-4">The engine is the easy part.</h2>
        <p className="text-lg text-gray-500">
          dbt Core transforms your data — free, flexible, and identical however you run it. The dbt platform is
          the managed control plane around it: the part that runs, watches, governs, and secures everything.
          Self-host dbt Core and that entire control plane becomes yours to build and operate.
        </p>
      </div>

      {/* Interactive control-plane hero */}
      <ControlPlane />

      <p className="mt-6 text-[15px] text-gray-600 max-w-3xl">
        Added up, that's less a piece of software to install than a standing platform-engineering commitment —
        real headcount to build and operate it, and when it breaks at 2am, no vendor SLA behind the fix.
      </p>

      {/* Maturity journey */}
      <div className="mt-10">
        <MaturityJourney />
      </div>

      {/* Customer outcomes */}
      <div className="mt-10">
        <div className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">
          What teams reported after moving from dbt Core to the platform
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <CustomerProof item={customers.whoopHours} />
          <CustomerProof item={customers.sunrunDeploy} />
          <CustomerProof item={customers.axsMaintenance} />
        </div>
      </div>

      {/* Feature comparison */}
      <div className="mt-10">
        <FeatureMatrix />
      </div>
    </div>
  )
}
