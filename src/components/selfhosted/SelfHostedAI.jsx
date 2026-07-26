import SelfHostedWalkthrough from './SelfHostedWalkthrough'
import { CodeBlock } from '../ui'

const sections = [
  {
    key: 'assist',
    label: 'In-product assistance',
    title: 'No built-in assistant — generation is manual or bespoke',
    body: 'dbt Core has no in-product AI. Writing models, tests, and documentation is entirely by hand, or via a tool you assemble and maintain yourself by wiring an LLM to your codebase.',
    code: null,
    platform: 'dbt Wizard drafts models, tests, and documentation from a prompt or existing SQL, in-product.',
    catch: 'Any AI assist you want, you build and keep running — it is not part of the tool.',
  },
  {
    key: 'mcp',
    label: 'The dbt MCP server',
    title: 'The MCP server runs with dbt Core — but has little to feed the agent',
    body: 'This part is real: the dbt MCP server is open source, and you can point it at a dbt Core project to run CLI commands and read the local manifest. The catch is what it can expose. The context that actually grounds an agent — governed metrics from the Semantic Layer, and the catalog and column-level lineage from the Discovery API — comes from platform services dbt Core does not run. So with Core, the MCP server has thin, ungoverned context to offer.',
    code: (
      <CodeBlock title="dbt MCP with Core — CLI tools work; the rich context isn't there">
{`$ pip install dbt-mcp    `}<span className="tok-c"># open source, works with dbt Core</span>{`
tools available with Core:   dbt CLI commands, local manifest
tools that need the platform: Semantic Layer queries, Discovery API
                             (catalog + column-level lineage)`}
      </CodeBlock>
    ),
    platform: 'The MCP server is backed by governed metrics, catalog, and lineage — so the agent gets trustworthy context, not guesses.',
    catch: 'You can connect an agent, but with no Semantic Layer or catalog behind it, it is still guessing.',
  },
  {
    key: 'apis',
    label: 'Metadata & APIs',
    title: 'No APIs — every integration parses raw artifacts by hand',
    body: 'Rich, queryable metadata and column-level lineage are what let an agent — or a catalog, a governance tool, or a BI integration — reason about your project. dbt Core gives you raw artifacts (manifest.json, catalog.json) to parse; there is no API. The platform exposes a Discovery/Metadata API and Semantic Layer API, so tools and agents query governed metadata directly instead of you building and hosting a parser for each one.',
    code: (
      <CodeBlock title="platform API call  vs.  self-hosted artifact parsing">
{`# dbt platform — ask the Discovery API
{ models { name  columns { name  description }  ...lineage } }

# dbt Core — there is no API; instead, per integration:
$ cat target/manifest.json target/catalog.json  `}<span className="tok-c"># parse + host yourself</span>
      </CodeBlock>
    ),
    platform: 'Discovery/Metadata and Semantic Layer APIs give tools and agents governed access out of the box.',
    catch: 'Every integration — catalog, governance, BI, an agent — becomes a bespoke artifact-parsing service you build and host.',
  },
]

export default function SelfHostedAI() {
  return <SelfHostedWalkthrough sections={sections} eyebrow="Self-hosted dbt Core" />
}
