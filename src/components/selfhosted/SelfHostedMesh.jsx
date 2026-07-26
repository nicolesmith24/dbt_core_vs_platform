import SelfHostedWalkthrough from './SelfHostedWalkthrough'
import { CodeBlock } from '../ui'

const sections = [
  {
    key: 'sharing',
    label: 'Sharing across teams',
    title: 'There is no clean way to share models across teams',
    body: 'This is the heart of it: dbt Core has no governed way to reference another team’s project. You are left with two bad options — one giant monolith repo where every team works on top of each other with no ownership boundaries, or importing another team’s entire project as a raw git package with no versioning, no access control, and no stability guarantees. Neither is a real mesh, and both get worse as you add teams.',
    code: (
      <CodeBlock title="packages.yml — importing another team's whole project, brittle by design">
{`packages:
  - git: `}<span className="tok-str">"https://github.com/co/finance-dbt.git"</span>{`
    revision: main   `}<span className="tok-c"># no versioned interface, no access boundary,</span>{`
                     `}<span className="tok-c"># you inherit ALL their models and break when they do</span>
      </CodeBlock>
    ),
    platform: 'dbt Mesh: governed cross-project ref() with clear ownership, access, and versioned public models.',
    catch: 'This gap is one of the top reasons teams move to the dbt platform to build data products and scale across teams.',
  },
  {
    key: 'discovery',
    label: 'Model discovery',
    title: 'At scale, no one can find — or trust — what already exists',
    body: 'With no catalog, discovery is grep and tribal knowledge. That survives in one small project; across dozens of teams and hundreds of models it breaks down completely — the same metric gets built five times, five slightly different ways, and nobody can tell which one to trust.',
    code: (
      <CodeBlock title="discovery, at scale">
{`$ grep -rl "revenue" models/     `}<span className="tok-c"># which of the 12 matches is the real one?</span>{`
$ `}<span className="tok-c"># ask in Slack, get three different answers, build a sixth version</span>
      </CodeBlock>
    ),
    platform: 'A searchable Catalog spans every project — and its Discovery/Metadata API lets catalogs, governance tools, and BI integrate directly.',
    catch: 'Duplication and quiet divergence become the default — and with no API over your project, every tool that needs your metadata is a custom integration you build and host.',
  },
  {
    key: 'lineage',
    label: 'Cross-project lineage',
    title: 'Lineage stops dead at your project boundary',
    body: 'dbt docs generate gives you a static, single-project graph with no column-level detail. It cannot show how another team’s project depends on yours — so no one can see the blast radius of a change that crosses teams. At the scale where that matters most, you are flying blind.',
    code: (
      <CodeBlock title="the ceiling of self-hosted lineage">
{`$ dbt docs generate   `}<span className="tok-c"># one project, point-in-time, no column-level detail</span>{`
$ `}<span className="tok-c"># cannot answer: "who in OTHER teams breaks if I change this?"</span>
      </CodeBlock>
    ),
    platform: 'Live, column-level lineage across every project — in the UI and via the Discovery/Metadata API.',
    catch: 'You cannot see cross-team impact — the exact question that decides whether a change is safe at scale.',
  },
  {
    key: 'governance',
    label: 'Governance at scale',
    title: 'Governance you cannot enforce is governance in name only',
    body: 'Contracts, ownership, and breaking-change protection all rely on convention and code review. With a handful of models that is workable; across a mesh of teams shipping data products it is not. Nothing stops a breaking change to a shared model, guarantees a public interface stays stable, or enforces who owns what.',
    code: (
      <CodeBlock title="a contract exists in config — but only inside one project">
{`models:
  - name: fct_orders
    `}<span className="tok-kw">config</span>{`:
      contract: {enforced: `}<span className="tok-num">true</span>{`}
   `}<span className="tok-c"># catches schema drift in YOUR project, on YOUR next run —</span>{`
   `}<span className="tok-c"># nothing protects the downstream teams depending on it</span>
      </CodeBlock>
    ),
    platform: 'Contracts, versions, groups, and access are enforced across projects at the platform level.',
    catch: 'By the time you are serving data products to other teams, "govern by review" has already failed.',
  },
]

export default function SelfHostedMesh() {
  return <SelfHostedWalkthrough sections={sections} eyebrow="Self-hosted dbt Core" />
}
