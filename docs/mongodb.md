# MongoDB Documentation Monorepo

The MongoDB Documentation Monorepo is the centralized repository for all MongoDB documentation projects, located at https://github.com/10gen/docs-mongodb-internal (private repository). This monorepo consolidates 58 separate documentation properties including the MongoDB Server Manual, MongoDB Atlas documentation (Atlas, Atlas CLI, Atlas Government, Atlas Operator, Atlas Architecture), driver documentation for all supported programming languages (Node.js, Python/PyMongo, PyMongo Arrow, Java, C#, Go, Rust, Kotlin, Scala, PHP, Ruby, etc.), framework integrations (Django, Laravel, Entity Framework, Hibernate, Mongoid), developer tools (MongoDB Shell, Compass, VS Code extension, IntelliJ plugin, MCP Server, MongoDB Analyzer), cloud services (App Services, Realm, Kubernetes Operator, Voyage), data tools (Database Tools, BI Connector, Relational Migrator, Spark Connector, Kafka Connector, MongoSync), and other MongoDB products. The repository implements a unified build and testing infrastructure using the Snooty documentation platform, Next.js for rendering, automated code example testing across all supported languages (including OpenAPI specification testing), and GitHub Copilot prompt templates for documentation assistance.

The monorepo structure separates concerns into three primary directories: `content/` for all documentation source files, `code-example-tests/` for tested and validated code examples, and `platform/` for shared build tooling and Next.js rendering infrastructure. Each documentation property in the `content/` directory maintains its own structure with source files, configuration, GitHub workflows, and build settings, while sharing common platform components. The code example testing framework ensures all code snippets in documentation are runnable, tested, and validated through CI/CD pipelines before publication, with automated extraction of tested snippets using the Bluehawk markup tool.

## Repository Structure

Monorepo organization with content, testing, and platform directories

The repository follows a three-tier architecture separating documentation content, code example testing infrastructure, and shared platform tooling. The `content/` directory contains subdirectories for each documentation property (atlas, manual, node, python, etc.), each functioning as an independent documentation project with its own snooty.toml configuration, source files, and build settings. The `code-example-tests/` directory houses language-specific testing suites with runnable examples organized by driver/product, while `platform/` contains the Next.js rendering engine and shared build utilities.

```bash
# View top-level repository structure
ls
# Output: content/, code-example-tests/, platform/, .github/, .gitmodules,
#         README.md, context7.md, copier-config.yml, repo_sync.py,
#         requirements.txt, deprecated_examples.json

# Browse all documentation properties
ls content/
# Output: 58 properties total including:
#         Core: manual/, atlas/, atlas-cli/, atlas-government/, atlas-operator/,
#               atlas-architecture/, app-services/, realm/, compass/, charts/,
#               database-tools/, ops-manager/, cloud-manager/, voyage/, datalake/
#         Drivers: node/, pymongo-driver/, pymongo-arrow-driver/, java/, golang/,
#                 csharp/, rust/, c-driver/, cpp-driver/, php-library/,
#                 ruby-driver/, scala-driver/, java-rs/
#         Frameworks: django-mongodb/, laravel-mongodb/, entity-framework/,
#                    hibernate/, mongoid/, kotlin/, kotlin-sync/
#         Tools: mongodb-shell/, mongodb-vscode/, mongodb-intellij/, mcp-server/,
#               mongodb-analyzer/, kubernetes-operator/, kubernetes/, kafka-connector/,
#               mongocli/, mongosync/, bi-connector/, relational-migrator/,
#               spark-connector/, drivers/, guides/, tools/
#         Meta: 404/, landing/, table-of-contents/, shared/, meta/, docs-platform/,
#               code-examples/

# View code example testing structure
ls code-example-tests/
# Output: command-line/mongosh/, csharp/driver/, go/driver/, go/atlas-sdk/,
#         java/driver-sync/, java/driver-reactive/, javascript/driver/,
#         python/pymongo/, openapi/, README.md, comparison-spec.md,
#         sample-data-utility-spec.md, processFiles.js, deprecated_examples.json
#         Each language directory contains: examples/, tests/, snip.js

# Check platform tooling
ls platform/
# Output: docs-nextjs/, snooty-ast-to-mdx/, tools/, template/,
#         package.json, pnpm-lock.yaml, pnpm-workspace.yaml, turbo.json,
#         README.md, netlify.sample.toml
```

## Content Organization

Documentation properties as independent projects

Each documentation property in the `content/` directory operates as an independent Snooty-based documentation project with its own configuration, source files, build workflows, and deployment settings. Properties maintain their own snooty.toml configuration defining project metadata, version numbers, intersphinx references, and content organization. Common properties include: `manual/` (MongoDB Server), `atlas/` (MongoDB Atlas), atlas variants (`atlas-cli/`, `atlas-government/`, `atlas-operator/`, `atlas-architecture/`), driver documentation (`node/`, `pymongo-driver/`, `pymongo-arrow-driver/`, `java/`, `csharp/`, `golang/`, `rust/`, `kotlin/`, `kotlin-sync/`, `scala-driver/`, `php-library/`, `ruby-driver/`, etc.), framework integrations (`django-mongodb/`, `laravel-mongodb/`, `entity-framework/`, `hibernate/`, `mongoid/`), developer tools (`database-tools/`, `mongodb-shell/`, `compass/`, `mongodb-vscode/`, `mongodb-intellij/`, `mongodb-analyzer/`, `mcp-server/`), platform services (`app-services/`, `realm/`, `charts/`, `voyage/`, `datalake/`), data tools (`bi-connector/`, `relational-migrator/`, `spark-connector/`, `kafka-connector/`, `mongosync/`, `mongocli/`), and meta directories (`landing/`, `guides/`, `drivers/`, `tools/`, `shared/`, `docs-platform/`, `404/`, `table-of-contents/`, `code-examples/`, `kubernetes/`, `meta/`).

```bash
# Example: MongoDB Server Manual structure
ls content/manual/
# Output: manual/ (versioned documentation), .github/, README.md
#         Contains: source/, snooty.toml, conf.py, Makefile

# Example: Node.js driver documentation
ls content/node/
# Output: node/ (versioned docs), .github/, examples/, README.md
#         Contains: source/, snooty.toml, config files, workflows

# Example: Atlas documentation
ls content/atlas/
# Output: atlas/ (source), .github/, README.md, snooty.toml
#         Contains: comprehensive Atlas platform documentation

# View a documentation property configuration
cat content/manual/manual/snooty.toml
# Shows: name, title, version, intersphinx references, constants, banners
```

```toml
# Example snooty.toml structure (manual documentation)
name = "docs"
title = "MongoDB Manual"
version = "7.2"
intersphinx = [
    "https://www.mongodb.com/docs/atlas/objects.inv",
    "https://www.mongodb.com/docs/database-tools/objects.inv"
]

[constants]
version = "7.2"
release = "7.2.1"
atlas = "MongoDB Atlas"
mongosh = ":binary:`~bin.mongosh`"
```

## Code Example Testing Framework

Automated validation of documentation code snippets

The `code-example-tests/` directory implements a comprehensive testing infrastructure ensuring all code examples in documentation are runnable and produce expected results. Each language directory contains an `examples/` subdirectory with standalone runnable code files organized by topic, a `tests/` subdirectory with test suites that execute examples and verify outputs, and a `snip.js` script using Bluehawk markup to extract documentation-ready snippets. The framework now includes testing for OpenAPI specifications in addition to driver code examples. Tests run automatically via GitHub Actions workflows when examples are modified, preventing broken or incorrect code from reaching published documentation.

```bash
# View code testing structure
ls code-example-tests/
# Output: command-line/mongosh/, csharp/driver/, go/driver/, go/atlas-sdk/,
#         java/, javascript/, python/, openapi/, README.md, comparison-spec.md,
#         sample-data-utility-spec.md, processFiles.js

# Example: MongoDB Shell (mongosh) tests
ls code-example-tests/command-line/mongosh/
# Output: examples/, tests/, utils/, snip.js, package.json, README.md

# Browse example categories
ls code-example-tests/command-line/mongosh/examples/
# Output: aggregation/pipelines/filter/, aggregation/pipelines/group/,
#         aggregation/pipelines/join-one-to-one/, aggregation/pipelines/unwind/

# View test files
ls code-example-tests/command-line/mongosh/tests/
# Output: aggregation/pipelines/tutorials.test.js

# Example: OpenAPI testing structure
ls code-example-tests/openapi/
# Output: tests/, README.md, package.json, babel.config.cjs, jest.config.cjs
```

```javascript
// File: code-example-tests/command-line/mongosh/examples/aggregation/pipelines/filter/load-data.js
// Load sample data for filter pipeline example
db.persons.insertMany([
  { name: "Jane Doe", age: 28, city: "New York" },
  { name: "John Smith", age: 35, city: "Boston" },
  { name: "Alice Johnson", age: 42, city: "Chicago" }
]);

// File: code-example-tests/command-line/mongosh/examples/aggregation/pipelines/filter/run-pipeline.js
// Filter persons over age 30
const result = db.persons.aggregate([
  { $match: { age: { $gt: 30 } } },
  { $project: { name: 1, age: 1, _id: 0 } },
  { $sort: { age: 1 } }
]);

printjson(result.toArray());

// File: code-example-tests/command-line/mongosh/examples/aggregation/pipelines/filter/output.sh
# Expected output:
[
  { "name": "John Smith", "age": 35 },
  { "name": "Alice Johnson", "age": 42 }
]
```

```javascript
// File: code-example-tests/command-line/mongosh/tests/aggregation/pipelines/tutorials.test.js
const { testExamplesSequentially } = require('../../../utils/testExamplesSequentially');

describe('Aggregation Pipeline Tutorials', () => {
  test('filter tutorial produces expected output', async () => {
    const examplePath = 'examples/aggregation/pipelines/filter';
    await testExamplesSequentially(examplePath, [
      'load-data.js',
      'run-pipeline.js'
    ], 'output.sh');
  });
});
```

## Multi-Language Code Example Testing

Expanded driver testing infrastructure across languages

The monorepo now includes comprehensive testing infrastructure for six primary languages: JavaScript (Node.js), Python (PyMongo), Java, C#, Go, and command-line tools (MongoDB Shell), plus OpenAPI specification testing. Each language directory follows a consistent pattern with `examples/` for runnable code, `tests/` for validation suites, and `utils/` or `Utilities/` for shared testing libraries. Language-specific implementations leverage idiomatic frameworks (xUnit for C#, Jest for JavaScript, pytest for Python, JUnit for Java) while following the universal comparison specification to ensure consistent validation behavior across all languages. The OpenAPI testing validates API specifications for accuracy and completeness.

```bash
# View all language testing directories
ls code-example-tests/
# Output: command-line/mongosh/, csharp/driver/, go/driver/, go/atlas-sdk/,
#         java/driver-sync/, java/driver-reactive/, java/utilities/,
#         javascript/driver/, python/pymongo/, openapi/

# Each language maintains consistent structure
ls code-example-tests/python/pymongo/
# Output: examples/, tests/, utils/, snip.js, requirements.txt, pytest.ini

ls code-example-tests/javascript/driver/
# Output: examples/, tests/, utils/, snip.js, package.json, jest.config.js

ls code-example-tests/java/
# Output: driver-sync/, driver-reactive/, utilities/, README.md, pom.xml
```

## C# Driver Code Examples

.NET driver testing infrastructure

The C# driver documentation uses a .NET solution-based testing approach with separate projects for examples, tests, and utilities. The `csharp/driver/` directory contains a Visual Studio solution (`driver.sln`) with the Examples project containing tutorial code, the Tests project using xUnit for validation, and Utilities projects providing comparison engines for validating output against expected results including MongoDB document format parsing, ellipsis pattern matching, and numeric type compatibility.

```bash
# C# testing structure
ls code-example-tests/csharp/driver/
# Output: Examples/, Tests/, Utilities/, driver.sln, snip.js, README.md

# View example tutorials
ls code-example-tests/csharp/driver/Examples/Aggregation/Pipelines/
# Output: Filter/, Group/, JoinOneToOne/, JoinMultiField/

# View testing utilities
ls code-example-tests/csharp/driver/Utilities/
# Output: Comparison/, SampleData/, Utilities.csproj
```

```csharp
// File: code-example-tests/csharp/driver/Examples/Aggregation/Pipelines/Filter/Person.cs
namespace Examples.Aggregation.Pipelines.Filter;

public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string City { get; set; }
}

// File: code-example-tests/csharp/driver/Examples/Aggregation/Pipelines/Filter/Tutorial.cs
using MongoDB.Driver;

namespace Examples.Aggregation.Pipelines.Filter;

public class Tutorial
{
    public static void Run()
    {
        var client = new MongoClient(Environment.GetEnvironmentVariable("MONGODB_URI"));
        var database = client.GetDatabase("test");
        var collection = database.GetCollection<Person>("persons");

        // Insert sample data
        collection.InsertMany(new[]
        {
            new Person { Name = "Jane Doe", Age = 28, City = "New York" },
            new Person { Name = "John Smith", Age = 35, City = "Boston" },
            new Person { Name = "Alice Johnson", Age = 42, City = "Chicago" }
        });

        // Filter persons over age 30
        var pipeline = collection.Aggregate()
            .Match(p => p.Age > 30)
            .Project(p => new { p.Name, p.Age })
            .SortBy(p => p.Age);

        var results = pipeline.ToList();
        foreach (var result in results)
        {
            Console.WriteLine($"{result.Name}, {result.Age}");
        }
    }
}
```

```csharp
// File: code-example-tests/csharp/driver/Tests/ExampleStubTest.cs
using Xunit;
using Examples.Aggregation.Pipelines.Filter;

namespace Tests;

public class FilterTutorialTest
{
    [Fact]
    public void FilterTutorialProducesExpectedOutput()
    {
        // Test validates tutorial runs successfully
        Tutorial.Run();

        // Compare output against expected results in TutorialOutput.txt
        var expectedOutput = File.ReadAllText("Examples/Aggregation/Pipelines/Filter/TutorialOutput.txt");
        // Validation logic using Utilities.Comparison
    }
}
```

## Bluehawk Code Extraction

Snippet extraction from tested examples

The Bluehawk markup tool extracts documentation-ready code snippets from tested examples, removing test infrastructure code (connection string handling, test harness setup, assertions) while preserving the core functionality developers need to see. Each language directory includes a `snip.js` script that processes examples with Bluehawk markup directives (`state`, `snippet`, `remove`, etc.) and outputs clean snippets to `content/code-examples/tested/language/driver/topic/`. Documentation projects reference these extracted snippets via symlinks using RST literalinclude directives.

```javascript
// File: code-example-tests/command-line/mongosh/snip.js
const { execSync } = require('child_process');

// Run Bluehawk to extract snippets
execSync('bluehawk snip examples/ -o ../../../content/code-examples/tested/mongosh/', {
  stdio: 'inherit'
});

// Example source with Bluehawk markup
// File: examples/aggregation/pipelines/filter/run-pipeline.js

// :snippet-start: filter-pipeline
const result = db.persons.aggregate([
  { $match: { age: { $gt: 30 } } },
  { $project: { name: 1, age: 1, _id: 0 } },
  { $sort: { age: 1 } }
]);
// :snippet-end:

// :remove-start:
// Test infrastructure code (removed from docs)
printjson(result.toArray());
// :remove-end:

// Generates: content/code-examples/tested/mongosh/aggregation/pipelines/filter-pipeline.js
// Contains only the aggregation pipeline without test code
```

```rst
.. Example RST usage in documentation
.. File: content/manual/manual/source/aggregation/pipelines.txt

Filter Documents Example
------------------------

The following example filters documents where age is greater than 30:

.. literalinclude:: /code-examples/tested/mongosh/aggregation/pipelines/filter-pipeline.js
   :language: javascript
   :copyable: true
   :dedent:
```

## Platform Infrastructure

Next.js rendering and build tooling

The `platform/` directory contains shared infrastructure for building and rendering MongoDB documentation using Next.js and the Snooty AST (Abstract Syntax Tree) format. The `docs-nextjs/` package implements the Next.js-based documentation rendering engine converting Snooty AST to React components, while `snooty-ast-to-mdx/` handles transformation of Snooty AST nodes to MDX format. The platform uses pnpm workspaces for monorepo management and Turbo for orchestrating parallel builds across multiple documentation properties.

```bash
# Platform structure
ls platform/
# Output: docs-nextjs/, snooty-ast-to-mdx/, tools/, template/,
#         package.json, pnpm-workspace.yaml, turbo.json

# View Next.js documentation renderer
ls platform/docs-nextjs/
# Contains: Next.js application for rendering Snooty AST documentation

# Check workspace configuration
cat platform/package.json
# Shows: Workspace scripts, shared dependencies, build commands

# View monorepo build configuration
cat platform/turbo.json
# Shows: Build pipeline configuration for parallel builds
```

```json
// File: platform/package.json
{
  "name": "platform",
  "private": true,
  "packageManager": "pnpm@10.11.1",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "start": "turbo run start",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "ingest:all": "turbo run ingest:all",
    "ingest:pages": "turbo run ingest:pages"
  },
  "devDependencies": {
    "jest": "^30.0.0",
    "turbo": "^2.5.4"
  }
}
```

```yaml
# File: platform/pnpm-workspace.yaml
packages:
  - 'docs-nextjs'
  - 'snooty-ast-to-mdx'
  - 'tools/*'
```

## Automated CI/CD Workflows

GitHub Actions testing and deployment

Each documentation property includes `.github/workflows/` with automated testing, building, and deployment pipelines. The monorepo root also contains shared workflows for cross-language code example testing, formatting checks, and deployment automation. Common workflows include language-specific code example testing in Docker containers (mongosh-examples-test-in-docker.yml, csharp-driver-examples-test-in-docker.yml, go-driver-examples-test-in-docker.yml, java-driver-sync-examples-test-in-docker.yml, node-driver-examples-test-in-docker.yml, pymongo-driver-examples-test-in-docker.yml), formatting verification for driver examples (csharp-driver-examples-check-formatting.yml, go-driver-examples-check-formatting.yml, java-driver-sync-examples-check-formatting.yml, node-driver-examples-check-formatting.yml), OpenAPI specification validation (openapi-tests.yml), repository synchronization (repo-sync.yml), unit testing (next-js-unit-tests.yml, go-sdk-examples-unit-tests.yml), build automation (trigger-branch-build.yml, trigger-preprd-build.yml, trigger-prod-build.yml, build-bump-rm-api.yml), code quality checks (check-code-directives.yml), table of contents testing (toc-test.yml), branch management (cleanup-temp-branch.yml, generate-branch-name.yml), notifications (notify-devdocs.yml), and automated labeling (labeler.yml). Each language's testing workflow runs in isolated Docker environments with MongoDB services to ensure consistent, reproducible test execution across all code examples. Note that formatting checks are implemented for C#, Go, Java, and Node.js drivers but not for Python/PyMongo examples.

```bash
# View monorepo-level workflows
ls .github/workflows/
# Output: mongosh-examples-test-in-docker.yml,
#         csharp-driver-examples-test-in-docker.yml,
#         csharp-driver-examples-check-formatting.yml,
#         go-driver-examples-test-in-docker.yml,
#         go-driver-examples-check-formatting.yml,
#         go-sdk-examples-unit-tests.yml,
#         java-driver-sync-examples-test-in-docker.yml,
#         java-driver-sync-examples-check-formatting.yml,
#         node-driver-examples-test-in-docker.yml,
#         node-driver-examples-check-formatting.yml,
#         pymongo-driver-examples-test-in-docker.yml,
#         openapi-tests.yml, repo-sync.yml, next-js-unit-tests.yml,
#         build-bump-rm-api.yml, check-code-directives.yml,
#         cleanup-temp-branch.yml, generate-branch-name.yml,
#         notify-devdocs.yml, toc-test.yml, trigger-branch-build.yml,
#         trigger-preprd-build.yml, trigger-prod-build.yml, labeler.yml

# View workflows for a documentation property
ls content/app-services/.github/workflows/
# Output: check-links.yml, check-openapi-admin-v3.yml, check-redirects.yml,
#         test-data-api.yml, test-functions.yml, find-unused.yml

# Example workflow files
cat content/app-services/.github/workflows/test-data-api.yml
# Shows: Automated testing for Data API code examples

cat content/app-services/.github/workflows/check-links.yml
# Shows: Link validation across documentation
```

```yaml
# Example GitHub Actions workflow for MongoDB Shell examples
# File: .github/workflows/mongosh-examples-test-in-docker.yml
name: Test MongoDB Shell Examples

on:
  pull_request:
    paths:
      - 'code-example-tests/command-line/mongosh/**'

jobs:
  test-mongosh:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:7.0
        ports:
          - 27017:27017
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Install dependencies
        working-directory: code-example-tests/command-line/mongosh
        run: npm install
      - name: Run tests
        working-directory: code-example-tests/command-line/mongosh
        run: npm test
        env:
          MONGODB_URI: mongodb://mongodb:27017

# Additional workflows exist for: csharp, go, java, node, pymongo
# Each uses Docker containers and language-specific test frameworks
```

## Repository Synchronization

Automated syncing with public repositories

The `repo_sync.py` script implements automated synchronization between the internal monorepo and public documentation repositories using GitHub App authentication. This allows the internal monorepo to remain private while pushing updates to public repositories like `mongodb/docs` for the MongoDB Manual. The script uses the PyGithub library to authenticate as a GitHub App installation, obtains access tokens, and pushes specific branches to target repositories.

```python
# File: repo_sync.py
import subprocess
from typing_extensions import Annotated
import typer
import github

def get_installation_access_token(app_id: int, private_key: str,
                                  installation_id: int) -> str:
    """
    Obtain an installation access token using JWT.
    """
    integration = github.GithubIntegration(app_id, private_key)
    auth = integration.get_access_token(installation_id)
    assert auth
    assert auth.token
    return auth.token

def main(branch: Annotated[str, typer.Option(envvar="GITHUB_REF_NAME")],
         app_id: Annotated[int, typer.Option(envvar="APP_ID")],
         installation_id: Annotated[int, typer.Option(envvar="INSTALLATION_ID")],
         server_docs_private_key: Annotated[str, typer.Option(envvar="SERVER_DOCS_PRIVATE_KEY")]):

    access_token = get_installation_access_token(app_id, server_docs_private_key, installation_id)
    git_destination_url_with_token = f"https://x-access-token:{access_token}@github.com/mongodb/docs.git"

    subprocess.run(["git", "config", "--unset-all", "http.https://github.com/.extraheader"], check=True)
    subprocess.run(["git", "push", git_destination_url_with_token, branch], check=True)

if __name__ == "__main__":
    typer.run(main)
```

```bash
# Run repository synchronization
python repo_sync.py \
  --branch main \
  --app-id $APP_ID \
  --installation-id $INSTALLATION_ID \
  --server-docs-private-key "$SERVER_DOCS_PRIVATE_KEY"

# Output: Pushes current branch to mongodb/docs repository
```

## GitHub Copilot Prompt Templates

AI-assisted documentation authoring

The `.github/prompts/` directory contains GitHub Copilot prompt templates that provide specialized AI assistance for documentation tasks. These templates standardize common documentation workflows including converting content to reStructuredText format (convert-to-rst.prompt.md), checking adherence to MongoDB style guidelines (style-guide-check.prompt.md), creating reusable content includes (create-includes.prompt.md), converting inline code blocks to literalinclude directives (code-block-to-literalinclude.prompt.md), and verifying source constant substitution (source-constant-substitution-check.prompt.md). Product-specific prompts exist for Atlas and Grove documentation. The templates embed MongoDB's documentation standards including ASCII character sets, 72-character line limits, proper reStructuredText formatting with 2-space indents, heading underline conventions, and correct usage of directives like procedures, tabs, admonitions, and literalinclude.

```bash
# View available Copilot prompt templates
ls .github/prompts/
# Output: convert-to-rst.prompt.md, style-guide-check.prompt.md,
#         create-includes.prompt.md, code-block-to-literalinclude.prompt.md,
#         source-constant-substitution-check.prompt.md, cleanup-prompt.md,
#         targeted-edits.md, context-prompt.md, README.md, atlas/, grove/

# View RST conversion prompt template
cat .github/prompts/convert-to-rst.prompt.md
# Shows: Comprehensive RST formatting guidelines, directive syntax,
#        MongoDB documentation standards, heading conventions
```

```markdown
# Example prompt template structure (convert-to-rst.prompt.md excerpt)
You will convert some text into properly formatted .rST for MongoDB's documentation.

MongoDB rST Standards:
- Character Set: ASCII (to avoid errors with Unicode)
- Line length: Hard breaks at 72 characters
- Line endings: UNIX (LF)
- Naming Convention: kebab-case for variables and files
- Indents: 2 spaces per level; 3 spaces under a directive

Common Inline Markup:
- Bold: **text**
- Italic: *text*
- Monospace: `text`

Procedures:
.. procedure::
   :style: normal

   .. step:: Step 1

      Description
```

## Code Example Copier Configuration

Automated example distribution to external repositories

The monorepo includes a copier configuration system in the `.copier/` directory for automating code example distribution to external repositories. The configuration file `.copier/config.yml` defines workflow rules with support for complex file transformations (move, copy, glob patterns), enabling distribution of code examples from the monorepo to external artifact repositories like the Atlas Architecture Go SDK repository. Workflows specify transformation patterns, target repositories, path transformations, pull request templates, and deprecation checking (via `deprecated_examples.json`) to ensure examples remain current across all distribution points. The copier system is webhook-driven, automatically detecting merged PRs and copying matching files to destination repositories based on configured workflows. The monorepo also includes `processFiles.js` for batch processing code example files and `sample-data-utility-spec.md` for standardizing test data generation across languages.

```bash
# View copier configuration directory
ls .copier/
# Output: config.yml, README.md

# Read copier configuration
cat .copier/config.yml
# Shows: Workflow definitions with transformations and commit strategies
```

```yaml
# File: .copier/config.yml
# Referenced from main config file in https://github.com/mongodb/code-example-tooling

defaults:
  exclude:
    - "**/.env"
    - "**/node_modules/**"
  deprecation_check:
    enabled: true
    file: "deprecated_examples.json"

workflows:
  # Go SDK Project Examples → Artifact Repo (Architecture Center)
  - name: "atlas-sdk-go-project-examples"
    destination:
      repo: "mongodb/atlas-architecture-go-sdk"
      branch: "main"

    transformations:
      - glob:
          pattern: "content/code-examples/tested/go/atlas-sdk/project-copy/**/*"
          transform: "${relative_path}"

    commit_strategy:
      type: "pull_request"
      pr_title: "Update Atlas SDK Go examples from ${source_repo} PR ${pr_number}"
      pr_body: |
        Automated update of Atlas SDK Go project examples

        - Source: ${source_repo}
        - Source PR: #${pr_number}
        - Commit: ${commit_sha}

        **Changes:**
        - Files updated: ${file_count}
      commit_message: "Automated copy from ${source_repo} PR #${pr_number}"
      auto_merge: false
```

```bash
# How copier works:
# 1. PR merged to main branch
# 2. Webhook notifies copier service
# 3. Copier checks if changed files match any workflow patterns
# 4. If match found, creates PR in destination repository with copied files
```

## Documentation Symlinks

Cross-project code example access

Documentation projects access tested code examples through symlinks from their `source/code-examples/` directories to the central `content/code-examples/tested/` directory. This architecture avoids duplicating code examples across projects while enabling the Snooty build system to access snippets as if they were local to each project. Symlinks must be created for each documentation version directory, with relative paths adjusted based on directory nesting depth.

```bash
# Check if symlink exists for a documentation project
cd content/manual/manual/source/code-examples
ls -l tested
# Output: tested -> ../../../../code-examples/tested

# Verify symlink target
realpath tested
# Output: /path/to/repo/content/code-examples/tested

# Create new symlink for a documentation project
cd content/node/source/code-examples
ln -s ../../../../code-examples/tested tested

# Verify creation
ls -l tested
# Output: tested -> ../../../../code-examples/tested
```

```rst
.. Example using symlinked code examples in documentation
.. File: content/manual/manual/source/tutorial/aggregation.txt

Filter Documents with Aggregation
----------------------------------

The following example demonstrates filtering documents:

.. literalinclude:: /code-examples/tested/mongosh/aggregation/pipelines/filter-pipeline.js
   :language: javascript
   :copyable: true
   :dedent:

For more information, see :manual:`Aggregation Pipeline </core/aggregation-pipeline>`.
```

## Monorepo Testing Strategy

Comprehensive validation across all documentation properties

The monorepo implements a multi-layered testing strategy combining code example validation, link checking, content validation, build verification, and deployment testing. Code example tests run language-specific test suites validating that snippets compile, execute, and produce expected outputs. Link checking validates internal cross-references and external URLs across all properties. Build verification ensures each property builds successfully with the platform infrastructure. Integration tests validate the complete documentation pipeline from source to rendered output.

```bash
# Run code example tests for specific language
cd code-example-tests/command-line/mongosh
npm install
npm test
# Output: Runs all MongoDB Shell example tests

# Run C# driver tests
cd code-example-tests/csharp/driver
dotnet test
# Output: Runs all C# driver example tests with xUnit

# Example test output
PASS tests/aggregation/pipelines/tutorials.test.js
  Aggregation Pipeline Tutorials
    ✓ filter tutorial produces expected output (1234ms)
    ✓ group tutorial produces expected output (987ms)
    ✓ join one-to-one tutorial produces expected output (1567ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

## Universal Comparison Testing Specification

Cross-language output validation framework

The `code-example-tests/comparison-spec.md` defines a comprehensive, language-agnostic specification for validating code example outputs across all programming languages. This specification enables consistent comparison behavior across JavaScript, Python, Java, C#, Go, and other language implementations, providing advanced features like MongoDB type normalization, ellipsis pattern matching, field value ignoring, and flexible array comparison strategies. The specification handles MongoDB Extended JSON format, BSON types (ObjectId, Decimal128, Date), numeric type compatibility, and supports both ordered and unordered array comparisons with backtracking algorithms for complex nested structures.

```bash
# View comparison specification
cat code-example-tests/comparison-spec.md
# Contains: 1200+ line specification with pseudocode algorithms

# Key features documented in specification:
# - MongoDB type normalization (ObjectId, Decimal128, Date)
# - Ellipsis patterns: property-level ("..."), array-level (["..."]), object-level
# - Field value ignoring for dynamic fields (_id, timestamps, UUIDs)
# - Array comparison strategies (ordered, unordered, backtracking, hybrid)
# - Cross-language implementation guidelines
# - Error handling and reporting patterns
```

```javascript
// Example comparison scenarios from specification

// Scenario 1: MongoDB type normalization
expected: {_id: ObjectId("507f1f77bcf86cd799439011"), amount: Decimal128("123.45")}
actual:   {_id: "507f1f77bcf86cd799439011", amount: "123.45"}
result:   true  // Types normalized to strings for comparison

// Scenario 2: Field value ignoring
expected: {_id: "any-id-1", name: "John", timestamp: "2024-01-01T00:00:00Z"}
actual:   {_id: "different-id-2", name: "John", timestamp: "2024-01-02T12:30:00Z"}
options:  {ignoreFieldValues: ["_id", "timestamp"]}
result:   true  // Dynamic fields ignored, only name compared

// Scenario 3: Ellipsis array matching
expected: [1, "...", 4]
actual:   [1, 2, 3, 4]
result:   true  // "..." matches any number of elements

// Scenario 4: Truncated string matching
expected: {message: "Error: Connection failed..."}
actual:   {message: "Error: Connection failed after 3 retries to server"}
result:   true  // "..." suffix allows partial matching
```

```pseudocode
// Core comparison algorithm from specification
function compareValues(expected, actual, options, hasOmittedFields):
    // Step 1: Handle ellipsis patterns first
    if expected == "...":
        return true
    if expected ends with "...":
        return actual.startsWith(expected.slice(0, -3))

    // Step 2: Handle null/undefined cases
    if expected == null OR actual == null:
        return expected === actual

    // Step 3: Normalize MongoDB types
    expected = normalizeMongoTypes(expected)
    actual = normalizeMongoTypes(actual)

    // Step 4: Route to specialized comparison
    if both are arrays:
        return compareArrays(expected, actual, options)
    if both are objects:
        return compareObjects(expected, actual, options)

    // Step 5: Primitive comparison
    return expected === actual
```

## Comparison Testing Framework

Advanced output validation for C# examples

The C# testing infrastructure includes sophisticated comparison utilities in `Utilities/Comparison/` enabling flexible validation of example outputs against expected results. The framework supports MongoDB Extended JSON parsing, ellipsis patterns for partial matching (allowing `...` in expected output to match any content), numeric type compatibility (matching int32 against int64), date normalization, and JSON structure comparison. This allows tests to validate example behavior without requiring exact output matches including object IDs, timestamps, or system-specific values.

```csharp
// File: code-example-tests/csharp/driver/Utilities/Comparison/Expect.cs (conceptual)
namespace Utilities.Comparison;

public class Expect
{
    public static void OutputMatches(string actualOutput, string expectedFilePath)
    {
        var expectedOutput = File.ReadAllText(expectedFilePath);
        var comparisonEngine = new ComparisonEngine();
        var result = comparisonEngine.Compare(actualOutput, expectedOutput);

        if (!result.IsMatch)
        {
            throw new ComparisonException($"Output mismatch: {result.Differences}");
        }
    }
}

// Example expected output with ellipsis patterns
// File: Examples/Aggregation/Pipelines/Filter/TutorialOutput.txt
[
  { "name": "John Smith", "age": 35, "_id": { "$oid": "..." } },
  { "name": "Alice Johnson", "age": 42, "_id": { "$oid": "..." } }
]
// The "..." pattern matches any object ID value

// File: Tests/ExampleTest.cs
[Fact]
public void FilterTutorialTest()
{
    var output = CaptureOutput(() => FilterTutorial.Run());
    Expect.OutputMatches(output, "Examples/Aggregation/Pipelines/Filter/TutorialOutput.txt");
}
```

---

## Summary

The MongoDB Documentation Monorepo represents a comprehensive consolidation of all MongoDB documentation properties into a unified repository with shared infrastructure, centralized code example testing, and consistent build processes. This architecture eliminates duplication across 58 separate documentation repositories while maintaining independent versioning, deployment, and content management for each property. The monorepo combines documentation source content in `content/` directories covering server documentation, drivers for all major languages, framework integrations, developer tools, and meta directories (landing pages, guides, shared resources); runnable and tested code examples in `code-example-tests/` with language-specific test suites for JavaScript, Python, Java, C#, Go, MongoDB Shell, and OpenAPI specifications; shared platform infrastructure in `platform/` including the Next.js rendering engine (pnpm@10.11.1, turbo@2.5.4) and Snooty AST processing tools; and GitHub Copilot prompt templates for AI-assisted documentation authoring.

Primary use cases include: documentation writers authoring content for any MongoDB product with access to centrally tested code examples and AI-assisted formatting tools; developers contributing code examples that are automatically validated through Docker-based testing workflows (with formatting checks) and distributed to external repositories; platform engineers maintaining shared build and rendering infrastructure with Turbo-orchestrated parallel builds; and CI/CD systems executing automated testing, building, and deployment across all documentation properties simultaneously using GitHub Actions workflows for testing (mongosh-examples-test-in-docker.yml, csharp-driver-examples-test-in-docker.yml, etc.), formatting validation (csharp-driver-examples-check-formatting.yml, etc.), OpenAPI validation (openapi-tests.yml), build automation (trigger-branch-build.yml, trigger-preprd-build.yml, trigger-prod-build.yml), and code quality checks (check-code-directives.yml, toc-test.yml). The monorepo's integration patterns emphasize symlink-based code example sharing enabling zero-duplication snippet reuse, Bluehawk markup extraction producing documentation-ready code from tested examples, automated synchronization distributing content to public repositories via repo-sync.yml workflows, universal comparison testing specification ensuring consistent validation across all programming languages, GitHub Copilot templates standardizing documentation formatting and style adherence, and comprehensive testing validating code correctness in isolated Docker containers, formatting consistency, OpenAPI specification accuracy, link integrity, and build success across the entire documentation ecosystem. This architecture ensures MongoDB documentation remains accurate, consistent, and maintainable across all 58 properties (including Atlas variants like Atlas Government, Atlas Operator, and Atlas Architecture; framework integrations like Django MongoDB, Laravel MongoDB, Entity Framework, and Hibernate; developer tools like MCP Server, VS Code extension, IntelliJ plugin, and MongoDB Analyzer; cloud services like Atlas CLI, Kubernetes Operator, and App Services; data tools like Kafka Connector, BI Connector, Relational Migrator, Spark Connector, and MongoSync; and PyMongo Arrow driver for data analytics) while enabling independent release cycles and version-specific content for each documentation property.
