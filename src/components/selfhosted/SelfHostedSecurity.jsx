import SelfHostedWalkthrough from './SelfHostedWalkthrough'
import { CodeBlock } from '../ui'

const sections = [
  {
    key: 'access',
    label: 'Access control',
    title: 'Access stops at warehouse grants',
    body: 'dbt Core has no concept of roles. The only access control is whatever your warehouse offers — and at the dbt layer, anyone with commit access to the repo can edit or run any model. Finer-grained or environment-scoped permissions must be built outside dbt.',
    code: (
      <CodeBlock title="the only lever you have — warehouse GRANTs">
{`grant usage on schema analytics to role analyst;
grant select on all tables in schema analytics to role analyst;
`}<span className="tok-c"># nothing here controls who can edit models, run prod, or deploy</span>
      </CodeBlock>
    ),
    platform: 'RBAC governs who can develop, run, and deploy — scoped per project and environment.',
    catch: 'A junior analyst with repo access can change a production mart; nothing at the dbt layer stops them.',
  },
  {
    key: 'sso',
    label: 'Authentication (SSO)',
    title: 'Every surface you host is its own login',
    body: 'There is no single sign-on. Each thing you stand up — the Airflow UI, the hosted docs site, any internal tooling — is a separate authentication problem you wire to your identity provider yourself.',
    code: (
      <CodeBlock title="auth is per-surface, and per-team to maintain">
{`Airflow UI      →  configure OAuth/SAML on the webserver
dbt docs site   →  put it behind a proxy + IdP yourself
internal tools  →  each one, again
`}<span className="tok-c"># no unified identity across your dbt footprint</span>
      </CodeBlock>
    ),
    platform: 'SSO / SAML through your IdP, configured once for everyone.',
    catch: 'Onboarding and offboarding means touching every surface, not flipping one switch.',
  },
  {
    key: 'audit',
    label: 'Audit logging',
    title: 'There is no record of who did what',
    body: 'dbt Core keeps no audit trail. To answer "who changed this model?" or "who triggered that production run?" you stitch together git history and warehouse query logs — which rarely satisfies a security or compliance review.',
    code: (
      <CodeBlock title="reconstructing an audit trail after the fact">
{`$ git log --follow models/marts/fct_orders.sql   `}<span className="tok-c"># who edited it</span>{`
$ `}<span className="tok-c"># cross-reference with warehouse query_history for who ran it…</span>{`
$ `}<span className="tok-c"># …and hope the retention windows line up</span>
      </CodeBlock>
    ),
    platform: 'A built-in audit log records who did what, when — ready for review.',
    catch: 'In a regulated environment, "we can reconstruct it from git" is not an audit trail.',
  },
  {
    key: 'ops',
    label: 'Patching & support',
    title: 'You patch the whole stack — and you are the support team',
    body: 'Staying secure means patching everything you host: dbt, adapters, Airflow, Python, and the OS underneath. And when something breaks, support is the community and your own team — there is no vendor to escalate to.',
    code: null,
    platform: 'The platform is patched and maintained for you, with enterprise support and SLAs behind it.',
    catch: 'A newly disclosed security vulnerability in any layer is yours to patch, and a 2am outage has no SLA behind the fix.',
  },
]

export default function SelfHostedSecurity() {
  return <SelfHostedWalkthrough sections={sections} eyebrow="Self-hosted dbt Core" />
}
