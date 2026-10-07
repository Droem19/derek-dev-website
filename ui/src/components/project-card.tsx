import { ArrowRight, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export type ProjectCardInfo = {
    slug: string;
    name: string;
    eyebrow: string;
    summary: string;
    sourceUrl: string;
    cardImage: {
        src: string;
        alt: string;
    };
};

export function ProjectCard({ project }: { project: ProjectCardInfo }) {
    return (
        <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-card/55 shadow-[0_24px_70px_-55px_rgba(0,0,0,0.95)] transition hover:-translate-y-1 hover:border-ring/60 hover:bg-card/70 hover:shadow-[0_26px_80px_-48px_rgba(0,0,0,0.95)]">
            <div className="aspect-[16/10] overflow-hidden border-b border-border/70 bg-black/20">
                <img
                    alt={project.cardImage.alt}
                    className="h-full w-full object-cover object-top transition duration-500 ease-out group-hover:scale-[1.02]"
                    src={project.cardImage.src}
                />
            </div>

            <div className="flex flex-1 flex-col gap-5 p-5 sm:p-6">
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{project.name}</h2>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ring/90">{project.eyebrow}</p>
                    <p className="text-base leading-relaxed text-muted-foreground">{project.summary}</p>
                </div>

                <div className="mt-auto flex flex-wrap gap-3">
                    <Link
                        className="inline-flex h-10 items-center gap-2 rounded-md border border-ring/45 bg-ring/10 px-3 text-sm font-semibold text-ring transition hover:-translate-y-0.5 hover:border-ring/70 hover:bg-ring/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 active:translate-y-0"
                        to={`/projects/${project.slug}`}
                    >
                        Explore {project.name}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                    <a
                        className="inline-flex h-10 items-center gap-2 rounded-md border border-border/70 bg-white/[0.03] px-3 text-sm font-semibold text-muted-foreground transition hover:-translate-y-0.5 hover:border-ring/50 hover:bg-white/[0.07] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 active:translate-y-0"
                        href={project.sourceUrl}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <Github className="h-4 w-4" />
                        GitHub
                    </a>
                </div>
            </div>
        </article>
    );
}
