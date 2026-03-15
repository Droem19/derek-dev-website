# Derek Dev Website

This project is a portfolio site to showcase personal projects, professional experience, and any other work over time.

## Tech Stack
- TypeScript
- React
- Vite
- AWS CDK (TypeScript)

## Repo Structure
- `apps/ui` - Frontend Portfolio App
- `apps/api` - Backend/API App (placeholder for now)
- `infra` - AWS infrastructure for static site hosting

## Getting Started (Local Development)
### Prerequisites
- Node.js: `24.2.0`
- pnpm: `10.28.2`
- AWS CLI configured with your credentials
- CDK bootstrap done in target AWS account/region (`us-east-1`)

1. Install dependencies:
    ```
    pnpm install
    ```

2. Run the UI App
    ```bash
    pnpm dev
    ```

## Add UI Components (shadcn)
This repo uses shadcn in `apps/ui` with config at `apps/ui/components.json`.

1. Add one or more components from the repo root:
    ```bash
    pnpm --filter ui exec shadcn add button card input dialog
    ```

2. Generated files are written to:
    - `apps/ui/src/components/ui/*`
    - `apps/ui/src/lib/utils.ts` (if needed)

3. Import components in UI code:
    ```tsx
    import { Button } from "@/components/ui/button";
    ```

4. If a component prompts to overwrite a modified file, review before accepting.

Reference component list: https://ui.shadcn.com/docs/components

## Build UI
```bash
pnpm build
```

## Deploy Infrastructure + Website
The CDK stack creates:
- S3 private bucket for site assets
- CloudFront distribution
- ACM certificate
- Route53 A/AAAA records
- Bucket deployment from `apps/ui/dist`

Use `us-east-1` for CloudFront certificate compatibility.

1. Bootstrap (one-time per account/region):
    ```bash
    pnpm infra:bootstrap -- aws://<account-id>/us-east-1
    ```

2. Build UI assets:
    ```bash
    pnpm build
    ```

3. Deploy with domain context:
    ```bash
    $env:CDK_DEFAULT_ACCOUNT="<account-id>"
    $env:CDK_DEFAULT_REGION="us-east-1"
    pnpm infra:synth -- -c rootDomain=example.com -c siteSubdomain=www
    pnpm infra:deploy -- -c rootDomain=example.com -c siteSubdomain=www
    ```

If `siteSubdomain` is empty, the root domain is used directly.
