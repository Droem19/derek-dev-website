import * as cdk from 'aws-cdk-lib';

import { UIStack } from '../lib/ui-stack';

const app = new cdk.App();

const rootDomain = app.node.tryGetContext('rootDomain') ?? process.env.ROOT_DOMAIN;
if (!rootDomain) {
    throw new Error(
        'Missing domain configuration. Provide -c rootDomain=example.com or ROOT_DOMAIN.'
    );
}

const siteSubdomain =
    app.node.tryGetContext('siteSubdomain') ?? process.env.SITE_SUBDOMAIN ?? 'www';

const siteDomain = siteSubdomain.length > 0 ? `${siteSubdomain}.${rootDomain}` : rootDomain;

new UIStack(app, 'PortfolioSiteStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    },
    rootDomain,
    siteDomain,
});
