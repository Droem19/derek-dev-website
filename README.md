# Derek Dev Website

This project is a portfolio site to showcase personal projects, professional experience, and any other work over time.

## Tech Stack

- TypeScript
- React
- Vite
- Tailwind
- AWS CDK
- Biome

## Repo Structure

- `ui` - Vite React portfolio app 
- `ui/src/pages` - Route-level pages for home, projects, and not found states
- `ui/src/layouts` - Shared app shell with navigation, footer, favicon setup, and route outlet
- `ui/src/components` - Reusable UI pieces including the error boundary, timeline, skills section, and custom social icons
- `ui/resources` - Static assets imported by the UI, including favicons, profile image, and resume PDF
- `infra` - CDK app and stack for static website hosting
- `.github/workflows/deploy.yml` - Production deploy workflow for pushes to `main` and manual dispatches

## Getting Started (Local Development)

- Node.js `24.12.0`
- pnpm `10.28.2`
- AWS CLI configured for deployments
- AWS SSO access for the `DRoemhildt19` profile

## Local Development

Install dependencies from the repo root:

```bash
pnpm install
```

Run the local UI dev server:

```bash
pnpm run local-ui
```

## Infrastructure

The CDK app lives in `infra` and defines the `derek-dev-website-ui` stack. It deploys the built UI from `ui/dist`.

The stack creates:

- Private S3 bucket for static site assets
- CloudFront distribution with Origin Access Control
- ACM certificate for the primary domain and `www` domain
- Route53 A and AAAA alias records for both domains
- SPA fallback responses that serve `index.html` for CloudFront 403 and 404 responses
- Bucket deployment with CloudFront invalidation

## Deploying the app

Log in with AWS SSO:

```bash
pnpm run sso
```

Preview the stack:

```bash
pnpm run diff
```

Deploy the stack:

```bash
pnpm run deploy
```

## GitHub Actions Deploy

The deploy workflow runs on pushes to the `main` branch and can also be started manually from GitHub Actions.

The workflow:

- Installs pnpm and Node.js
- Installs dependencies with `pnpm install --frozen-lockfile`
- Assumes the AWS role from Github's `AWS_DEPLOY_ROLE_ARN` secret
- Runs `pnpm run github-action-deploy`
- Deploys to `us-east-1`
