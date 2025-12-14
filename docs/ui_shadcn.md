### Create TanStack Start Project with shadcn/ui

Source: https://ui.shadcn.com/docs/installation/tanstack

Initialize a new TanStack Start project with Tailwind CSS and shadcn/ui add-ons pre-configured. This command sets up the project structure and installs necessary dependencies in one command.

```bash
npm create @tanstack/start@latest --tailwind --add-ons shadcn
```

--------------------------------

### Install All shadcn/ui Components

Source: https://ui.shadcn.com/docs/installation/tanstack

Bulk install all available shadcn/ui components into your project at once. This is useful when you want access to the entire component library without adding components individually.

```bash
npx shadcn@latest add --all
```

--------------------------------

### Manually Install Radix UI Select Dependency

Source: https://ui.shadcn.com/docs/components/select

This command shows how to install the core `@radix-ui/react-select` primitive package. This manual installation is necessary if you prefer not to use the Shadcn UI CLI for component setup.

```bash
npm install @radix-ui/react-select
```

--------------------------------

### Install Progress Component Dependencies

Source: https://ui.shadcn.com/docs/components/progress

This section provides instructions for installing the `Progress` component and its core dependencies. It covers both using the Shadcn UI CLI for automated setup and manual installation via npm for the underlying Radix UI component.

```bash
npx shadcn@latest add progress
```

```bash
npm install @radix-ui/react-progress
```

--------------------------------

### Serve shadcn Registry with Next.js Development Server

Source: https://ui.shadcn.com/docs/registry/getting-started

This command starts the Next.js development server, which will serve your shadcn registry files if your project is configured with Next.js. The registry items will be accessible via specific URLs under `/r/` after the build process.

```bash
npm run dev
```

--------------------------------

### Install shadcn CLI via npm

Source: https://ui.shadcn.com/docs/registry/getting-started

This command installs the latest version of the shadcn command-line interface (CLI) globally or as a dev dependency in your project. The CLI is essential for building and managing shadcn component registries and components.

```bash
npm install shadcn@latest
```

--------------------------------

### Create New Laravel Project with React

Source: https://ui.shadcn.com/docs/installation/laravel

Initialize a new Laravel project with Inertia and React using the Laravel installer. This command creates a fresh Laravel application with React pre-configured for use with Inertia.js.

```bash
laravel new my-app --react
```

--------------------------------

### Install Shadcn UI Input OTP Component (CLI & Manual)

Source: https://ui.shadcn.com/docs/components/input-otp

Provides instructions for adding the Input OTP component to a project. Users can choose between the Shadcn UI CLI for automated setup or manual installation by adding the core `input-otp` dependency via npm and then integrating the component files.

```bash
npx shadcn@latest add input-otp
```

```bash
npm install input-otp
```

--------------------------------

### Install Aspect Ratio Component via CLI

Source: https://ui.shadcn.com/docs/components/aspect-ratio

Installs the aspect-ratio component and its dependencies using the shadcn CLI. This is the quickest installation method that automatically handles dependency installation and file setup.

```bash
npx shadcn@latest add aspect-ratio
```

--------------------------------

### Install Dropdown Menu Component with NPM

Source: https://ui.shadcn.com/docs/components/dropdown-menu

Installation command for adding the dropdown menu component to a project using shadcn/ui CLI tool. This is the recommended method for quick setup with automatic dependency management.

```bash
npx shadcn@latest add dropdown-menu
```

--------------------------------

### Define Universal Registry Item for Multi-File Template (shadcn/ui)

Source: https://ui.shadcn.com/docs/registry/examples

This JSON configuration defines a shadcn/ui registry item named 'my-custom-start-template' that installs multiple files. It includes two files, each with an explicit target path, demonstrating how to create a universal starter template that can be installed without framework detection or components.json.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "my-custom-start-template",
  "type": "registry:item",
  "dependencies": ["better-auth"],
  "files": [
    {
      "path": "/path/to/file-01.json",
      "type": "registry:file",
      "target": "~/file-01.json",
      "content": "..."
    },
    {
      "path": "/path/to/file-02.vue",
      "type": "registry:file",
      "target": "~/pages/file-02.vue",
      "content": "..."
    }
  ]
}
```

--------------------------------

### Add shadcn/ui Button Component

Source: https://ui.shadcn.com/docs/installation/tanstack

Install the Button component from shadcn/ui into your TanStack Start project. This command downloads and configures the component in your project's component directory.

```bash
npx shadcn@latest add button
```

--------------------------------

### Install Form Component via Shadcn CLI

Source: https://ui.shadcn.com/docs/components/form

This command provides the recommended method for installing the Shadcn UI form component using its command-line interface. Executing this command automates the addition of the form component and its dependencies to your project, simplifying the setup process.

```bash
npx shadcn@latest add form
```

--------------------------------

### Basic Navigation Menu Setup - React TSX

Source: https://ui.shadcn.com/docs/components/navigation-menu

Minimal example demonstrating the basic structure of a Navigation Menu with one menu item, trigger, and content link. Serves as a foundation for more complex navigation patterns.

```typescript
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

--------------------------------

### Multiple Registry Setup with Mixed Authentication

Source: https://ui.shadcn.com/docs/components-json

Complete example showing how to configure multiple registries with different authentication methods and parameters. Demonstrates public registries, private registries with bearer tokens, and team registries with versioning and environment variables.

```json
{
  "registries": {
    "@shadcn": "https://ui.shadcn.com/r/{name}.json",
    "@company-ui": {
      "url": "https://registry.company.com/ui/{name}.json",
      "headers": {
        "Authorization": "Bearer ${COMPANY_TOKEN}"
      }
    },
    "@team": {
      "url": "https://team.company.com/{name}.json",
      "params": {
        "team": "frontend",
        "version": "${REGISTRY_VERSION}"
      }
    }
  }
}
```

--------------------------------

### Add Component Definition to shadcn registry.json

Source: https://ui.shadcn.com/docs/registry/getting-started

This JSON snippet shows how to register a component, like `hello-world`, within the `registry.json` file. It includes metadata such as name, type, title, description, and defines the component's file path and type, ensuring it conforms to the registry item schema.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "registry/new-york/hello-world/hello-world.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

--------------------------------

### Install Project Dependencies using npm

Source: https://ui.shadcn.com/docs/installation/manual

This bash command installs a set of essential npm packages for the project. These dependencies include utilities for styling (`class-variance-authority`, `clsx`, `tailwind-merge`), icon library (`lucide-react`), and animation effects (`tw-animate-css`).

```bash
npm install class-variance-authority clsx tailwind-merge lucide-react tw-animate-css
```

--------------------------------

### Install React Resizable Panels Dependency Manually

Source: https://ui.shadcn.com/docs/components/resizable

This `npm` command installs the core `react-resizable-panels` library, which the `Resizable` component is built upon. It is a prerequisite for manual setup and provides the underlying functionality for resizable UI elements.

```bash
npm install react-resizable-panels
```

--------------------------------

### Install Shadcn UI Skeleton component using CLI

Source: https://ui.shadcn.com/docs/components/skeleton

Provides the command-line instruction to add the `Skeleton` component to your project if you are using Shadcn UI's CLI. This automates the setup process for the component.

```bash
npx shadcn@latest add skeleton
```

--------------------------------

### Install Dependencies with pnpm

Source: https://ui.shadcn.com/docs/blocks

Installs project dependencies using pnpm package manager. Required before starting development on the block.

```bash
pnpm install
```

--------------------------------

### Install Pagination Component - Bash CLI

Source: https://ui.shadcn.com/docs/components/pagination

Command-line installation of the pagination component using the shadcn CLI tool. This is the recommended installation method for projects using shadcn/ui.

```bash
npx shadcn@latest add pagination
```

--------------------------------

### Install Sonner Dependencies Manually

Source: https://ui.shadcn.com/docs/components/sonner

Manual installation command that installs Sonner and next-themes packages required for manual setup. Use this approach when you prefer to manually configure the component instead of using the CLI.

```bash
npm install sonner next-themes
```

--------------------------------

### Install Radix UI Separator Dependency via npm

Source: https://ui.shadcn.com/docs/components/separator

Install the core Radix UI React Separator dependency required for manual setup. Use this command when manually installing the component instead of using the CLI.

```bash
npm install @radix-ui/react-separator
```

--------------------------------

### Install Checkbox Component via CLI - Bash

Source: https://ui.shadcn.com/docs/components/checkbox

Command-line installation method for adding the checkbox component to a shadcn/ui project. Automatically handles component setup and dependency installation.

```bash
npx shadcn@latest add checkbox
```

--------------------------------

### Install Aspect Ratio Dependencies Manually

Source: https://ui.shadcn.com/docs/components/aspect-ratio

Manually installs the required Radix UI aspect-ratio dependency. Use this approach when you prefer manual setup or when the CLI method is not suitable for your project.

```bash
npm install @radix-ui/react-aspect-ratio
```

--------------------------------

### Install Input Component via CLI

Source: https://ui.shadcn.com/docs/components/input

Install the Input component using the shadcn CLI tool. This command downloads and sets up the component in your project's components directory with all necessary dependencies.

```bash
npx shadcn@latest add input
```

--------------------------------

### Create Remix Project with create-remix

Source: https://ui.shadcn.com/docs/installation/remix

Initialize a new Remix project using the create-remix command-line tool. This sets up the basic Remix application structure and dependencies.

```bash
npx create-remix@latest my-app
```

--------------------------------

### Install Shadcn UI Context Menu component via CLI (Bash)

Source: https://ui.shadcn.com/docs/components/context-menu

This command demonstrates how to easily add the Shadcn UI Context Menu component to your project using the `npx shadcn@latest add` command-line utility. This method automates the setup and configuration of the component.

```bash
npx shadcn@latest add context-menu
```

--------------------------------

### Install Vaul Dependency for Manual Setup

Source: https://ui.shadcn.com/docs/components/drawer

Manually install the Vaul package as a dependency when setting up the Drawer component without the CLI. Vaul is the underlying library that powers the Drawer functionality.

```bash
npm install vaul
```

--------------------------------

### Install Recharts Dependency via npm

Source: https://ui.shadcn.com/docs/components/chart

Installs the Recharts library as a project dependency for manual setup. Required when not using the CLI installation method.

```bash
npm install recharts
```

--------------------------------

### Install Shadcn UI Command Component

Source: https://ui.shadcn.com/docs/components/command

This section provides instructions for installing the Command menu component, offering both an automated CLI approach and a manual method. The CLI command automatically adds the component, while the manual installation requires installing the 'cmdk' package and then copying the component source code separately.

```bash
npx shadcn@latest add command
```

```bash
npm install cmdk
```

--------------------------------

### Install Components from Multiple Namespaced Registries

Source: https://ui.shadcn.com/docs/changelog

Use the @registry/name format to install components from different namespaced registries in a single command. Components are automatically resolved and installed from the correct registry sources.

```bash
npx shadcn add @acme/button @internal/auth-system
```

--------------------------------

### Install Block and Override Primitives in shadcn/ui

Source: https://ui.shadcn.com/docs/registry/examples

Configure a registry item to install a block from shadcn/ui and override default primitives with custom implementations from remote registries. This enables centralized dependency management for component hierarchies.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-login",
  "type": "registry:block",
  "registryDependencies": [
    "login-01",
    "https://example.com/r/button.json",
    "https://example.com/r/input.json",
    "https://example.com/r/label.json"
  ]
}
```

--------------------------------

### Define Initial shadcn registry.json Structure

Source: https://ui.shadcn.com/docs/registry/getting-started

This JSON snippet illustrates the basic structure for a `registry.json` file, which serves as the entry point for a shadcn component registry. It includes the schema reference, registry name, homepage URL, and an empty array for registry items, conforming to the specified registry schema.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    // ...
  ]
}
```

--------------------------------

### List All Components from a Registry

Source: https://ui.shadcn.com/docs/changelog

Display all available components from a specified namespaced registry. Useful for discovering available components before installation.

```bash
npx shadcn list @acme
```

--------------------------------

### Execute shadcn Registry Build Script

Source: https://ui.shadcn.com/docs/registry/getting-started

This command runs the `registry:build` script defined in `package.json`. Executing this script triggers the shadcn CLI to generate the registry JSON files, typically placed in a `public/r` directory by default.

```bash
npm run registry:build
```

--------------------------------

### Install Shadcn UI Select Component via CLI

Source: https://ui.shadcn.com/docs/components/select

This command illustrates the quickest way to add the Shadcn UI Select component to your project. It utilizes the `npx shadcn@latest add` utility to automatically install dependencies and configure the component.

```bash
npx shadcn@latest add select
```

--------------------------------

### Configure shadcn Build Script in package.json

Source: https://ui.shadcn.com/docs/registry/getting-started

This JSON snippet updates the `package.json` file by adding a `registry:build` script. This script executes the `shadcn build` command, which is used to generate the necessary JSON files for the component registry.

```json
{
  "scripts": {
    "registry:build": "shadcn build"
  }
}
```

--------------------------------

### Install Resources from Namespaced Registries

Source: https://ui.shadcn.com/docs/components-json

Install components and resources using the namespace syntax after configuring registries. Supports installing from public registries, private authenticated registries, and multiple resources in a single command.

```bash
# Install from a configured registry
npx shadcn@latest add @v0/dashboard

# Install from private registry
npx shadcn@latest add @private/button

# Install multiple resources
npx shadcn@latest add @acme/header @internal/auth-utils
```

--------------------------------

### Install Kbd Component via CLI (shadcn/ui)

Source: https://ui.shadcn.com/docs/components/kbd

Provides the command-line interface instruction to add the `Kbd` component to a project using `shadcn@latest`. This is the recommended and easiest method for integrating the component.

```bash
npx shadcn@latest add kbd
```

--------------------------------

### Handle `shadcn/ui` Initialization with React 19 Peer Dependency Prompt (npm)

Source: https://ui.shadcn.com/docs/react-19

This `bash` snippet illustrates the interactive prompt from the `shadcn/ui` CLI when initializing a project (`npx shadcn@latest init -d`) while using React 19 with `npm`. It guides users to select a resolution strategy, either `--force` or `--legacy-peer-deps`, to address potential peer dependency conflicts during the shadcn/ui installation process.

```bash
It looks like you are using React 19.
Some packages may fail to install due to peer dependency issues (see https://ui.shadcn.com/react-19).

? How would you like to proceed? › - Use arrow-keys. Return to submit.
❯   Use --force
    Use --legacy-peer-deps
```

--------------------------------

### Install shadcn/ui Label Component via CLI

Source: https://ui.shadcn.com/docs/components/label

This `bash` command uses the `shadcn/ui` CLI to quickly add the `Label` component to your project. It automates the process of fetching and integrating the component's files and dependencies, streamlining setup.

```bash
npx shadcn@latest add label
```

--------------------------------

### Add Components to Monorepo Workspace

Source: https://ui.shadcn.com/docs/monorepo

Add shadcn/ui components to your monorepo application by navigating to the app directory and running the add command. The CLI automatically determines component type and installs files to correct paths with proper import handling.

```bash
cd apps/web
npx shadcn@latest add [COMPONENT]
```

--------------------------------

### Install Shadcn UI Spinner Component via CLI (Bash)

Source: https://ui.shadcn.com/docs/components/spinner

Provides the command-line interface (CLI) instruction to add the Shadcn UI Spinner component to your project. This command automates the setup, including creating the component file and configuring necessary dependencies. Ensure you have the Shadcn UI CLI installed globally or locally before running this command.

```bash
npx shadcn@latest add spinner
```

--------------------------------

### Install Drawer Component via CLI

Source: https://ui.shadcn.com/docs/components/drawer

Install the shadcn Drawer component using the CLI tool. This is the recommended installation method that automatically sets up all dependencies and copies necessary files to your project.

```bash
npx shadcn@latest add drawer
```

--------------------------------

### Install Navigation Menu via CLI - shadcn/ui

Source: https://ui.shadcn.com/docs/components/navigation-menu

Quick installation command for adding the navigation-menu component to a shadcn/ui project using the CLI tool. Requires Node.js and npm to be installed.

```bash
npx shadcn@latest add navigation-menu
```

--------------------------------

### View Registry Component Before Installation

Source: https://ui.shadcn.com/docs/changelog

Preview a component from a namespaced registry without installing it. Displays component code and all dependencies upfront for review.

```bash
npx shadcn view @acme/auth-system
```

--------------------------------

### Install Shadcn Hover Card Component via CLI

Source: https://ui.shadcn.com/docs/components/hover-card

This command-line interface (CLI) snippet demonstrates how to add the Shadcn UI Hover Card component to your project using `npx shadcn@latest add`. This method automates the installation and setup process for the component, including copying necessary files and updating configurations.

```bash
npx shadcn@latest add hover-card
```

--------------------------------

### Install Toggle Group Dependencies via npm

Source: https://ui.shadcn.com/docs/components/toggle-group

Install the required Radix UI toggle group dependency manually using npm. Required for projects that prefer manual component setup.

```bash
npm install @radix-ui/react-toggle-group
```

--------------------------------

### Import and Use Button Component in TanStack Start

Source: https://ui.shadcn.com/docs/installation/tanstack

Import the Button component from the components/ui directory and render it in your application. This example shows basic usage within a React functional component in the app/routes/index.tsx file.

```tsx
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

--------------------------------

### Install Carousel Component via CLI

Source: https://ui.shadcn.com/docs/components/carousel

shadcn/ui CLI command to automatically install and configure the carousel component with all dependencies and file setup. Simplest method for adding the carousel to your project.

```bash
npx shadcn@latest add carousel
```

--------------------------------

### Install Resizable Component using Shadcn CLI

Source: https://ui.shadcn.com/docs/components/resizable

This command-line interface (CLI) snippet shows how to add the `resizable` component to a project using the `shadcn` utility. It simplifies the installation process by automatically configuring the component and its dependencies.

```bash
npx shadcn@latest add resizable
```

--------------------------------

### Install Menubar via CLI - Bash

Source: https://ui.shadcn.com/docs/components/menubar

Command to install the menubar component using the shadcn package manager CLI. This is the quickest installation method that automatically downloads and configures the component for your project.

```bash
npx shadcn@latest add menubar
```

--------------------------------

### Install Radio Group via CLI - Bash

Source: https://ui.shadcn.com/docs/components/radio-group

Command-line interface installation method for adding the radio-group component to a shadcn/ui project. This is the recommended approach as it automatically handles file copying and setup.

```bash
npx shadcn@latest add radio-group
```

--------------------------------

### Define reusable registry block with components

Source: https://ui.shadcn.com/docs/registry/examples

Create a registry block item that bundles multiple related files (pages and components) with their dependencies. This block specifies registry dependencies on other components and defines file paths with content references for installation into target locations in the project structure.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "login-01",
  "type": "registry:block",
  "description": "A simple login form.",
  "registryDependencies": ["button", "card", "input", "label"],
  "files": [
    {
      "path": "blocks/login-01/page.tsx",
      "content": "import { LoginForm } ...",
      "type": "registry:page",
      "target": "app/login/page.tsx"
    },
    {
      "path": "blocks/login-01/components/login-form.tsx",
      "content": "...",
      "type": "registry:component"
    }
  ]
}
```

--------------------------------

### Install Radix UI Context Menu dependency manually (Bash)

Source: https://ui.shadcn.com/docs/components/context-menu

This command is part of the manual installation process, showing how to install the core `@radix-ui/react-context-menu` dependency using npm. This dependency provides the fundamental building blocks for the Shadcn UI Context Menu.

```bash
npm install @radix-ui/react-context-menu
```

--------------------------------

### Install Native Select component via CLI

Source: https://ui.shadcn.com/docs/components/native-select

Use the shadcn CLI to easily add the Native Select component to your project. This command will scaffold the necessary files and update dependencies automatically, streamlining the setup process.

```bash
npx shadcn@latest add native-select
```

--------------------------------

### Install Empty Component via CLI

Source: https://ui.shadcn.com/docs/components/empty

Command to install the Empty component using the shadcn package manager. Automatically adds the component and its dependencies to the project.

```bash
npx shadcn@latest add empty
```

--------------------------------

### Install shadcn Table component and TanStack React Table

Source: https://ui.shadcn.com/docs/components/data-table

Installation commands to add the Table component from shadcn and the TanStack React Table dependency to your project. These are prerequisites for building data tables with this guide.

```bash
npx shadcn@latest add table
```

```bash
npm install @tanstack/react-table
```

--------------------------------

### Install Switch Component via CLI

Source: https://ui.shadcn.com/docs/components/switch

Command-line installation method for adding the Switch component to a shadcn/ui project. Uses the official CLI tool to automatically download and configure the component with all required dependencies.

```bash
npx shadcn@latest add switch
```

--------------------------------

### Start Development Server with pnpm

Source: https://ui.shadcn.com/docs/blocks

Starts the development server for the www application at http://localhost:3333. Enables live preview of blocks during development.

```bash
pnpm www:dev
```

--------------------------------

### Install Shadcn UI Badge component via CLI (Bash)

Source: https://ui.shadcn.com/docs/components/badge

This command line interface snippet demonstrates how to add the Shadcn UI Badge component to a project using the `npx shadcn` utility. It simplifies the setup process by automating the component file generation.

```bash
npx shadcn@latest add badge
```

--------------------------------

### Item Component Installation - Bash

Source: https://ui.shadcn.com/docs/components/item

CLI command to install the Item component from shadcn. Requires Node.js and npm/pnpm package manager.

```bash
npx shadcn@latest add item
```

--------------------------------

### CLI Command: Initialize Project from Local File

Source: https://ui.shadcn.com/docs/changelog

The `shadcn` CLI now supports initializing projects from local JSON files. This command allows users to set up a project using a local `template.json`, enabling zero-setup development and local testing of registry items.

```bash
npx shadcn init ./template.json
```

--------------------------------

### Create components.json Configuration File for shadcn/ui

Source: https://ui.shadcn.com/docs/installation/manual

This JSON configuration file sets up the shadcn/ui component library with New York style, TypeScript/TSX support, Tailwind CSS styling with CSS variables, and path aliases for easier imports. Place this file in the root of your project directory to enable component scaffolding and configuration.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

--------------------------------

### Initialize shadcn Project with init Command

Source: https://ui.shadcn.com/docs/cli

The init command sets up a new shadcn project by installing dependencies, adding the cn utility, and configuring CSS variables. It supports template selection, base color configuration, and directory structure options.

```bash
npx shadcn@latest init
```

```bash
Usage: shadcn init [options] [components...]

initialize your project and install dependencies

Arguments:
  components         name, url or local path to component

Options:
  -t, --template <template>      the template to use. (next, next-monorepo)
  -b, --base-color <base-color>  the base color to use. (neutral, gray, zinc, stone, slate)
  -y, --yes                      skip confirmation prompt. (default: true)
  -f, --force                    force overwrite of existing configuration. (default: false)
  -c, --cwd <cwd>                the working directory. defaults to the current directory.
  -s, --silent                   mute output. (default: false)
  --src-dir                      use the src directory when creating a new project. (default: false)
  --no-src-dir                   do not use the src directory when creating a new project.
  --css-variables                use css variables for theming. (default: true)
  --no-css-variables             do not use css variables for theming.
  --no-base-style                do not install the base shadcn style
  -h, --help                     display help for command
```

--------------------------------

### Install Tailwind CSS and Autoprefixer

Source: https://ui.shadcn.com/docs/installation/remix

Install Tailwind CSS and Autoprefixer as development dependencies to enable styling support for shadcn/ui components in your Remix project.

```bash
npm install -D tailwindcss@latest autoprefixer@latest
```

--------------------------------

### Interactive Configuration Questions for shadcn init

Source: https://ui.shadcn.com/docs/changelog

Configuration prompts displayed during the shadcn init setup process. Users answer questions about style, base color, CSS file location, CSS variables usage, Tailwind config path, component/utils import aliases, and React Server Components support.

```text
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › app/globals.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes
```

--------------------------------

### Install Tooltip Dependencies via npm

Source: https://ui.shadcn.com/docs/components/tooltip

Manual installation of the Radix UI tooltip dependency. Required when not using the shadcn CLI installation method. Install this package before copying the tooltip component source.

```bash
npm install @radix-ui/react-tooltip
```

--------------------------------

### Install Shadcn UI Dialog component using CLI or npm

Source: https://ui.shadcn.com/docs/components/dialog

Instructions for installing the Shadcn UI Dialog component. Provides options for using the Shadcn CLI to add the component or manually installing the underlying Radix UI dependency.

```bash
npx shadcn@latest add dialog
```

```bash
npm install @radix-ui/react-dialog
```

--------------------------------

### Install Toggle Component via CLI

Source: https://ui.shadcn.com/docs/components/toggle

Install the Toggle component using the shadcn CLI tool. This command downloads and sets up the component with all dependencies in your project.

```bash
npx shadcn@latest add toggle
```

--------------------------------

### Install Sheet Component via CLI

Source: https://ui.shadcn.com/docs/components/sheet

Command to install the Sheet component and its dependencies using the shadcn CLI. This is the recommended installation method for projects using shadcn/ui.

```bash
npx shadcn@latest add sheet
```

--------------------------------

### Install Shadcn UI Popover component

Source: https://ui.shadcn.com/docs/components/popover

These commands provide two methods for installing the Popover component into your project. The CLI method uses `npx shadcn` to add the component automatically, while the manual method involves installing the core Radix UI dependency via npm and then copying the component source code. Ensure your project is set up to use shadcn/ui before installing components.

```bash
npx shadcn@latest add popover
```

```bash
npm install @radix-ui/react-popover
```

--------------------------------

### Install Sonner via CLI

Source: https://ui.shadcn.com/docs/components/sonner

Command-line installation method using shadcn-cli to add the Sonner component to a project. This is the quickest way to set up Sonner with all necessary dependencies.

```bash
npx shadcn@latest add sonner
```

--------------------------------

### Complete Bar Chart with XAxis Implementation

Source: https://ui.shadcn.com/docs/components/chart

Full React component example using the 'use client' directive for client-side rendering. Demonstrates a complete bar chart setup with sample data for desktop and mobile metrics across six months, including XAxis configuration with custom tick formatting.

```tsx
"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

--------------------------------

### Environment Variables Setup

Source: https://ui.shadcn.com/docs/registry/authentication

Set registry authentication token in .env.local file. This stores the secret token that will be used for Bearer authentication when accessing private component registries.

```bash
REGISTRY_TOKEN=your_secret_token_here
```

--------------------------------

### Install Table Component via CLI

Source: https://ui.shadcn.com/docs/components/table

CLI command to install the shadcn/ui Table component using npx. This automatically adds the component to your project.

```bash
npx shadcn@latest add table
```

--------------------------------

### Install next-themes package

Source: https://ui.shadcn.com/docs/dark-mode/next

This command installs the `next-themes` package, a crucial dependency for implementing dark mode functionality in Next.js applications.

```bash
npm install next-themes
```

--------------------------------

### Install Separator Component via CLI

Source: https://ui.shadcn.com/docs/components/separator

Install the Separator component using the shadcn CLI tool. This command automatically downloads and sets up the component in your project with all required dependencies.

```bash
npx shadcn@latest add separator
```

--------------------------------

### Install Menubar Dependencies - Bash

Source: https://ui.shadcn.com/docs/components/menubar

Manual installation command for the Radix UI menubar dependency. Use this when manually setting up the component instead of using the CLI. Requires Node.js package manager (npm).

```bash
npm install @radix-ui/react-menubar
```

--------------------------------

### Basic Empty State Demo with Project Icon

Source: https://ui.shadcn.com/docs/components/empty

Complete example demonstrating a basic empty state with header containing icon media, title, and description, plus action buttons in the content area. Uses Tabler and Lucide icons for visual elements.

```tsx
import { IconFolderCode } from "@tabler/icons-react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  )
}
```

--------------------------------

### Import and Basic Checkbox Implementation - React TypeScript

Source: https://ui.shadcn.com/docs/components/checkbox

Minimal example showing how to import the Checkbox component and render it with default props. Starting point for integrating checkboxes into React applications.

```tsx
import { Checkbox } from "@/components/ui/checkbox"

<Checkbox />
```

--------------------------------

### Install Tooltip via shadcn CLI

Source: https://ui.shadcn.com/docs/components/tooltip

Command-line installation method for adding the Tooltip component to a shadcn/ui project. This is the recommended approach for quickly adding pre-configured component files.

```bash
npx shadcn@latest add tooltip
```

--------------------------------

### Install Slider Component via CLI

Source: https://ui.shadcn.com/docs/components/slider

Command-line installation method for adding the Slider component to a shadcn/ui project. This is the quickest way to install the component and its dependencies.

```bash
npx shadcn@latest add slider
```

--------------------------------

### Install Shadcn Alert component via CLI

Source: https://ui.shadcn.com/docs/components/alert

This command provides a quick way to add the Shadcn Alert component to your project using the command-line interface. It leverages `npx` to execute the `shadcn` utility for component installation.

```bash
npx shadcn@latest add alert
```

--------------------------------

### Create a Basic shadcn Component in TSX

Source: https://ui.shadcn.com/docs/registry/getting-started

This TypeScript React (TSX) code defines a simple `HelloWorld` component that renders a button with 'Hello World' text. It imports the `Button` component from a local UI library, demonstrating how to structure a component intended for the shadcn registry.

```tsx
import { Button } from "@/components/ui/button"

export function HelloWorld() {
  return <Button>Hello World</Button>
}
```

--------------------------------

### Complete registry.json Schema Structure

Source: https://ui.shadcn.com/docs/registry/registry-json

Full example of a registry.json file showing all main properties including schema reference, registry metadata, and component items with dependencies and file definitions. This demonstrates the complete structure needed to set up a custom component registry.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "shadcn",
  "homepage": "https://ui.shadcn.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "registryDependencies": [
        "button",
        "@acme/input-form",
        "https://example.com/r/foo"
      ],
      "dependencies": ["is-even@3.0.0", "motion"],
      "files": [
        {
          "path": "registry/new-york/hello-world/hello-world.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

--------------------------------

### Install Radix UI Switch Dependency

Source: https://ui.shadcn.com/docs/components/switch

NPM installation command for the Radix UI switch primitive dependency. Required when manually installing the Switch component without using the shadcn CLI tool.

```bash
npm install @radix-ui/react-switch
```

--------------------------------

### Button Size Variants Example

Source: https://ui.shadcn.com/docs/components/button

Comprehensive example showing all Button size options: sm, icon-sm, default, icon, lg, and icon-lg. Demonstrates text and icon buttons at different sizes.

```typescript
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonSize() {
  return (
    <div className="flex flex-col items-start gap-8 sm:flex-row">
      <div className="flex items-start gap-2">
        <Button size="sm" variant="outline">
          Small
        </Button>
        <Button size="icon-sm" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline">Default</Button>
        <Button size="icon" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
      <div className="flex items-start gap-2">
        <Button variant="outline" size="lg">
          Large
        </Button>
        <Button size="icon-lg" aria-label="Submit" variant="outline">
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  )
}
```

--------------------------------

### Create custom style extending shadcn/ui

Source: https://ui.shadcn.com/docs/registry/examples

Define a custom registry style that extends shadcn/ui by installing dependencies, adding registry dependencies (components and remote blocks), and configuring CSS variables for fonts and brand colors in light and dark modes. This configuration is applied when running `npx shadcn init`.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "example-style",
  "type": "registry:style",
  "dependencies": ["@tabler/icons-react"],
  "registryDependencies": [
    "login-01",
    "calendar",
    "https://example.com/r/editor.json"
  ],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

--------------------------------

### Example Shadcn UI Registry Configuration (JSON)

Source: https://ui.shadcn.com/docs/registry/registry-index

This JSON configuration demonstrates a valid structure for a Shadcn UI registry. It includes a schema reference, the registry's name and homepage, and an array of items, each representing a component or example with its type, title, description, and associated file paths. This structure adheres to the specified registry schema requirements.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "login-form",
      "type": "registry:component",
      "title": "Login Form",
      "description": "A login form component.",
      "files": [
        {
          "path": "registry/new-york/auth/login-form.tsx",
          "type": "registry:component"
        }
      ]
    },
    {
      "name": "example-login-form",
      "type": "registry:component",
      "title": "Example Login Form",
      "description": "An example showing how to use the login form component.",
      "files": [
        {
          "path": "registry/new-york/examples/example-login-form.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

--------------------------------

### Manually install Radix UI Alert Dialog dependency with npm

Source: https://ui.shadcn.com/docs/components/alert-dialog

This `bash` command is used for manual installation of the Shadcn UI Alert Dialog component, specifically for installing its underlying Radix UI primitive. It adds the `@radix-ui/react-alert-dialog` package as a dependency to your project. This step is required before copying the component source code.

```bash
npm install @radix-ui/react-alert-dialog
```

--------------------------------

### Component Diff Output Example

Source: https://ui.shadcn.com/docs/changelog

Example output showing differences in a component's code. The diff displays additions and removals, showing what has changed in the upstream repository.

```diff
const alertVariants = cva(
- "relative w-full rounded-lg border",
+ "relative w-full pl-12 rounded-lg border"
)
```

--------------------------------

### Install Button Dependencies via npm

Source: https://ui.shadcn.com/docs/components/button

Manual installation of required dependencies for the Button component. Install the @radix-ui/react-slot package which provides slot composition functionality.

```bash
npm install @radix-ui/react-slot
```

--------------------------------

### Install Multiple Resources from Different Namespaces

Source: https://ui.shadcn.com/docs/registry/namespace

Install multiple resources from different namespaced registries in a single command. Supports combining resources from UI components, libraries, and AI prompts across various registries.

```bash
npx shadcn@latest add @acme/header @lib/auth-utils @ai/chatbot-rules
```

--------------------------------

### CLI Error: Missing Registry Environment Variables

Source: https://ui.shadcn.com/docs/changelog

This example demonstrates the CLI's helpful error for missing environment variables required by a registry. It explicitly lists the necessary variables, like `REGISTRY_TOKEN`, and instructs users to set them in `.env` or `.env.local` files.

```txt
Registry "@private" requires the following environment variables:
  • REGISTRY_TOKEN

Set the required environment variables to your .env or .env.local file.
```

--------------------------------

### Define Universal Registry Item for ESLint Configuration (shadcn/ui)

Source: https://ui.shadcn.com/docs/registry/examples

This JSON configuration defines a shadcn/ui registry item named 'my-eslint-config' for a custom ESLint configuration. It specifies a single file with an explicit target path (~/.eslintrc.json), enabling universal installation of the ESLint config file without framework dependencies.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "my-eslint-config",
  "type": "registry:item",
  "files": [
    {
      "path": "/path/to/your/registry/default/custom-eslint.json",
      "type": "registry:file",
      "target": "~/.eslintrc.json",
      "content": "..."
    }
  ]
}
```

--------------------------------

### Configure Plugin with NPM Dependencies in shadcn UI

Source: https://ui.shadcn.com/docs/registry/examples

Shows how to include external npm packages as dependencies when using Tailwind CSS plugins. The `dependencies` array declares required packages, while the `css` object configures both the plugin and custom CSS layers. This pattern ensures all required packages are installed before the component is used.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "typography-component",
  "type": "registry:item",
  "dependencies": ["@tailwindcss/typography"],
  "css": {
    "@plugin \"@tailwindcss/typography\"": {},
    "@layer components": {
      ".prose": {
        "max-width": "65ch"
      }
    }
  }
}
```

--------------------------------

### Install Shadcn Accordion Component (bash)

Source: https://ui.shadcn.com/docs/components/accordion

This snippet provides two methods for installing the Shadcn UI Accordion component. Users can either add the component directly using the Shadcn CLI or manually install the underlying Radix UI dependency via npm. Both methods prepare the project for using the Accordion component by adding necessary files and packages.

```bash
npx shadcn@latest add accordion
```

```bash
npm install @radix-ui/react-accordion
```

--------------------------------

### Install Navigation Menu Dependencies - npm

Source: https://ui.shadcn.com/docs/components/navigation-menu

Manual installation of required Radix UI navigation menu dependency. Use this approach when manually setting up the component instead of using the CLI.

```bash
npm install @radix-ui/react-navigation-menu
```

--------------------------------

### Configure Secure Custom Registry with Authorization Headers (JSON)

Source: https://ui.shadcn.com/docs/registry/namespace

Provides an example of configuring a custom company registry in `components.json`, including a URL and authorization headers with an environment variable. This setup demonstrates best practices for securely connecting to private registries, requiring explicit authentication.

```json
{
  "@company": {
    "url": "https://registry.company.com/v1/{name}.json",
    "headers": {
      "Authorization": "Bearer ${COMPANY_TOKEN}",
      "X-Registry-Version": "1.0"
    }
  }
}
```

--------------------------------

### Install Shadcn UI ScrollArea component via CLI (Bash)

Source: https://ui.shadcn.com/docs/components/scroll-area

Provides the command-line interface command to quickly add the `scroll-area` component to your project using the `shadcn` CLI tool. This automates the setup process, including dependencies and component files.

```bash
npx shadcn@latest add scroll-area
```

--------------------------------

### Install Button Component via CLI

Source: https://ui.shadcn.com/docs/components/button

Quick installation of the Button component using the shadcn CLI tool. Automatically adds the button component and its dependencies to your project.

```bash
npx shadcn@latest add button
```

--------------------------------

### Install Tabs Dependencies via NPM - Bash

Source: https://ui.shadcn.com/docs/components/tabs

Manual npm installation of the Radix UI Tabs dependency. Use this method when manually adding the tabs component instead of using the CLI installer.

```bash
npm install @radix-ui/react-tabs
```

--------------------------------

### Install Checkbox Dependencies - Bash

Source: https://ui.shadcn.com/docs/components/checkbox

Manual installation command for the Radix UI checkbox dependency. Required when manually setting up the checkbox component without using the CLI.

```bash
npm install @radix-ui/react-checkbox
```

--------------------------------

### Add Components with add Command

Source: https://ui.shadcn.com/docs/cli

The add command installs specific components and their dependencies into your project. It supports single or multiple component installation, file overwriting, and path customization.

```bash
npx shadcn@latest add [component]
```

```bash
Usage: shadcn add [options] [components...]

add a component to your project

Arguments:
  components         name, url or local path to component

Options:
  -y, --yes           skip confirmation prompt. (default: false)
  -o, --overwrite     overwrite existing files. (default: false)
  -c, --cwd <cwd>     the working directory. defaults to the current directory.
  -a, --all           add all available components (default: false)
  -p, --path <path>   the path to add the component to.
  -s, --silent        mute output. (default: false)
  --src-dir           use the src directory when creating a new project. (default: false)
  --no-src-dir        do not use the src directory when creating a new project.
  --css-variables     use css variables for theming. (default: true)
  --no-css-variables  do not use css variables for theming.
  -h, --help          display help for command
```

--------------------------------

### Create new React project with Vite

Source: https://ui.shadcn.com/docs/installation/vite

Initializes a new React project using Vite. This command uses the latest version of Vite and allows selecting the 'React + TypeScript' template during the interactive setup process.

```bash
npm create vite@latest
```

--------------------------------

### Manually Install Radix UI Label npm Dependency

Source: https://ui.shadcn.com/docs/components/label

For manual installation of the `shadcn/ui` Label component, this `npm` command installs its core dependency, `@radix-ui/react-label`. This step is followed by copying the component's source code into your project and updating import paths.

```bash
npm install @radix-ui/react-label
```

--------------------------------

### Install Single Resource from Namespaced Registry

Source: https://ui.shadcn.com/docs/registry/namespace

Install a single resource from a configured namespace using the shadcn CLI. The syntax uses @namespace/resource-name format to specify which registry and resource to install.

```bash
npx shadcn@latest add @v0/dashboard
```

--------------------------------

### Import and Use shadcn/ui Switch Component in React

Source: https://ui.shadcn.com/docs/installation/laravel

Import and render the Switch component in a React page component within a Laravel Inertia application. The component is imported from the generated ui directory and can be used like any other React component.

```typescript
import { Switch } from "@/components/ui/switch"

const MyPage = () => {
  return (
    <div>
      <Switch />
    </div>
  )
}

export default MyPage
```

--------------------------------

### Add UI Components with add Command

Source: https://ui.shadcn.com/docs/changelog

Use the add command to install UI components from shadcn into your project. The CLI automatically resolves dependencies, formats components based on your components.json configuration, and installs them with correct import paths and styling methods.

```bash
npx shadcn@latest add
```

--------------------------------

### Install Button Group via CLI - Bash

Source: https://ui.shadcn.com/docs/components/button-group

Command-line installation script for the Button Group component using the shadcn package manager. This is the recommended installation method that automatically sets up the component with dependencies.

```bash
npx shadcn@latest add button-group
```

--------------------------------

### Add Environment Variables to Registry Item JSON

Source: https://ui.shadcn.com/docs/registry/registry-item-json

This JSON configuration specifies environment variables to be added to a project's `.env.local` or `.env` file upon installation. It's intended for development or example variables, and existing variables are not overwritten. Users are cautioned against using this for production environment variables.

```json
{
  "envVars": {
    "NEXT_PUBLIC_APP_URL": "http://localhost:4000",
    "DATABASE_URL": "postgresql://postgres:postgres@localhost:5432/postgres",
    "OPENAI_API_KEY": ""
  }
}
```

--------------------------------

### Radix UI Migration: Import Path Update Example

Source: https://ui.shadcn.com/docs/changelog

This `diff` example illustrates the effect of the `radix` migration command on component files. It shows how an import for `AlertDialogPrimitive` is changed from `@radix-ui/react-dialog` to the new `radix-ui` package.

```diff
- import * as AlertDialogPrimitive from "@radix-ui/react-dialog"
+ import { AlertDialog as AlertDialogPrimitive } from "radix-ui"
```

--------------------------------

### Install Dropdown Menu Dependencies

Source: https://ui.shadcn.com/docs/components/dropdown-menu

NPM installation command for the Radix UI dropdown menu primitive dependency. Required when manually adding the component without using the shadcn/ui CLI tool.

```bash
npm install @radix-ui/react-dropdown-menu
```

--------------------------------

### Define Universal Registry Item for Python Cursor Rules (shadcn/ui)

Source: https://ui.shadcn.com/docs/registry/examples

This JSON configuration defines a shadcn/ui registry item named 'python-rules' for custom Cursor rules. It specifies a single file with an explicit target path (~/.cursor/rules/custom-python.mdc), allowing the rule file to be installed universally without framework detection.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "python-rules",
  "type": "registry:item",
  "files": [
    {
      "path": "/path/to/your/registry/default/custom-python.mdc",
      "type": "registry:file",
      "target": "~/.cursor/rules/custom-python.mdc",
      "content": "..."
    }
  ]
}
```

--------------------------------

### Install Toggle Component Dependencies Manually

Source: https://ui.shadcn.com/docs/components/toggle

Install the required Radix UI toggle dependency manually for projects that don't use the shadcn CLI. This is the first step when manually setting up the Toggle component.

```bash
npm install @radix-ui/react-toggle
```

--------------------------------

### Add Components with Shadcn CLI

Source: https://ui.shadcn.com/docs/changelog

This command demonstrates how to use the Shadcn CLI to add a specific component from a registry to your project. It automatically handles installation and updates the project's 'components.json' file.

```bash
npx shadcn add @ai-elements/prompt-input
```

--------------------------------

### Install Breadcrumb Component via CLI

Source: https://ui.shadcn.com/docs/components/breadcrumb

Command to install the breadcrumb component and its dependencies using the shadcn/ui CLI tool. This is the recommended installation method.

```bash
npx shadcn@latest add breadcrumb
```

--------------------------------

### Install Shadcn UI Alert Dialog via CLI

Source: https://ui.shadcn.com/docs/components/alert-dialog

This `bash` command demonstrates how to easily add the `alert-dialog` component to your project using the Shadcn UI command-line interface. Executing this command will download and configure the necessary files for the component automatically. Ensure you have `npx` available in your environment.

```bash
npx shadcn@latest add alert-dialog
```

--------------------------------

### Initialize MCP Server for shadcn Registries

Source: https://ui.shadcn.com/docs/changelog

Set up MCP (Model Context Protocol) server for all configured registries with zero configuration. Enables integration with MCP clients for AI-assisted component discovery and installation.

```bash
npx shadcn@latest mcp init
```

--------------------------------

### Install Chart Component via CLI

Source: https://ui.shadcn.com/docs/components/chart

Installs the chart.tsx component using shadcn's CLI tool. This command automatically sets up the chart component file in the project structure.

```bash
npx shadcn@latest add chart
```

--------------------------------

### Install Radix UI Avatar Dependency

Source: https://ui.shadcn.com/docs/components/avatar

Installs the @radix-ui/react-avatar package required for the Avatar component. Use this for manual installation when not using the CLI.

```bash
npm install @radix-ui/react-avatar
```

--------------------------------

### Install Card Component via CLI - shadcn

Source: https://ui.shadcn.com/docs/components/card

Install the Card component using the shadcn CLI tool. This command downloads and integrates the Card component into your project's components directory.

```bash
npx shadcn@latest add card
```

--------------------------------

### KbdGroup Component API Usage Example (React/TypeScript)

Source: https://ui.shadcn.com/docs/components/kbd

Provides a basic example of the `KbdGroup` component as part of its API reference, demonstrating how to wrap multiple `Kbd` components to indicate a sequence or combination of keys.

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>
```

--------------------------------

### Initialize shadcn/ui in project

Source: https://ui.shadcn.com/docs/installation/react-router

Execute the `shadcn/ui` initialization command to configure the UI library within the existing project. This process sets up the project's theme, component directory, and other essential configurations for `shadcn/ui`.

```bash
npx shadcn@latest init
```

--------------------------------

### Quick Configuration with Basic Registries

Source: https://ui.shadcn.com/docs/registry/namespace

Set up a minimal components.json with two basic namespaced registries (v0 and acme). This configuration enables installing resources from both public and private registries.

```json
{
  "registries": {
    "@v0": "https://v0.dev/chat/b/{name}",
    "@acme": "https://registry.acme.com/resources/{name}.json"
  }
}
```

--------------------------------

### Install Tabs Component via CLI - Bash

Source: https://ui.shadcn.com/docs/components/tabs

Command-line interface installation method for adding the tabs component to a shadcn/ui project. This is the quickest way to add the component with all dependencies automatically configured.

```bash
npx shadcn@latest add tabs
```

--------------------------------

### Install Radix UI Slider Dependency

Source: https://ui.shadcn.com/docs/components/slider

Manual installation of the @radix-ui/react-slider dependency required for the Slider component. This is used when manually setting up the component instead of using the CLI.

```bash
npm install @radix-ui/react-slider
```

--------------------------------

### Install Radix UI Dialog Dependency

Source: https://ui.shadcn.com/docs/components/sheet

NPM installation command for the @radix-ui/react-dialog package, which is the underlying dependency for the Sheet component.

```bash
npm install @radix-ui/react-dialog
```

--------------------------------

### Adding Custom Tailwind Colors

Source: https://ui.shadcn.com/docs/registry/faq

JSON configuration showing how to add custom Tailwind color variables for both light and dark themes using the cssVars property.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "cssVars": {
    "light": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    },
    "dark": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    }
  }
}
```

--------------------------------

### Install Shadcn UI Field Component via CLI

Source: https://ui.shadcn.com/docs/components/field

Installs the Shadcn UI Field component using the command-line interface. This command automatically adds the necessary files and dependencies to your project.

```bash
npx shadcn@latest add field
```

--------------------------------

### Install Shadcn Collapsible Component via CLI

Source: https://ui.shadcn.com/docs/components/collapsible

This command-line interface instruction shows how to quickly add the Shadcn UI Collapsible component to your project using the `shadcn` CLI tool. It streamlines the installation process by fetching and configuring the component automatically, including its dependencies and boilerplate code.

```bash
npx shadcn@latest add collapsible
```

--------------------------------

### Install Textarea Component via CLI

Source: https://ui.shadcn.com/docs/components/textarea

Install the textarea component using the shadcn CLI tool. This command adds the textarea component to your project automatically.

```bash
npx shadcn@latest add textarea
```

--------------------------------

### Install Radix UI Collapsible Dependency Manually

Source: https://ui.shadcn.com/docs/components/collapsible

This command installs the core `@radix-ui/react-collapsible` package, which is a prerequisite for manually setting up the Collapsible component in a React project. It ensures that the fundamental primitive is available for use, allowing for custom implementation.

```bash
npm install @radix-ui/react-collapsible
```

--------------------------------

### Install Custom Shadcn Component with CLI

Source: https://ui.shadcn.com/docs/registry/namespace

This bash command uses the `shadcn` CLI to add a custom component. It installs the component, which in turn resolves its `registryDependencies` and applies any specified overrides, such as custom CSS variables.

```bash
npx shadcn@latest add @my-company/custom-button
```

--------------------------------

### Get Carousel API Instance and Track State

Source: https://ui.shadcn.com/docs/components/carousel

Initialize carousel state management using setApi prop to obtain a CarouselApi instance. This allows tracking the current slide position and total slide count through React state and useEffect hooks. The example renders a carousel with numbered items and displays the current slide information.

```tsx
"use client"

import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"

export function CarouselDApiDemo() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="mx-auto max-w-xs">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="text-muted-foreground py-2 text-center text-sm">
        Slide {current} of {count}
      </div>
    </div>
  )
}
```

--------------------------------

### Scoped and File-Based Plugin Configuration

Source: https://ui.shadcn.com/docs/registry/examples

Demonstrates how to configure scoped npm packages, Tailwind plugin utilities, and local file-based plugins in a single registry item. Supports npm scoped packages like `@headlessui/tailwindcss`, core Tailwind plugin utilities, and relative file paths for custom plugins.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "scoped-plugins",
  "type": "registry:component",
  "css": {
    "@plugin \"@headlessui/tailwindcss\"": {},
    "@plugin \"tailwindcss/plugin\"": {},
    "@plugin \"./custom-plugin.js\"": {}
  }
}
```

--------------------------------

### Install Calendar Dependencies Manually

Source: https://ui.shadcn.com/docs/components/calendar

Manually install the required dependencies for the Calendar component. Requires react-day-picker for the calendar UI and date-fns for date manipulation utilities.

```bash
npm install react-day-picker date-fns
```

--------------------------------

### Install Input Group - CLI (bash)

Source: https://ui.shadcn.com/docs/components/input-group

Command to scaffold the input-group component using the shadcn CLI. Dependencies: Node.js and network access to install and run the npx package; Input: runs in project root; Output: adds component files to your project. Limitation: requires shadcn CLI and may need manual path adjustments after scaffolding.

```bash
npx shadcn@latest add input-group

```

--------------------------------

### Install Avatar Component via CLI

Source: https://ui.shadcn.com/docs/components/avatar

Installs the Avatar component and its dependencies using the shadcn CLI tool. This is the quickest method to add the component to your project.

```bash
npx shadcn@latest add avatar
```

--------------------------------

### Manually install Radix UI ScrollArea dependency (Bash)

Source: https://ui.shadcn.com/docs/components/scroll-area

Shows the `npm` command to install the core `@radix-ui/react-scroll-area` package, which is a prerequisite when manually setting up the Shadcn UI ScrollArea component. This step is part of the manual installation process.

```bash
npm install @radix-ui/react-scroll-area
```

--------------------------------

### Complete BarChart with Legend implementation

Source: https://ui.shadcn.com/docs/components/chart

Full client-side component example with chart data, configuration, and legend. Includes sample data for desktop and mobile visitors across six months with corresponding color configuration.

```typescript
"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function Component() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

--------------------------------

### URL Pattern with {name} Placeholder

Source: https://ui.shadcn.com/docs/registry/namespace

Demonstrates how the {name} placeholder is replaced with resource names during component installation. When installing @acme/button, the {name} is replaced with 'button' to construct the full registry URL.

```json
{
  "@acme": "https://registry.acme.com/{name}.json"
}
```

--------------------------------

### Basic Table Structure Usage

Source: https://ui.shadcn.com/docs/components/table

Minimal example showing how to structure a Table with header, body, and a single row of data. Demonstrates the basic layout without data mapping.

```tsx
<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

--------------------------------

### Create Gatsby Project

Source: https://ui.shadcn.com/docs/installation/gatsby

Initialize a new Gatsby project using the create-gatsby command. This sets up the basic project structure and dependencies required for a Gatsby application.

```bash
npm init gatsby
```

--------------------------------

### Configure Initial CSS Variables with @theme Directive

Source: https://ui.shadcn.com/docs/tailwind-v4

This CSS snippet demonstrates the initial setup of CSS variables within a `@layer base` block, and their referencing under the `@theme` directive. It shows how `hsl` wrappers are directly applied to the theme variables.

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
  }
}

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
}
```

--------------------------------

### Import and Use Switch Component

Source: https://ui.shadcn.com/docs/components/switch

Basic import statement and minimal usage example for the Switch component. Shows the simplest way to implement the Switch control in your React application.

```typescript
import { Switch } from "@/components/ui/switch"

<Switch />
```

--------------------------------

### Configure PostCSS for Remix

Source: https://ui.shadcn.com/docs/installation/remix

Create a postcss.config.js file that configures Tailwind CSS and Autoprefixer plugins for processing CSS in your Remix application.

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

--------------------------------

### Install Toggle Group Component via CLI

Source: https://ui.shadcn.com/docs/components/toggle-group

Install the Toggle Group component using shadcn CLI. This command adds the component and all its dependencies to your project automatically.

```bash
npx shadcn@latest add toggle-group
```

--------------------------------

### Complete Collapsible Sidebar Example with Inset Header (TypeScript/React)

Source: https://ui.shadcn.com/docs/components/sidebar

This comprehensive example presents a fully functional collapsible sidebar, integrating `SidebarProvider`, `Sidebar`, `SidebarContent`, and navigation menus. It also includes `SidebarInset` to define a distinct header area within the layout, which houses the `SidebarTrigger` for toggling the sidebar's visibility.

```tsx
"use client"

import {
  CalendarIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: HomeIcon,
  },
  {
    title: "Inbox",
    url: "#",
    icon: InboxIcon,
  },
  {
    title: "Calendar",
    url: "#",
    icon: CalendarIcon,
  },
  {
    title: "Search",
    url: "#",
    icon: SearchIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: SettingsIcon,
  },
]

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

--------------------------------

### Install Calendar Component via CLI

Source: https://ui.shadcn.com/docs/components/calendar

Install the shadcn Calendar component using the CLI tool. This command automatically adds the Calendar component and its dependencies to your project.

```bash
npx shadcn@latest add calendar
```

--------------------------------

### Implement a Basic Shadcn UI Select Theme Selector

Source: https://ui.shadcn.com/docs/components/select

This example illustrates the JSX structure for a simple Select component used as a theme switcher. It allows users to choose between 'light', 'dark', or 'system' themes, demonstrating a practical application of the component.

```tsx
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
```

--------------------------------

### ResizableHandle with withHandle Prop - Minimal Example

Source: https://ui.shadcn.com/docs/components/resizable

Minimal example showing a horizontal resizable panel group with two panels and a visible handle. The withHandle prop is set on line 11 to display the resize handle between panels.

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Example() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>One</ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

--------------------------------

### Add Complex Utility with Pseudo-selectors in shadcn/ui

Source: https://ui.shadcn.com/docs/registry/examples

Create advanced utility classes with pseudo-selectors and nested rules to handle complex styling patterns like custom scrollbar hiding across different browsers.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "css": {
    "@utility scrollbar-hidden": {
      "scrollbar-hidden": {
        "&::-webkit-scrollbar": {
          "display": "none"
        }
      }
    }
  }
}
```

--------------------------------

### Render Dynamic SidebarMenu with Projects in TSX

Source: https://ui.shadcn.com/docs/components/sidebar

This example demonstrates how to construct a complete sidebar menu using `SidebarProvider`, `Sidebar`, `SidebarContent`, `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuItem`, and `SidebarMenuButton`. It dynamically renders a list of project items with icons and links, showcasing a full implementation of the sidebar structure.

```tsx
"use client"\n\nimport {\n  FrameIcon,\n  LifeBuoyIcon,\n  MapIcon,\n  PieChartIcon,\n  SendIcon,\n} from "lucide-react"\n\nimport {\n  Sidebar,\n  SidebarContent,\n  SidebarGroup,\n  SidebarGroupContent,\n  SidebarGroupLabel,\n  SidebarMenu,\n  SidebarMenuButton,\n  SidebarMenuItem,\n  SidebarProvider,\n} from "@/components/ui/sidebar"\n\nconst projects = [\n  {\n    name: "Design Engineering",\n    url: "#",\n    icon: FrameIcon,\n  },\n  {\n    name: "Sales & Marketing",\n    url: "#",\n    icon: PieChartIcon,\n  },\n  {\n    name: "Travel",\n    url: "#",\n    icon: MapIcon,\n  },\n  {\n    name: "Support",\n    url: "#",\n    icon: LifeBuoyIcon,\n  },\n  {\n    name: "Feedback",\n    url: "#",\n    icon: SendIcon,\n  },\n]\n\nexport function AppSidebar() {\n  return (\n    <SidebarProvider>\n      <Sidebar>\n        <SidebarContent>\n          <SidebarGroup>\n            <SidebarGroupLabel>Projects</SidebarGroupLabel>\n            <SidebarGroupContent>\n              <SidebarMenu>\n                {projects.map((project) => (\n                  <SidebarMenuItem key={project.name}>\n                    <SidebarMenuButton asChild>\n                      <a href={project.url}>\n                        <project.icon />\n                        <span>{project.name}</span>\n                      </a>\n                    </SidebarMenuButton>\n                  </SidebarMenuItem>\n                ))}\n              </SidebarMenu>\n            </SidebarGroupContent>\n          </SidebarGroup>\n        </SidebarContent>\n      </Sidebar>\n    </SidebarProvider>\n  )\n}\n
```

--------------------------------

### Import UI Components from Monorepo Package

Source: https://ui.shadcn.com/docs/monorepo

Import shadcn/ui components from the @workspace/ui package using the configured aliases. Components are accessed through the ui alias pointing to the shared components directory.

```typescript
import { Button } from "@workspace/ui/components/button"
```

--------------------------------

### Basic Slider Usage Example

Source: https://ui.shadcn.com/docs/components/slider

Simple example showing basic usage of the Slider component with default configuration. Sets an initial value of 33, maximum value of 100, and step increment of 1.

```typescript
<Slider defaultValue={[33]} max={100} step={1} />
```

--------------------------------

### Manually Install Form Dependencies

Source: https://ui.shadcn.com/docs/components/form

This command lists the essential npm packages required for manually installing the form component. These dependencies include `@radix-ui/react-label`, `@radix-ui/react-slot`, `react-hook-form`, `@hookform/resolvers`, and `zod`, which are crucial for the component's functionality and validation capabilities.

```bash
npm install @radix-ui/react-label @radix-ui/react-slot react-hook-form @hookform/resolvers zod
```

--------------------------------

### Add Media Query CSS Imports in shadcn/ui

Source: https://ui.shadcn.com/docs/registry/examples

Conditionally import stylesheets using media query syntax to load styles based on device type and screen dimensions, enabling responsive stylesheet management.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "responsive-import",
  "type": "registry:item",
  "css": {
    "@import \"print-styles.css\" print": {},
    "@import url(\"mobile.css\") screen and (max-width: 768px)": {}
  }
}
```

--------------------------------

### Provide Documentation Message for Registry Item in JSON

Source: https://ui.shadcn.com/docs/registry/registry-item-json

This JSON snippet allows for a custom documentation message to be displayed when a registry item is installed via the CLI. It's useful for providing specific instructions or important notes to the user, enhancing the installation experience.

```json
{
  "docs": "To get an OPENAI_API_KEY, sign up for an account at https://platform.openai.com."
}
```

--------------------------------

### Overriding Tailwind Theme Variables

Source: https://ui.shadcn.com/docs/registry/faq

JSON configuration demonstrating how to add or override Tailwind theme variables including text size, easing functions, and font families.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "cssVars": {
    "theme": {
      "text-base": "3rem",
      "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
      "font-heading": "Poppins, sans-serif"
    }
  }
}
```

--------------------------------

### Inspect Registry Item Payload (Bash)

Source: https://ui.shadcn.com/docs/registry/namespace

Command-line instruction to view the raw payload of a registry item before installation. This helps in understanding the content of a resource and its dependencies, providing transparency about what will be installed.

```bash
npx shadcn@latest view @acme/button
```

--------------------------------

### CLI Command: Add Component from Local File

Source: https://ui.shadcn.com/docs/changelog

This command demonstrates how to add components, themes, or hooks from a local JSON file using the `shadcn` CLI. It facilitates faster development by allowing local testing and management of private or custom components before publishing.

```bash
npx shadcn add ./block.json
```

--------------------------------

### Basic Button Demo Component

Source: https://ui.shadcn.com/docs/components/button

Example React component demonstrating basic Button usage with outline variant and an icon button. Uses lucide-react icons and Tailwind CSS for layout.

```typescript
import { ArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  )
}
```

--------------------------------

### Install Calendar Blocks for shadcn

Source: https://ui.shadcn.com/docs/components/calendar

Command to install the latest calendar block components after upgrading the base Calendar component. Deploys pre-built calendar layout variations compatible with the upgraded component version.

```bash
npx shadcn@latest add calendar-02
```

--------------------------------

### Install Tailwind CSS dependencies

Source: https://ui.shadcn.com/docs/installation/vite

Installs Tailwind CSS and its Vite plugin as project dependencies. This step is necessary to integrate Tailwind CSS into the Vite build process, enabling utility-first styling.

```bash
npm install tailwindcss @tailwindcss/vite
```

--------------------------------

### Render Basic Keyboard Key Combinations (React/TypeScript)

Source: https://ui.shadcn.com/docs/components/kbd

Demonstrates how to display individual keyboard keys and simple key combinations using the `Kbd` and `KbdGroup` components. This example shows modifier keys and a 'Ctrl + B' combination for UI presentation.

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}
```

--------------------------------

### Basic Sheet Usage Example in TSX

Source: https://ui.shadcn.com/docs/components/sheet

Minimal Sheet implementation with trigger button, content area, header with title and description. Demonstrates the basic structure for creating a confirmation dialog.

```tsx
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

--------------------------------

### Define Custom Primary CSS Variables

Source: https://ui.shadcn.com/docs/theming

Provides an example of defining `--primary` and `--primary-foreground` CSS variables using the Oklch color format, adhering to the convention for background and foreground colors.

```css
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
```

--------------------------------

### shadcn Build Command Usage and Options

Source: https://ui.shadcn.com/docs/cli

Complete usage documentation showing all available command-line options for the build command, including arguments for registry path and options for output directory, working directory, and help.

```bash
Usage: shadcn build [options] [registry]

build components for a shadcn registry

Arguments:
  registry             path to registry.json file (default: "./registry.json")

Options:
  -o, --output <path>  destination directory for json files (default: "./public/r")
  -c, --cwd <cwd>      the working directory. defaults to the current directory.
  -h, --help           display help for command
```

--------------------------------

### View Registry Items with view Command

Source: https://ui.shadcn.com/docs/cli

The view command allows you to preview components and items from the registry before installation. Supports viewing single or multiple items, including namespaced registry items.

```bash
npx shadcn@latest view [item]
```

```bash
npx shadcn@latest view button card dialog
```

```bash
npx shadcn@latest view @acme/auth @v0/dashboard
```

```bash
Usage: shadcn view [options] <items...>

view items from the registry

Arguments:
  items            the item names or URLs to view

Options:
  -c, --cwd <cwd>  the working directory. defaults to the current directory.
  -h, --help       display help for command
```

--------------------------------

### Import Hooks and Utilities from Monorepo

Source: https://ui.shadcn.com/docs/monorepo

Import custom hooks and utility functions from the @workspace/ui package using configured aliases. Provides access to theme hooks and utility functions like cn for className composition.

```typescript
import { useTheme } from "@workspace/ui/hooks/use-theme"
import { cn } from "@workspace/ui/lib/utils"
```

--------------------------------

### Configure components.json for Web App Workspace

Source: https://ui.shadcn.com/docs/monorepo

Configure the components.json file for the web app workspace with shadcn/ui schema, style settings, Tailwind CSS configuration, and path aliases for component imports. Maps local paths and external @workspace/ui package paths for seamless component resolution.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "../../packages/ui/src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "hooks": "@/hooks",
    "lib": "@/lib",
    "utils": "@workspace/ui/lib/utils",
    "ui": "@workspace/ui/components"
  }
}
```

--------------------------------

### Basic Tabs Usage Example - TSX

Source: https://ui.shadcn.com/docs/components/tabs

A minimal tabbed interface example with two tabs (Account and Password) and their corresponding content panels. Demonstrates the basic structure using defaultValue to set the active tab on initial render.

```tsx
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
```

--------------------------------

### Pagination Component Demo - TypeScript React

Source: https://ui.shadcn.com/docs/components/pagination

Basic pagination component example demonstrating the use of Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, and PaginationPrevious components. Shows active page state and ellipsis for page ranges.

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
```

--------------------------------

### Create Item Link with asChild Prop

Source: https://ui.shadcn.com/docs/changelog

Demonstrates using the asChild prop to render an Item component as a link element. This example shows a simple item wrapper around an anchor tag with media, content, and action elements.

```tsx
<Item asChild>
  <a href="/dashboard">
    <ItemMedia variant="icon">
      <HomeIcon />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Dashboard</ItemTitle>
      <ItemDescription>Overview of your account and activity.</ItemDescription>
    </ItemContent>
  </a>
</Item>
```

--------------------------------

### Email Input with Placeholder

Source: https://ui.shadcn.com/docs/components/input

Create an email input field with a placeholder attribute. This example shows how to configure the input type and provide user guidance through placeholder text.

```tsx
import { Input } from "@/components/ui/input"

export function InputDemo() {
  return <Input type="email" placeholder="Email" />
}
```

--------------------------------

### Install Node.js types for Vite configuration

Source: https://ui.shadcn.com/docs/installation/vite

Installs type definitions for Node.js as a development dependency. This is required for TypeScript to correctly type Node.js-specific modules like `path` which are often used in configuration files like `vite.config.ts`.

```bash
npm install -D @types/node
```

--------------------------------

### Install Embla Carousel Dependencies

Source: https://ui.shadcn.com/docs/components/carousel

NPM installation command for the Embla Carousel React library, required for the carousel component functionality. Run this command to add the necessary dependencies to your project.

```bash
npm install embla-carousel-react
```

--------------------------------

### Basic Registry Configuration with URL Templates

Source: https://ui.shadcn.com/docs/components-json

Configure multiple registries with simple URL template syntax. The {name} placeholder is automatically replaced with the resource name during installation. Supports multiple registry namespaces (@v0, @acme, @internal) for organizing component sources.

```json
{
  "registries": {
    "@v0": "https://v0.dev/chat/b/{name}",
    "@acme": "https://registry.acme.com/{name}.json",
    "@internal": "https://internal.company.com/{name}.json"
  }
}
```

--------------------------------

### Import and Use Button Component in Remix Route

Source: https://ui.shadcn.com/docs/installation/remix

Import the Button component from the ui folder and use it in a Remix route component. Demonstrates basic component usage in a Remix application.

```typescript
import { Button } from "~/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

--------------------------------

### Basic Shadcn UI Empty Component Usage

Source: https://ui.shadcn.com/docs/changelog

This example shows a fundamental implementation of the 'Empty' component. It displays an icon as media, a title ('No messages'), a description, and a call-to-action button within 'EmptyContent' for a simple empty state.

```tsx
<Empty>
  <EmptyMedia variant="icon">
    <InboxIcon />
  </EmptyMedia>
  <EmptyTitle>No messages</EmptyTitle>
  <EmptyDescription>You don't have any messages yet.</EmptyDescription>
  <EmptyContent>
    <Button>Send a message</Button>
  </EmptyContent>
</Empty>
```

--------------------------------

### GET /chat/api/open

Source: https://ui.shadcn.com/docs/registry/open-in-v0

Integrate your registry with Open in v0. This endpoint allows you to open a publicly accessible registry item in v0 by providing its URL.

```APIDOC
## GET /chat/api/open

### Description
This endpoint allows you to open a publicly accessible registry item in v0 by providing its URL. It redirects to or initiates an action within the v0 application.

### Method
GET

### Endpoint
/chat/api/open

### Parameters
#### Path Parameters
(None)

#### Query Parameters
- **url** (string) - Required - The publicly accessible URL of the registry item to open in v0.

#### Request Body
(None)

### Request Example
(N/A for GET request with query parameters)

### Response
#### Success Response (302 Redirect)
This endpoint typically performs a redirect or initiates an action within the v0 application, rather than returning a direct JSON response.

#### Response Example
(N/A)
```

--------------------------------

### Create Aspect Ratio Demo Component with Next.js Image

Source: https://ui.shadcn.com/docs/components/aspect-ratio

Demonstrates a complete example of the AspectRatio component displaying an image from Unsplash with a 16:9 ratio. The component uses Next.js Image for optimization and includes dark mode styling with brightness and grayscale effects.

```typescript
import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg">
      <Image
        src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </AspectRatio>
  )
}
```

--------------------------------

### Configure components.json for UI Package Workspace

Source: https://ui.shadcn.com/docs/monorepo

Configure the components.json file for the shared ui package workspace with shadcn/ui schema and @workspace/ui aliases. Defines how components, utilities, hooks, and libraries are resolved within the ui package.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@workspace/ui/components",
    "utils": "@workspace/ui/lib/utils",
    "hooks": "@workspace/ui/hooks",
    "lib": "@workspace/ui/lib",
    "ui": "@workspace/ui/components"
  }
}
```

--------------------------------

### Install Radix UI Radio Group Dependency - Bash

Source: https://ui.shadcn.com/docs/components/radio-group

npm installation command for the @radix-ui/react-radio-group package, required when manually setting up the radio-group component instead of using the CLI method.

```bash
npm install @radix-ui/react-radio-group
```

--------------------------------

### Add Functional Utilities with Variants in shadcn/ui

Source: https://ui.shadcn.com/docs/registry/examples

Define functional utility classes with wildcard variants that accept dynamic values, enabling flexible utilities like tab-size that adapt to theme variables.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "css": {
    "@utility tab-*": {
      "tab-size": "var(--tab-size-*)"
    }
  }
}
```

--------------------------------

### Install Radix UI Hover Card Dependency via npm

Source: https://ui.shadcn.com/docs/components/hover-card

This bash command installs the core `@radix-ui/react-hover-card` dependency, which is a primitive required for the Shadcn UI Hover Card component to function. It uses npm to add the package to your project's `node_modules`, making it available for use in your application.

```bash
npm install @radix-ui/react-hover-card
```

--------------------------------

### Configure import alias for UI components

Source: https://ui.shadcn.com/docs/components-json

Sets the import path alias specifically for UI components, allowing customization of the installation directory. Overrides the default location if needed.

```json
{
  "aliases": {
    "ui": "@/app/ui"
  }
}
```

--------------------------------

### CLI Command: Migrate Radix UI Imports

Source: https://ui.shadcn.com/docs/changelog

The `shadcn` CLI introduces a new command to migrate to the `radix-ui` package. Executing `npx shadcn@latest migrate radix` automatically updates all `@radix-ui/react-*` imports in UI components and installs `radix-ui` as a dependency.

```bash
npx shadcn@latest migrate radix
```

--------------------------------

### Add Environment Variables to shadcn UI Registry Item

Source: https://ui.shadcn.com/docs/registry/examples

Shows how to declare environment variables using the `envVars` field in a registry item. Variables are added to `.env.local` or `.env` files without overwriting existing values. Best practice is to use this for development and example variables only, never production secrets.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-item",
  "type": "registry:item",
  "envVars": {
    "NEXT_PUBLIC_APP_URL": "http://localhost:4000",
    "DATABASE_URL": "postgresql://postgres:postgres@localhost:5432/postgres",
    "OPENAI_API_KEY": ""
  }
}
```

--------------------------------

### Configure Global CSS Variables with Tailwind Theme

Source: https://ui.shadcn.com/docs/installation/manual

Set up root and dark mode CSS variables using oklch color model for light and dark themes. Imports Tailwind CSS and custom animations, defines custom dark variant, and establishes theme configuration including colors for UI elements, charts, and sidebar components. Uses @theme inline to map CSS variables to Tailwind color utilities.

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

--------------------------------

### Add URL-based CSS Imports in shadcn/ui

Source: https://ui.shadcn.com/docs/registry/examples

Import external stylesheets and web fonts using url() syntax for CDN resources and local files, enabling integration of Google Fonts and remote style libraries.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "font-import",
  "type": "registry:item",
  "css": {
    "@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap\")": {},
    "@import url('./local-styles.css')": {}
  }
}
```

--------------------------------

### Dropdown Menu with Items

Source: https://ui.shadcn.com/docs/components/item

Complete example demonstrating how to integrate Item components within a DropdownMenu. Shows rendering a list of people with avatars, usernames, and emails.

```APIDOC
## Dropdown Menu Integration Example

### Description
Complete example showing how to use Item components within a DropdownMenu to display a list of selectable people with avatars and details.

### Implementation
```tsx
"use client"

import { ChevronDownIcon } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

const people = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
]

export function ItemDropdown() {
  return (
    <div className="flex min-h-64 w-full max-w-md flex-col items-center gap-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-fit">
            Select <ChevronDownIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 [--radius:0.65rem]" align="end">
          {people.map((person) => (
            <DropdownMenuItem key={person.username} className="p-0">
              <Item size="sm" className="w-full p-2">
                <ItemMedia>
                  <Avatar className="size-8">
                    <AvatarImage src={person.avatar} className="grayscale" />
                    <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent className="gap-0.5">
                  <ItemTitle>{person.username}</ItemTitle>
                  <ItemDescription>{person.email}</ItemDescription>
                </ItemContent>
              </Item>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
```
```

--------------------------------

### Force Install `npm` Packages to Resolve Peer Dependency Conflicts

Source: https://ui.shadcn.com/docs/react-19

These `npm` commands provide two methods to bypass strict peer dependency checks when installing packages. `--force` ignores and overrides any dependency conflicts, while `--legacy-peer-deps` skips strict peer dependency checks, allowing installation of packages with unmet dependencies. Use these when packages haven't updated their peer dependency declarations for React 19.

```bash
npm i <package> --force

npm i <package> --legacy-peer-deps
```

--------------------------------

### Initialize shadcn MCP Server for AI Development Clients

Source: https://ui.shadcn.com/docs/registry/mcp

These `npx` commands initialize the shadcn Multi-Client Protocol (MCP) server, integrating it with specific AI development environments. Execute the relevant command in your project's root to enable your chosen AI client (e.g., Claude Code, Cursor, VS Code) to interact with your shadcn registry. Each command targets a different client via the `--client` flag, streamlining registry access for AI-driven component generation.

```bash
npx shadcn@latest mcp init --client claude
```

```bash
npx shadcn@latest mcp init --client cursor
```

```bash
npx shadcn@latest mcp init --client vscode
```

--------------------------------

### Empty State with Gradient Background

Source: https://ui.shadcn.com/docs/components/empty

Advanced empty state example using gradient background utilities (bg-gradient-to-b) and muted colors for a polished appearance. Includes notification bell icon and refresh button for notification context.

```tsx
import { IconBell } from "@tabler/icons-react"
import { RefreshCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyMuted() {
  return (
    <Empty className="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconBell />
        </EmptyMedia>
        <EmptyTitle>No Notifications</EmptyTitle>
        <EmptyDescription>
          You&apos;re all caught up. New notifications will appear here.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          <RefreshCcwIcon />
          Refresh
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```

--------------------------------

### Define Custom Animations with Keyframes and CSS Variables

Source: https://ui.shadcn.com/docs/registry/examples

Demonstrates how to create custom animations by defining both `@keyframes` in the css object and corresponding theme variables in `cssVars`. This pattern requires matching keyframe definitions and theme configuration to properly use animations in Tailwind classes.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "cssVars": {
    "theme": {
      "--animate-wiggle": "wiggle 1s ease-in-out infinite"
    }
  },
  "css": {
    "@keyframes wiggle": {
      "0%, 100%": {
        "transform": "rotate(-3deg)"
      },
      "50%": {
        "transform": "rotate(3deg)"
      }
    }
  }
}
```

--------------------------------

### Multi-Registry Setup Organized by Stability Level

Source: https://ui.shadcn.com/docs/registry/namespace

Configure registries separated by stability levels (stable, latest/beta, experimental) to manage resources across different release channels and maturity levels.

```json
{
  "@stable": "https://registry.company.com/stable/{name}.json",
  "@latest": "https://registry.company.com/beta/{name}.json",
  "@experimental": "https://registry.company.com/experimental/{name}.json"
}
```

--------------------------------

### Implement a basic Shadcn UI Dialog in React

Source: https://ui.shadcn.com/docs/components/dialog

Shows the fundamental structure for a Shadcn UI Dialog, including a trigger button and content with a header, title, and description. This basic setup allows users to open a dialog to display information or ask for confirmation.

```tsx
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

--------------------------------

### Menu Action Active State Styling

Source: https://ui.shadcn.com/docs/components/sidebar

TSX example showing how to make a menu action visible when its associated menu button is in an active state using peer data attributes.

```tsx
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuAction className="peer-data-[active=true]/menu-button:opacity-100" />
</SidebarMenuItem>
```

--------------------------------

### Install Shadcn UI Sidebar Component via CLI

Source: https://ui.shadcn.com/docs/components/sidebar

This command uses npx to add the Shadcn UI Sidebar component to your project. It fetches the latest version and integrates `sidebar.tsx` into your components directory. Run this command in your project's terminal.

```bash
npx shadcn@latest add sidebar
```

--------------------------------

### Create a new Astro project with TailwindCSS and React

Source: https://ui.shadcn.com/docs/installation/astro

This command initializes a new Astro project named 'astro-app'. It includes configurations for TailwindCSS, React, and initializes a Git repository, providing a solid foundation for development.

```bash
npx create-astro@latest astro-app  --template with-tailwindcss --install --add react --git
```

--------------------------------

### Create custom style from scratch without shadcn/ui

Source: https://ui.shadcn.com/docs/registry/examples

Define a standalone registry style that does not extend shadcn/ui (using `extends: none`) by specifying npm dependencies, registry dependencies for components, and custom CSS variables for theme colors. This enables creating entirely custom component systems independent of shadcn/ui defaults.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "extends": "none",
  "name": "new-style",
  "type": "registry:style",
  "dependencies": ["tailwind-merge", "clsx"],
  "registryDependencies": [
    "utils",
    "https://example.com/r/button.json",
    "https://example.com/r/input.json",
    "https://example.com/r/label.json",
    "https://example.com/r/select.json"
  ],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif"
    },
    "light": {
      "main": "#88aaee",
      "bg": "#dfe5f2",
      "border": "#000",
      "text": "#000",
      "ring": "#000"
    },
    "dark": {
      "main": "#88aaee",
      "bg": "#272933",
      "border": "#000",
      "text": "#e6e6e6",
      "ring": "#fff"
    }
  }
}
```

--------------------------------

### Create Basic AppSidebar Component in TSX

Source: https://ui.shadcn.com/docs/components/sidebar

This snippet demonstrates a simple React component, `AppSidebar`, that wraps the `Sidebar` component. It serves as an example of how to integrate the main `Sidebar` component into an application.

```tsx
import { Sidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
  return <Sidebar />
}
```

--------------------------------

### Empty State with Dashed Border Outline

Source: https://ui.shadcn.com/docs/components/empty

Example demonstrating an outlined empty state using the border utility class with dashed style. Includes cloud icon and upload files action button for file storage context.

```tsx
import { IconCloud } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyOutline() {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconCloud />
        </EmptyMedia>
        <EmptyTitle>Cloud Storage Empty</EmptyTitle>
        <EmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Upload Files
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```

--------------------------------

### Configure Tailwind and PostCSS in remix.config.js

Source: https://ui.shadcn.com/docs/installation/remix

Update the remix.config.js file to enable Tailwind CSS and PostCSS processing. This allows Remix to handle CSS compilation during development and build.

```javascript
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ...
  tailwind: true,
  postcss: true,
  ...
};
```

--------------------------------

### Configure Tailwind CSS import path

Source: https://ui.shadcn.com/docs/components-json

Defines the path to the CSS file that imports Tailwind CSS into the project. This helps the CLI locate and understand the Tailwind setup.

```json
{
  "tailwind": {
    "css": "styles/global.css"
  }
}
```

--------------------------------

### Complex Component Registry Configuration

Source: https://ui.shadcn.com/docs/registry/faq

A complete JSON schema defining a complex shadcn/ui registry item that includes a page, multiple components, a hook, utilities, and a config file with specified targets.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    {
      "path": "registry/new-york/hello-world/page.tsx",
      "type": "registry:page",
      "target": "app/hello/page.tsx"
    },
    {
      "path": "registry/new-york/hello-world/components/hello-world.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/hello-world/components/formatted-message.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/hello-world/hooks/use-hello.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/new-york/hello-world/lib/format-date.ts",
      "type": "registry:utils"
    },
    {
      "path": "registry/new-york/hello-world/hello.config.ts",
      "type": "registry:file",
      "target": "~/hello.config.ts"
    }
  ]
}
```

--------------------------------

### Create Shadcn UI Button with Icon Size (React/TypeScript)

Source: https://ui.shadcn.com/docs/changelog

This React/TypeScript example illustrates how to render a shadcn/ui button with the newly introduced `icon` size. It uses an icon from `lucide-react` within the button, demonstrating the compact, icon-only button variant.

```tsx
import { CircleFadingArrowUpIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonIcon() {
  return (
    <Button variant="outline" size="icon">
      <CircleFadingArrowUpIcon />
    </Button>
  )
}
```

--------------------------------

### Configure TypeScript Path Aliases in tsconfig.json

Source: https://ui.shadcn.com/docs/installation/manual

This JSON configuration snippet updates the `tsconfig.json` file to define a base URL and path aliases for easier module imports. It maps the `@/*` alias to the project's root directory (`./*`), allowing for absolute imports.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

--------------------------------

### Query Parameter Authentication Configuration

Source: https://ui.shadcn.com/docs/registry/authentication

Configure query parameter-based authentication for simpler registry setups. Appends authentication token as query parameter to the registry URL, resulting in URLs like https://registry.company.com/button.json?token=your_token.

```json
{
  "registries": {
    "@internal": {
      "url": "https://registry.company.com/{name}.json",
      "params": {
        "token": "${ACCESS_TOKEN}"
      }
    }
  }
}
```

--------------------------------

### Multiple Plugins with Automatic Deduplication

Source: https://ui.shadcn.com/docs/registry/examples

Illustrates how to declare multiple Tailwind CSS plugins with npm dependencies. The system automatically groups plugins together and removes duplicates. Multiple dependencies are declared in an array and corresponding plugins are referenced in the css object.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "multiple-plugins",
  "type": "registry:item",
  "dependencies": [
    "@tailwindcss/typography",
    "@tailwindcss/forms",
    "tw-animate-css"
  ],
  "css": {
    "@plugin \"@tailwindcss/typography\"": {},
    "@plugin \"@tailwindcss/forms\"": {},
    "@plugin \"tw-animate-css\"": {}
  }
}
```

--------------------------------

### Add Simple Utility Class in shadcn/ui

Source: https://ui.shadcn.com/docs/registry/examples

Create a simple custom utility class using @utility directive to add single CSS property utilities to Tailwind's utility layer for common styling needs.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-component",
  "type": "registry:component",
  "css": {
    "@utility content-auto": {
      "content-visibility": "auto"
    }
  }
}
```

--------------------------------

### Render Basic SidebarGroup Structure with Labels and Actions (TypeScript)

Source: https://ui.shadcn.com/docs/components/sidebar

This example demonstrates creating a fundamental `SidebarGroup` in a Shadcn UI sidebar. It showcases how to use `SidebarGroupLabel` for titles and `SidebarGroupContent` for nested menu items, along with an optional `SidebarGroupAction` to add interactive elements to the group header.

```tsx
"use client"

import { LifeBuoyIcon, SendIcon } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Help</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <LifeBuoyIcon />
                    Support
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <SendIcon />
                    Feedback
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

```tsx
import { Sidebar, SidebarContent, SidebarGroup } from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Project</span>
          </SidebarGroupAction>
          <SidebarGroupContent></SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
```

--------------------------------

### Import Tailwind CSS in Remix Root Component

Source: https://ui.shadcn.com/docs/installation/remix

Import the tailwind.css stylesheet in your app/root.tsx file and add it to the links function to ensure global styles are applied throughout the application.

```typescript
import styles from "./tailwind.css?url"

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]
```

--------------------------------

### Multi-Registry Setup Organized by Resource Type

Source: https://ui.shadcn.com/docs/registry/namespace

Configure registries separated by resource type (components, hooks, utilities, prompts) to organize resources by their functional category. Each namespace points to a different endpoint for its specific resource type.

```json
{
  "@components": "https://cdn.company.com/components/{name}.json",
  "@hooks": "https://cdn.company.com/hooks/{name}.json",
  "@utils": "https://cdn.company.com/utils/{name}.json",
  "@prompts": "https://cdn.company.com/ai-prompts/{name}.json"
}
```

--------------------------------

### Use Aspect Ratio with Image Content

Source: https://ui.shadcn.com/docs/components/aspect-ratio

Simple usage example showing how to wrap an image with the AspectRatio component, maintaining a 16:9 ratio. The image is set to cover the entire container with proper styling.

```typescript
<AspectRatio ratio={16 / 9}>
  <Image src="..." alt="Image" className="rounded-md object-cover" />
</AspectRatio>
```

--------------------------------

### Add Basic CSS Imports in shadcn/ui Registry

Source: https://ui.shadcn.com/docs/registry/examples

Include CSS imports in registry items using @import directives to load external stylesheets and frameworks. Imports are automatically placed at the top of generated CSS files.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-import",
  "type": "registry:component",
  "css": {
    "@import \"tailwindcss\"": {},
    "@import \"./styles/base.css\"": {}
  }
}
```

--------------------------------

### Migrate React Component from `forwardRef` to Props

Source: https://ui.shadcn.com/docs/tailwind-v4

This example demonstrates how to refactor a React component to remove `React.forwardRef`. It shows the transformation from using `forwardRef` and `displayName` to a simpler named functional component that accepts props directly and includes a `data-slot` attribute.

```tsx
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b last:border-b-0", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"
```

```tsx
function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b last:border-b-0", className)}
      {...props}
    />
  )
}
```

--------------------------------

### Combined Imports and Plugins with Ordered CSS Processing

Source: https://ui.shadcn.com/docs/registry/examples

Shows the proper ordering of CSS directives in shadcn UI: imports first, then plugins, followed by layer and utility declarations. This pattern ensures correct CSS cascade and specificity when using both `@import` and `@plugin` directives with custom layers and utilities.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "combined-example",
  "type": "registry:item",
  "dependencies": ["@tailwindcss/typography", "tw-animate-css"],
  "css": {
    "@import \"tailwindcss\"": {},
    "@import url(\"https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap\")": {},
    "@plugin \"@tailwindcss/typography\"": {},
    "@plugin \"tw-animate-css\"": {},
    "@layer base": {
      "body": {
        "font-family": "Inter, sans-serif"
      }
    },
    "@utility content-auto": {
      "content-visibility": "auto"
    }
  }
}
```

--------------------------------

### Render Single Keyboard Key (React/TypeScript)

Source: https://ui.shadcn.com/docs/components/kbd

Illustrates the basic usage of the `Kbd` component to display a single keyboard key, such as 'Ctrl'. This snippet is used for both general usage examples and within the API reference.

```tsx
<Kbd>Ctrl</Kbd>
```

--------------------------------

### Implement a Nested Sidebar Menu with `SidebarMenuSub` in TypeScript/React

Source: https://ui.shadcn.com/docs/components/sidebar

This example demonstrates how to integrate `SidebarMenuSub` components to create a multi-level sidebar navigation. It uses a predefined `items` array to dynamically render main menu items with nested sub-items, utilizing `SidebarProvider`, `Sidebar`, and other related components for a complete menu structure.

```tsx
"use client"\n\nimport {\n  Sidebar,\n  SidebarContent,\n  SidebarGroup,\n  SidebarGroupContent,\n  SidebarMenu,\n  SidebarMenuButton,\n  SidebarMenuItem,\n  SidebarMenuSub,\n  SidebarMenuSubButton,\n  SidebarMenuSubItem,\n  SidebarProvider,\n} from \"@/components/ui/sidebar\"\n\nconst items = [\n  {\n    title: \"Getting Started\",\n    url: \"#\",\n    items: [\n      {\n        title: \"Installation\",\n        url: \"#\",\n      },\n      {\n        title: \"Project Structure\",\n        url: \"#\",\n      },\n    ],\n  },\n  {\n    title: \"Building Your Application\",\n    url: \"#\",\n    items: [\n      {\n        title: \"Routing\",\n        url: \"#\",\n      },\n      {\n        title: \"Data Fetching\",\n        url: \"#\",\n        isActive: true,\n      },\n      {\n        title: \"Rendering\",\n        url: \"#\",\n      },\n      {\n        title: \"Caching\",\n        url: \"#\",\n      },\n      {\n        title: \"Styling\",\n        url: \"#\",\n      },\n      {\n        title: \"Optimizing\",\n        url: \"#\",\n      },\n      {\n        title: \"Configuring\",\n        url: \"#\",\n      },\n      {\n        title: \"Testing\",\n        url: \"#\",\n      },\n      {\n        title: \"Authentication\",\n        url: \"#\",\n      },\n      {\n        title: \"Deploying\",\n        url: \"#\",\n      },\n      {\n        title: \"Upgrading\",\n        url: \"#\",\n      },\n      {\n        title: \"Examples\",\n        url: \"#\",\n      },\n    ],\n  },\n  {\n    title: \"API Reference\",\n    url: \"#\",\n    items: [\n      {\n        title: \"Components\",\n        url: \"#\",\n      },\n      {\n        title: \"File Conventions\",\n        url: \"#\",\n      },\n      {\n        title: \"Functions\",\n        url: \"#\",\n      },\n      {\n        title: \"next.config.js Options\",\n        url: \"#\",\n      },\n      {\n        title: \"CLI\",\n        url: \"#\",\n      },\n      {\n        title: \"Edge Runtime\",\n        url: \"#\",\n      },\n    ],\n  },\n  {\n    title: \"Architecture\",\n    url: \"#\",\n    items: [\n      {\n        title: \"Accessibility\",\n        url: \"#\",\n      },\n      {\n        title: \"Fast Refresh\",\n        url: \"#\",\n      },\n      {\n        title: \"Next.js Compiler\",\n        url: \"#\",\n      },\n      {\n        title: \"Supported Browsers\",\n        url: \"#\",\n      },\n      {\n        title: \"Turbopack\",\n        url: \"#\",\n      },\n    ],\n  },\n]\n\nexport function AppSidebar() {\n  return (\n    <SidebarProvider>\n      <Sidebar>\n        <SidebarContent>\n          <SidebarGroup>\n            <SidebarGroupContent>\n              <SidebarMenu>\n                {items.map((item, index) => (\n                  <SidebarMenuItem key={index}>\n                    <SidebarMenuButton asChild>\n                      <a href={item.url}>\n                        <span>{item.title}</span>\n                      </a>\n                    </SidebarMenuButton>\n                    <SidebarMenuSub>\n                      {item.items.map((subItem, subIndex) => (\n                        <SidebarMenuSubItem key={subIndex}>\n                          <SidebarMenuSubButton asChild>\n                            <a href={subItem.url}>\n                              <span>{subItem.title}</span>\n                            </a>\n                          </SidebarMenuSubButton>\n                        </SidebarMenuSubItem>\n                      ))}\n                    </SidebarMenuSub>\n                  </SidebarMenuItem>\n                ))}\n              </SidebarMenu>\n            </SidebarGroupContent>\n          </SidebarGroup>\n        </SidebarContent>\n      </Sidebar>\n    </SidebarProvider>\n  )\n}
```

--------------------------------

### EmptyMedia Component with Avatar

Source: https://ui.shadcn.com/docs/components/empty

Display an avatar in the empty state using EmptyMedia with default variant. This example demonstrates nesting AvatarImage and AvatarFallback components within EmptyMedia for a complete avatar display in empty state UI.

```tsx
<EmptyMedia>
  <Avatar>
    <AvatarImage src="..." />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</EmptyMedia>
```

--------------------------------

### Basic Breadcrumb Usage

Source: https://ui.shadcn.com/docs/components/breadcrumb

A simple breadcrumb navigation example showing home, components, and current breadcrumb page. Demonstrates the standard structure with items, separators, and the current page indicator.

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

--------------------------------

### EmptyContent Component with Button Action

Source: https://ui.shadcn.com/docs/components/empty

Display interactive content like buttons, inputs, or links in an empty state using EmptyContent component. This example shows a button for user action and supports className prop for styling customization.

```tsx
<EmptyContent>
  <Button>Add Project</Button>
</EmptyContent>
```

--------------------------------

### Define Registry Dependencies Across Multiple Sources

Source: https://ui.shadcn.com/docs/changelog

Declare component dependencies from different registries (default, community, private, utilities, AI resources). The system automatically resolves and installs dependencies from their respective registry sources.

```json
{
  "name": "dashboard",
  "type": "registry:block",
  "registryDependencies": [
    "@shadcn/card",
    "@v0/chart",
    "@acme/data-table",
    "@lib/data-fetcher",
    "@ai/analytics-prompt"
  ]
}
```

--------------------------------

### Importing and Using Kbd Components for Keyboard Inputs (TypeScript React)

Source: https://ui.shadcn.com/docs/changelog

Demonstrates how to import and use the `Kbd` component to display individual keyboard keys and `KbdGroup` to group multiple keys. These components are useful for indicating keyboard shortcuts or input instructions within UI elements. The examples show single keys, grouped keys, and combinations of keys and text.

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"
```

```tsx
<Kbd>Ctrl</Kbd>
```

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>

```

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <Kbd>⇧</Kbd>
        <Kbd>⌥</Kbd>
        <Kbd>⌃</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span>+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  )
}

```

--------------------------------

### InputGroupTextarea with Button

Source: https://ui.shadcn.com/docs/components/input-group

Example of using InputGroupTextarea with a block-end aligned button addon for message inputs.

```tsx
<InputGroup>
  <InputGroupTextarea placeholder="Enter message..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton>Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

--------------------------------

### Add Custom Theme Variables to shadcn/ui

Source: https://ui.shadcn.com/docs/registry/examples

Define custom CSS variables in the theme object to extend shadcn/ui's design system with project-specific values for typography, shadows, and other design tokens.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-theme",
  "type": "registry:theme",
  "cssVars": {
    "theme": {
      "font-heading": "Inter, sans-serif",
      "shadow-card": "0 0 0 1px rgba(0, 0, 0, 0.1)"
    }
  }
}
```

--------------------------------

### Generate Tokens with Expiration

Source: https://ui.shadcn.com/docs/registry/authentication

Create secure authentication tokens with automatic expiration dates for enhanced security. Tokens expire after a specified period (30 days in this example) to limit exposure from compromised credentials.

```typescript
function generateToken() {
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  return { token, expiresAt }
}
```

--------------------------------

### CLI Error: Unknown Registry Definition

Source: https://ui.shadcn.com/docs/changelog

This code block illustrates how the shadcn CLI provides clear error messages when an unknown registry is referenced. It guides users to define the registry in their `components.json` file, specifying the registry name and its corresponding URL.

```txt
Unknown registry "@acme". Make sure it is defined in components.json as follows:
{
  "registries": {
    "@acme": "[URL_TO_REGISTRY]"
  }
}
```

--------------------------------

### Trigger Simple Toast Message

Source: https://ui.shadcn.com/docs/components/sonner

Minimal example showing how to trigger a basic toast notification with a simple text message. This is the simplest form of Sonner usage.

```typescript
toast("Event has been created.")
```

--------------------------------

### Embed Kbd in a Button Component (React/TypeScript)

Source: https://ui.shadcn.com/docs/components/kbd

Shows how to integrate the `Kbd` component within a `Button` component to display a keyboard shortcut directly alongside button text. This example uses outline and small-sized buttons.

```tsx
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"

export function KbdButton() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="sm" className="pr-2">
        Accept <Kbd>⏎</Kbd>
      </Button>
      <Button variant="outline" size="sm" className="pr-2">
        Cancel <Kbd>Esc</Kbd>
      </Button>
    </div>
  )
}
```

--------------------------------

### Full App Sidebar Implementation with SidebarGroupAction (TSX)

Source: https://ui.shadcn.com/docs/components/sidebar

This comprehensive example demonstrates how to construct an `AppSidebar` component using Shadcn UI. It showcases the integration of `SidebarGroupAction` within a `SidebarGroup` to add an 'Add Project' button, utilizing `lucide-react` icons and `sonner` toasts for interactive feedback. The component provides a structured navigation for various project categories.

```tsx
"use client"

import { FrameIcon, MapIcon, PieChartIcon, PlusIcon } from "lucide-react"
import { toast, Toaster } from "sonner"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Toaster
        position="bottom-left"
        toastOptions={{
          className: "ml-[160px]",
        }}
      />
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupAction
              title="Add Project"
              onClick={() => toast("You clicked the group action!")}
            >
              <PlusIcon /> <span className="sr-only">Add Project</span>
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <FrameIcon />
                      <span>Design Engineering</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <PieChartIcon />
                      <span>Sales & Marketing</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="#">
                      <MapIcon />
                      <span>Travel</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

--------------------------------

### Add Component CSS Layer in shadcn/ui

Source: https://ui.shadcn.com/docs/registry/examples

Define component-level styles using Tailwind's @layer components directive to create reusable styled components like cards with consistent design properties.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-card",
  "type": "registry:component",
  "css": {
    "@layer components": {
      "card": {
        "background-color": "var(--color-white)",
        "border-radius": "var(--rounded-lg)",
        "padding": "var(--spacing-6)",
        "box-shadow": "var(--shadow-xl)"
      }
    }
  }
}
```

--------------------------------

### Define Registry Item Dependencies (JSON)

Source: https://ui.shadcn.com/docs/registry/namespace

Illustrates how to declare `registryDependencies` within a `registry-item.json` file. This allows resources to specify dependencies from various registries, which the CLI automatically resolves and installs.

```json
{
  "name": "dashboard",
  "type": "registry:block",
  "registryDependencies": [
    "@shadcn/card",
    "@v0/chart",
    "@acme/data-table",
    "@lib/data-fetcher",
    "@ai/analytics-prompt"
  ]
}
```

--------------------------------

### Create a Skeleton loader for a card layout in TypeScript React

Source: https://ui.shadcn.com/docs/components/skeleton

Presents a more complex example (`SkeletonCard`) where multiple `Skeleton` components are combined to simulate a loading card with an image/header area and two lines of text. This showcases how to build structured loading states.

```tsx
import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
```

--------------------------------

### Configure shadcn MCP Server for VS Code

Source: https://ui.shadcn.com/docs/mcp

This snippet illustrates how to configure the shadcn MCP server for VS Code and GitHub Copilot by adding a 'shadcn' server definition to the '.vscode/mcp.json' file. The configuration uses 'npx shadcn@latest mcp' to start the server, enabling component interaction within VS Code.

```json
{
  "servers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

--------------------------------

### Registry Authentication for Open in v0

Source: https://ui.shadcn.com/docs/registry/open-in-v0

This section describes the recommended authentication mechanism for registry servers to integrate with Open in v0. Registry items can be accessed with a `token` query parameter for authentication.

```APIDOC
## GET /r/{item}.json (Registry Server Authentication)

### Description
This describes how a registry server should implement authentication for its items when accessed by `Open in v0`. It uses a `token` query parameter for authentication.

### Method
GET

### Endpoint
/r/{item}.json

### Parameters
#### Path Parameters
- **item** (string) - Required - The path to the specific registry item, typically ending with `.json`.

#### Query Parameters
- **token** (string) - Optional - A secure token used to authenticate access to the registry item. If provided, the server should validate it.

#### Request Body
(None)

### Request Example
(N/A for GET request with query parameters)

### Response
#### Success Response (200)
- Returns the content of the registry item (e.g., JSON).

#### Response Example
```json
{
  "name": "login-01",
  "description": "A login form with email and password fields.",
  "component": "<Login01 />"
}
```

#### Error Response (401 Unauthorized)
- **error** (string) - The error type, typically "Unauthorized".
- **message** (string) - A descriptive message about the authorization failure.

#### Response Example
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing token"
}
```
```

--------------------------------

### Initialize shadcn MCP Server for AI Clients

Source: https://ui.shadcn.com/docs/mcp

These commands initialize the shadcn MCP server for integration with various AI development environments. Each command specifies a target client (Claude Code, Cursor, VS Code, Codex), setting up the necessary configuration to enable AI assistants to browse, search, and install components. For Codex, an additional TOML configuration is required.

```bash
npx shadcn@latest mcp init --client claude
```

```bash
npx shadcn@latest mcp init --client cursor
```

```bash
npx shadcn@latest mcp init --client vscode
```

```bash
npx shadcn@latest mcp init --client codex
```

```toml
[mcp_servers.shadcn]
command = "npx"
args = ["shadcn@latest", "mcp"]
```

--------------------------------

### Configure Multiple Registries in components.json

Source: https://ui.shadcn.com/docs/registry/namespace

Set up multiple namespaced registries in your components.json configuration file. This example demonstrates organizing registries by type (UI, docs, AI, themes) and includes a private registry with authentication headers using environment variables.

```json
{
  "registries": {
    "@acme-ui": "https://registry.acme.com/ui/{name}.json",
    "@acme-docs": "https://registry.acme.com/docs/{name}.json",
    "@acme-ai": "https://registry.acme.com/ai/{name}.json",
    "@acme-themes": "https://registry.acme.com/themes/{name}.json",
    "@acme-internal": {
      "url": "https://internal.acme.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${INTERNAL_TOKEN}"
      }
    }
  }
}
```

--------------------------------

### Import and use shadcn/ui Button component in Next.js TSX

Source: https://ui.shadcn.com/docs/installation/next

This TypeScript JSX (TSX) example demonstrates how to import and render the `Button` component from shadcn/ui within a Next.js page. The component is imported from `@/components/ui/button`.

```tsx
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}
```

--------------------------------

### Authenticate registry requests - Next.js (TypeScript)

Source: https://ui.shadcn.com/docs/registry/open-in-v0

Example Next.js API route that validates a `token` query parameter and returns a 401 JSON error for invalid or missing tokens. Dependencies: NextRequest, NextResponse, and an `isValidToken` function plus a `registryItem` to return on success. Limitation: `isValidToken` and `registryItem` are placeholders and must be implemented according to your auth and data models.

```typescript
// Next.js API route example
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token")

  if (!isValidToken(token)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
        message: "Invalid or missing token",
      },
      { status: 401 }
    )
  }

  // Return the registry item
  return NextResponse.json(registryItem)
}

```

--------------------------------

### Basic Registry Configuration with URL Template

Source: https://ui.shadcn.com/docs/registry/namespace

Configure simple namespaced registries using URL template strings in components.json. The {name} placeholder is automatically replaced with the resource name when installing components. This approach works for public registries without authentication requirements.

```json
{
  "registries": {
    "@v0": "https://v0.dev/chat/b/{name}",
    "@acme": "https://registry.acme.com/resources/{name}.json",
    "@lib": "https://lib.company.com/utilities/{name}",
    "@ai": "https://ai-resources.com/r/{name}.json"
  }
}
```

--------------------------------

### Configure Private Registry with Environment Variable Authentication (JSON)

Source: https://ui.shadcn.com/docs/registry/namespace

Demonstrates how to configure a private registry in `components.json` using an environment variable for authorization. This setup ensures that authentication tokens are not hardcoded but expanded at runtime, enhancing security. The URL uses a placeholder for the registry name.

```json
{
  "registries": {
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${PRIVATE_REGISTRY_TOKEN}"
      }
    }
  }
}
```

--------------------------------

### Define custom theme with OKLCH color values

Source: https://ui.shadcn.com/docs/registry/examples

Create a custom registry theme using OKLCH color space for light and dark modes, defining colors for background, foreground, primary, ring, and sidebar-specific variables. OKLCH provides perceptually uniform color values for better color consistency across themes.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-theme",
  "type": "registry:theme",
  "cssVars": {
    "light": {
      "background": "oklch(1 0 0)",
      "foreground": "oklch(0.141 0.005 285.823)",
      "primary": "oklch(0.546 0.245 262.881)",
      "primary-foreground": "oklch(0.97 0.014 254.604)",
      "ring": "oklch(0.746 0.16 232.661)",
      "sidebar-primary": "oklch(0.546 0.245 262.881)",
      "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
      "sidebar-ring": "oklch(0.746 0.16 232.661)"
    },
    "dark": {
      "background": "oklch(1 0 0)",
      "foreground": "oklch(0.141 0.005 285.823)",
      "primary": "oklch(0.707 0.165 254.624)",
      "primary-foreground": "oklch(0.97 0.014 254.604)",
      "ring": "oklch(0.707 0.165 254.624)",
      "sidebar-primary": "oklch(0.707 0.165 254.624)",
      "sidebar-primary-foreground": "oklch(0.97 0.014 254.604)",
      "sidebar-ring": "oklch(0.707 0.165 254.624)"
    }
  }
}
```

--------------------------------

### Implement Resizable Panel Layouts with shadcn/ui React

Source: https://ui.shadcn.com/docs/changelog

This TypeScript React example showcases the creation of flexible, multi-directional resizable panel groups using shadcn/ui's `ResizablePanelGroup`, `ResizablePanel`, and `ResizableHandle` components. It enables users to dynamically adjust the size of content areas, supporting complex nested layouts for various UI needs. The underlying library is `react-resizable-panels`.

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={25}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Two</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

--------------------------------

### Basic Collapsible Component Usage in TypeScript React

Source: https://ui.shadcn.com/docs/components/collapsible

This example illustrates the fundamental structure for implementing a collapsible component using Shadcn UI. It shows how to wrap content with `Collapsible`, define a `CollapsibleTrigger` to toggle visibility, and place the expandable content within `CollapsibleContent` to create a basic interactive section.

```tsx
<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible>
```

--------------------------------

### Shadcn UI Empty Component with Avatar Media

Source: https://ui.shadcn.com/docs/changelog

This 'EmptyAvatar' example demonstrates using the 'Empty' component to show an 'User Offline' state. It features an 'Avatar' as the media element within 'EmptyMedia' and a button to leave a message, suitable for user profile contexts.

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyAvatar() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="default">
          <Avatar className="size-12">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="grayscale"
            />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </EmptyMedia>
        <EmptyTitle>User Offline</EmptyTitle>
        <EmptyDescription>
          This user is currently offline. You can leave a message to notify them
          or try again later.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Leave Message</Button>
      </EmptyContent>
    </Empty>
  )
}
```

--------------------------------

### Configure TypeScript Path Resolution in tsconfig.json

Source: https://ui.shadcn.com/docs/installation/gatsby

Configure the TypeScript compiler to resolve path aliases starting with '@/' to the './src/' directory. This enables cleaner import statements throughout your project.

```typescript
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  }
}
```

--------------------------------

### Calendar Component Usage Example in React

Source: https://ui.shadcn.com/docs/components/calendar

Basic usage pattern for rendering a single-select Calendar component with state management. Demonstrates setting selected date, handling date changes via onSelect callback, and applying custom className styling.

```tsx
const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />
)
```

--------------------------------

### Render Basic Menubar (Shadcn UI, React/JSX)

Source: https://ui.shadcn.com/docs/components/menubar

This code illustrates how to construct a basic Menubar component with a 'File' menu in a React/JSX application, utilizing imported components like Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, and MenubarSeparator. It demonstrates how to define menu items, including one with a keyboard shortcut, to create a functional UI navigation element.

```tsx
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Print</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

--------------------------------

### Basic Button Group Usage - TSX

Source: https://ui.shadcn.com/docs/components/button-group

Minimal example showing how to create a simple button group with two buttons. This demonstrates the basic structure and usage pattern of the ButtonGroup container component.

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

--------------------------------

### Upgrade Guide: Schema Package Import Path Change

Source: https://ui.shadcn.com/docs/changelog

For developers using programmatic APIs directly, the schema package import path has been updated. This diff shows the deprecation of `shadcn/registry` for `registryItemSchema` in favor of the new `shadcn/schema` package.

```diff
- import { registryItemSchema } from "shadcn/registry"
+ import { registryItemSchema } from "shadcn/schema"
```

--------------------------------

### Build Next.js Form with Field Component

Source: https://ui.shadcn.com/docs/forms/next

This example demonstrates the basic structure of a form in Next.js using the `<Form />` and `<Field />` components, integrated with `useActionState` for managing form state and errors. It shows how to bind form elements, display errors, and handle disabled states to create an accessible form.

```tsx
<Form action={formAction}>
  <FieldGroup>
    <Field data-invalid={!!formState.errors?.title?.length}>
      <FieldLabel htmlFor="title">Bug Title</FieldLabel>
      <Input
        id="title"
        name="title"
        defaultValue={formState.values.title}
        disabled={pending}
        aria-invalid={!!formState.errors?.title?.length}
        placeholder="Login button not working on mobile"
        autoComplete="off"
      />
      <FieldDescription>
        Provide a concise title for your bug report.
      </FieldDescription>
      {formState.errors?.title && (
        <FieldError>{formState.errors.title[0]}</FieldError>
      )}
    </Field>
  </FieldGroup>
  <Button type="submit">Submit</Button>
</Form>
```

--------------------------------

### Create a complex InputGroup with Textarea and controls in TSX

Source: https://ui.shadcn.com/docs/changelog

This TypeScript React example shows how to build a highly interactive `InputGroup` featuring a `InputGroupTextarea`. It integrates `InputGroupAddon` components for displaying metadata like line/column numbers, file information, and action buttons for running, refreshing, and copying code, simulating a basic code editor interface.

```tsx
import {
  IconBrandJavascript,
  IconCopy,
  IconCornerDownLeft,
  IconRefresh,
} from "@tabler/icons-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export function InputGroupTextareaExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
          className="min-h-[200px]"
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton size="sm" className="ml-auto" variant="default">
            Run <IconCornerDownLeft />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-mono font-medium">
            <IconBrandJavascript />
            script.js
          </InputGroupText>
          <InputGroupButton className="ml-auto" size="icon-xs">
            <IconRefresh />
          </InputGroupButton>
          <InputGroupButton variant="ghost" size="icon-xs">
            <IconCopy />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

--------------------------------

### Implement Shadcn UI Item with Actions and Link in TSX

Source: https://ui.shadcn.com/docs/changelog

Provides a React component (`ItemDemo`) showcasing the Shadcn UI `Item` component with interactive elements. It demonstrates adding `ItemActions` with a button and using the `asChild` prop to render an `Item` as a link, including media and navigation icons. This example requires `lucide-react` icons and the Shadcn `Button` component.

```tsx
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function ItemDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>
            A simple item with title and description.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" asChild>
        <a href="#">
          <ItemMedia>
            <BadgeCheckIcon className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Your profile has been verified.</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}
```

--------------------------------

### Multi-Registry Setup Organized by Team or Department

Source: https://ui.shadcn.com/docs/registry/namespace

Configure registries separated by team or department (design, engineering, marketing) allowing different organizational units to maintain their own resource registries with independent endpoints.

```json
{
  "@design": "https://design.company.com/registry/{name}.json",
  "@engineering": "https://eng.company.com/registry/{name}.json",
  "@marketing": "https://marketing.company.com/registry/{name}.json"
}
```

--------------------------------

### Implement a Responsive Drawer Component with Shadcn UI and Vaul (TypeScript/React)

Source: https://ui.shadcn.com/docs/changelog

This snippet demonstrates how to create a responsive drawer component using Shadcn UI's `Drawer` primitives, which are built on top of `Vaul`. It includes functionality to adjust a numeric goal with plus/minus buttons and visualizes data using a `Recharts` bar chart within the drawer content. Dependencies include `lucide-react`, `recharts`, and `@/components/ui` for Shadcn components.

```tsx
"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
]

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-muted-foreground text-[0.70rem] uppercase">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
```

--------------------------------

### Render diverse InputGroup configurations in TSX

Source: https://ui.shadcn.com/docs/changelog

This snippet demonstrates how to combine `InputGroupInput` and `InputGroupTextarea` with `InputGroupAddon` components to create structured input fields. It shows examples for domain name input with a '.com' suffix, a username input with an '@company.com' suffix, and a textarea with a dynamic character count display.

```tsx
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="!pl-0.5" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter your username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Enter your message" />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-muted-foreground text-xs">
            120 characters left
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
```

--------------------------------

### Implement Sidebar Footer with Dropdown Menu (Shadcn UI, TSX)

Source: https://ui.shadcn.com/docs/components/sidebar

This TypeScript React example demonstrates how to integrate a `DropdownMenu` component into the `SidebarFooter`. It uses several Shadcn UI components including `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarFooter`, `SidebarMenu`, `SidebarMenuItem`, and `SidebarMenuButton` to create a functional sidebar with an interactive footer for user actions.

```tsx
"use client"

import { ChevronUpIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    Username
                    <ChevronUpIcon className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-(--radix-popper-anchor-width)"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

```tsx
export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader />
        <SidebarContent />
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  )
}
```

--------------------------------

### Add custom brand color to shadcn/ui style

Source: https://ui.shadcn.com/docs/registry/examples

Extend the default shadcn/ui style by adding a custom `brand` color variable with OKLCH values for both light and dark modes. This approach maintains shadcn/ui defaults while introducing brand-specific color customization.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-style",
  "type": "registry:style",
  "cssVars": {
    "light": {
      "brand": "oklch(0.99 0.00 0)"
    },
    "dark": {
      "brand": "oklch(0.14 0.00 286)"
    }
  }
}
```

--------------------------------

### Build a Shadcn/ui Carousel Component with Card Items (TypeScript React)

Source: https://ui.shadcn.com/docs/changelog

This TypeScript React example demonstrates how to create a responsive carousel using shadcn/ui, featuring motion, swipe gestures, and keyboard support. It wraps content within `Card` components and includes navigation buttons for user interaction.

```tsx
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

--------------------------------

### Implement a Shadcn/ui Input OTP Component (TypeScript React)

Source: https://ui.shadcn.com/docs/changelog

This TypeScript React example shows how to create a fully featured One-Time Password (OTP) input component using shadcn/ui. It supports custom length and visual separation for enhanced user experience, ideal for authentication flows.

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

--------------------------------

### Configure TypeScript path aliases in tsconfig.json

Source: https://ui.shadcn.com/docs/installation/vite

Adds `baseUrl` and `paths` properties to the `compilerOptions` section of `tsconfig.json`. This configuration helps resolve module imports starting with `@/` to the `./src` directory, improving code organization and developer experience.

```typescript
{
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

--------------------------------

### Display DropdownMenu for SidebarMenuItem Action in TypeScript/React

Source: https://ui.shadcn.com/docs/components/sidebar

This concise TypeScript/React example focuses on embedding a Shadcn `DropdownMenu` directly within a `SidebarMenuItem`'s `SidebarMenuAction`. It shows the minimal structure required to display contextual options, such as 'Edit Project' and 'Delete Project', when an action icon is clicked. This snippet assumes the necessary Shadcn `DropdownMenu` and `Sidebar` components are imported and available.

```tsx
<SidebarMenuItem>
  <SidebarMenuButton asChild>
    <a href="#">
      <Home />
      <span>Home</span>
    </a>
  </SidebarMenuButton>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <SidebarMenuAction>
        <MoreHorizontal />
      </SidebarMenuAction>
    </DropdownMenuTrigger>
    <DropdownMenuContent side="right" align="start">
      <DropdownMenuItem>
        <span>Edit Project</span>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <span>Delete Project</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</SidebarMenuItem>
```

--------------------------------

### Basic usage of Shadcn UI ToggleGroup with single selection

Source: https://ui.shadcn.com/docs/components/toggle-group

This basic example demonstrates the fundamental structure of a ToggleGroup component configured for single selection. It illustrates how to define individual ToggleGroupItem elements with distinct values and apply 'variant' and 'size' props for appearance, such as an outline variant and small size.

```tsx
<ToggleGroup type="single" variant="outline" size="sm">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
</ToggleGroup>
```

--------------------------------

### Add Labels and Tooltips to Input Groups (Shadcn UI, TSX)

Source: https://ui.shadcn.com/docs/components/input-group

This example demonstrates how to incorporate `Label` components within `InputGroupAddon` for improved accessibility and clarity of input fields. It also shows the integration of a `Tooltip` with an `InfoIcon` to provide additional context or help information, enhancing the user's understanding of the input's purpose.

```tsx
import { InfoIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function InputGroupLabel() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup>
        <InputGroupInput id="email" placeholder="shadcn" />
        <InputGroupAddon>
          <Label htmlFor="email">@</Label>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput id="email-2" placeholder="shadcn@vercel.com" />
        <InputGroupAddon align="block-start">
          <Label htmlFor="email-2" className="text-foreground">
            Email
          </Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton
                variant="ghost"
                aria-label="Help"
                className="ml-auto rounded-full"
                size="icon-xs"
              >
                <InfoIcon />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>We&apos;ll use this to send you notifications</p>
            </TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

--------------------------------

### Add Base Styles Layer in shadcn/ui CSS

Source: https://ui.shadcn.com/docs/registry/examples

Define global base styles using Tailwind's @layer directive to style HTML elements like headings with theme variables, ensuring consistent typography across the application.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-style",
  "type": "registry:style",
  "css": {
    "@layer base": {
      "h1": {
        "font-size": "var(--text-2xl)"
      },
      "h2": {
        "font-size": "var(--text-xl)"
      }
    }
  }
}
```

--------------------------------

### Create new React Router project

Source: https://ui.shadcn.com/docs/installation/react-router

This command initializes a new React Router project using `create-react-router`. It sets up the basic project structure and dependencies, preparing the environment for further development.

```bash
npx create-react-router@latest my-app
```

--------------------------------

### Implement Input OTP with Custom Pattern in React (TSX)

Source: https://ui.shadcn.com/docs/components/input-otp

Shows how to apply a custom input pattern to the OTP component using the `pattern` prop and `REGEXP_ONLY_DIGITS_AND_CHARS` from `input-otp`. This example restricts input to only digits and characters, ensuring data integrity for specific OTP requirements.

```tsx
"use client"

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPPattern() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

--------------------------------

### Basic Empty State Usage Pattern

Source: https://ui.shadcn.com/docs/components/empty

Minimal implementation pattern showing the structure of an Empty component with header, media icon, title, description, and content with an action button.

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>
```

--------------------------------

### Shadcn UI Empty Component with Input Group for Search

Source: https://ui.shadcn.com/docs/changelog

The 'EmptyInputGroup' component showcases how to integrate an 'InputGroup' within an empty state. This setup is useful for '404 Not Found' pages where users can search for content or contact support, providing a clear call to action.

```tsx
import { SearchIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export function EmptyInputGroup() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className="sm:w-3/4">
          <InputGroupInput placeholder="Try searching for pages..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
```

--------------------------------

### Navigation Menu with Next.js Link - React TSX

Source: https://ui.shadcn.com/docs/components/navigation-menu

Example showing how to use the `asChild` prop to compose the NavigationMenuLink with Next.js Link component, enabling proper routing and SEO benefits while maintaining navigation menu styling.

```typescript
import Link from "next/link"

export function NavigationMenuDemo() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link href="/docs">Documentation</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
```

--------------------------------

### Item Component Variants Example - TSX

Source: https://ui.shadcn.com/docs/components/item

Demonstrates three Item variants: default (subtle styling), outline (clear borders), and muted (subdued colors). Each includes content with title, description, and action button.

```tsx
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

export function ItemVariant() {
  return (
    <div className="flex flex-col gap-6">
      <Item>
        <ItemContent>
          <ItemTitle>Default Variant</ItemTitle>
          <ItemDescription>
            Standard styling with subtle background and borders.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline Variant</ItemTitle>
          <ItemDescription>
            Outlined style with clear borders and transparent background.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted Variant</ItemTitle>
          <ItemDescription>
            Subdued appearance with muted colors for secondary content.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Open
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
```

--------------------------------

### Implement Label with Checkbox in React (shadcn/ui)

Source: https://ui.shadcn.com/docs/components/label

This example demonstrates how to use the `Label` component from `shadcn/ui` to create an accessible label for a `Checkbox` in a React application. The `htmlFor` prop is used to link the label to its associated input, improving user experience and accessibility. It requires both `Label` and `Checkbox` components to be imported.

```tsx
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function LabelDemo() {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  )
}
```

--------------------------------

### Breadcrumb with Custom Separator Icon

Source: https://ui.shadcn.com/docs/components/breadcrumb

Demonstrates how to replace the default breadcrumb separator with a custom icon component from lucide-react. Shows both the full component example and the specific code for implementing custom separators.

```tsx
import Link from "next/link"
import { SlashIcon } from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function BreadcrumbWithCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/components">Components</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

--------------------------------

### Initialize Form with React Hook Form and Zod Resolver

Source: https://ui.shadcn.com/docs/components/form

This code demonstrates the complete setup of a form using the `useForm` hook from `react-hook-form`, integrating `zodResolver` for robust validation based on a predefined Zod `formSchema`. It includes defining a submit handler (`onSubmit`) for processing form values, ensuring both type-safety and validation before submission, and setting default values for form fields.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
}
```

--------------------------------

### Define NativeSelectOption Components (tsx)

Source: https://ui.shadcn.com/docs/components/native-select

This example demonstrates how to use the `NativeSelectOption` component to define individual selectable items within a `NativeSelect`. It also includes an instance of a disabled option, showing how to prevent user selection for specific choices. These options map directly to HTML `<option>` elements.

```tsx
<NativeSelectOption value="apple">Apple</NativeSelectOption>
<NativeSelectOption value="banana" disabled>
  Banana
</NativeSelectOption>
```

--------------------------------

### Integrate Shadcn UI InputOTP into a Form with React Hook Form and Zod Validation

Source: https://ui.shadcn.com/docs/components/input-otp

This example demonstrates how to integrate the `InputOTP` component within a form managed by `react-hook-form` and validated using `zod`. It defines a schema for validation, handles form submission with `toast` notifications, and displays form-related messages.

```tsx
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

--------------------------------

### Refactor CSS Variables for @theme inline and HSL Wrappers

Source: https://ui.shadcn.com/docs/tailwind-v4

This CSS example refactors variable definitions for improved usability. It moves `hsl` wrappers to `:root` and `.dark` selectors and utilizes `@theme inline` to simplify variable access by directly referencing `--background` and `--foreground`.

```css
:root {
  --background: hsl(0 0% 100%); // <-- Wrap in hsl
  --foreground: hsl(0 0% 3.9%);
}

.dark {
  --background: hsl(0 0% 3.9%); // <-- Wrap in hsl
  --foreground: hsl(0 0% 98%);
}

@theme inline {
  --color-background: var(--background); // <-- Remove hsl
  --color-foreground: var(--foreground);
}
```

--------------------------------

### Importing and Rendering a UI Spinner Component (TypeScript React)

Source: https://ui.shadcn.com/docs/changelog

Demonstrates how to import the `Spinner` component from `@/components/ui/spinner` and render it directly or within a basic functional component. This provides a visual indicator for loading states. Examples include a standalone spinner and spinners integrated into various button styles.

```tsx
import { Spinner } from "@/components/ui/spinner"
```

```tsx
<Spinner />
```

```tsx
import { Spinner } from "@/components/ui/spinner"

export function SpinnerBasic() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Spinner />
    </div>
  )
}

```

```tsx
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner />
        Processing
      </Button>
    </div>
  )
}

```

--------------------------------

### Navigation Menu with Grid Layout - React TSX

Source: https://ui.shadcn.com/docs/components/navigation-menu

Advanced Navigation Menu example featuring grid-based layout for menu items with descriptions, responsive visibility using Tailwind classes, and structured list items with media icons.

```typescript
<NavigationMenuItem>
  <NavigationMenuTrigger>Documentation</NavigationMenuTrigger>
  <NavigationMenuContent>
    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      <li>
        <NavigationMenuLink asChild>
          <Link href="#">
            <div className="font-medium">Documentation</div>
            <div className="text-muted-foreground">
              Learn how to use the library.
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>
```

--------------------------------

### Custom Error: Unauthorized API Key

Source: https://ui.shadcn.com/docs/changelog

Registry authors can now provide detailed custom error messages for issues like unauthorized access. This example shows an 'Unauthorized' message, indicating an expired API key and providing a direct link for renewal, aiding both users and AI agents.

```txt
Error:
You are not authorized to access the item at http://example.com/r/component.

Message:
[Unauthorized] Your API key has expired. Renew it at https://example.com/api/renew-key.
```

--------------------------------

### Example Shadcn UI Form Section with Comments and Buttons

Source: https://ui.shadcn.com/docs/components/field

A partial JSX snippet demonstrating a form section with a `Textarea` for comments and `Button` components for submission and cancellation. Utilizes `FieldLabel` and `Field` components for accessibility and structure within a `FieldGroup`.

```tsx
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Comments
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
```

--------------------------------

### Example Shadcn UI FieldSet with Multiple Fields

Source: https://ui.shadcn.com/docs/components/field

Demonstrates the usage of a FieldSet to group related input fields like full name, username, and a newsletter switch. Includes FieldLegend, FieldDescription, FieldLabel, Input, and Switch components for a structured form section.

```tsx
<FieldSet>
  <FieldLegend>Profile</FieldLegend>
  <FieldDescription>This appears on invoices and emails.</FieldDescription>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Full name</FieldLabel>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <FieldDescription>This appears on invoices and emails.</FieldDescription>
    </Field>
    <Field>
      <FieldLabel htmlFor="username">Username</FieldLabel>
      <Input id="username" autoComplete="off" aria-invalid />
      <FieldError>Choose another username.</FieldError>
    </Field>
    <Field orientation="horizontal">
      <Switch id="newsletter" />
      <FieldLabel htmlFor="newsletter">Subscribe to the newsletter</FieldLabel>
    </Field>
  </FieldGroup>
</FieldSet>
```

--------------------------------

### Render Basic Horizontal Separator in React

Source: https://ui.shadcn.com/docs/components/separator

Render a basic horizontal separator component. The component can be styled with className props. This example demonstrates default horizontal orientation used to separate content sections.

```tsx
<Separator />
```

--------------------------------

### Shadcn UI Field with Textarea Component

Source: https://ui.shadcn.com/docs/components/field

Presents an example of using the Shadcn UI Field component with a Textarea for collecting user feedback. Includes FieldSet, FieldGroup, FieldLabel, Textarea, and FieldDescription for a well-structured input area.

```tsx
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export function FieldTextarea() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="feedback">Feedback</FieldLabel>
            <Textarea
              id="feedback"
              placeholder="Your feedback helps us improve..."
              rows={4}
            />
            <FieldDescription>
              Share your thoughts about our service.
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
```

--------------------------------

### Implement Responsive Dialog and Drawer with React and Shadcn UI

Source: https://ui.shadcn.com/docs/components/drawer

This TypeScript React component demonstrates how to create a responsive modal experience. It uses `useState` to manage the open state and `useMediaQuery` to determine if the user is on a desktop or mobile device. Based on the screen size, it conditionally renders either a Shadcn UI `Dialog` (for desktop) or a `Drawer` (for mobile) to display a profile editing form. Dependencies include `@/lib/utils` for `cn`, `@/hooks/use-media-query`, and various Shadcn UI components.

```tsx
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DrawerDialogDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}
```

--------------------------------

### Render Basic shadcn/ui Label in React/TypeScript

Source: https://ui.shadcn.com/docs/components/label

This `tsx` example demonstrates the fundamental usage of the `Label` component within JSX. The `htmlFor` prop is essential for linking the label to an input element (e.g., `<input id="email" />`), providing semantic meaning and improving accessibility.

```tsx
<Label htmlFor="email">Your email address</Label>
```

--------------------------------

### Basic Plugin Usage in shadcn UI Registry

Source: https://ui.shadcn.com/docs/registry/examples

Demonstrates how to declare Tailwind CSS plugins in a shadcn UI registry item configuration. The `css` object contains plugin directives that reference Tailwind CSS packages and custom plugins. This is the foundational pattern for extending Tailwind functionality in shadcn components.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-plugin",
  "type": "registry:item",
  "css": {
    "@plugin \"@tailwindcss/typography\"": {},
    "@plugin \"foo\"": {}
  }
}
```

--------------------------------

### SidebarMenuBadge Basic Usage - React TSX

Source: https://ui.shadcn.com/docs/components/sidebar

Minimal example showing how to add a badge to a sidebar menu item. The badge component is placed as a sibling to SidebarMenuButton within a SidebarMenuItem, displaying a numeric value.

```typescript
<SidebarMenuItem>
  <SidebarMenuButton />
  <SidebarMenuBadge>24</SidebarMenuBadge>
</SidebarMenuItem>
```

--------------------------------

### Create TanStack Router Project with shadcn/ui and Tailwind

Source: https://ui.shadcn.com/docs/installation/tanstack-router

This command initializes a new TanStack Router application named 'my-app' using the file-router template, configures it with Tailwind CSS, and integrates shadcn/ui components.

```bash
npx create-tsrouter-app@latest my-app --template file-router --tailwind --add-ons shadcn
```

--------------------------------

### Complete DropdownMenu with Multiple Dialog Integration

Source: https://ui.shadcn.com/docs/components/dropdown-menu

Full React component implementation using hooks to manage state for multiple dialogs triggered from dropdown menu items. Includes two dialog examples: creating a new file and sharing a file, each with their own form fields and action buttons.

```tsx
"use client"

import { useState } from "react"
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function DropdownMenuDialog() {
  const [showNewDialog, setShowNewDialog] = useState(false)
  const [showShareDialog, setShowShareDialog] = useState(false)

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Open menu" size="icon-sm">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>File Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowNewDialog(true)}>
              New File...
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setShowShareDialog(true)}>
              Share...
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Download</DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showNewDialog} onOpenChange={setShowNewDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Provide a name for your new file. Click create when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="pb-3">
            <Field>
              <FieldLabel htmlFor="filename">File Name</FieldLabel>
              <Input id="filename" name="filename" placeholder="document.txt" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              Anyone with the link will be able to view this file.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="py-3">
            <Field>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="shadcn@vercel.com"
                autoComplete="off"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">Message (Optional)</FieldLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Check out this file"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
```

--------------------------------

### Utilize Shadcn UI useSidebar Hook for Control (TypeScript/React)

Source: https://ui.shadcn.com/docs/components/sidebar

This example illustrates how to use the `useSidebar` hook to programmatically control the state and behavior of the Shadcn UI sidebar. It destructures various properties and functions for managing sidebar visibility and responsiveness, such as `state`, `open`, `setOpen`, and `toggleSidebar`.

```tsx
import { useSidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar()
}
```

--------------------------------

### Implement Basic Vertical Resizable Panel Group in React

Source: https://ui.shadcn.com/docs/components/resizable

This React JSX snippet provides a simplified example of a vertical resizable panel group. It demonstrates how to quickly set up two vertically stacked panels with a resizable handle, using `direction="vertical"` for a top-to-bottom layout.

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Example() {
  return (
    <ResizablePanelGroup direction="vertical">
      <ResizablePanel>One</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel>Two</ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

--------------------------------

### Implement Basic Date Picker with Shadcn UI in TypeScript/React

Source: https://ui.shadcn.com/docs/components/date-picker

This TypeScript/React example demonstrates a standard date picker using Shadcn UI's Popover and Calendar components. It enables users to pick a single date, which is then formatted and displayed in a button. The component includes styling for an empty state and utilizes date-fns for date formatting.

```tsx
"use client"\n\nimport * as React from \"react\"\nimport { format } from \"date-fns\"\nimport { Calendar as CalendarIcon } from \"lucide-react\"\n\nimport { cn } from \"@/lib/utils\"\nimport { Button } from \"@/components/ui/button\"\nimport { Calendar } from \"@/components/ui/calendar\"\nimport {\n  Popover,\n  PopoverContent,\n  PopoverTrigger,\n} from \"@/components/ui/popover\"\n\nexport function DatePickerDemo() {\n  const [date, setDate] = React.useState<Date>()\n\n  return (\n    <Popover>\n      <PopoverTrigger asChild>\n        <Button\n          variant=\"outline\"\n          data-empty={!date}\n          className=\"data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal\"\n        >\n          <CalendarIcon />\n          {date ? format(date, \"PPP\") : <span>Pick a date</span>}\n        </Button>\n      </PopoverTrigger>\n      <PopoverContent className=\"w-auto p-0\">\n        <Calendar mode=\"single\" selected={date} onSelect={setDate} />\n      </PopoverContent>\n    </Popover>\n  )\n}\n
```

--------------------------------

### Declare npm package dependencies for registry item

Source: https://ui.shadcn.com/docs/registry/registry-item-json

The `dependencies` property lists external npm packages that the registry item relies on for its functionality. It supports specifying exact versions using the `@version` syntax, ensuring compatibility and proper installation.

```json
{
  "dependencies": [
    "@radix-ui/react-accordion",
    "zod",
    "lucide-react",
    "name@1.0.2"
  ]
}
```

--------------------------------

### Set Sidebar Position with `side` Prop in TSX

Source: https://ui.shadcn.com/docs/components/sidebar

This example shows how to use the `side` prop to control whether the sidebar appears on the `left` or `right` side of the screen. This prop modifies the visual placement of the sidebar.

```tsx
import { Sidebar } from "@/components/ui/sidebar"

export function AppSidebar() {
  return <Sidebar side="left | right" />
}
```

--------------------------------

### Update Tooltip Color Styling

Source: https://ui.shadcn.com/docs/components/tooltip

Migration guide for updating tooltip color scheme. Replace the old color classes (bg-primary text-primary-foreground) with new foreground/background colors for both TooltipContent and TooltipArrow components to match the 2025-09-22 update.

```tsx
bg-foreground text-background
```

--------------------------------

### ResizableHandle with withHandle Prop - Full Demo

Source: https://ui.shadcn.com/docs/components/resizable

Complete example of a horizontal resizable panel group with a visible handle between a sidebar and content panel. The withHandle prop on ResizableHandle controls handle visibility. The layout uses responsive sizing with defaultSize props and Tailwind CSS for styling.

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableHandleDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border md:min-w-[450px]"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
```

--------------------------------

### Create horizontal ScrollArea with images (React/TypeScript)

Source: https://ui.shadcn.com/docs/components/scroll-area

Provides an example of implementing a `ScrollArea` for horizontal scrolling content, specifically a collection of images. It uses `ScrollBar` with `orientation="horizontal"` and `next/image` to display artwork.

```tsx
import * as React from "react"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export interface Artwork {
  artist: string
  art: string
}

export const works: Artwork[] = [
  {
    artist: "Ornella Binni",
    art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Tom Byrom",
    art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
  },
  {
    artist: "Vladimir Malyavko",
    art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
  },
]

export function ScrollAreaHorizontalDemo() {
  return (
    <ScrollArea className="w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {works.map((artwork) => (
          <figure key={artwork.artist} className="shrink-0">
            <div className="overflow-hidden rounded-md">
              <Image
                src={artwork.art}
                alt={`Photo by ${artwork.artist}`}
                className="aspect-[3/4] h-fit w-fit object-cover"
                width={300}
                height={400}
              />
            </div>
            <figcaption className="text-muted-foreground pt-2 text-xs">
              Photo by{" "}
              <span className="text-foreground font-semibold">
                {artwork.artist}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
```

--------------------------------

### Downgrade React to Version 18 with `npm`

Source: https://ui.shadcn.com/docs/react-19

This `npm` command allows users to explicitly install `react` and `react-dom` at version 18. This can serve as a temporary solution to resolve peer dependency issues with third-party packages not yet compatible with React 19, ensuring project stability until updates are available.

```bash
npm i react@18 react-dom@18
```

--------------------------------

### Override Tailwind CSS Variables in shadcn/ui Theme

Source: https://ui.shadcn.com/docs/registry/examples

Override Tailwind CSS variables including spacing and breakpoints within shadcn/ui theme configuration to customize responsive design behavior across the component library.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "custom-theme",
  "type": "registry:theme",
  "cssVars": {
    "theme": {
      "spacing": "0.2rem",
      "breakpoint-sm": "640px",
      "breakpoint-md": "768px",
      "breakpoint-lg": "1024px",
      "breakpoint-xl": "1280px",
      "breakpoint-2xl": "1536px"
    }
  }
}
```

--------------------------------

### Configure Vite for path aliases and Tailwind CSS

Source: https://ui.shadcn.com/docs/installation/vite

Updates `vite.config.ts` to include path aliases and the Tailwind CSS plugin. This configuration allows resolving imports starting with `@/` to `./src` and integrates Tailwind CSS into the build process, ensuring all modules are correctly bundled.

```typescript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

--------------------------------

### Display Basic Toast Notification in React

Source: https://ui.shadcn.com/docs/components/sonner

Creates a React component with a button that triggers a toast notification with a title, description, and undo action. This example demonstrates the fundamental usage of the Sonner toast library with the Button component from shadcn/ui.

```typescript
"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
```

--------------------------------

### Implement a Basic Form Field with React Hook Form

Source: https://ui.shadcn.com/docs/components/form

This example demonstrates how to create a single input field (e.g., 'username') within a form using the `FormField` component from React Hook Form. It shows how to link the field to the form's control, apply a label, an input component, a description, and a message for validation feedback, integrating seamlessly with Radix UI components.

```tsx
const form = useForm()

<FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" {...field} />
      </FormControl>
      <FormDescription>This is your public display name.</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
```

--------------------------------

### Structure Sidebar Content with Groups (Shadcn UI, TSX)

Source: https://ui.shadcn.com/docs/components/sidebar

This TypeScript React example illustrates the basic usage of the `SidebarContent` component to wrap and organize content within a sidebar. It demonstrates how to place multiple `SidebarGroup` components inside the scrollable content area of a Shadcn UI sidebar, providing a structured layout for navigation or information.

```tsx
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
    </Sidebar>
  )
}
```

--------------------------------

### Add Multiple Resources with CLI (Bash)

Source: https://ui.shadcn.com/docs/registry/namespace

Command to add multiple resources using the CLI, showcasing how the CLI handles resolution order and deduplication. The last specified resource for a given file path will override previous ones.

```bash
npx shadcn@latest add @acme/auth @custom/login-form
```

--------------------------------

### Specify type of registry item

Source: https://ui.shadcn.com/docs/registry/registry-item-json

The `type` property categorizes the registry item, influencing how it's handled and resolved within a project. Examples include `registry:block` for complex components, `registry:component` for simple ones, or `registry:hook` for custom hooks.

```json
{
  "type": "registry:block"
}
```

--------------------------------

### Set Custom Sidebar Width with Style Prop in TSX

Source: https://ui.shadcn.com/docs/components/sidebar

This example demonstrates how to dynamically set custom sidebar widths using CSS variables via the `style` prop on the `SidebarProvider` component. This approach allows for individual sidebar width configuration when multiple sidebars are present.

```tsx
<SidebarProvider
  style={{
    "--sidebar-width": "20rem",
    "--sidebar-width-mobile": "20rem"
  }}
>
  <Sidebar />
</SidebarProvider>
```

--------------------------------

### Display Spinner in Empty State Component (React/TypeScript)

Source: https://ui.shadcn.com/docs/components/spinner

This example shows how to use the `Spinner` component within an `Empty` state component to signify an ongoing process. The spinner is placed inside `EmptyMedia` to visually represent a task like 'Processing your request' alongside a descriptive message.

```tsx
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerEmpty() {
  return (
    <Empty className="w-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Spinner />
        </EmptyMedia>
        <EmptyTitle>Processing your request</EmptyTitle>
        <EmptyDescription>
          Please wait while we process your request. Do not refresh the page.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm">
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  )
}
```

--------------------------------

### Implement Collapsible Component with React and Shadcn UI

Source: https://ui.shadcn.com/docs/components/collapsible

This TypeScript React example demonstrates how to create a functional collapsible component using Shadcn UI's `Collapsible` primitive. It manages its open/closed state with React's `useState` hook and includes a button with an icon to toggle the content visibility, showcasing a common UI pattern for hiding and showing information.

```tsx
"use client"

import * as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleDemo() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8">
            <ChevronsUpDown />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
```

--------------------------------

### Create Input Group with Textarea and Addons (Shadcn UI, TSX)

Source: https://ui.shadcn.com/docs/components/input-group

This example demonstrates how to integrate a `Textarea` component within an `InputGroup`. It utilizes `InputGroupAddon` with `block-start` and `block-end` alignment to display icons, text, and buttons, providing a rich, interactive textarea experience for code or multi-line input.

```tsx
import {
  IconBrandJavascript,
  IconCopy,
  IconCornerDownLeft,
  IconRefresh,
} from "@tabler/icons-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export function InputGroupTextareaExample() {
  return (
    <div className="grid w-full max-w-md gap-4">
      <InputGroup>
        <InputGroupTextarea
          id="textarea-code-32"
          placeholder="console.log('Hello, world!');"
          className="min-h-[200px]"
        />
        <InputGroupAddon align="block-end" className="border-t">
          <InputGroupText>Line 1, Column 1</InputGroupText>
          <InputGroupButton size="sm" className="ml-auto" variant="default">
            Run <IconCornerDownLeft />
          </InputGroupButton>
        </InputGroupAddon>
        <InputGroupAddon align="block-start" className="border-b">
          <InputGroupText className="font-mono font-medium">
            <IconBrandJavascript />
            script.js
          </InputGroupText>
          <InputGroupButton className="ml-auto" size="icon-xs">
            <IconRefresh />
          </InputGroupButton>
          <InputGroupButton variant="ghost" size="icon-xs">
            <IconCopy />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

--------------------------------

### Build Registry with pnpm

Source: https://ui.shadcn.com/docs/blocks

Runs the build script to process block definitions and generate registry data. Execute this after updating block definitions before viewing or publishing.

```bash
pnpm registry:build
```

--------------------------------

### Set Up React Hook Form Instance with Zod Resolver

Source: https://ui.shadcn.com/docs/forms/react-hook-form

Demonstrates the setup of a React Hook Form instance within a functional component (`BugReportForm`). It initializes the form using `useForm`, connects it to a Zod schema via `zodResolver` for validation, sets default values, and defines an `onSubmit` function to handle validated form data.

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
})

export function BugReportForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* ... */}
      {/* Build the form here */}
      {/* ... */}
    </form>
  )
}
```

--------------------------------

### Configure Custom Tailwind CSS Prefix in shadcn/ui Components

Source: https://ui.shadcn.com/docs/changelog

This code illustrates how shadcn/ui's CLI automatically applies a custom Tailwind CSS prefix (e.g., `tw-`) to utility classes within components, preventing styling conflicts in existing projects. The example shows an `AlertDialog` component with prefixed classes, demonstrating compatibility with `cn`, `cva`, and CSS variables. This feature simplifies integration into diverse design systems.

```tsx
<AlertDialog className="tw-grid tw-gap-4 tw-border tw-bg-background tw-shadow-lg" />
```

--------------------------------

### Create Class Name Merge Utility Function

Source: https://ui.shadcn.com/docs/installation/manual

Export a cn utility function that combines clsx and tailwind-merge to intelligently merge Tailwind CSS class names while resolving conflicts. Takes ClassValue inputs and returns merged class string, useful for conditionally applying styles in component prop patterns.

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

--------------------------------

### Implement Responsive Form Layout with Shadcn UI Fields (TSX)

Source: https://ui.shadcn.com/docs/components/field

This TypeScript/TSX example demonstrates how to construct a responsive form using Shadcn UI's Field components. It utilizes `orientation="responsive"` on individual `Field` elements within a `FieldGroup` to achieve automatic column layouts for various screen sizes, leveraging components like `Input`, `Textarea`, and `Button`.

```tsx
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function FieldResponsive() {
  return (
    <div className="w-full max-w-4xl">
      <form>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>Fill in your profile information.</FieldDescription>
          <FieldSeparator />
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldDescription>
                  Provide your full name for identification
                </FieldDescription>
              </FieldContent>
              <Input id="name" placeholder="Evil Rabbit" required />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="lastName">Message</FieldLabel>
                <FieldDescription>
                  You can write your message here. Keep it short, preferably
                  under 100 characters.
                </FieldDescription>
              </FieldContent>
              <Textarea
                id="message"
                placeholder="Hello, world!"
                required
                className="min-h-[100px] resize-none sm:min-w-[300px]"
              />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}
```

--------------------------------

### Display Field-Specific Validation Errors in React/Next.js Forms

Source: https://ui.shadcn.com/docs/forms/next

This example shows how to display server-side validation errors next to their respective form fields. It utilizes `data-invalid` and `aria-invalid` props for accessibility and conditional rendering of `FieldError` components based on `formState.errors`.

```tsx
<Field data-invalid={!!formState.errors?.email?.length}>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input
    id="email"
    name="email"
    type="email"
    aria-invalid={!!formState.errors?.email?.length}
  />
  {formState.errors?.email && (
    <FieldError>{formState.errors.email[0]}</FieldError>
  )}
</Field>
```

--------------------------------

### ButtonGroup Orientation Control - TypeScript React

Source: https://ui.shadcn.com/docs/components/button-group

Creates a vertically oriented button group with media control icons using the orientation prop. Demonstrates basic ButtonGroup setup with icon buttons from lucide-react and aria-label for accessibility.

```typescript
import { MinusIcon, PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

export function ButtonGroupOrientation() {
  return (
    <ButtonGroup
      orientation="vertical"
      aria-label="Media controls"
      className="h-fit"
    >
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
      <Button variant="outline" size="icon">
        <MinusIcon />
      </Button>
    </ButtonGroup>
  )
}
```

--------------------------------

### Basic Usage and Import of Shadcn Accordion Component (tsx)

Source: https://ui.shadcn.com/docs/components/accordion

This TypeScript React snippet illustrates the basic import and minimal usage of the Shadcn UI Accordion component. It shows how to import the necessary components and construct a simple, single-type collapsible accordion with one item, demonstrating the core structure for displaying expandable content. This foundational setup is essential for integrating the Accordion into any React application.

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
```

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

--------------------------------

### Create Selectable Field Groups with Radio Buttons in React

Source: https://ui.shadcn.com/docs/components/field

This example demonstrates how to construct a 'Choice Card' using `FieldGroup`, `FieldSet`, and `FieldLabel` to wrap `RadioGroup` components. It showcases horizontal orientation for field content and integrates `FieldTitle` and `FieldDescription` for rich selection options, allowing users to choose between compute environments.

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

export function FieldChoiceCard() {
  return (
    <div className="w-full max-w-md">
      <FieldGroup>
        <FieldSet>
          <FieldLabel htmlFor="compute-environment-p8w">
            Compute Environment
          </FieldLabel>
          <FieldDescription>
            Select the compute environment for your cluster.
          </FieldDescription>
          <RadioGroup defaultValue="kubernetes">
            <FieldLabel htmlFor="kubernetes-r2h">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Kubernetes</FieldTitle>
                  <FieldDescription>
                    Run GPU workloads on a K8s configured cluster.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="kubernetes" id="kubernetes-r2h" />
              </Field>
            </FieldLabel>
            <FieldLabel htmlFor="vm-z4k">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Virtual Machine</FieldTitle>
                  <FieldDescription>
                    Access a VM configured cluster to run GPU workloads.
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="vm" id="vm-z4k" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        </FieldSet>
      </FieldGroup>
    </div>
  )
}
```

--------------------------------

### Implement a Radio Group Field with Shadcn UI and React

Source: https://ui.shadcn.com/docs/components/field

This example shows how to create a radio button group for selecting a subscription plan using Shadcn UI components in a React application. It organizes radio items horizontally within a fieldset, complete with a label and description.

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

export function FieldRadio() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldLabel>Subscription Plan</FieldLabel>
        <FieldDescription>
          Yearly and lifetime plans offer significant savings.
        </FieldDescription>
        <RadioGroup defaultValue="monthly">
          <Field orientation="horizontal">
            <RadioGroupItem value="monthly" id="plan-monthly" />
            <FieldLabel htmlFor="plan-monthly" className="font-normal">
              Monthly ($9.99/month)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="yearly" id="plan-yearly" />
            <FieldLabel htmlFor="plan-yearly" className="font-normal">
              Yearly ($99.99/year)
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="lifetime" id="plan-lifetime" />
            <FieldLabel htmlFor="plan-lifetime" className="font-normal">
              Lifetime ($299.99)
            </FieldLabel>
          </Field>
        </RadioGroup>
      </FieldSet>
    </div>
  )
}
```

--------------------------------

### Menubar Component Demo - TypeScript React

Source: https://ui.shadcn.com/docs/components/menubar

A complete menubar implementation demonstrating File, Edit, View, and Profiles menus with various features including keyboard shortcuts, checkbox items, radio groups, submenu nesting, and separator dividers. Imports all necessary menubar components from the shadcn/ui library and renders a functional desktop-style application menu.

```typescript
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Find</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Search the web</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Find...</MenubarItem>
              <MenubarItem>Find Next</MenubarItem>
              <MenubarItem>Find Previous</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Cut</MenubarItem>
          <MenubarItem>Copy</MenubarItem>
          <MenubarItem>Paste</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem>Always Show Bookmarks Bar</MenubarCheckboxItem>
          <MenubarCheckboxItem checked>
            Always Show Full URLs
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled inset>
            Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Hide Sidebar</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Profiles</MenubarTrigger>
        <MenubarContent>
          <MenubarRadioGroup value="benoit">
            <MenubarRadioItem value="andy">Andy</MenubarRadioItem>
            <MenubarRadioItem value="benoit">Benoit</MenubarRadioItem>
            <MenubarRadioItem value="Luis">Luis</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem inset>Edit...</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>Add Profile...</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
```

--------------------------------

### Implement Collapsible SidebarGroup with Shadcn UI (TypeScript)

Source: https://ui.shadcn.com/docs/components/sidebar

This example illustrates how to make a `SidebarGroup` collapsible using Shadcn UI's `Collapsible` component. It shows wrapping the group with `Collapsible` and placing the `CollapsibleTrigger` inside `SidebarGroupLabel` to control the visibility of `SidebarGroupContent`.

```tsx
"use client"

import { ChevronDownIcon, LifeBuoyIcon, SendIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  Help
                  <ChevronDownIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <LifeBuoyIcon />
                        Support
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <SendIcon />
                        Feedback
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

```tsx
export function AppSidebar() {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            Help
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent>
          <SidebarGroupContent />
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
```

--------------------------------

### Integrate SidebarMenuAction with Button and Link in TSX

Source: https://ui.shadcn.com/docs/components/sidebar

This example demonstrates how to combine `SidebarMenuButton` (acting as a clickable link) and `SidebarMenuAction` (an independent action button) within a single `SidebarMenuItem`. The action button can contain an icon and a screen-reader-only label, allowing for multiple interactive elements per menu item, enhancing functionality.

```tsx
<SidebarMenuItem>\n  <SidebarMenuButton asChild>\n    <a href="#">\n      <Home />\n      <span>Home</span>\n    </a>\n  </SidebarMenuButton>\n  <SidebarMenuAction>\n    <Plus /> <span className="sr-only">Add Project</span>\n  </SidebarMenuAction>\n</SidebarMenuItem>
```

--------------------------------

### Autoplay Plugin with Stop on Interaction

Source: https://ui.shadcn.com/docs/components/carousel

Implement Autoplay plugin with stopOnInteraction option and mouse event handlers to pause/resume autoplay. This example stores the plugin in a useRef to persist across renders and adds mouse enter/leave handlers to control the autoplay behavior for better user experience.

```tsx
"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

--------------------------------

### Listen to Carousel Select Events

Source: https://ui.shadcn.com/docs/components/carousel

Attach event listeners to the carousel API instance using the on() method. This example demonstrates listening to the 'select' event, which fires whenever the carousel slide changes. The event handler can be used to trigger custom logic or state updates.

```tsx
import { type CarouselApi } from "@/components/ui/carousel"

export function Example() {
  const [api, setApi] = React.useState<CarouselApi>()

  React.useEffect(() => {
    if (!api) {
      return
    }

    api.on("select", () => {
      // Do something on select.
    })
  }, [api])

  return (
    <Carousel setApi={setApi}>
      <CarouselContent>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
        <CarouselItem>...</CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
```

--------------------------------

### Basic Radio Group Usage Example - TypeScript/React

Source: https://ui.shadcn.com/docs/components/radio-group

Demonstrates basic usage of a RadioGroup component with two radio button options (Option One and Option Two), each paired with a corresponding label for accessibility. The defaultValue prop sets 'option-one' as the initially selected option.

```typescript
<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
```

--------------------------------

### Search Components Across Registries

Source: https://ui.shadcn.com/docs/changelog

Search for components across registries using keywords. Supports filtering with -q flag to find specific components by name or functionality.

```bash
npx shadcn search @tweakcn -q "dark"
```

--------------------------------

### Opt-Out of TypeScript in shadcn/ui CLI Interactive Prompt

Source: https://ui.shadcn.com/docs/changelog

This plain text snippet represents the interactive command-line interface prompt from shadcn/ui, asking the user to confirm TypeScript usage. Selecting 'no' allows developers to generate JavaScript versions of components, accommodating projects that prefer JavaScript over TypeScript. This provides flexibility for project setup and development workflow.

```txt
Would you like to use TypeScript (recommended)? no
```

--------------------------------

### Fetch Projects with React Query - React TypeScript

Source: https://ui.shadcn.com/docs/components/sidebar

Fetches project data using React Query useQuery hook with identical loading state and skeleton UI patterns. Provides the same sidebar menu rendering with project links and icons as the SWR implementation.

```typescript
function NavProjects() {
  const { data, isLoading } = useQuery()

  if (isLoading) {
    return (
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    )
  }

  if (!data) {
    return ...
  }

  return (
    <SidebarMenu>
      {data.map((project) => (
        <SidebarMenuItem key={project.name}>
          <SidebarMenuButton asChild>
            <a href={project.url}>
              <project.icon />
              <span>{project.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
```

--------------------------------

### Persist Sidebar State in Next.js App Router

Source: https://ui.shadcn.com/docs/components/sidebar

This Next.js `app/layout.tsx` example shows how to persist the sidebar's open/closed state across page reloads using cookies. It reads the `sidebar_state` cookie to set the initial `defaultOpen` prop for the `SidebarProvider`.

```tsx
import { cookies } from "next/headers"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
```

--------------------------------

### Create Tabs Demo with Account and Password Forms - TSX

Source: https://ui.shadcn.com/docs/components/tabs

A complete tabbed interface component demonstrating two tab panels: one for account settings and another for password management. Uses Card, Input, Label, and Button components from shadcn/ui. This example shows how to structure form content within tab panels with proper accessibility and styling.

```tsx
import { AppWindowIcon, CodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function TabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're
                done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input id="tabs-demo-name" defaultValue="Pedro Duarte" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Username</Label>
                <Input id="tabs-demo-username" defaultValue="@peduarte" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
```

--------------------------------

### Checkbox Component Basic Usage - React TypeScript

Source: https://ui.shadcn.com/docs/components/checkbox

Demonstrates basic checkbox implementation with label associations. Includes examples of unchecked, pre-checked, disabled, and custom-styled checkbox states with Tailwind CSS classes. Uses React hooks and Radix UI primitives for accessibility.

```tsx
"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="terms-2" defaultChecked />
        <div className="grid gap-2">
          <Label htmlFor="terms-2">Accept terms and conditions</Label>
          <p className="text-muted-foreground text-sm">
            By clicking this checkbox, you agree to the terms and conditions.
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Checkbox id="toggle" disabled />
        <Label htmlFor="toggle">Enable notifications</Label>
      </div>
      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
        <Checkbox
          id="toggle-2"
          defaultChecked
          className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">
            Enable notifications
          </p>
          <p className="text-muted-foreground text-sm">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </Label>
    </div>
  )
}
```

--------------------------------

### Configure Chart Legend Data and Chart Config with Custom Names

Source: https://ui.shadcn.com/docs/components/chart

Define chart data with browser properties and create a corresponding chart configuration object with custom color values. This setup enables the legend to display custom names when used with the nameKey prop.

```tsx
const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
]

const chartConfig = {
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig
```

--------------------------------

### Render SidebarMenuButton as Link Element in TSX

Source: https://ui.shadcn.com/docs/components/sidebar

This example shows how to use the `asChild` prop with `SidebarMenuButton` to render an `<a>` tag, effectively turning the menu button into a navigable link. This allows for custom child elements to inherit the button's styling and functionality, making it flexible for various navigation needs.

```tsx
<SidebarMenuButton asChild>\n  <a href="#">Home</a>\n</SidebarMenuButton>
```

--------------------------------

### Create Native Select with grouped department options in React

Source: https://ui.shadcn.com/docs/components/native-select

This React component demonstrates how to organize `NativeSelectOption` elements into logical categories using `NativeSelectOptGroup`. It shows an example of selecting departments (Engineering, Sales, Operations), enhancing usability for longer lists by grouping related options.

```tsx
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"

export function NativeSelectGroups() {
  return (
    <NativeSelect>
      <NativeSelectOption value="">Select department</NativeSelectOption>
      <NativeSelectOptGroup label="Engineering">
        <NativeSelectOption value="frontend">Frontend</NativeSelectOption>
        <NativeSelectOption value="backend">Backend</NativeSelectOption>
        <NativeSelectOption value="devops">DevOps</NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Sales">
        <NativeSelectOption value="sales-rep">Sales Rep</NativeSelectOption>
        <NativeSelectOption value="account-manager">
          Account Manager
        </NativeSelectOption>
        <NativeSelectOption value="sales-director">
          Sales Director
        </NativeSelectOption>
      </NativeSelectOptGroup>
      <NativeSelectOptGroup label="Operations">
        <NativeSelectOption value="support">
          Customer Support
        </NativeSelectOption>
        <NativeSelectOption value="product-manager">
          Product Manager
        </NativeSelectOption>
        <NativeSelectOption value="ops-manager">
          Operations Manager
        </NativeSelectOption>
      </NativeSelectOptGroup>
    </NativeSelect>
  )
}
```

--------------------------------

### Display Loading Spinners in Input Groups (Shadcn UI, TSX)

Source: https://ui.shadcn.com/docs/components/input-group

This example illustrates how to embed loading indicators, such as the `Spinner` component or `LoaderIcon`, within `InputGroup` addons. It showcases various configurations for providing visual feedback during processing or searching operations, typically with disabled input fields, to improve user experience during asynchronous tasks.

```tsx
import { LoaderIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

export function InputGroupSpinner() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Searching..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Processing..." disabled />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Saving changes..." disabled />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Refreshing data..." disabled />
        <InputGroupAddon>
          <LoaderIcon className="animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-muted-foreground">
            Please wait...
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

--------------------------------

### Basic Shadcn UI Alert Dialog structure in React TSX

Source: https://ui.shadcn.com/docs/components/alert-dialog

This React TSX code provides a fundamental example of how to structure a Shadcn UI `AlertDialog`. It includes the essential components: `AlertDialogTrigger` to open the dialog, `AlertDialogContent` containing the `AlertDialogHeader` with a title and description, and `AlertDialogFooter` for action and cancel buttons. This forms a complete, minimal alert dialog interface.

```tsx
<AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

```

--------------------------------

### Accessible Button Group with ARIA Labels - TSX

Source: https://ui.shadcn.com/docs/components/button-group

Example demonstrating accessibility best practices for the Button Group component using ARIA labels. The aria-label attribute provides semantic meaning for screen readers and assistive technologies.

```tsx
<ButtonGroup aria-label="Button group">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

--------------------------------

### Add Prefix Text and Suffix Button to Input with Shadcn ButtonGroup (React/JSX)

Source: https://ui.shadcn.com/docs/changelog

This example demonstrates the usage of ButtonGroup to enhance an input field by adding a static prefix text using ButtonGroupText and a dynamic suffix button. This pattern is useful for creating compound input controls with clear labels or associated actions.

```tsx
<ButtonGroup>
  <ButtonGroupText>Prefix</ButtonGroupText>
  <Input placeholder="Type something here..." />
  <Button>Button</Button>
</ButtonGroup>
```

--------------------------------

### Define Payment Data Type and Sample Data

Source: https://ui.shadcn.com/docs/components/data-table

TypeScript type definition for a Payment object with id, amount, status, and email fields, along with sample payment data array. This establishes the data structure for the table example.

```typescript
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
]
```

--------------------------------

### Disable Form Field and Apply Styling Based on Pending State in React/Next.js

Source: https://ui.shadcn.com/docs/forms/next

This example illustrates how to disable an individual form field and apply data attributes for styling when the form is in a pending state. It uses the `data-disabled` prop on the `<Field />` component and the `disabled` prop on the `<Input />`.

```tsx
<Field data-disabled={pending}>
  <FieldLabel htmlFor="name">Name</FieldLabel>
  <Input id="name" name="name" disabled={pending} />
</Field>
```

--------------------------------

### Display Spinner in an Item Component (TypeScript)

Source: https://ui.shadcn.com/docs/components/spinner

Demonstrates how to integrate the Spinner component within an Item component to show a loading state, such as during payment processing. It utilizes Shadcn UI components like Item, ItemContent, ItemMedia, and ItemTitle to build a structured display. This example sets up a flex container with specific styling for visual presentation.

```tsx
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerDemo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">Processing payment...</ItemTitle>
        </ItemContent>
        <ItemContent className="flex-none justify-end">
          <span className="text-sm tabular-nums">$100.00</span>
        </ItemContent>
      </Item>
    </div>
  )
}
```

--------------------------------

### Configure Carousel Autoplay Plugin

Source: https://ui.shadcn.com/docs/components/carousel

Add the Autoplay plugin to the Carousel component using the plugins prop. The Autoplay plugin automatically cycles through carousel items at a specified delay interval. This example shows basic configuration with a 2-second delay between slides.

```ts
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}
```

--------------------------------

### Basic Usage of Progress Component in React

Source: https://ui.shadcn.com/docs/components/progress

These snippets illustrate the fundamental steps for using the `Progress` component in a React application. The first line imports the component, while the second demonstrates how to render it with a static `value` prop.

```tsx
import { Progress } from "@/components/ui/progress"
```

```tsx
<Progress value={33} />
```

--------------------------------

### Build Navigation Menu with React and Radix UI

Source: https://ui.shadcn.com/docs/components/navigation-menu

Creates a responsive navigation menu component using React hooks and Radix UI primitives. Includes mobile detection via custom hook and renders different menu structures based on screen size. The component demonstrates nested menu items, triggerable dropdowns, and link-based navigation for documentation sites.

```tsx
"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import { useIsMobile } from "@/components/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  const isMobile = useIsMobile()

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

--------------------------------

### Create a disabled Shadcn UI ToggleGroup

Source: https://ui.shadcn.com/docs/components/toggle-group

This example illustrates how to render a ToggleGroup component in a disabled state, preventing user interaction with any of its items. It achieves this by setting the 'disabled' boolean prop directly on the main ToggleGroup component, making all contained items non-interactive.

```tsx
import { Bold, Italic, Underline } from "lucide-react"

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export function ToggleGroupDemo() {
  return (
    <ToggleGroup type="multiple" disabled>
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
```

--------------------------------

### Render a Basic Command Menu Component in React

Source: https://ui.shadcn.com/docs/components/command

This snippet demonstrates how to create a basic command menu using the Shadcn UI Command component in React. It imports various sub-components like CommandInput, CommandList, CommandGroup, and CommandItem, along with icons from 'lucide-react'. The component renders a search input, displays suggestions, and includes configurable settings items with keyboard shortcuts.

```tsx
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "@/components/ui/command"

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
```

--------------------------------

### components.json Configuration File Structure

Source: https://ui.shadcn.com/docs/changelog

The components.json file stores all configuration for shadcn components including style, Tailwind settings, base color, CSS variables flag, React Server Components flag, and import aliases. This file can be edited to change component installation paths, styling methods, or base colors.

```json
{
  "style": "default",
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "rsc": false,
  "aliases": {
    "utils": "~/lib/utils",
    "components": "~/components"
  }
}
```

--------------------------------

### Basic Collapsible SidebarMenu Item Structure in TSX

Source: https://ui.shadcn.com/docs/components/sidebar

This code provides a simplified structural example of how to implement a single collapsible item within a `SidebarMenu` using Shadcn UI's `Collapsible` component. It illustrates the nesting of `CollapsibleTrigger` and `CollapsibleContent` within `SidebarMenuItem` and `SidebarMenuSub` to enable basic expand/collapse functionality for menu sub-items.

```tsx
<SidebarMenu>\n  <Collapsible defaultOpen className="group/collapsible">\n    <SidebarMenuItem>\n      <CollapsibleTrigger asChild>\n        <SidebarMenuButton />\n      </CollapsibleTrigger>\n      <CollapsibleContent>\n        <SidebarMenuSub>\n          <SidebarMenuSubItem />\n        </SidebarMenuSub>\n      </CollapsibleContent>\n    </SidebarMenuItem>\n  </Collapsible>\n</SidebarMenu>
```

--------------------------------

### Input Group with Text Addons (TSX)

Source: https://ui.shadcn.com/docs/components/input-group

Displays input fields with text addons for currency symbols, URL prefixes, suffixes, and metadata. Supports InputGroupInput and InputGroupTextarea with inline-start, inline-end, and block-end addon positioning. Includes character counter example.

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

export function InputGroupTextExample() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>$</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="0.00" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="example.com" className="!pl-0.5" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="Enter your username" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@company.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Enter your message" />
        <InputGroupAddon align="block-end">
          <InputGroupText className="text-muted-foreground text-xs">
            120 characters left
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

--------------------------------

### Organize Fields for Responsive Layouts with Shadcn UI FieldGroup (TSX)

Source: https://ui.shadcn.com/docs/components/field

This TSX example showcases the `FieldGroup` component, a layout wrapper designed to stack `Field` components and enable responsive orientations. It supports container queries, allowing for dynamic layout adjustments using utility classes like `@container/field-group`.

```tsx
<FieldGroup className="@container/field-group flex flex-col gap-6">
  <Field>{/* ... */}</Field>
  <Field>{/* ... */}</Field>
</FieldGroup>
```

--------------------------------

### Pagination Component Import and Basic Usage - TypeScript React

Source: https://ui.shadcn.com/docs/components/pagination

Demonstrates importing pagination components and creating a basic pagination structure with previous/next navigation and ellipsis for page ranges.

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

--------------------------------

### Implement Basic Horizontal Resizable Panel Group in React

Source: https://ui.shadcn.com/docs/components/resizable

This React JSX snippet demonstrates a simple horizontal resizable panel group with two panels separated by a handle. It serves as a basic example of how to structure a resizable layout using the `direction="horizontal"` prop for side-by-side arrangement.

```tsx
<ResizablePanelGroup direction="horizontal">
  <ResizablePanel>One</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel>Two</ResizablePanel>
</ResizablePanelGroup>
```

--------------------------------

### Group Form Controls with Shadcn UI FieldSet (TSX)

Source: https://ui.shadcn.com/docs/components/field

This TSX example illustrates the use of the `FieldSet` component to semantically group related form controls, enhancing both structure and accessibility. It typically includes a `FieldLegend` for the group's title and `FieldGroup` to organize the contained fields.

```tsx
<FieldSet>
  <FieldLegend>Delivery</FieldLegend>
  <FieldGroup>{/* Fields */}</FieldGroup>
</FieldSet>
```

--------------------------------

### Display loading states with InputGroup and Spinners in TSX

Source: https://ui.shadcn.com/docs/changelog

This React component illustrates how to integrate loading indicators within `InputGroup` components using `Spinner` and `LoaderIcon`. It shows multiple examples of disabled input fields with inline or block-aligned spinners and text addons to provide visual feedback during asynchronous operations.

```tsx
import { LoaderIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"

export function InputGroupSpinner() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Searching..." disabled />
        <InputGroupAddon align="inline-end">
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Processing..." disabled />
        <InputGroupAddon>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Saving changes..." disabled />
        <InputGroupAddon align="inline-end">
          <InputGroupText>Saving...</InputGroupText>
          <Spinner />
        </InputGroupAddon>
      </InputGroup>
      <InputGroup data-disabled>
        <InputGroupInput placeholder="Refreshing data..." disabled />
        <InputGroupAddon>
          <LoaderIcon className="animate-spin" />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-muted-foreground">
            Please wait...
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

--------------------------------

### Fetch Projects with SWR - React TypeScript

Source: https://ui.shadcn.com/docs/components/sidebar

Fetches project data using SWR hook with loading state management and skeleton UI fallback. Displays a sidebar menu with project links and icons. Handles loading and empty data states before rendering the project list.

```typescript
function NavProjects() {
  const { data, isLoading } = useSWR("/api/projects", fetcher)

  if (isLoading) {
    return (
      <SidebarMenu>
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    )
  }

  if (!data) {
    return ...
  }

  return (
    <SidebarMenu>
      {data.map((project) => (
        <SidebarMenuItem key={project.name}>
          <SidebarMenuButton asChild>
            <a href={project.url}>
              <project.icon />
              <span>{project.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
```

--------------------------------

### Apply Custom Spinner Colors with Utility Classes (TypeScript)

Source: https://ui.shadcn.com/docs/components/spinner

Demonstrates how to customize the color of the Spinner component using Tailwind CSS `text-*` utility classes. This example displays several spinners, each with a different color applied, such as red, green, blue, yellow, and purple. It highlights the flexibility in styling the spinner to match specific brand guidelines or UI themes.

```tsx
import { Spinner } from "@/components/ui/spinner"

export function SpinnerColor() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-6 text-red-500" />
      <Spinner className="size-6 text-green-500" />
      <Spinner className="size-6 text-blue-500" />
      <Spinner className="size-6 text-yellow-500" />
      <Spinner className="size-6 text-purple-500" />
    </div>
  )
}
```

--------------------------------

### Integrate Dark Mode Toggle into Astro Page

Source: https://ui.shadcn.com/docs/dark-mode/astro

This Astro component demonstrates how to import and render the `ModeToggle` React component within an Astro page. The `client:load` directive ensures the React component is hydrated on the client-side, enabling interactive theme switching. This snippet assumes the inline theme script for initial setup is also present in the page for a complete dark mode solution.

```astro
--- 
import '../styles/globals.css'
import { ModeToggle } from '@/components/ModeToggle';
---

<!-- Inline script -->

<html lang="en">
	<body>
      <h1>Astro</h1>
      <ModeToggle client:load />
	</body>
</html>
```

--------------------------------

### Render Basic Shadcn UI Item with Icon in TSX

Source: https://ui.shadcn.com/docs/changelog

Demonstrates how to render a basic `Item` component using Shadcn UI. It includes an `ItemMedia` for an icon (e.g., `HomeIcon`), along with `ItemContent` for title and description, illustrating the component's fundamental structure. Ensure `HomeIcon` is imported or defined.

```tsx
<Item>
  <ItemMedia variant="icon">
    <HomeIcon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Dashboard</ItemTitle>
    <ItemDescription>Overview of your account and activity.</ItemDescription>
  </ItemContent>
</Item>
```

--------------------------------

### Configure Field Component Orientation in TSX

Source: https://ui.shadcn.com/docs/components/field

The Field component acts as a core wrapper for form fields, providing control over orientation (vertical, horizontal, responsive), invalid state styling, and spacing. This example demonstrates setting the orientation to horizontal for a label and a switch component.

```tsx
<Field orientation="horizontal">
  <FieldLabel htmlFor="remember">Remember me</FieldLabel>
  <Switch id="remember" />
</Field>
```

--------------------------------

### Import and use shadcn/ui Button in React Router

Source: https://ui.shadcn.com/docs/installation/react-router

This TypeScript React code demonstrates how to import and integrate the `Button` component from `shadcn/ui` within a React Router route file. It includes example route metadata and shows the component's usage within a simple JSX structure, illustrating basic component implementation.

```tsx
import { Button } from "~/components/ui/button"

import type { Route } from "./+types/home"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" }
  ]
}

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}
```

--------------------------------

### Add Accessibility Label to NativeSelect Component (tsx)

Source: https://ui.shadcn.com/docs/components/native-select

This example demonstrates enhancing accessibility for the `NativeSelect` component by using the `aria-label` attribute. The label provides a descriptive text for screen readers, ensuring users understand the purpose of the select input. It contains options for different languages.

```tsx
<NativeSelect aria-label="Choose your preferred language">
  <NativeSelectOption value="en">English</NativeSelectOption>
  <NativeSelectOption value="es">Spanish</NativeSelectOption>
  <NativeSelectOption value="fr">French</NativeSelectOption>
</NativeSelect>
```

--------------------------------

### Build an Accessible Form with Shadcn UI Field Components (TSX)

Source: https://ui.shadcn.com/docs/components/field

This TypeScript React example demonstrates how to construct a complex, accessible form using various Shadcn UI components. It combines Field, FieldGroup, FieldSet, FieldLabel, FieldDescription, Input, Select, and Checkbox to create a payment and billing information form with proper semantic structure and accessibility attributes.

```tsx
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function FieldDemo() {
  return (
    <div className="w-full max-w-md">
      <form>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Payment Method</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Name on Card
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Card Number
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <FieldDescription>
                  Enter your 16-digit card number
                </FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    Month
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="MM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">01</SelectItem>
                      <SelectItem value="02">02</SelectItem>
                      <SelectItem value="03">03</SelectItem>
                      <SelectItem value="04">04</SelectItem>
                      <SelectItem value="05">05</SelectItem>
                      <SelectItem value="06">06</SelectItem>
                      <SelectItem value="07">07</SelectItem>
                      <SelectItem value="08">08</SelectItem>
                      <SelectItem value="09">09</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="11">11</SelectItem>
                      <SelectItem value="12">12</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    Year
                  </FieldLabel>
                  <Select defaultValue="">
                    <SelectTrigger id="checkout-7j9-exp-year-f59">
                      <SelectValue placeholder="YYYY" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-7j9-same-as-shipping-wgm"
                  defaultChecked
                />
                <FieldLabel
                  htmlFor="checkout-7j9-same-as-shipping-wgm"
                  className="font-normal"
                >
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>

```

--------------------------------

### Integrate Spinner into a Button for Loading State (TypeScript)

Source: https://ui.shadcn.com/docs/components/spinner

Shows how to embed a Spinner component within a button to visually indicate a loading or processing state. This example includes multiple buttons with different variants (default, outline, secondary) and disabled states, each displaying a spinner alongside descriptive text. The Button component automatically handles the appropriate spacing between the spinner and its content.

```tsx
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerButton() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Please wait
      </Button>
      <Button variant="secondary" disabled size="sm">
        <Spinner />
        Processing
      </Button>
    </div>
  )
}
```

--------------------------------

### Embed Spinner within a Badge for Status Indication (TypeScript)

Source: https://ui.shadcn.com/docs/components/spinner

Illustrates the usage of a Spinner component inside a Badge to signify an ongoing process or status. This example displays several badges with different variants (default, secondary, outline), each containing a spinner and relevant text like 'Syncing' or 'Updating'. It demonstrates how to visually enhance status indicators with an animated element.

```tsx
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

export function SpinnerBadge() {
  return (
    <div className="flex items-center gap-4 [--radius:1.2rem]">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="secondary">
        <Spinner />
        Updating
      </Badge>
      <Badge variant="outline">
        <Spinner />
        Processing
      </Badge>
    </div>
  )
}
```

--------------------------------

### Adjust Spinner Size with Utility Classes (TypeScript)

Source: https://ui.shadcn.com/docs/components/spinner

Illustrates how to change the visual size of the Spinner component using Tailwind CSS `size-*` utility classes directly via the `className` prop. This example renders multiple spinners with different predefined sizes, including `size-3`, `size-4`, `size-6`, and `size-8`. It provides a clear demonstration of how to apply various size variations to the spinner.

```tsx
import { Spinner } from "@/components/ui/spinner"

export function SpinnerSize() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </div>
  )
}
```

--------------------------------

### Implement a Shadcn UI Popover component with input fields in TypeScript React

Source: https://ui.shadcn.com/docs/components/popover

This TypeScript React snippet demonstrates how to create a rich Popover component using Shadcn UI, triggered by a Button. It populates the popover content with Input fields and Labels for setting dimensions, showcasing a common use case for interactive forms within a popover. The example utilizes Button, Input, Label, Popover, PopoverContent, and PopoverTrigger components.

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
```

--------------------------------

### Configure Files for a Registry Item in JSON

Source: https://ui.shadcn.com/docs/registry/registry-item-json

This JSON snippet demonstrates how to define files for a registry item, specifying their paths, types (e.g., page, component, hook, file), and optional target locations within a project. The `target` property is crucial for `registry:page` and `registry:file` types to dictate where the file should be placed, with `~` referring to the project root.

```json
{
  "files": [
    {
      "path": "registry/new-york/hello-world/page.tsx",
      "type": "registry:page",
      "target": "app/hello/page.tsx"
    },
    {
      "path": "registry/new-york/hello-world/hello-world.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/hello-world/use-hello-world.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/new-york/hello-world/.env",
      "type": "registry:file",
      "target": "~/.env"
    }
  ]
}
```

--------------------------------

### Implement Textarea with TanStack React Form and Zod Validation

Source: https://ui.shadcn.com/docs/forms/tanstack-form

This example demonstrates a complete React component (`FormTanstackTextarea`) that integrates a Shadcn UI `Textarea` with `@tanstack/react-form` for state management and Zod for validation. It showcases form submission with `sonner` toasts, dynamic error display, and reset functionality.

```tsx
/* eslint-disable react/no-children-prop */
"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  about: z
    .string()
    .min(10, "Please provide at least 10 characters.")
    .max(200, "Please keep it under 200 characters."),
})

export function FormTanstackTextarea() {
  const form = useForm({
    defaultValues: {
      about: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
    },
  })

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Personalization</CardTitle>
        <CardDescription>
          Customize your experience by telling us more about yourself.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-textarea"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="about"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor="form-tanstack-textarea-about">
                      More about you
                    </FieldLabel>
                    <Textarea
                      id="form-tanstack-textarea-about"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="I'm a software engineer..."
                      className="min-h-[120px]"
                    />
                    <FieldDescription>
                      Tell us more about yourself. This will be used to help us
                      personalize your experience.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-tanstack-textarea">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

--------------------------------

### Define Array Field Structure with Shadcn Components

Source: https://ui.shadcn.com/docs/forms/react-hook-form

This JSX snippet illustrates how to structure an array field using Shadcn's `FieldSet`, `FieldLegend`, and `FieldDescription` components. This setup provides semantic grouping and a clear description for a collection of dynamic array items.

```tsx
<FieldSet className="gap-4">
  <FieldLegend variant="label">Email Addresses</FieldLegend>
  <FieldDescription>
    Add up to 5 email addresses where we can contact you.
  </FieldDescription>
  <FieldGroup className="gap-4">{/* Array items go here */}</FieldGroup>
</FieldSet>
```

--------------------------------

### Understand `npm` Peer Dependency Error for React 19

Source: https://ui.shadcn.com/docs/react-19

This `npm` error output demonstrates a common `ERESOLVE` issue encountered when a package's peer dependencies do not explicitly list React 19. It indicates a conflict where the root project uses React 19 but a dependency expects an older version, leading to installation failure.

```bash
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: my-app@0.1.0
npm error Found: react@19.0.0-rc-69d4b800-20241021
npm error node_modules/react
npm error   react@"19.0.0-rc-69d4b800-20241021" from the root project
```

--------------------------------

### Implement React Hook Form Radio Group with Zod and Shadcn UI

Source: https://ui.shadcn.com/docs/forms/react-hook-form

This comprehensive example showcases how to build a subscription plan selection form using Shadcn UI's RadioGroup, managed by React Hook Form, and validated with Zod. It includes state management for radio inputs, error display using `FieldError`, and form submission handling with `sonner` toasts.

```tsx
"use client"\n\nimport * as React from \"react\"\nimport { zodResolver } from \"@hookform/resolvers/zod\"\nimport { Controller, useForm } from \"react-hook-form\"\nimport { toast } from \"sonner\"\nimport * as z from \"zod\"\n\nimport { Button } from \"@/components/ui/button\"\nimport {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from \"@/components/ui/card\"\nimport {\n  Field,\n  FieldContent,\n  FieldDescription,\n  FieldError,\n  FieldGroup,\n  FieldLabel,\n  FieldLegend,\n  FieldSet,\n  FieldTitle,\n} from \"@/components/ui/field\"\nimport {\n  RadioGroup,\n  RadioGroupItem,\n} from \"@/components/ui/radio-group\"\n\nconst plans = [\n  {\n    id: \"starter\",\n    title: \"Starter (100K tokens/month)\",\n    description: \"For everyday use with basic features.\",\n  },\n  {\n    id: \"pro\",\n    title: \"Pro (1M tokens/month)\",\n    description: \"For advanced AI usage with more features.\",\n  },\n  {\n    id: \"enterprise\",\n    title: \"Enterprise (Unlimited tokens)\",\n    description: \"For large teams and heavy usage.\",\n  },\n] as const\n\nconst formSchema = z.object({\n  plan: z.string().min(1, \"You must select a subscription plan to continue.\"),\n})\n\nexport function FormRhfRadioGroup() {\n  const form = useForm<z.infer<typeof formSchema>>({\n    resolver: zodResolver(formSchema),\n    defaultValues: {\n      plan: \"\",\n    },\n  })\n\n  function onSubmit(data: z.infer<typeof formSchema>) {\n    toast(\"You submitted the following values:\", {\n      description: (\n        <pre className=\"bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4\">\n          <code>{JSON.stringify(data, null, 2)}</code>\n        </pre>\n      ),\n      position: \"bottom-right\",\n      classNames: {\n        content: \"flex flex-col gap-2\",\n      },\n      style: {\n        \"--border-radius\": \"calc(var(--radius)  + 4px)\",\n      } as React.CSSProperties,\n    })\n  }\n\n  return (\n    <Card className=\"w-full sm:max-w-md\">\n      <CardHeader>\n        <CardTitle>Subscription Plan</CardTitle>\n        <CardDescription>\n          See pricing and features for each plan.\n        </CardDescription>\n      </CardHeader>\n      <CardContent>\n        <form id=\"form-rhf-radiogroup\" onSubmit={form.handleSubmit(onSubmit)}>\n          <FieldGroup>\n            <Controller\n              name=\"plan\"\n              control={form.control}\n              render={({ field, fieldState }) => (\n                <FieldSet data-invalid={fieldState.invalid}>\n                  <FieldLegend>Plan</FieldLegend>\n                  <FieldDescription>\n                    You can upgrade or downgrade your plan at any time.\n                  </FieldDescription>\n                  <RadioGroup\n                    name={field.name}\n                    value={field.value}\n                    onValueChange={field.onChange}\n                    aria-invalid={fieldState.invalid}\n                  >\n                    {plans.map((plan) => (\n                      <FieldLabel\n                        key={plan.id}\n                        htmlFor={`form-rhf-radiogroup-${plan.id}`}\n                      >\n                        <Field\n                          orientation=\"horizontal\"\n                          data-invalid={fieldState.invalid}\n                        >\n                          <FieldContent>\n                            <FieldTitle>{plan.title}</FieldTitle>\n                            <FieldDescription>\n                              {plan.description}\n                            </FieldDescription>\n                          </FieldContent>\n                          <RadioGroupItem\n                            value={plan.id}\n                            id={`form-rhf-radiogroup-${plan.id}`}\n                            aria-invalid={fieldState.invalid}\n                          />\n                        </Field>\n                      </FieldLabel>\n                    ))}\n                  </RadioGroup>\n                  {fieldState.invalid && (\n                    <FieldError errors={[fieldState.error]} />\n                  )}\n                </FieldSet>\n              )}\n            />\n          </FieldGroup>\n        </form>\n      </CardContent>\n      <CardFooter>\n        <Field orientation=\"horizontal\">\n          <Button type=\"button\" variant=\"outline\" onClick={() => form.reset()}>\n            Reset\n          </Button>\n          <Button type=\"submit\" form=\"form-rhf-radiogroup\">\n            Save\n          </Button>\n        </Field>\n      </CardFooter>\n    </Card>\n  )\n}
```

--------------------------------

### Configure CSS Variables for Shadcn UI Sidebar

Source: https://ui.shadcn.com/docs/components/sidebar

This CSS block defines custom properties (variables) for the Shadcn UI Sidebar component, including its background, foreground, primary, accent, border, and ring colors for both light and dark themes. These variables are typically placed in `app/globals.css` and can be overridden for custom theming, applying to both CLI and manual installations.

```css
@layer base {
  :root {
    --sidebar: oklch(0.985 0 0);
    --sidebar-foreground: oklch(0.145 0 0);
    --sidebar-primary: oklch(0.205 0 0);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.97 0 0);
    --sidebar-accent-foreground: oklch(0.205 0 0);
    --sidebar-border: oklch(0.922 0 0);
    --sidebar-ring: oklch(0.708 0 0);
  }

  .dark {
    --sidebar: oklch(0.205 0 0);
    --sidebar-foreground: oklch(0.985 0 0);
    --sidebar-primary: oklch(0.488 0.243 264.376);
    --sidebar-primary-foreground: oklch(0.985 0 0);
    --sidebar-accent: oklch(0.269 0 0);
    --sidebar-accent-foreground: oklch(0.985 0 0);
    --sidebar-border: oklch(1 0 0 / 10%);
    --sidebar-ring: oklch(0.439 0 0);
  }
}
```

--------------------------------

### Render a Complex Form with Shadcn UI and Custom Fields

Source: https://ui.shadcn.com/docs/changelog

This JSX snippet demonstrates the construction of a multi-section form using shadcn/ui components (`Select`, `Input`, `Textarea`, `Button`, `Checkbox`) alongside custom `Field`, `FieldGroup`, and `FieldSet` components for layout and semantic grouping. It includes examples for year selection, CVV input, billing address options, and comments, all wrapped within a form element for submission.

```jsx
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2027">2027</SelectItem>
                      <SelectItem value="2028">2028</SelectItem>
                      <SelectItem value="2029">2029</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                  <Input id="checkout-7j9-cvv" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          <FieldSeparator />
          <FieldSet>
            <FieldLegend>Billing Address</FieldLegend>
            <FieldDescription>
              The billing address associated with your payment method
            </FieldDescription>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-7j9-same-as-shipping-wgm"
                  defaultChecked
                />
                <FieldLabel
                  htmlFor="checkout-7j9-same-as-shipping-wgm"
                  className="font-normal"
                >
                  Same as shipping address
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Comments
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Add any additional comments"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
```

--------------------------------

### Configure Shadcn UI project settings with components.json (JSON)

Source: https://ui.shadcn.com/docs/changelog

This JSON snippet defines the core configuration for a Shadcn UI project, specifying styling preferences, Tailwind CSS configuration paths (`config`, `css`), base color, and alias mappings for components and utilities. It's essential for integrating Shadcn UI components and ensuring they align with the project's structure and styling conventions.

```json
{
  "style": "default",
  "rsc": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

--------------------------------

### Manage Select Component with React Hook Form

Source: https://ui.shadcn.com/docs/forms/react-hook-form

This example demonstrates how to connect a Shadcn UI `Select` component, used for choosing a billing period, to React Hook Form's `Controller`. It ensures the selected value is reflected in the form state and handles invalid states for styling.

```tsx
            <Controller
              name="billingPeriod"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-complex-billingPeriod">
                    Billing Period
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-rhf-complex-billingPeriod"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldDescription>
                    Choose how often you want to be billed.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
```

--------------------------------

### Calendar with Timezone Support

Source: https://ui.shadcn.com/docs/components/calendar

Example implementation of a calendar component with timezone awareness. Detects the user's local timezone using Intl.DateTimeFormat() in a useEffect hook during client-side rendering to avoid hydration mismatches. Passes the detected timezone to the Calendar component for proper date display and selection.

```TypeScript
export function CalendarWithTimezone() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [timeZone, setTimeZone] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      timeZone={timeZone}
    />
  )
}
```

--------------------------------

### Render a Submit Button for React Hook Form

Source: https://ui.shadcn.com/docs/forms/react-hook-form

Demonstrates rendering a submit button within a Shadcn UI CardFooter component. The button is explicitly linked to a form via its `form` attribute for submission, indicating its role in a larger React Hook Form setup.

```tsx
<Button type="submit" form="form-rhf-demo">
  Submit
</Button>
```

--------------------------------

### Configure TanStack Form Validation Modes (TSX)

Source: https://ui.shadcn.com/docs/forms/tanstack-form

This example illustrates how to configure multiple validation modes within TanStack Form's `validators` option. By specifying `onSubmit`, `onChange`, and `onBlur`, validation can be triggered at different interaction points, providing flexible user feedback.

```tsx
const form = useForm({
  defaultValues: {
    title: "",
    description: "",
  },
  validators: {
    onSubmit: formSchema,
    onChange: formSchema,
    onBlur: formSchema,
  },
})
```

--------------------------------

### Complete Table Demo with Sample Data

Source: https://ui.shadcn.com/docs/components/table

A full implementation of the Table component displaying invoice data with headers, body, and footer. Includes sample data structure and demonstrates mapping over data to create table rows.

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export function TableDemo() {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
```

--------------------------------

### Implement Basic Shadcn Hover Card Structure in TSX

Source: https://ui.shadcn.com/docs/components/hover-card

This TSX snippet illustrates the fundamental JSX structure for integrating a Shadcn UI Hover Card. It demonstrates wrapping a trigger element with `HoverCardTrigger` and defining the content to be displayed on hover within `HoverCardContent`, all enclosed within the parent `HoverCard` component. This provides a minimal functional example for basic usage.

```tsx
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>
```

--------------------------------

### Add Shadcn Resources Using CLI Command

Source: https://ui.shadcn.com/docs/registry/namespace

This bash snippet represents the beginning of a `shadcn` CLI command for adding resources from a configured registry. The full command would typically specify the resource to be added.

```bash

```

--------------------------------

### Implement Shadcn UI Select with TanStack Form and Zod Validation in React

Source: https://ui.shadcn.com/docs/forms/tanstack-form

This example demonstrates how to build a form with a Select input using `@tanstack/react-form` for form state management and `zod` for schema validation. It integrates Shadcn UI's `Select` component, utilizing `SelectTrigger`, `SelectValue`, `SelectContent`, and `SelectItem` to construct the user interface. The snippet also illustrates how to handle and display validation errors by conditionally setting `aria-invalid` on the `SelectTrigger` and `data-invalid` on the `Field` component.

```tsx
/* eslint-disable react/no-children-prop */
"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const spokenLanguages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
] as const

const formSchema = z.object({
  language: z
    .string()
    .min(1, "Please select your spoken language.")
    .refine((val) => val !== "auto", {
      message:
        "Auto-detection is not allowed. Please select a specific language.",
    }),
})

export function FormTanstackSelect() {
  const form = useForm({
    defaultValues: {
      language: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
    },
  })

  return (
    <Card className="w-full sm:max-w-lg">
      <CardHeader>
        <CardTitle>Language Preferences</CardTitle>
        <CardDescription>
          Select your preferred spoken language.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-select"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="language"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <Field orientation="responsive" data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor="form-tanstack-select-language">
                        Spoken Language
                      </FieldLabel>
                      <FieldDescription>
                        For best results, select the language you speak.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </FieldContent>
                    <Select
                      name={field.name}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id="form-tanstack-select-language"
                        aria-invalid={isInvalid}
                        className="min-w-[120px]"
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="item-aligned">
                        <SelectItem value="auto">Auto</SelectItem>
                        <SelectSeparator />
                        {spokenLanguages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-tanstack-select">
            Save
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
```

--------------------------------

### Commit Pending Changes Before Component Updates

Source: https://ui.shadcn.com/docs/tailwind-v4

This `bash` command sequence is recommended before running CLI tools that might overwrite components. It stages all changes and commits them, ensuring a recoverable state.

```bash
git add .
git commit -m "..."
```

--------------------------------

### Implement a React Select Field with Form Validation

Source: https://ui.shadcn.com/docs/forms/tanstack-form

This example showcases a `form.Field` component that renders a dropdown `Select` for choosing a billing period. It integrates with the form's state (`field.state.value`, `field.handleChange`) and displays validation errors using `FieldError` based on the `isInvalid` status, providing clear user feedback.

```tsx
<form.Field
  name="billingPeriod"
  children={(field) => {
    const isInvalid =
      field.state.meta.isTouched && !field.state.meta.isValid
    return (
      <Field data-invalid={isInvalid}>
        <FieldLabel htmlFor={field.name}>Billing Period</FieldLabel>
        <Select
          name={field.name}
          value={field.state.value}
          onValueChange={field.handleChange}
          aria-invalid={isInvalid}
        >
          <SelectTrigger id={field.name}>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <FieldDescription>
          Choose how often you want to be billed.
        </FieldDescription>
        {isInvalid && (
          <FieldError errors={field.state.meta.errors} />
        )}
      </Field>
    )
  }}
/>
```

--------------------------------

### React Suspense Integration with Server Components

Source: https://ui.shadcn.com/docs/components/sidebar

Demonstrates proper integration of React.Suspense with server components to handle asynchronous data fetching. The Suspense boundary wraps the NavProjects server component and displays NavProjectsSkeleton as a fallback UI. This pattern enables progressive rendering and improved user experience.

```tsx
function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <React.Suspense fallback={<NavProjectsSkeleton />}>
              <NavProjects />
            </React.Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
```

--------------------------------

### Item Link Component with asChild Prop in TSX

Source: https://ui.shadcn.com/docs/components/item

Renders Item components as anchor links with hover and focus states applied to the anchor element using the asChild prop. Includes examples of internal links with chevron icons and external links with security attributes and external link icons from lucide-react.

```tsx
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

export function ItemLink() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item asChild>
        <a href="#">
          <ItemContent>
            <ItemTitle>Visit our documentation</ItemTitle>
            <ItemDescription>
              Learn how to get started with our components.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
      <Item variant="outline" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <ItemContent>
            <ItemTitle>External resource</ItemTitle>
            <ItemDescription>
              Opens in a new tab with security attributes.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ExternalLinkIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}
```

--------------------------------

### Update All Shadcn UI Components via CLI

Source: https://ui.shadcn.com/docs/tailwind-v4

This `bash` command uses the Shadcn CLI to add or update all components, with the `--overwrite` flag indicating that existing component files will be replaced. It's crucial for applying new component versions or dark mode changes.

```bash
npx shadcn@latest add --all --overwrite
```

--------------------------------

### Implement Shadcn UI InputOTP Composition Pattern in JSX/TSX

Source: https://ui.shadcn.com/docs/components/input-otp

This diff illustrates how to refactor your application code to use the new composition pattern for the `InputOTP` component. It demonstrates directly nesting `InputOTPSlot` and `InputOTPSeparator` within `InputOTPGroup` as children, simplifying the component structure.

```diff
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

--------------------------------

### Set Environment Variables for Registry Authentication

Source: https://ui.shadcn.com/docs/mcp

This Bash snippet illustrates how to define environment variables like 'REGISTRY_TOKEN' and 'API_KEY' in a '.env.local' file. These variables are crucial for authenticating with private registries and ensuring secure access to component libraries without hardcoding sensitive credentials.

```bash
REGISTRY_TOKEN=your_token_here
API_KEY=your_api_key_here
```

--------------------------------

### Apply Invalid State to NativeSelect Component (tsx)

Source: https://ui.shadcn.com/docs/components/native-select

This snippet shows a direct example of applying the `aria-invalid="true"` attribute to a `NativeSelect` component. This attribute signals to assistive technologies and styling systems that the input currently holds an invalid value. It includes several `NativeSelectOption` elements for various countries.

```tsx
<NativeSelect aria-invalid="true">
  <NativeSelectOption value="">Select a country</NativeSelectOption>
  <NativeSelectOption value="us">United States</NativeSelectOption>
  <NativeSelectOption value="uk">United Kingdom</NativeSelectOption>
  <NativeSelectOption value="ca">Canada</NativeSelectOption>
</NativeSelect>
```

--------------------------------

### Importing Shadcn UI Empty Components

Source: https://ui.shadcn.com/docs/changelog

This snippet demonstrates how to import the necessary 'Empty' components (Empty, EmptyContent, EmptyDescription, EmptyMedia, EmptyTitle) from the '@/components/ui/empty' path for use in a React/Next.js application.

```tsx
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
```

--------------------------------

### Display React Hook Form validation errors with FieldError and ARIA attributes (TypeScript)

Source: https://ui.shadcn.com/docs/forms/react-hook-form

This example shows how to display validation errors for a form field using React Hook Form's `Controller`. It demonstrates conditionally rendering `FieldError` and applying `data-invalid` and `aria-invalid` attributes for styling and improved accessibility.

```tsx
<Controller
  name="email"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
      <Input
        {...field}
        id={field.name}
        type="email"
        aria-invalid={fieldState.invalid}
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  )}
/>
```

--------------------------------

### Server Component for Fetching and Rendering Projects

Source: https://ui.shadcn.com/docs/components/sidebar

An async server component that fetches project data and renders a menu list. The component awaits the fetchProjects() function and dynamically generates menu items with project icons and names. Each project item is wrapped with SidebarMenuButton for interactive behavior.

```tsx
async function NavProjects() {
  const projects = await fetchProjects()

  return (
    <SidebarMenu>
      {projects.map((project) => (
        <SidebarMenuItem key={project.name}>
          <SidebarMenuButton asChild>
            <a href={project.url}>
              <project.icon />
              <span>{project.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
```

--------------------------------

### Implement Checkboxes with TanStack Form and shadcn/ui

Source: https://ui.shadcn.com/docs/forms/tanstack-form

This TypeScript/TSX example demonstrates how to integrate single and array checkboxes into a form using TanStack React Form and shadcn/ui components. It covers form initialization with `useForm`, Zod validation for both boolean and array checkboxes, handling `onCheckedChange` for state updates, displaying errors with `aria-invalid` and `data-invalid` props, and managing checkbox arrays with `mode="array"` and `tasks.map`.

```tsx
/* eslint-disable react/no-children-prop */
"use client"

import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"

const tasks = [
  {
    id: "push",
    label: "Push notifications",
  },
  {
    id: "email",
    label: "Email notifications",
  },
] as const

const formSchema = z.object({
  responses: z.boolean(),
  tasks: z
    .array(z.string())
    .min(1, "Please select at least one notification type.")
    .refine(
      (value) => value.every((task) => tasks.some((t) => t.id === task)),
      {
        message: "Invalid notification type selected.",
      }
    ),
})

export function FormTanstackCheckbox() {
  const form = useForm({
    defaultValues: {
      responses: true,
      tasks: [] as string[],
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
            <code>{JSON.stringify(value, null, 2)}</code>
          </pre>
        ),
        position: "bottom-right",
        classNames: {
          content: "flex flex-col gap-2",
        },
        style: {
          "--border-radius": "calc(var(--radius)  + 4px)",
        } as React.CSSProperties,
      })
    },
  })

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your notification preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-tanstack-checkbox"
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
        >
          <FieldGroup>
            <form.Field
              name="responses"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend variant="label">Responses</FieldLegend>
                    <FieldDescription>
                      Get notified for requests that take time, like research or
                      image generation.
                    </FieldDescription>
                    <FieldGroup data-slot="checkbox-group">
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <Checkbox
                          id="form-tanstack-checkbox-responses"
                          name={field.name}
                          checked={field.state.value}
                          onCheckedChange={(checked) =>
                            field.handleChange(checked === true)
                          }
                          disabled
                        />
                        <FieldLabel
                          htmlFor="form-tanstack-checkbox-responses"
                          className="font-normal"
                        >
                          Push notifications
                        </FieldLabel>
                      </Field>
                    </FieldGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                )
              }}
            />
            <FieldSeparator />
            <form.Field
              name="tasks"
              mode="array"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid
                return (
                  <FieldSet>
                    <FieldLegend variant="label">Tasks</FieldLegend>
                    <FieldDescription>
                      Get notified when tasks you&apos;ve created have updates.
                    </FieldDescription>
                    <FieldGroup data-slot="checkbox-group">
                      {tasks.map((task) => (
                        <Field
                          key={task.id}
```

--------------------------------

### Sample Chart Data with Date and View Metrics

Source: https://ui.shadcn.com/docs/components/chart

Array of data objects containing date, desktop, and mobile view counts for a 12-day period. This data structure serves as the input for the bar chart visualization, with daily metrics for tracking visitor statistics across different device types.

```JavaScript
[
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 }
]
```

--------------------------------

### Build Item Links with Icons and External References

Source: https://ui.shadcn.com/docs/changelog

Demonstrates creating multiple item links including internal documentation links and external resources. The component uses the asChild prop with different variants and includes ChevronRight and ExternalLink icons in ItemActions to indicate link type and navigation direction.

```tsx
import { ChevronRightIcon, ExternalLinkIcon } from "lucide-react"

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"

export function ItemLink() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Item asChild>
        <a href="#">
          <ItemContent>
            <ItemTitle>Visit our documentation</ItemTitle>
            <ItemDescription>
              Learn how to get started with our components.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
      <Item variant="outline" asChild>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <ItemContent>
            <ItemTitle>External resource</ItemTitle>
            <ItemDescription>
              Opens in a new tab with security attributes.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <ExternalLinkIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}
```

--------------------------------

### Carousel with Spacing Configuration in React TSX

Source: https://ui.shadcn.com/docs/components/carousel

Implements a carousel component with configurable spacing using Tailwind CSS utilities. Uses `pl-[VALUE]` on CarouselItem and `-ml-[VALUE]` on CarouselContent to control item spacing. The example creates a responsive carousel with 5 items that displays 1 item on mobile, 2 on tablet, and 3 on desktop.

```tsx
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselSpacing() {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-2xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
```

--------------------------------

### Configure Private Registry with Authentication

Source: https://ui.shadcn.com/docs/changelog

Set up a private registry with bearer token authentication via custom headers. Supports multiple authentication methods including basic auth, API keys, and custom headers for enterprise security.

```json
{
  "registries": {
    "@private": {
      "url": "https://registry.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

--------------------------------

### Integrate shadcn/ui Switch with React Hook Form Controller in TypeScript

Source: https://ui.shadcn.com/docs/forms/react-hook-form

This focused TypeScript snippet demonstrates the specific setup for connecting a `shadcn/ui` Switch component to `react-hook-form` using the `Controller` component. It illustrates how to bind `field.value` to `checked`, `field.onChange` to `onCheckedChange`, and propagate validation state using `aria-invalid` and `data-invalid` props for error visualization.

```tsx
<Controller
  name="twoFactor"
  control={form.control}
  render={({ field, fieldState }) => (
    <Field orientation="horizontal" data-invalid={fieldState.invalid}>
      <FieldContent>
        <FieldLabel htmlFor="form-rhf-switch-twoFactor">
          Multi-factor authentication
        </FieldLabel>
        <FieldDescription>
          Enable multi-factor authentication to secure your account.
        </FieldDescription>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
      <Switch
        id="form-rhf-switch-twoFactor"
        name={field.name}
        checked={field.value}
        onCheckedChange={field.onChange}
        aria-invalid={fieldState.invalid}
      />
    </Field>
  )}
/>
```

--------------------------------

### Implement Command Menu with Cmd+K Shortcut in React/TypeScript

Source: https://ui.shadcn.com/docs/components/command

Creates a reusable command menu component that triggers with Cmd+K (Mac) or Ctrl+K (Windows/Linux) keyboard shortcut. Features a searchable command dialog with grouped command items and empty state handling. Uses React hooks for state management and keyboard event detection.

```tsx
export function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
```

--------------------------------

### Test Authenticated Registry with shadcn CLI

Source: https://ui.shadcn.com/docs/registry/authentication

Verify registry authentication using the shadcn CLI tool by setting the REGISTRY_TOKEN environment variable. Tests end-to-end authentication workflow with private namespaced registries.

```bash
REGISTRY_TOKEN=your_token npx shadcn@latest add @private/button
```

--------------------------------

### Create a Basic Command Menu JSX Structure (TypeScript React)

Source: https://ui.shadcn.com/docs/components/command

This snippet illustrates the minimal JSX structure required to render a functional Command menu component. It includes a search input, a list of items grouped into 'Suggestions' and 'Settings', and a message for empty results, providing a clean and unstyled base for a command palette.

```tsx
<Command>
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

--------------------------------

### View Specific Component Changes with diff

Source: https://ui.shadcn.com/docs/changelog

Run the diff command with a component name to view detailed changes between your local component and the upstream version, displayed as a diff.

```bash
npx shadcn diff alert
```

--------------------------------

### Complete AppSidebar with React Server Components

Source: https://ui.shadcn.com/docs/components/sidebar

A full implementation of a sidebar component using React Server Components that fetches project data asynchronously. The component wraps the NavProjects server component with React.Suspense to display a skeleton loader while data is being fetched. Includes project data structure with icons from lucide-react and badge counts.

```tsx
import * as React from "react"
import {
  FrameIcon,
  LifeBuoyIcon,
  MapIcon,
  PieChartIcon,
  SendIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
} from "@/components/ui/sidebar"

const projects = [
  {
    name: "Design Engineering",
    url: "#",
    icon: FrameIcon,
    badge: "24",
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChartIcon,
    badge: "12",
  },
  {
    name: "Travel",
    url: "#",
    icon: MapIcon,
    badge: "3",
  },
  {
    name: "Support",
    url: "#",
    icon: LifeBuoyIcon,
    badge: "21",
  },
  {
    name: "Feedback",
    url: "#",
    icon: SendIcon,
    badge: "8",
  },
]

// Dummy fetch function
async function fetchProjects() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return projects
}

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <React.Suspense fallback={<NavProjectsSkeleton />}>
                <NavProjects />
              </React.Suspense>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

function NavProjectsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}

async function NavProjects() {
  const projects = await fetchProjects()

  return (
    <SidebarMenu>
      {projects.map((project) => (
        <SidebarMenuItem key={project.name}>
          <SidebarMenuButton asChild>
            <a href={project.url}>
              <project.icon />
              <span>{project.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
```

--------------------------------

### Import Menubar Components (Shadcn UI, TypeScript/React)

Source: https://ui.shadcn.com/docs/components/menubar

This snippet demonstrates how to import all necessary Menubar sub-components (Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger) from the `@/components/ui/menubar` path. These imports are crucial for using the Menubar component in a Shadcn UI project.

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
```

--------------------------------

### Create a basic Shadcn UI Context Menu structure (TSX)

Source: https://ui.shadcn.com/docs/components/context-menu

This snippet provides the fundamental JSX structure for a simple Shadcn UI Context Menu. It demonstrates how to wrap content with `ContextMenuTrigger` to enable context menu activation and how to define basic menu items within `ContextMenuContent`.

```tsx
<ContextMenu>
  <ContextMenuTrigger>Right click</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

--------------------------------

### Configure components.json to Enable CSS Variable Theming

Source: https://ui.shadcn.com/docs/theming

Shows the configuration in `components.json` required to enable CSS variable-based theming in a project, specifically setting `tailwind.cssVariables` to `true`.

```json
{
  "style": "new-york",
  "rsc": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

--------------------------------

### Store Registry Tokens in Environment Variables

Source: https://ui.shadcn.com/docs/registry/authentication

Use environment variables to securely store authentication tokens and API keys without committing them to version control. Environment variables are referenced using template syntax in registry configuration.

```bash
REGISTRY_TOKEN=your_secret_token_here
API_KEY=your_api_key_here
```

--------------------------------

### Configure Multi-Registry with Different Authentication Methods

Source: https://ui.shadcn.com/docs/registry/authentication

Set up multiple component registries with different authentication strategies using namespaced registry configuration. Supports bearer tokens, API keys, and custom headers for different access levels (public, internal, premium).

```json
{
  "registries": {
    "@public": "https://public.company.com/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${INTERNAL_TOKEN}"
      }
    },
    "@premium": {
      "url": "https://premium.company.com/{name}.json",
      "headers": {
        "X-License-Key": "${LICENSE_KEY}"
      }
    }
  }
}
```

--------------------------------

### Integrate React ThemeProvider into a Vite Application Root Layout

Source: https://ui.shadcn.com/docs/dark-mode/vite

This code snippet shows how to wrap your main React application component, `App`, with the `ThemeProvider`. This integration makes the theme context available globally throughout your application, allowing you to specify a `defaultTheme` and a `storageKey` for persistence.

```tsx
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  )
}

export default App
```

--------------------------------

### Import Empty Component and Subcomponents

Source: https://ui.shadcn.com/docs/components/empty

Import the Empty component and its subcomponents (EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle) from the UI components library. These form the building blocks for constructing empty state layouts.

```tsx
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
```

--------------------------------

### Render a simple Skeleton placeholder in TypeScript React

Source: https://ui.shadcn.com/docs/components/skeleton

Illustrates the basic usage of the `Skeleton` component by rendering a single, rounded placeholder element. It demonstrates how to apply styling directly via the `className` prop.

```tsx
<Skeleton className="h-[20px] w-[100px] rounded-full" />
```

--------------------------------

### Configure Multiple Registries in components.json

Source: https://ui.shadcn.com/docs/mcp

This JSON configuration demonstrates how to define multiple registries in the 'components.json' file, including third-party and private registries. It shows how to specify a URL for a registry and how to include headers for authentication, using environment variables for sensitive data.

```json
{
  "registries": {
    "@acme": "https://registry.acme.com/{name}.json",
    "@internal": {
      "url": "https://internal.company.com/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

--------------------------------

### View Available Component Updates Output

Source: https://ui.shadcn.com/docs/changelog

Output from the diff command showing which components have updates available and their file paths in your project.

```text
The following components have updates available:
- button
  - /path/to/my-app/components/ui/button.tsx
- toast
  - /path/to/my-app/components/ui/use-toast.ts
  - /path/to/my-app/components/ui/toaster.tsx
```

--------------------------------

### Create a Basic Shadcn UI Select Component in React/TypeScript

Source: https://ui.shadcn.com/docs/components/select

This snippet demonstrates how to construct a functional dropdown menu using Shadcn UI's Select components. It showcases the integration of Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, and SelectItem to present a list of fruit options.

```tsx
import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
```

--------------------------------

### Integrate Kbd into an Input Group (React/TypeScript)

Source: https://ui.shadcn.com/docs/components/kbd

Shows how to place `Kbd` components within an `InputGroupAddon` to indicate keyboard shortcuts associated with an input field, such as a search bar. This provides a visual cue for quick actions.

```tsx
import { SearchIcon } from "lucide-react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export function KbdInputGroup() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}
```

--------------------------------

### Basic Input Component Usage

Source: https://ui.shadcn.com/docs/components/input

Render a basic Input component with email type and placeholder text. This demonstrates the simplest way to display an input field in your application.

```tsx
<Input />
```

--------------------------------

### Basic Drawer Component Usage in React

Source: https://ui.shadcn.com/docs/components/drawer

Create a basic drawer with trigger, header, description, and footer sections. The drawer slides in from the side and displays a confirmation message with submit and cancel actions.

```tsx
<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

--------------------------------

### Create Basic Dropdown Menu - TypeScript React

Source: https://ui.shadcn.com/docs/components/dropdown-menu

A minimal dropdown menu implementation with label, multiple menu items, and separators. Demonstrates fundamental structure with account-related menu options. Does not include advanced features like keyboard shortcuts or nested submenus.

```typescript
<DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

--------------------------------

### Create a React Theme Provider Component for Vite Applications

Source: https://ui.shadcn.com/docs/dark-mode/vite

This `ThemeProvider` React component establishes a context for managing the application's theme, supporting 'light', 'dark', and 'system' modes. It persists the user's theme preference in `localStorage` and applies the selected theme by updating classes on the `document.documentElement`, also providing a `useTheme` hook for consuming the theme state.

```tsx
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
```

--------------------------------

### Configure Multiple Department Registries

Source: https://ui.shadcn.com/docs/changelog

Set up separate namespaced registries for different teams or departments (design, engineering, marketing). Each namespace points to its own registry URL with {name} placeholder for component resolution.

```json
{
  "registries": {
    "@design": "https://registry.company.com/design/{name}.json",
    "@engineering": "https://registry.company.com/eng/{name}.json",
    "@marketing": "https://registry.company.com/marketing/{name}.json"
  }
}
```

--------------------------------

### Full List of Global Theming CSS Variables in app/globals.css

Source: https://ui.shadcn.com/docs/theming

Comprehensive list of predefined CSS variables for a theming system, including `root` and `dark` mode definitions for various UI elements and chart colors, using the Oklch color format for consistent styling.

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.269 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.371 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
}
```

--------------------------------

### Clone shadcn/ui Repository with Git

Source: https://ui.shadcn.com/docs/blocks

Clones the shadcn/ui repository to local workspace. This is the first step in setting up the development environment for contributing blocks.

```bash
git clone https://github.com/shadcn-ui/ui.git
```

--------------------------------

### Basic Card Structure - TypeScript/React

Source: https://ui.shadcn.com/docs/components/card

Demonstrates the basic structure of a Card component with all available sub-components. Shows proper nesting of CardHeader with title and description, CardContent for main content, and CardFooter for footer elements.

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

--------------------------------

### Define Form Structure with Radix UI

Source: https://ui.shadcn.com/docs/components/form

This snippet illustrates the basic structural components of a form using the Shadcn UI `<Form>` and `<FormField>`, integrating Radix UI components like `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, and `FormMessage`. It outlines how to render custom form fields within the `render` prop for flexible UI construction.

```tsx
<Form>
  <FormField
    control={...}
    name="..."
    render={() => (
      <FormItem>
        <FormLabel />
        <FormControl>
          { /* Your form field */}
        </FormControl>
        <FormDescription />
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

--------------------------------

### Basic Sheet Component Demo in TSX

Source: https://ui.shadcn.com/docs/components/sheet

Demonstrates a complete Sheet implementation with header, form inputs, and footer actions. Includes edit profile form with name and username fields, along with save and close buttons using shadcn UI components.

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
```

--------------------------------

### Provide detailed description for registry item

Source: https://ui.shadcn.com/docs/registry/registry-item-json

The `description` property offers a more extensive explanation of the registry item's purpose and functionality. It allows for detailed context that complements the concise title, helping users understand what the item does.

```json
{
  "description": "A simple hello world component."
}
```

--------------------------------

### Implement Custom ChartTooltip with labelKey and nameKey Props

Source: https://ui.shadcn.com/docs/components/chart

Create a ChartTooltip component with ChartTooltipContent that uses custom keys to map data properties to tooltip labels and names. The labelKey references the 'visitors' property for the label, and nameKey references 'browser' for tooltip item names.

```tsx
<ChartTooltip
  content={<ChartTooltipContent labelKey="visitors" nameKey="browser" />}
/>
```

--------------------------------

### Define Global CSS Variables for Light and Dark Themes (CSS)

Source: https://ui.shadcn.com/docs/theming

This CSS snippet defines a comprehensive set of custom properties (CSS variables) for various UI elements, including colors for background, foreground, cards, popovers, primary/secondary/accent elements, and charts. It includes distinct definitions for both light (default) and dark themes, allowing for easy theme switching by applying the `.dark` class. These variables are typically used in a `globals.css` file to provide a consistent styling foundation across a web application, often in conjunction with UI libraries like shadcn.

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.147 0.004 49.25);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.147 0.004 49.25);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.147 0.004 49.25);
  --primary: oklch(0.216 0.006 56.043);
  --primary-foreground: oklch(0.985 0.001 106.423);
  --secondary: oklch(0.97 0.001 106.424);
  --secondary-foreground: oklch(0.216 0.006 56.043);
  --muted: oklch(0.97 0.001 106.424);
  --muted-foreground: oklch(0.553 0.013 58.071);
  --accent: oklch(0.97 0.001 106.424);
  --accent-foreground: oklch(0.216 0.006 56.043);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.923 0.003 48.717);
  --input: oklch(0.923 0.003 48.717);
  --ring: oklch(0.709 0.01 56.259);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0.001 106.423);
  --sidebar-foreground: oklch(0.147 0.004 49.25);
  --sidebar-primary: oklch(0.216 0.006 56.043);
  --sidebar-primary-foreground: oklch(0.985 0.001 106.423);
  --sidebar-accent: oklch(0.97 0.001 106.424);
  --sidebar-accent-foreground: oklch(0.216 0.006 56.043);
  --sidebar-border: oklch(0.923 0.003 48.717);
  --sidebar-ring: oklch(0.709 0.01 56.259);
}

.dark {
  --background: oklch(0.147 0.004 49.25);
  --foreground: oklch(0.985 0.001 106.423);
  --card: oklch(0.216 0.006 56.043);
  --card-foreground: oklch(0.985 0.001 106.423);
  --popover: oklch(0.216 0.006 56.043);
  --popover-foreground: oklch(0.985 0.001 106.423);
  --primary: oklch(0.923 0.003 48.717);
  --primary-foreground: oklch(0.216 0.006 56.043);
  --secondary: oklch(0.268 0.007 34.298);
  --secondary-foreground: oklch(0.985 0.001 106.423);
  --muted: oklch(0.268 0.007 34.298);
  --muted-foreground: oklch(0.709 0.01 56.259);
  --accent: oklch(0.268 0.007 34.298);
  --accent-foreground: oklch(0.985 0.001 106.423);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.553 0.013 58.071);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.216 0.006 56.043);
  --sidebar-foreground: oklch(0.985 0.001 106.423);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0.001 106.423);
  --sidebar-accent: oklch(0.268 0.007 34.298);
  --sidebar-accent-foreground: oklch(0.985 0.001 106.423);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.553 0.013 58.071);
}
```

--------------------------------

### Execute shadcn Build Command

Source: https://ui.shadcn.com/docs/cli

Basic command to build and generate registry JSON files. This command reads the default registry.json file and outputs the generated files to the public/r directory.

```bash
npx shadcn@latest build
```

--------------------------------

### Advanced Registry Configuration with Authentication

Source: https://ui.shadcn.com/docs/components-json

Configure private registries with authentication headers and query parameters. Supports environment variable expansion using ${VAR_NAME} syntax for secure credential management. Headers like Authorization and X-API-Key can be configured per registry.

```json
{
  "registries": {
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}",
        "X-API-Key": "${API_KEY}"
      },
      "params": {
        "version": "latest"
      }
    }
  }
}
```

--------------------------------

### Initialize Dark Mode in Astro with Inline Script

Source: https://ui.shadcn.com/docs/dark-mode/astro

This Astro component demonstrates how to set an initial dark mode preference based on user's `localStorage` or system settings. It also includes an observer to persist theme changes across sessions by updating `localStorage` when the `dark` class on the `document.documentElement` changes. This script is designed to run early to prevent Flash of Unstyled Content (FOUC).

```astro
--- 
import '../styles/globals.css'
---

<script is:inline>
	const getThemePreference = () => {
		if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
			return localStorage.getItem('theme');
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};
	const isDark = getThemePreference() === 'dark';
	document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

	if (typeof localStorage !== 'undefined') {
		const observer = new MutationObserver(() => {
			const isDark = document.documentElement.classList.contains('dark');
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
	}
</script>

<html lang="en">
	<body>
      <h1>Astro</h1>
	</body>
</html>
```

--------------------------------

### Sample Payment Data Array - TypeScript

Source: https://ui.shadcn.com/docs/components/data-table

Creates an array of five sample Payment objects with realistic test data. Each payment record contains an id, amount value, status state, and email address used for populating the initial data table.

```typescript
const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
]
```

--------------------------------

### Configure Import Aliases in components.json

Source: https://ui.shadcn.com/docs/changelog

Update the components.json configuration file to include import aliases for components, utilities, UI library, lib, and hooks directories. This enables proper module resolution when using the shadcn/ui CLI. Replace the @ prefix with your custom prefix (e.g., ~) if needed.

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "tailwind": {
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

--------------------------------

### Import Tooltip Components

Source: https://ui.shadcn.com/docs/components/tooltip

Standard import statement for using Tooltip, TooltipContent, and TooltipTrigger components from the ui components directory. Must be placed at the top of component files using the tooltip.

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
```

--------------------------------

### Configure Shadcn Registry for Semantic Versioning

Source: https://ui.shadcn.com/docs/registry/namespace

This JSON snippet configures a Shadcn registry to support semantic versioning and prerelease flags. It uses `semver` and `prerelease` parameters, allowing users to specify version ranges (e.g., `^2.0.0`) and control prerelease inclusion via an environment variable.

```json
{
  "@npm-style": {
    "url": "https://registry.example.com/{name}",
    "params": {
      "semver": "^2.0.0",
      "prerelease": "${ALLOW_PRERELEASE}"
    }
  }
}
```

--------------------------------

### Update Shadcn UI InputOTP Package with npm

Source: https://ui.shadcn.com/docs/components/input-otp

This command updates the `input-otp` package to its latest version using npm. It ensures that you have the most recent features, bug fixes, and API changes for the component.

```bash
npm install input-otp@latest
```

--------------------------------

### Create Item List with ItemGroup and Avatar

Source: https://ui.shadcn.com/docs/changelog

Demonstrates rendering a list of people using ItemGroup with avatar images, titles, descriptions, and action buttons. The component maps over a people array and displays each person with their avatar, username, email, and an action button, with separators between items.

```tsx
import * as React from "react"
import { PlusIcon } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"

const people = [
  {
    username: "shadcn",
    avatar: "https://github.com/shadcn.png",
    email: "shadcn@vercel.com",
  },
  {
    username: "maxleiter",
    avatar: "https://github.com/maxleiter.png",
    email: "maxleiter@vercel.com",
  },
  {
    username: "evilrabbit",
    avatar: "https://github.com/evilrabbit.png",
    email: "evilrabbit@vercel.com",
  },
]

export function ItemGroupExample() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <ItemGroup>
        {people.map((person, index) => (
          <React.Fragment key={person.username}>
            <Item>
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={person.avatar} className="grayscale" />
                  <AvatarFallback>{person.username.charAt(0)}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent className="gap-1">
                <ItemTitle>{person.username}</ItemTitle>
                <ItemDescription>{person.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <PlusIcon />
                </Button>
              </ItemActions>
            </Item>
            {index !== people.length - 1 && <ItemSeparator />}
          </React.Fragment>
        ))}
      </ItemGroup>
    </div>
  )
}
```

--------------------------------

### Create Basic AppSidebar Component (TypeScript/React)

Source: https://ui.shadcn.com/docs/components/sidebar

This code defines a basic `AppSidebar` component using `Sidebar` and `SidebarContent` from the Shadcn/UI library. It establishes the initial structure for a collapsible sidebar, ready to be populated with navigation elements.

```tsx
import { Sidebar, SidebarContent } from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent />
    </Sidebar>
  )
}
```

--------------------------------

### Configure Namespaced Registries in components.json

Source: https://ui.shadcn.com/docs/changelog

Set up multiple namespaced registries with URLs and optional authentication headers. Supports both string URLs and objects with headers for bearer token authentication. Enables decentralized component distribution across different namespaces.

```json
{
  "registries": {
    "@acme": "https://acme.com/r/{name}.json",
    "@internal": {
      "url": "https://registry.company.com/{name}",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

--------------------------------

### Import Slider Component

Source: https://ui.shadcn.com/docs/components/slider

Demonstrates how to import the Slider component from the components/ui directory in a TypeScript/React project.

```typescript
import { Slider } from "@/components/ui/slider"
```

--------------------------------

### Render Dynamic Menu Items with React map

Source: https://ui.shadcn.com/docs/components/navigation-menu

Uses React's map function to iterate over a components array and dynamically render menu items. Demonstrates component composition patterns where reusable ListItem components receive props from array data. Enables scalable menu structures without hardcoding individual items.

```tsx
<NavigationMenuItem>
  <NavigationMenuTrigger>Components</NavigationMenuTrigger>
  <NavigationMenuContent>
    <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
      {components.map((component) => (
        <ListItem
          key={component.title}
          title={component.title}
          href={component.href}
        >
          {component.description}
        </ListItem>
      ))}
    </ul>
  </NavigationMenuContent>
</NavigationMenuItem>
```

--------------------------------

### URL Pattern with {style} Placeholder

Source: https://ui.shadcn.com/docs/registry/namespace

Configure registries to serve different component versions based on the current style configuration. The {style} placeholder is replaced with the active style (e.g., 'new-york'). Useful for maintaining style-specific variants of components.

```json
{
  "@themes": "https://registry.example.com/{style}/{name}.json"
}
```

--------------------------------

### items Array with Registry Item Definitions

Source: https://ui.shadcn.com/docs/registry/registry-json

Contains an array of registry items, each implementing the registry-item schema specification. Each item defines a component with its name, type, dependencies, and file references for the registry catalog.

```json
{
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "registryDependencies": [
        "button",
        "@acme/input-form",
        "https://example.com/r/foo"
      ],
      "dependencies": ["is-even@3.0.0", "motion"],
      "files": [
        {
          "path": "registry/new-york/hello-world/hello-world.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

--------------------------------

### Create Lead/Intro Text Component with React and Tailwind CSS

Source: https://ui.shadcn.com/docs/components/typography

Exports a reusable lead paragraph component with larger text size (text-xl), muted foreground color, and semantic emphasis. Used for introductory or summary text sections.

```tsx
export function TypographyLead() {
  return (
    <p className="text-muted-foreground text-xl">
      A modal dialog that interrupts the user with important content and expects
      a response.
    </p>
  )
}
```

--------------------------------

### Create Command Dialog with Keyboard Shortcut in React/TypeScript

Source: https://ui.shadcn.com/docs/components/command

Implements a command dialog component that opens/closes with Cmd+J (Mac) or Ctrl+J (Windows/Linux) keyboard shortcut. The dialog displays command suggestions and settings with icons from lucide-react, featuring grouped command items with optional keyboard shortcuts. Uses React state management and keyboard event listeners for shortcut handling.

```tsx
"use client"

import * as React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <p className="text-muted-foreground text-sm">
        Press{" "}
        <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <Calendar />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <Smile />
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <Calculator />
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
```

--------------------------------

### Configure Shadcn Registry for Dynamic Version Selection

Source: https://ui.shadcn.com/docs/registry/namespace

This JSON configuration sets up a Shadcn registry to dynamically select resource versions based on an environment variable. It uses `${REGISTRY_VERSION}` in the `params` object, allowing version control to be managed externally for different deployment environments.

```json
{
  "@stable": {
    "url": "https://registry.company.com/{name}",
    "params": {
      "version": "${REGISTRY_VERSION}"
    }
  }
}
```

--------------------------------

### Implement Inset Sidebar Variant with `SidebarInset` in TSX

Source: https://ui.shadcn.com/docs/components/sidebar

This code demonstrates the usage of the `inset` sidebar variant, which requires wrapping the main content within a `SidebarInset` component. This ensures proper layout and spacing when the sidebar is rendered in an 'inset' style.

```tsx
<SidebarProvider>
  <Sidebar variant="inset" />
  <SidebarInset>
    <main>{children}</main>
  </SidebarInset>
</SidebarProvider>
```

--------------------------------

### Configure jsconfig.json for import aliases

Source: https://ui.shadcn.com/docs/javascript

Set up the jsconfig.json file to configure path aliases for module imports. This enables using @ as an alias for the root directory, allowing cleaner import statements throughout the JavaScript project.

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

--------------------------------

### Capture Block Screenshots with pnpm

Source: https://ui.shadcn.com/docs/blocks

Captures screenshots of blocks in both light and dark modes for the registry. Required before submitting pull requests for publication.

```bash
pnpm registry:capture
```

--------------------------------

### InputGroupAddon with Icon

Source: https://ui.shadcn.com/docs/components/input-group

Shows how to use InputGroupAddon to display icons alongside input elements with inline-end alignment.

```tsx
<InputGroupAddon align="inline-end">
  <SearchIcon />
</InputGroupAddon>
```

--------------------------------

### API Key Authentication Configuration

Source: https://ui.shadcn.com/docs/registry/authentication

Configure API key authentication with custom headers for registry access. Supports multiple custom headers like X-API-Key and X-Workspace-Id for more granular access control and workspace isolation.

```json
{
  "registries": {
    "@company": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "X-API-Key": "${API_KEY}",
        "X-Workspace-Id": "${WORKSPACE_ID}"
      }
    }
  }
}
```

--------------------------------

### Enable or disable CSS variables for theming

Source: https://ui.shadcn.com/docs/components-json

Determines whether components use CSS variables (true) or Tailwind utility classes (false) for theming. This cannot be changed after initialization; components must be reinstalled to switch methods.

```json
{
  "tailwind": {
    "cssVariables": true | false
  }
}
```

--------------------------------

### Loading Skeleton Component for Sidebar Menu

Source: https://ui.shadcn.com/docs/components/sidebar

A skeleton component that displays placeholder loaders while async data is being fetched. It renders 5 skeleton menu items with icon placeholders to provide visual feedback during loading. Used as a Suspense fallback to improve perceived performance.

```tsx
function NavProjectsSkeleton() {
  return (
    <SidebarMenu>
      {Array.from({ length: 5 }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
```

--------------------------------

### Interactive Drawer with State Management and Chart in React

Source: https://ui.shadcn.com/docs/components/drawer

Demonstrates an advanced Drawer component with React state management, interactive buttons for adjusting values, and a Recharts BarChart visualization. The component manages a goal value between 200-400 and displays real-time updates with increase/decrease buttons and visual feedback via a bar chart.

```tsx
"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer } from "recharts"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 },
]

export function DrawerDemo() {
  const [goal, setGoal] = React.useState(350)

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)))
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-muted-foreground text-[0.70rem] uppercase">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
            <div className="mt-3 h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <Bar
                    dataKey="goal"
                    style={
                      {
                        fill: "hsl(var(--foreground))",
                        opacity: 0.9,
                      } as React.CSSProperties
                    }
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
```

--------------------------------

### Check Component Updates with diff Command

Source: https://ui.shadcn.com/docs/changelog

The experimental diff command helps track upstream changes to components. Run without arguments to see all components with available updates, or with a component name to view specific changes.

```bash
npx shadcn diff
```

--------------------------------

### Shadcn UI Empty Component with Header and Multiple Actions

Source: https://ui.shadcn.com/docs/changelog

This 'EmptyDemo' function illustrates a more complex empty state, utilizing 'EmptyHeader' for structured content including an icon, title, and description. It also provides multiple action buttons within 'EmptyContent' for creating or importing projects, and a link for more information.

```tsx
import { IconFolderCode } from "@tabler/icons-react"
import { ArrowUpRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <IconFolderCode />
        </EmptyMedia>
        <EmptyTitle>No Projects Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t created any projects yet. Get started by creating
          your first project.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Create Project</Button>
          <Button variant="outline">Import Project</Button>
        </div>
      </EmptyContent>
      <Button
        variant="link"
        asChild
        className="text-muted-foreground"
        size="sm"
      >
        <a href="#">
          Learn More <ArrowUpRightIcon />
        </a>
      </Button>
    </Empty>
  )
}
```

--------------------------------

### Define a full shadcn/ui registry item configuration

Source: https://ui.shadcn.com/docs/registry/registry-item-json

This JSON configuration defines a complete shadcn/ui registry item, including its unique name, type, human-readable title, and descriptive text. It specifies both npm package dependencies and references to other registry items, along with the file paths for its components and custom CSS variables for thematic styling.

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "hello-world",
  "type": "registry:block",
  "title": "Hello World",
  "description": "A simple hello world component.",
  "registryDependencies": [
    "button",
    "@acme/input-form",
    "https://example.com/r/foo"
  ],
  "dependencies": ["is-even@3.0.0", "motion"],
  "files": [
    {
      "path": "registry/new-york/hello-world/hello-world.tsx",
      "type": "registry:component"
    },
    {
      "path": "registry/new-york/hello-world/use-hello-world.ts",
      "type": "registry:hook"
    }
  ],
  "cssVars": {
    "theme": {
      "font-heading": "Poppins, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

--------------------------------

### Item Component Structure with Media, Content, and Actions in TypeScript/React

Source: https://ui.shadcn.com/docs/components/item

Shows the basic structure of the Item component with optional ItemMedia, ItemContent containing ItemTitle and ItemDescription, and ItemActions. Demonstrates the component's composition pattern for building list items with consistent styling and layout.

```typescript
<Item size="" variant="">
  <ItemMedia />
  <ItemContent>
    <ItemTitle>Item</ItemTitle>
    <ItemDescription>Item</ItemDescription>
  </ItemContent>
  <ItemActions />
</Item>
```

--------------------------------

### Test Authenticated Registry with curl

Source: https://ui.shadcn.com/docs/registry/authentication

Verify authenticated registry connectivity using curl command-line tool with bearer token authentication. Tests that the registry endpoint is accessible and properly configured.

```bash
curl -H "Authorization: Bearer your_token" \
  https://registry.company.com/button.json
```

--------------------------------

### Implement Input OTP with Separators in React (TSX)

Source: https://ui.shadcn.com/docs/components/input-otp

Illustrates how to integrate `InputOTPSeparator` components to visually divide the OTP input slots into groups. This enhances readability and user experience, especially for longer OTP codes, by segmenting the input field.

```tsx
import React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPWithSeparator() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

--------------------------------

### Build Responsive Field Layout with TypeScript React

Source: https://ui.shadcn.com/docs/changelog

Creates a responsive profile form using the orientation="responsive" prop on Field components to switch between vertical and horizontal layouts based on container width. Includes FieldSeparator for visual division, FieldContent for grouping labels and descriptions, and both Input and Textarea components.

```tsx
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export function FieldResponsive() {
  return (
    <div className="w-full max-w-4xl">
      <form>
        <FieldSet>
          <FieldLegend>Profile</FieldLegend>
          <FieldDescription>Fill in your profile information.</FieldDescription>
          <FieldSeparator />
          <FieldGroup>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <FieldDescription>
                  Provide your full name for identification
                </FieldDescription>
              </FieldContent>
              <Input id="name" placeholder="Evil Rabbit" required />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel htmlFor="lastName">Message</FieldLabel>
                <FieldDescription>
                  You can write your message here. Keep it short, preferably
                  under 100 characters.
                </FieldDescription>
              </FieldContent>
              <Textarea
                id="message"
                placeholder="Hello, world!"
                required
                className="min-h-[100px] resize-none sm:min-w-[300px]"
              />
            </Field>
            <FieldSeparator />
            <Field orientation="responsive">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Field>
          </FieldGroup>
        </FieldSet>
      </form>
    </div>
  )
}
```

--------------------------------

### List Registry Items with list Command

Source: https://ui.shadcn.com/docs/cli

The list command displays all available items from specified registries. It supports multiple registry sources and serves as an alias for the search command.

```bash
npx shadcn@latest list @acme
```

```bash
Usage: shadcn list [options] <registries...>

list items from registries

Arguments:
  registries             the registry names or urls to list items from. Names
                         must be prefixed with @.
```

--------------------------------

### Import Kbd Component (React/TypeScript)

Source: https://ui.shadcn.com/docs/components/kbd

Shows the necessary import statement to use the `Kbd` component in a React or TypeScript file. The component is typically imported from the project's UI components directory.

```tsx
import { Kbd } from "@/components/ui/kbd"
```

--------------------------------

### Render InputGroup Demo - React TypeScript (TSX)

Source: https://ui.shadcn.com/docs/components/input-group

A demo React component showcasing multiple InputGroup configurations with addons, buttons, tooltips, dropdowns, icons, and separators. Dependencies: React, @tabler/icons-react, lucide-react, and local UI components under "@/components/ui/*". Input: none (self-contained component); Output: JSX UI; Limitations: requires project styling and the referenced UI component implementations.

```tsx
import { IconCheck, IconInfoCircle, IconPlus } from "@tabler/icons-react"
import { ArrowUpIcon, Search } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function InputGroupDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="example.com" className="!pl-1" />
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <InputGroupButton className="rounded-full" size="icon-xs">
                <IconInfoCircle />
              </InputGroupButton>
            </TooltipTrigger>
            <TooltipContent>This is content in a tooltip.</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupTextarea placeholder="Ask, Search or Chat..." />
        <InputGroupAddon align="block-end">
          <InputGroupButton
            variant="outline"
            className="rounded-full"
            size="icon-xs"
          >
            <IconPlus />
          </InputGroupButton>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="ghost">Auto</InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              className="[--radius:0.95rem]"
            >
              <DropdownMenuItem>Auto</DropdownMenuItem>
              <DropdownMenuItem>Agent</DropdownMenuItem>
              <DropdownMenuItem>Manual</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <InputGroupText className="ml-auto">52% used</InputGroupText>
          <Separator orientation="vertical" className="!h-4" />
          <InputGroupButton
            variant="default"
            className="rounded-full"
            size="icon-xs"
            disabled
          >
            <ArrowUpIcon />
            <span className="sr-only">Send</span>
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <InputGroup>
        <InputGroupInput placeholder="@shadcn" />
        <InputGroupAddon align="inline-end">
          <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
            <IconCheck className="size-3" />
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

```

```tsx
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"

```

```tsx
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupButton>Search</InputGroupButton>
  </InputGroupAddon>
</InputGroup>

```

--------------------------------

### Basic Shadcn UI Popover structure in TypeScript React

Source: https://ui.shadcn.com/docs/components/popover

This TypeScript React snippet demonstrates the fundamental structure required to implement a basic Popover component. It shows how to wrap content with `<Popover>`, define a trigger with `<PopoverTrigger>`, and place the popover's content within `<PopoverContent>`. This provides a minimal, functional popover that can be easily extended with custom content and styling.

```tsx
<Popover>
  <PopoverTrigger>Open</PopoverTrigger>
  <PopoverContent>Place content for the popover here.</PopoverContent>
</Popover>
```

--------------------------------

### Define ChartConfig with labels, icons, and colors

Source: https://ui.shadcn.com/docs/components/chart

Create a chart configuration object that defines labels, icons, and color values for chart data keys. Supports single colors or theme objects with light/dark variants.

```typescript
import { Monitor } from "lucide-react"

import { type ChartConfig } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    icon: Monitor,
    // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
    color: "#2563eb",
    // OR a theme object with 'light' and 'dark' keys
    theme: {
      light: "#2563eb",
      dark: "#dc2626",
    },
  },
} satisfies ChartConfig
```

--------------------------------

### Carousel Options Configuration with Embla Carousel

Source: https://ui.shadcn.com/docs/components/carousel

Demonstrates passing configuration options to the Carousel component via the `opts` prop. Includes `align` and `loop` properties from Embla Carousel library. Refer to Embla Carousel documentation for additional available options.

```tsx
<Carousel
  opts={{
    align: "start",
    loop: true,
  }}
>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
</Carousel>
```

--------------------------------

### Card Login Form Demo - TypeScript/React

Source: https://ui.shadcn.com/docs/components/card

A complete login form implementation using the Card component with email and password inputs, form validation, and action buttons. Demonstrates practical usage with Button, Input, and Label components integrated within the Card structure.

```tsx
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">Sign Up</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
```

--------------------------------

### Search Registry with search Command

Source: https://ui.shadcn.com/docs/cli

The search command queries component registries with optional filtering. Supports searching single or multiple registries with query strings, pagination controls, and registry aliases.

```bash
npx shadcn@latest search [registry]
```

```bash
npx shadcn@latest search @shadcn -q "button"
```

```bash
npx shadcn@latest search @shadcn @v0 @acme
```

```bash
npx shadcn@latest list @acme
```

```bash
Usage: shadcn search|list [options] <registries...>

search items from registries

Arguments:
  registries             the registry names or urls to search items from. Names
                         must be prefixed with @.

Options:
  -c, --cwd <cwd>        the working directory. defaults to the current directory.
  -q, --query <query>    query string
  -l, --limit <number>   maximum number of items to display per registry (default: "100")
  -o, --offset <number>  number of items to skip (default: "0")
  -h, --help             display help for command
```

--------------------------------

### shadcn Build Command with Custom Output Directory

Source: https://ui.shadcn.com/docs/cli

Build command with the --output option to specify a custom destination directory for generated JSON files. This allows flexibility in where registry files are written.

```bash
npx shadcn@latest build --output ./public/registry
```

--------------------------------

### Configure Shadcn UI Style in components.json

Source: https://ui.shadcn.com/docs/changelog

This JSON snippet demonstrates how to specify the desired style for shadcn/ui components within the `components.json` file. The `style` property determines the visual foundation, such as `new-york`, which influences component appearance, icons, and animations.

```json
{
  "style": "new-york"
}
```

--------------------------------

### Migrate Tailwind CSS `w-* h-*` Utilities to `size-*`

Source: https://ui.shadcn.com/docs/tailwind-v4

This `diff` snippet shows the migration from using separate `w-*` (width) and `h-*` (height) Tailwind utility classes to the consolidated `size-*` utility. This update aligns with Tailwind v3.4 for more concise styling.

```diff
- w-4 h-4
+ size-4
```

--------------------------------

### Define Navigation Menu Items with Component Data

Source: https://ui.shadcn.com/docs/components/navigation-menu

Establishes a typed array of component objects containing navigation metadata. Each item includes a title, href path, and description used to populate menu lists. This pattern enables dynamic menu rendering and maintains a single source of truth for navigation content.

```tsx
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]
```

--------------------------------

### Choose TypeScript or JavaScript for components

Source: https://ui.shadcn.com/docs/components-json

Controls the file format for generated components. Set to true for TypeScript (.tsx) or false for JavaScript (.jsx). Determines the language syntax used in all generated component files.

```json
{
  "tsx": true | false
}
```

--------------------------------

### Render basic Alert component in React/TypeScript

Source: https://ui.shadcn.com/docs/components/alert

This snippet demonstrates the basic usage of the Shadcn Alert component, showing how to structure an alert with a variant, an optional icon (represented by `<Terminal />`), an `AlertTitle`, and an `AlertDescription`. It highlights the flexibility in composing alert messages.

```tsx
<Alert variant="default | destructive">
  <Terminal />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>
```

--------------------------------

### Migrate CSS Plugin from `tailwindcss-animate` to `tw-animate-css`

Source: https://ui.shadcn.com/docs/tailwind-v4

This `diff` snippet illustrates the necessary change in a `globals.css` file when migrating animation libraries. It shows replacing the `@plugin 'tailwindcss-animate'` directive with an `@import "tw-animate-css"` statement.

```diff
- @plugin 'tailwindcss-animate';
+ @import "tw-animate-css";
```

--------------------------------

### Render Shadcn UI Item with Avatars and Team Actions in TSX

Source: https://ui.shadcn.com/docs/changelog

Demonstrates how to integrate Shadcn UI `Avatar` components within the `ItemMedia` slot of an `Item`, showcasing both single user avatars and a group of team avatars. It also includes `ItemActions` with buttons for user interaction, such as inviting team members. This component is ideal for displaying user profiles or team member lists. Requires `lucide-react` icons, Shadcn `Avatar` and `Button` components.

```tsx
import { Plus } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function ItemAvatar() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia>
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/evilrabbit.png" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Evil Rabbit</ItemTitle>
          <ItemDescription>Last seen 5 months ago</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            size="icon-sm"
            variant="outline"
            className="rounded-full"
            aria-label="Invite"
          >
            <Plus />
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline">
        <ItemMedia>
          <div className=":data-[slot=avatar]:ring-background flex -space-x-2 :data-[slot=avatar]:ring-2 :data-[slot=avatar]:grayscale">
            <Avatar className="hidden sm:flex">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="hidden sm:flex">
              <AvatarImage
                src="https://github.com/maxleiter.png"
                alt="@maxleiter"
              />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage
                src="https://github.com/evilrabbit.png"
                alt="@evilrabbit"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </div>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>No Team Members</ItemTitle>
          <ItemDescription>
            Invite your team to collaborate on this project.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Invite
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
```

--------------------------------

### Create a Full Collapsible SidebarMenu Component in TSX

Source: https://ui.shadcn.com/docs/components/sidebar

This TypeScript/TSX snippet demonstrates how to construct a complete, functional and collapsible `SidebarMenu` component using Shadcn UI. It includes defining the data structure for menu items, importing necessary components, and rendering the menu with `Collapsible`, `CollapsibleTrigger`, and `CollapsibleContent` to manage expand/collapse states.

```tsx
"use client"\n\nimport { ChevronRightIcon } from "lucide-react"\n\nimport {\n  Collapsible,\n  CollapsibleContent,\n  CollapsibleTrigger,\n} from "@/components/ui/collapsible"\nimport {\n  Sidebar,\n  SidebarContent,\n  SidebarGroup,\n  SidebarGroupContent,\n  SidebarMenu,\n  SidebarMenuButton,\n  SidebarMenuItem,\n  SidebarMenuSub,\n  SidebarMenuSubButton,\n  SidebarMenuSubItem,\n  SidebarProvider,\n} from "@/components/ui/sidebar"\n\nconst items = [\n  {\n    title: "Getting Started",\n    url: "#",\n    items: [\n      {\n        title: "Installation",\n        url: "#",\n      },\n      {\n        title: "Project Structure",\n        url: "#",\n      },\n    ],\n  },\n  {\n    title: "Building Your Application",\n    url: "#",\n    items: [\n      {\n        title: "Routing",\n        url: "#",\n      },\n      {\n        title: "Data Fetching",\n        url: "#",\n        isActive: true,\n      },\n      {\n        title: "Rendering",\n        url: "#",\n      },\n      {\n        title: "Caching",\n        url: "#",\n      },\n      {\n        title: "Styling",\n        url: "#",\n      },\n      {\n        title: "Optimizing",\n        url: "#",\n      },\n      {\n        title: "Configuring",\n        url: "#",\n      },\n      {\n        title: "Testing",\n        url: "#",\n      },\n      {\n        title: "Authentication",\n        url: "#",\n      },\n      {\n        title: "Deploying",\n        url: "#",\n      },\n      {\n        title: "Upgrading",\n        url: "#",\n      },\n      {\n        title: "Examples",\n        url: "#",\n      },\n    ],\n  },\n  {\n    title: "API Reference",\n    url: "#",\n    items: [\n      {\n        title: "Components",\n        url: "#",\n      },\n      {\n        title: "File Conventions",\n        url: "#",\n      },\n      {\n        title: "Functions",\n        url: "#",\n      },\n      {\n        title: "next.config.js Options",\n        url: "#",\n      },\n      {\n        title: "CLI",\n        url: "#",\n      },\n      {\n        title: "Edge Runtime",\n        url: "#",\n      },\n    ],\n  },\n  {\n    title: "Architecture",\n    url: "#",\n    items: [\n      {\n        title: "Accessibility",\n        url: "#",\n      },\n      {\n        title: "Fast Refresh",\n        url: "#",\n      },\n      {\n        title: "Next.js Compiler",\n        url: "#",\n      },\n      {\n        title: "Supported Browsers",\n        url: "#",\n      },\n      {\n        title: "Turbopack",\n        url: "#",\n      },\n    ],\n  },\n]\n\nexport function AppSidebar() {\n  return (\n    <SidebarProvider>\n      <Sidebar>\n        <SidebarContent>\n          <SidebarGroup>\n            <SidebarGroupContent>\n              <SidebarMenu>\n                {items.map((item, index) => (\n                  <Collapsible\n                    key={index}\n                    className="group/collapsible"\n                    defaultOpen={index === 0}\n                  >\n                    <SidebarMenuItem>\n                      <CollapsibleTrigger asChild>\n                        <SidebarMenuButton>\n                          <span>{item.title}</span>\n                          <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />\n                        </SidebarMenuButton>\n                      </CollapsibleTrigger>\n                      <CollapsibleContent>\n                        <SidebarMenuSub>\n                          {item.items.map((subItem, subIndex) => (\n                            <SidebarMenuSubItem key={subIndex}>\n                              <SidebarMenuSubButton asChild>\n                                <a href={subItem.url}>\n                                  <span>{subItem.title}</span>\n                                </a>\n                              </SidebarMenuSubButton>\n                            </SidebarMenuSubItem>\n                          ))}\n                        </SidebarMenuSub>\n                      </CollapsibleContent>\n                    </SidebarMenuItem>\n                  </Collapsible>\n                ))}\n              </SidebarMenu>\n            </SidebarGroupContent>\n          </SidebarGroup>\n        </SidebarContent>\n      </Sidebar>\n    </SidebarProvider>\n  )\n}\n
```

--------------------------------

### Import Shadcn UI Item Components in TSX

Source: https://ui.shadcn.com/docs/changelog

This snippet shows the necessary import statement for the core `Item` components from the Shadcn UI library. It includes `Item`, `ItemContent`, `ItemDescription`, `ItemMedia`, and `ItemTitle`, which are essential for constructing flexible list items.

```tsx
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
```

--------------------------------

### Import and use shadcn/ui Button component in React

Source: https://ui.shadcn.com/docs/installation/vite

Demonstrates how to import and use the `Button` component from shadcn/ui within a React application. The component is imported from the configured path alias and rendered inside a functional component for UI display.

```tsx
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  )
}

export default App
```

--------------------------------

### Add input-group tooltips (React TSX)

Source: https://ui.shadcn.com/docs/components/input-group

Shows how to attach tooltip triggers to InputGroup buttons to provide contextual help or instructions. Depends on project Tooltip primitives, InputGroup components, and lucide-react icons. Inputs are text/password/API-key input fields; outputs are tooltip overlays. Limitations: tooltips rely on library positioning and the project's Tooltip implementation.

```tsx
import { HelpCircle, InfoIcon } from "lucide-react"\n\nimport {\n  InputGroup,\n  InputGroupAddon,\n  InputGroupButton,\n  InputGroupInput,\n} from "@/components/ui/input-group"\nimport {\n  Tooltip,\n  TooltipContent,\n  TooltipTrigger,\n} from "@/components/ui/tooltip"\n\nexport function InputGroupTooltip() {\n  return (\n    <div className="grid w-full max-w-sm gap-4">\n      <InputGroup>\n        <InputGroupInput placeholder="Enter password" type="password" />\n        <InputGroupAddon align="inline-end">\n          <Tooltip>\n            <TooltipTrigger asChild>\n              <InputGroupButton\n                variant="ghost"\n                aria-label="Info"\n                size="icon-xs"\n              >\n                <InfoIcon />\n              </InputGroupButton>\n            </TooltipTrigger>\n            <TooltipContent>\n              <p>Password must be at least 8 characters</p>\n            </TooltipContent>\n          </Tooltip>\n        </InputGroupAddon>\n      </InputGroup>\n      <InputGroup>\n        <InputGroupInput placeholder="Your email address" />\n        <InputGroupAddon align="inline-end">\n          <Tooltip>\n            <TooltipTrigger asChild>\n              <InputGroupButton\n                variant="ghost"\n                aria-label="Help"\n                size="icon-xs"\n              >\n                <HelpCircle />\n              </InputGroupButton>\n            </TooltipTrigger>\n            <TooltipContent>\n              <p>We&apos;ll use this to send you notifications</p>\n            </TooltipContent>\n          </Tooltip>\n        </InputGroupAddon>\n      </InputGroup>\n      <InputGroup>\n        <InputGroupInput placeholder="Enter API key" />\n        <Tooltip>\n          <TooltipTrigger asChild>\n            <InputGroupAddon>\n              <InputGroupButton\n                variant="ghost"\n                aria-label="Help"\n                size="icon-xs"\n              >\n                <HelpCircle />\n              </InputGroupButton>\n            </InputGroupAddon>\n          </TooltipTrigger>\n          <TooltipContent side="left">\n            <p>Click for help with API keys</p>\n          </TooltipContent>\n        </Tooltip>\n      </InputGroup>\n    </div>\n  )\n}\n
```

--------------------------------

### ItemContent Component

Source: https://ui.shadcn.com/docs/components/item

Wraps the title and description of an item. Provides consistent spacing and layout for textual content.

```APIDOC
## ItemContent Component

### Description
Wraps the title and description of the item. Provides consistent spacing and layout for textual content. Can be omitted if only a title is needed.

### Props
- **className** (string) - Optional - Additional CSS classes

### Basic Usage
```tsx
<ItemContent>
  <ItemTitle>Item</ItemTitle>
  <ItemDescription>Item</ItemDescription>
</ItemContent>
```
```

--------------------------------

### Implement DropdownMenu within a full Sidebar component in TypeScript/React

Source: https://ui.shadcn.com/docs/components/sidebar

This TypeScript/React component demonstrates a complete integration of Shadcn's `DropdownMenu` within a custom `Sidebar` structure. It renders a list of projects, where each project entry includes a `SidebarMenuAction` that triggers a `DropdownMenu` with options like 'Edit Project' and 'Delete Project'. Dependencies include `lucide-react` for icons and various Shadcn UI components for both `DropdownMenu` and `Sidebar`.

```tsx
"use client"

import {
  FrameIcon,
  LifeBuoyIcon,
  MapIcon,
  MoreHorizontalIcon,
  PieChartIcon,
  SendIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

const projects = [
  {
    name: "Design Engineering",
    url: "#",
    icon: FrameIcon,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChartIcon,
  },
  {
    name: "Travel",
    url: "#",
    icon: MapIcon,
  },
  {
    name: "Support",
    url: "#",
    icon: LifeBuoyIcon,
  },
  {
    name: "Feedback",
    url: "#",
    icon: SendIcon,
  },
]

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton
                      asChild
                      className="group-has-[[data-state=open]]/menu-item:bg-sidebar-accent"
                    >
                      <a href={project.url}>
                        <project.icon />
                        <span>{project.name}</span>
                      </a>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction>
                          <MoreHorizontalIcon />
                          <span className="sr-only">More</span>
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" align="start">
                        <DropdownMenuItem>
                          <span>Edit Project</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}
```

--------------------------------

### Apply CSS Variables in TSX for Theming

Source: https://ui.shadcn.com/docs/theming

Demonstrates how to apply CSS variables like `bg-background` and `text-foreground` to a div element in a React/Next.js component for dynamic theming, assuming `tailwind.cssVariables` is enabled in the configuration.

```tsx
<div className="bg-background text-foreground" />
```

--------------------------------

### Configure import alias for components

Source: https://ui.shadcn.com/docs/components-json

Sets the import path alias for generated UI components. Determines where components are imported from in the application.

```json
{
  "aliases": {
    "components": "@/components"
  }
}
```

--------------------------------

### Import Drawer Components in React

Source: https://ui.shadcn.com/docs/components/drawer

Import all required Drawer subcomponents from the UI component library. These exports provide the building blocks for constructing complete drawer interfaces with headers, triggers, content, and footers.

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
```

--------------------------------

### Configure DropdownMenu with modal={false}

Source: https://ui.shadcn.com/docs/components/dropdown-menu

Sets up a DropdownMenu component with modal={false} property to allow dialogs to open while keeping the dropdown accessible. This is the key configuration needed for dialog-dropdown integration.

```tsx
<DropdownMenu modal={false}>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions</Button>
  </DropdownMenuTrigger>
</DropdownMenu>
```

--------------------------------

### Update Project Dependencies Using PNPM

Source: https://ui.shadcn.com/docs/tailwind-v4

This `bash` command uses `pnpm` to update several specified project dependencies to their latest available versions. It targets `@radix-ui/*`, `cmdk`, `lucide-react`, `recharts`, `tailwind-merge`, and `clsx`.

```bash
pnpm up "@radix-ui/*" cmdk lucide-react recharts tailwind-merge clsx --latest
```

--------------------------------

### Display Kbd in a Tooltip (React/TypeScript)

Source: https://ui.shadcn.com/docs/components/kbd

Illustrates embedding `Kbd` and `KbdGroup` components within a `TooltipContent` to provide keyboard shortcut hints when hovering over a button. This enhances user experience by making shortcuts discoverable.

```tsx
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function KbdTooltip() {
  return (
    <div className="flex flex-wrap gap-4">
      <ButtonGroup>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">
              Save
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">
              Save Changes <Kbd>S</Kbd>
            </div>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="sm" variant="outline">
              Print
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2">
              Print Document{" "}
              <KbdGroup>
                <Kbd>Ctrl</Kbd>
                <Kbd>P</Kbd>
              </KbdGroup>
            </div>
          </TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </div>
  )
}
```

--------------------------------

### Implement Basic Input OTP Component in React (TSX)

Source: https://ui.shadcn.com/docs/components/input-otp

Demonstrates a functional React component for a 6-digit one-time password input. It utilizes `InputOTP`, `InputOTPGroup`, `InputOTPSeparator`, and `InputOTPSlot` components to construct a structured and accessible input field, automatically handling input distribution.

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}
```

--------------------------------

### Import Shadcn UI Context Menu components for usage (TSX)

Source: https://ui.shadcn.com/docs/components/context-menu

This snippet illustrates the necessary import statements for the essential Shadcn UI Context Menu components. These components are crucial for constructing and utilizing context menus within a React application.

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
```

--------------------------------

### Create Basic Tooltip with Button Trigger

Source: https://ui.shadcn.com/docs/components/tooltip

Demonstrates a simple tooltip implementation with a button trigger. The tooltip displays 'Add to library' text when the user hovers over or focuses on the button. Uses the TooltipDemo export component pattern with outline button variant.

```tsx
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  )
}
```

--------------------------------

### Display Shadcn UI Item with Leading Alert Icon and Action in TSX

Source: https://ui.shadcn.com/docs/changelog

Illustrates creating a Shadcn UI `Item` component featuring a prominent leading icon (e.g., `ShieldAlertIcon`) within `ItemMedia` and an action button in `ItemActions`. This pattern is commonly used for displaying alerts, notifications, or important messages. Requires `lucide-react` icons and the Shadcn `Button` component.

```tsx
import { ShieldAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function ItemIcon() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Item variant="outline">
        <ItemMedia variant="icon">
          <ShieldAlertIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Security Alert</ItemTitle>
          <ItemDescription>
            New login detected from unknown device.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button size="sm" variant="outline">
            Review
          </Button>
        </ItemActions>
      </Item>
    </div>
  )
}
```

--------------------------------

### Implement Shadcn UI SidebarHeader with Dropdown Menu (TypeScript/React)

Source: https://ui.shadcn.com/docs/components/sidebar

This snippet shows how to integrate a `SidebarHeader` component into the `Sidebar` to create a sticky header. It further demonstrates adding a `DropdownMenu` within the header for workspace selection, utilizing `DropdownMenuTrigger`, `DropdownMenuContent`, and `DropdownMenuItem` components for interactive functionality.

```tsx
"use client"

import { ChevronDownIcon } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                    Select Workspace
                    <ChevronDownIcon className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-(--radix-popper-anchor-width)">
                  <DropdownMenuItem>
                    <span>Acme Inc</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Acme Corp.</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between px-4">
          <SidebarTrigger />
        </header>
      </SidebarInset>
    </SidebarProvider>
  )
}
```

```tsx
<Sidebar>
  <SidebarHeader>
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              Select Workspace
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
            <DropdownMenuItem>
              <span>Acme Inc</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <span>Acme Corp.</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarHeader>
</Sidebar>
```

--------------------------------

### Configure shadcn MCP Server for Claude Code

Source: https://ui.shadcn.com/docs/mcp

This configuration snippet shows how to integrate the shadcn MCP server with Claude Code by adding a 'shadcn' entry to the project's '.mcp.json' file. It specifies 'npx shadcn@latest mcp' as the command to run the server, enabling Claude Code to interact with shadcn components.

```json
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

--------------------------------

### Extend Shadcn Component Without Full Replacement

Source: https://ui.shadcn.com/docs/registry/namespace

This JSON configuration demonstrates how to extend an existing Shadcn registry component rather than fully replacing it. It lists the original vendor table as a dependency and then defines a new file for additional functionality, importing the base component for extension.

```json
{
  "name": "extended-table",
  "registryDependencies": ["@vendor/table"],
  "files": [
    {
      "path": "components/ui/table-extended.tsx",
      "content": "import { Table } from '@vendor/table'\n// Add your extensions\nexport function ExtendedTable() { ... }"
    }
  ]
}
```

--------------------------------

### Define Import Aliases in shadcn/ui jsconfig.json for JavaScript

Source: https://ui.shadcn.com/docs/changelog

This `jsconfig.json` file configures import aliases for a JavaScript project using shadcn/ui, specifically mapping `@/*` to the project's root directory (`./*`). This improves code readability and maintainability by shortening relative import paths. It ensures that module resolvers correctly locate files when using custom aliases in development environments.

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

--------------------------------

### EmptyDescription Component

Source: https://ui.shadcn.com/docs/components/empty

Display descriptive text in an empty state using EmptyDescription component. Provides context to users about why content is unavailable and supports className prop for custom styling.

```tsx
<EmptyDescription>You do not have any notifications.</EmptyDescription>
```

--------------------------------

### Group Keyboard Keys with KbdGroup (React/TypeScript)

Source: https://ui.shadcn.com/docs/components/kbd

Demonstrates how to use the `KbdGroup` component to visually group multiple `Kbd` components together. This allows for representing combined key presses like 'Ctrl + B' within a text block.

```tsx
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function KbdGroupExample() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-muted-foreground text-sm">
        Use{" "}
        <KbdGroup>
          <Kbd>Ctrl + B</Kbd>
          <Kbd>Ctrl + K</Kbd>
        </KbdGroup>{" "}
        to open the command palette
      </p>
    </div>
  )
}
```

--------------------------------

### Implement Sidebar Menu with Navigation Items (TypeScript/React)

Source: https://ui.shadcn.com/docs/components/sidebar

This snippet enhances the `AppSidebar` component by adding a `SidebarMenu` with dynamic navigation items. It utilizes `SidebarGroup`, `SidebarGroupLabel`, `SidebarGroupContent`, `SidebarMenu`, `SidebarMenuButton`, and `SidebarMenuItem` to structure the menu with icons and links, demonstrating a common pattern for application navigation.

```tsx
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
```

--------------------------------

### Create Basic Fieldset Form Layout in TypeScript React

Source: https://ui.shadcn.com/docs/changelog

Demonstrates a basic fieldset structure using shadcn UI Field components to create an address information form. Includes FieldSet wrapper, FieldLegend for title, FieldDescription for context, and nested Field components with Input elements for street address, city, and postal code.

```tsx
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldFieldset() {
  return (
    <div className="w-full max-w-md space-y-6">
      <FieldSet>
        <FieldLegend>Address Information</FieldLegend>
        <FieldDescription>
          We need your address to deliver your order.
        </FieldDescription>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="street">Street Address</FieldLabel>
            <Input id="street" type="text" placeholder="123 Main St" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="city">City</FieldLabel>
              <Input id="city" type="text" placeholder="New York" />
            </Field>
            <Field>
              <FieldLabel htmlFor="zip">Postal Code</FieldLabel>
              <Input id="zip" type="text" placeholder="90502" />
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
```

--------------------------------

### Shadcn UI Field with Input Components

Source: https://ui.shadcn.com/docs/components/field

Shows how to create a form section using FieldSet and FieldGroup, containing two Field components with Input elements for username and password. Demonstrates FieldLabel, Input, and FieldDescription for user guidance.

```tsx
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function FieldInput() {
  return (
    <div className="w-full max-w-md">
      <FieldSet>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input id="username" type="text" placeholder="Max Leiter" />
            <FieldDescription>
              Choose a unique username for your account.
            </FieldDescription>
          </Field>
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <FieldDescription>
              Must be at least 8 characters long.
            </FieldDescription>
            <Input id="password" type="password" placeholder="••••••••" />
          </Field>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}
```

--------------------------------

### Partial Override for Multi-File Shadcn Component

Source: https://ui.shadcn.com/docs/registry/namespace

This JSON configuration shows how to partially override a multi-file Shadcn component from a vendor. It declares the vendor component as a dependency and then provides a custom implementation for only a specific file within that component, leaving other files untouched.

```json
{
  "name": "custom-auth",
  "registryDependencies": [
    "@vendor/auth" // Has multiple files
  ],
  "files": [
    {
      "path": "lib/auth-server.ts",
      "type": "registry:lib",
      "content": "// Your custom auth server"
    }
  ]
}
```

--------------------------------

### Render Open in v0 button - React (TSX/JSX)

Source: https://ui.shadcn.com/docs/registry/open-in-v0

Provides a reusable React button component that opens a registry item in the v0 open endpoint. Depends on a local Button component and expects a single prop `url: string`; output is an anchor that opens a new tab to the v0 open URL. Limitation: this only constructs the open URL and relies on the registry being publicly accessible or accessible via query token authentication.

```tsx
import { Button } from "@/components/ui/button"

export function OpenInV0Button({ url }: { url: string }) {
  return (
    <Button
      aria-label="Open in v0"
      className="h-8 gap-1 rounded-[6px] bg-black px-3 text-xs text-white hover:bg-black hover:text-white dark:bg-white dark:text-black"
      asChild
    >
      <a
        href={`https://v0.dev/chat/api/open?url=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        Open in{" "}
        <svg
          viewBox="0 0 40 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-current"
        >
          <path
            d="M23.3919 0H32.9188C36.7819 0 39.9136 3.13165 39.9136 6.99475V16.0805H36.0006V6.99475C36.0006 6.90167 35.9969 6.80925 35.9898 6.71766L26.4628 16.079C26.4949 16.08 26.5272 16.0805 26.5595 16.0805H36.0006V19.7762H26.5595C22.6964 19.7762 19.4788 16.6139 19.4788 12.7508V3.68923H23.3919V12.7508C23.3919 12.9253 23.4054 13.0977 23.4316 13.2668L33.1682 3.6995C33.0861 3.6927 33.003 3.68923 32.9188 3.68923H23.3919V0Z"
            fill="currentColor"
          ></path>
          <path
            d="M13.7688 19.0956L0 3.68759H5.53933L13.6231 12.7337V3.68759H17.7535V17.5746C17.7535 19.6705 15.1654 20.6584 13.7688 19.0956Z"
            fill="currentColor"
          ></path>
        </svg>
      </a>
    </Button>
  )
}

```

```jsx
<OpenInV0Button url="https://example.com/r/hello-world.json" />

```

--------------------------------

### Import Input Component in React/TypeScript

Source: https://ui.shadcn.com/docs/components/input

Import the Input component from the UI components directory to use it in your React applications. This is the standard import statement for accessing the component throughout your project.

```tsx
import { Input } from "@/components/ui/input"
```

--------------------------------

### Import and use shadcn/ui Button component in an Astro page

Source: https://ui.shadcn.com/docs/installation/astro

This Astro component demonstrates how to import the `Button` component from the `shadcn/ui` library using a path alias. It then renders the button within a simple HTML structure, showcasing component integration in an Astro page.

```astro
--- 
import { Button } from "@/components/ui/button"
---

<html lang="en">
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="generator" content={Astro.generator} />
		<title>Astro + TailwindCSS</title>
	</head>

	<body>
		<div className="grid place-items-center h-screen content-center">
			<Button>Button</Button>
		</div>
	</body>
</html>
```

--------------------------------

### Create Link Styled as Button using asChild Prop in React/TSX

Source: https://ui.shadcn.com/docs/components/button

Demonstrates using the Button component's asChild prop to render a Next.js Link element with button styling. This approach allows any component to inherit button styling without changing its underlying HTML element or functionality.

```tsx
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function LinkAsButton() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}
```

--------------------------------

### Enable React Server Components support

Source: https://ui.shadcn.com/docs/components-json

Enables or disables React Server Components (RSC) support. When set to true, the CLI automatically adds 'use client' directives to client components.

```json
{
  "rsc": true | false
}
```

--------------------------------

### Implement Shadcn UI Combobox with Exit Animations (React/TypeScript)

Source: https://ui.shadcn.com/docs/changelog

This React/TypeScript component demonstrates a functional combobox using shadcn/ui components like Popover, Button, and Command. It showcases how to integrate a combobox with a search input and selection logic, featuring subtle exit animations for its elements. Dependencies include `lucide-react` for icons and `tailwindcss-animate` (implied by shadcn/ui).

```tsx
"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
```

--------------------------------

### Define Global CSS Custom Properties for Theming (CSS)

Source: https://ui.shadcn.com/docs/theming

This CSS snippet defines a comprehensive set of custom properties, also known as CSS variables, for theming UI components. It includes definitions for both a default (light) theme within `:root` and a dark theme within the `.dark` class, utilizing the OKLCH color format for enhanced color control and accessibility. These variables cover common UI elements like background, foreground, cards, popovers, primary, secondary, accent, destructive, border, input, ring, and specific chart and sidebar colors.

```css
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.129 0.042 264.695);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.208 0.042 265.755);
  --primary-foreground: oklch(0.984 0.003 247.858);
  --secondary: oklch(0.968 0.007 247.896);
  --secondary-foreground: oklch(0.208 0.042 265.755);
  --muted: oklch(0.968 0.007 247.896);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent: oklch(0.968 0.007 247.896);
  --accent-foreground: oklch(0.208 0.042 265.755);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.704 0.04 256.788);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.984 0.003 247.858);
  --sidebar-foreground: oklch(0.129 0.042 264.695);
  --sidebar-primary: oklch(0.208 0.042 265.755);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.968 0.007 247.896);
  --sidebar-accent-foreground: oklch(0.208 0.042 265.755);
  --sidebar-border: oklch(0.929 0.013 255.508);
  --sidebar-ring: oklch(0.704 0.04 256.788);
}

.dark {
  --background: oklch(0.129 0.042 264.695);
  --foreground: oklch(0.984 0.003 247.858);
  --card: oklch(0.208 0.042 265.755);
  --card-foreground: oklch(0.984 0.003 247.858);
  --popover: oklch(0.208 0.042 265.755);
  --popover-foreground: oklch(0.984 0.003 247.858);
  --primary: oklch(0.929 0.013 255.508);
  --primary-foreground: oklch(0.208 0.042 265.755);
  --secondary: oklch(0.279 0.041 260.031);
  --secondary-foreground: oklch(0.984 0.003 247.858);
  --muted: oklch(0.279 0.041 260.031);
  --muted-foreground: oklch(0.704 0.04 256.788);
  --accent: oklch(0.279 0.041 260.031);
  --accent-foreground: oklch(0.984 0.003 247.858);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.551 0.027 264.364);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.208 0.042 265.755);
  --sidebar-foreground: oklch(0.984 0.003 247.858);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.279 0.041 260.031);
  --sidebar-accent-foreground: oklch(0.984 0.003 247.858);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.551 0.027 264.364);
}
```

--------------------------------

### Apply Tailwind Utility Classes in TSX for Theming

Source: https://ui.shadcn.com/docs/theming

Illustrates applying direct Tailwind CSS utility classes, including dark mode variants (`dark:bg-white`), to a div element for styling when not using CSS variables.

```tsx
<div className="bg-zinc-950 dark:bg-white" />
```

--------------------------------

### Advanced Registry Configuration with Headers and Params

Source: https://ui.shadcn.com/docs/registry/namespace

Configure registries with authentication headers and query parameters using object format. Supports environment variable expansion with ${VAR_NAME} syntax for secure credential management. Use this for private registries requiring authentication or additional configuration.

```json
{
  "registries": {
    "@private": {
      "url": "https://api.company.com/registry/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}",
        "X-API-Key": "${API_KEY}"
      },
      "params": {
        "version": "latest",
        "format": "json"
      }
    }
  }
}
```

--------------------------------

### Import Aspect Ratio Component

Source: https://ui.shadcn.com/docs/components/aspect-ratio

Basic import statement for using the AspectRatio component in your application. This must be added to any file where you want to use the component.

```typescript
import { AspectRatio } from "@/components/ui/aspect-ratio"
```

--------------------------------

### Import Spinner Component (TypeScript)

Source: https://ui.shadcn.com/docs/components/spinner

Shows the essential import statement required to make the Spinner component available for use in your TypeScript/React files. This line typically assumes a standard Shadcn UI project structure where components are located under `@/components/ui/`. It is a prerequisite for rendering the Spinner in your application.

```tsx
import { Spinner } from "@/components/ui/spinner"
```

--------------------------------

### InputGroupAddon with Multiple Buttons

Source: https://ui.shadcn.com/docs/components/input-group

Demonstrates grouping multiple InputGroupButton components within an addon for complex layouts.

```tsx
<InputGroupAddon>
  <InputGroupButton>Button</InputGroupButton>
  <InputGroupButton>Button</InputGroupButton>
</InputGroupAddon>
```

--------------------------------

### Configure import alias for lib functions

Source: https://ui.shadcn.com/docs/components-json

Sets the import path alias for library functions such as format-date or generate-id. Centralizes utility function imports.

```json
{
  "aliases": {
    "lib": "@/lib"
  }
}
```

--------------------------------

### Implement Shadcn UI Dialog within Context Menu (TypeScript/React)

Source: https://ui.shadcn.com/docs/components/dialog

This code snippet demonstrates the correct structural pattern for embedding a Shadcn UI Dialog component so that it can be triggered from an item within a Context Menu. The entire Context Menu structure, including its trigger and content, must be encased within the Dialog component, with a `DialogTrigger asChild` wrapping the specific `ContextMenuItem` that opens the dialog. This ensures the dialog's state and presentation are managed correctly.

```tsx
<Dialog>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Open</ContextMenuItem>
      <ContextMenuItem>Download</ContextMenuItem>
      <DialogTrigger asChild>
        <ContextMenuItem>
          <span>Delete</span>
        </ContextMenuItem>
      </DialogTrigger>
    </ContextMenuContent>
  </ContextMenu>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Are you sure you want to permanently
        delete this file from our servers?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

--------------------------------

### Create a link that looks like a Shadcn UI Badge using asChild prop (TypeScript/React)

Source: https://ui.shadcn.com/docs/components/badge

This snippet illustrates how to transform a `Link` component into the visual style of a `Badge` using the `asChild` prop. This allows the `Link` to inherit the badge's styling while retaining its native link behavior.

```tsx
import Link from "next/link"

import { Badge } from "@/components/ui/badge"

export function LinkAsBadge() {
  return (
    <Badge asChild>
      <Link href="/">Badge</Link>
    </Badge>
  )
}
```

--------------------------------

### Create a React Mode Toggle Component for Theme Switching in Vite

Source: https://ui.shadcn.com/docs/dark-mode/vite

This `ModeToggle` React component provides a user interface for switching between 'light', 'dark', and 'system' themes. It utilizes the `useTheme` hook to interact with the `ThemeProvider`'s `setTheme` function and integrates `lucide-react` icons and `shadcn/ui` dropdown components for its visual presentation.

```tsx
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:-rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

--------------------------------

### Import Shadcn UI Select Components in React/TypeScript

Source: https://ui.shadcn.com/docs/components/select

This snippet demonstrates the required import statements for using various parts of the Shadcn UI Select component. It ensures that Select, SelectContent, SelectItem, SelectTrigger, and SelectValue are available for use in your React/TypeScript files.

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
```

--------------------------------

### EmptyMedia Component with Icon Variant

Source: https://ui.shadcn.com/docs/components/empty

Display media content in empty state using the EmptyMedia component with icon variant. Accepts children elements like icons or avatars and supports two variants: 'default' and 'icon'. The component is flexible and can wrap various child components.

```tsx
<EmptyMedia variant="icon">
  <Icon />
</EmptyMedia>
```

--------------------------------

### Item Component

Source: https://ui.shadcn.com/docs/components/item

The main component for displaying content with media, title, description, and actions. Supports multiple variants and sizes with flexible composition.

```APIDOC
## Item Component

### Description
The main component for displaying content with media, title, description, and actions. It provides a flexible container for building list items, dropdown selections, and grouped content with consistent styling.

### Props
- **variant** (string) - Optional - Display style variant: `"default" | "outline" | "muted"` (default: `"default"`)
- **size** (string) - Optional - Component size: `"default" | "sm"` (default: `"default"`)
- **asChild** (boolean) - Optional - Render a custom component as the item with hover and focus states applied (default: `false`)
- **className** (string) - Optional - Additional CSS classes

### Basic Usage
```tsx
<Item size="" variant="">
  <ItemMedia />
  <ItemContent>
    <ItemTitle>Item</ItemTitle>
    <ItemDescription>Item</ItemDescription>
  </ItemContent>
  <ItemActions />
</Item>
```

### AsChild Pattern
Use the `asChild` prop to render a custom component like a link. Hover and focus states are automatically applied.

```tsx
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function ItemLink() {
  return (
    <Item asChild>
      <a href="/dashboard">
        <ItemMedia variant="icon">
          <Home />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Dashboard</ItemTitle>
          <ItemDescription>
            Overview of your account and activity.
          </ItemDescription>
        </ItemContent>
      </a>
    </Item>
  )
}
```
```

--------------------------------

### Handle Different Authentication Error Scenarios

Source: https://ui.shadcn.com/docs/registry/authentication

Implement error handling for multiple authentication failure scenarios including missing tokens, expired tokens, and insufficient permissions. Returns appropriate HTTP status codes and contextual error messages for each case.

```typescript
if (!token) {
  return NextResponse.json(
    {
      error: "Unauthorized",
      message:
        "Authentication required. Set REGISTRY_TOKEN in your .env.local file",
    },
    { status: 401 }
  )
}

if (isExpiredToken(token)) {
  return NextResponse.json(
    {
      error: "Unauthorized",
      message: "Token expired. Request a new token at company.com/tokens",
    },
    { status: 401 }
  )
}

if (!hasTeamAccess(token, component)) {
  return NextResponse.json(
    {
      error: "Forbidden",
      message: `Component '${component}' is restricted to the Design team`,
    },
    { status: 403 }
  )
}
```

--------------------------------

### Initialize TanStack Form with useForm Hook (TypeScript)

Source: https://ui.shadcn.com/docs/forms/tanstack-form

Shows how to initialize a form using TanStack Form's `useForm` hook, setting default values and integrating the previously defined Zod schema for `onSubmit` validation. It also includes an `onSubmit` handler to process form data upon successful submission, displaying a toast notification.

```tsx
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
  // ...
})

export function BugReportForm() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      toast.success("Form submitted successfully")
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      {/* ... */}
    </form>
  )
}
```

--------------------------------

### Import Shadcn UI Dialog components in React

Source: https://ui.shadcn.com/docs/components/dialog

Imports the necessary components for using the Shadcn UI Dialog, including Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, and DialogTrigger. These components are sourced from the local UI library, enabling the creation of interactive dialogs in a React application.

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
```

--------------------------------

### Define Chart Data Array in TypeScript/React

Source: https://ui.shadcn.com/docs/components/chart

Initialize sample chart data representing monthly desktop and mobile user counts. This data structure is flexible and can be adapted to any shape using the dataKey prop for mapping.

```typescript
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]
```

--------------------------------

### Item Component Demo - TSX

Source: https://ui.shadcn.com/docs/components/item

Demonstrates basic and advanced Item component usage with media, content, actions, and link integration. Shows variant and size prop customization with icon support from lucide-react.

```tsx
import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"

export function ItemDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Basic Item</ItemTitle>
          <ItemDescription>
            A simple item with title and description.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm">
            Action
          </Button>
        </ItemActions>
      </Item>
      <Item variant="outline" size="sm" asChild>
        <a href="#">
          <ItemMedia>
            <BadgeCheckIcon className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Your profile has been verified.</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </a>
      </Item>
    </div>
  )
}
```

--------------------------------

### Basic Carousel Structure with TypeScript React

Source: https://ui.shadcn.com/docs/components/carousel

Minimal carousel layout showing the required component hierarchy with three sample items and navigation controls. Demonstrates the basic structure needed for any carousel implementation.

```tsx
<Carousel>
  <CarouselContent>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
    <CarouselItem>...</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
```

--------------------------------

### Add InputGroup to Empty State - TSX

Source: https://ui.shadcn.com/docs/components/empty

Integrates an InputGroup component with search functionality into an empty state. Displays a 404 not found message with a search input field, search icon, and keyboard shortcut indicator (Kbd component). Useful for providing search functionality in empty result pages.

```tsx
import { SearchIcon } from "lucide-react"

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

export function EmptyInputGroup() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className="sm:w-3/4">
          <InputGroupInput placeholder="Try searching for pages..." />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
```