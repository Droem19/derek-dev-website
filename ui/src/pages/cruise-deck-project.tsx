import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import cruiseDeckPreview from '../../resources/cruise-deck-preview.png';

export const cruiseDeckProject = {
    slug: 'cruise-deck',
    name: 'Cruise Deck',
    eyebrow: 'Private cruise offer workspace',
    summary: 'Cruise offer tracking with PDF uploads, traveler records, sailing details, and search filters.',
    sourceUrl: 'https://github.com/Droem19/cruise-deck',
    cardImage: {
        src: cruiseDeckPreview,
        alt: 'Cruise Deck sailing dashboard preview',
    },
};

export function CruiseDeckProjectPage() {
    return (
        <article className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <BackToProjects />

            <div className="mt-10 max-w-3xl space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Cruise Deck</h1>
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
