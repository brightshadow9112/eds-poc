# Otsuka AEM-codekit Boilerplate
Starter project for Otsuka AEM-codekit 

## Environments
- Preview: https://main--codekit-agitationinalz--oapi-commercial-omni.aem.page/
- Live: https://main--codekit-agitationinalz--oapi-commercial-omni.aem.live/

## Creating a New Project from This Template

1. Navigate to the [repository homepage](https://github.com/OAPI-Commercial-OMNI/otsuka-codekit-boilerplate)
2. Click the green **"Use this template"** button at the top of the page
3. Select **"Create a new repository"**
4. Fill in the repository details:
   - **Owner**: Select your organization or personal account
   - **Repository name**: `codekit-{short-handed-url}` (e.g., `codekit-otsuka`)
   - **Description**: Full production URL (e.g., `https://www.otsuka.com`)
   - **Visibility**: Choose Private or Internal
5. Click **"Create repository"**
6. Clone your new repository locally:
   ```sh
   git clone https://github.com/[your-org]/[your-repo-name].git
   cd [your-repo-name]
   ```
7. Follow the [Installation](#installation) and [Local Development](#local-development) sections below

## Branching Strategy

This project follows a multi-environment branching workflow:

```
main → stage → qa → dev
```

### Branch Hierarchy
- **main**: Production environment (protected)
- **stage**: Staging environment for pre-production testing (protected)
- **qa**: Quality assurance testing environment (protected)
- **dev**: Development integration branch (protected)

### Development Workflow
1. Create a user story or bug branch from `dev`:
   ```sh
   git checkout dev
   git pull origin dev
   git checkout -b story/ACMT-####-description
   ```
2. Make your changes and commit regularly:
   ```sh
   git add .
   git commit -m "feat: description of your changes"
   ```
3. Push your branch:
   ```sh
   git push origin story/ACMT-####-description
   ```
4. Create a Pull Request (PR) targeting the `dev` branch
5. Once approved and merged to `dev`, changes will be promoted through:
   - `dev` → `qa` (for QA testing)
   - `qa` → `stage` (for staging review)
   - `stage` → `main` (for production deployment)

### Branch Naming Conventions
Use JIRA ticket numbers in your branch names:
- User story branches: `story/ACMT-####-description`
- Bug branches: `bug/ACMT-####-description`
- Hotfixes: `hotfix/ACMT-####-description`

**Examples:**
- `story/ACMT-2236-add-hero-block`
- `bug/ACMT-2236-fix-navigation-mobile`
- `hotfix/ACMT-2236-critical-security-patch`

## Documentation

Before using the aem-boilerplate, we recommand you to go through the documentation on [www.aem.live](https://www.aem.live/docs/) and [experienceleague.adobe.com](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/authoring), more specifically:
1. [Getting Started](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/edge-dev-getting-started), [Creating Blocks](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/create-block), [Content Modelling](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/content-modeling)
2. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
3. [Web Performance](https://www.aem.live/developer/keeping-it-100)
4. [Markup, Sections, Blocks, and Auto Blocking](https://www.aem.live/developer/markup-sections-blocks)

Furthremore, we encourage you to watch the recordings of any of our previous presentations or sessions:
- [Getting started with AEM Authoring and Edge Delivery Services](https://experienceleague.adobe.com/en/docs/events/experience-manager-gems-recordings/gems2024/aem-authoring-and-edge-delivery)

## Prerequisites

- nodejs 18.3.x or newer
- AEM Cloud Service release 2024.8 or newer (>= `17465`)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-codekit-boilerplate` template
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `aem-codekit-boilerplate` directory in your favorite IDE and start coding :)

## Marketing Technology (MarTech) Implementation

This project includes the AEM Marketing Technology plugin for optimized integration with Adobe's marketing stack. The plugin decomposes monolithic Adobe Launch scripts into optimized components (Adobe Experience Platform WebSDK and Adobe Client Data Layer) that load at optimal times during the page lifecycle.

**Key Features:**
- Adobe Experience Platform WebSDK integration
- Adobe Client Data Layer (ACDL) support
- Consent management (OneTrust and native AEM)
- Analytics event tracking
- Personalization support
- RUM (Real User Monitoring) tracking

For detailed implementation instructions, configuration options, and API reference, see the [MarTech Plugin Documentation](plugins/martech/README.md).
