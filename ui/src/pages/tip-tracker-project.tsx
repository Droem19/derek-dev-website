import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import tipTrackerPreview from '../../resources/tip-tracker-preview.png';

export const tipTrackerProject = {
    slug: 'tip-tracker',
    name: 'Tip Tracker',
    eyebrow: 'Income tracking for tipped workers',
    summary: 'Calendar-based tip logging with daily entries, period totals, and private account-backed history.',
    sourceUrl: 'https://github.com/Droem19/tip-tracker',
    cardImage: {
        src: tipTrackerPreview,
        alt: 'Tip Tracker calendar dashboard preview',
    },
};

export function TipTrackerProjectPage() {
    return (
        <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <BackToProjects />

            <div className="mt-10 max-w-3xl space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Tip Tracker</h1>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    Project detail page coming soon.
                </p>
            </div>
        </article>
    );
}

function BackToProjects() {
    return (
        <Link
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border/70 bg-white/[0.03] px-3 text-sm font-medium text-muted-foreground transition hover:-translate-y-0.5 hover:border-ring/60 hover:bg-white/[0.08] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 active:translate-y-0"
            to="/projects"
        >
            <ArrowLeft className="h-4 w-4" />
            Back to projects
        </Link>
    );
}
