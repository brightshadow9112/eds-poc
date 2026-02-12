# Contributing to Otsuka Codekit Boilerplate

We welcome contributions from all team members working on the Otsuka Codekit Boilerplate project. This guide will help you understand how to contribute effectively.

## Code Of Conduct

This project adheres to the Otsuka [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold these standards. Please report any unacceptable behavior to your project leadership or HR contact.

## Before You Contribute

* Check if there is an existing issue or JIRA ticket for your proposed changes
* Review open pull requests to avoid duplicate work
* Ensure your changes align with the project's architecture and design system guidelines
* Familiarize yourself with the [branching strategy](README.md#branching-strategy)

## How to Contribute

### 1. Create a User Story or Bug Branch

Branch from `dev` using the proper naming convention:

```bash
git checkout dev
git pull origin dev
git checkout -b story/ACMT-####-description
# or for bugs
git checkout -b bug/ACMT-####-description
```

### 2. Make Your Changes

* Follow the coding standards outlined below
* Write clean, maintainable code
* Update documentation as needed
* Test your changes locally using `aem up`

### 3. Commit Your Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add hero block with responsive design"
```

**Commit message format:**
* `feat:` - New features
* `fix:` - Bug fixes
* `docs:` - Documentation changes
* `style:` - Code formatting (no functional changes)
* `refactor:` - Code restructuring
* `test:` - Adding or updating tests
* `chore:` - Maintenance tasks

### 4. Submit a Pull Request

1. Push your branch:
   ```bash
   git push origin story/ACMT-####-description
   # or for bugs
   git push origin bug/ACMT-####-description
   ```
2. Create a Pull Request targeting the `dev` branch
3. Fill out the PR template completely
4. Link the related JIRA ticket (e.g., ACMT-2236)
5. Request reviews from appropriate team members

## Coding Standards

### Linting

Run linting before submitting your PR:

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint:fix
```

### Block Development Guidelines

When creating or modifying blocks:

* **Use CSS variables exclusively** from `/styles/root.css`
* **Never hardcode** colors, fonts, or spacing values
* **Use content-type detection** instead of position-based logic
* **Include `moveInstrumentation()`** for Universal Editor compatibility
* **Optimize images** with `createOptimizedPicture()`
* Keep CSS ≤5KB and JS ≤3KB (minified+gzipped)

### Universal Editor Models

After modifying models in `/models/`:

```bash
npm run build:json
```

## Review Process

* PRs require at least one approval before merging
* Reviewers will check for code quality, standards compliance, and functionality
* Address feedback promptly and push updates to your branch
* Once approved, your PR will be merged to `dev`

## Deployment Process

Changes follow the promotion path:
1. Merge to `dev` → Development environment
2. Promote to `qa` → QA testing environment
3. Promote to `stage` → Staging environment
4. Promote to `main` → Production environment

## Questions or Issues?

If you have questions or encounter issues:
* Check the [README](README.md) documentation
* Review existing issues in the repository
* Reach out to the project team via your communication channels

Thank you for contributing to the Otsuka Codekit Boilerplate project!

