import type { ComponentType } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { CruiseDeckProjectPage, cruiseDeckProject } from './cruise-deck-project';
import { TipTrackerProjectPage, tipTrackerProject } from './tip-tracker-project';
import { ProjectCard } from '../components/project-card';

const projects = [tipTrackerProject, cruiseDeckProject];

const projectPages: Record<string, ComponentType> = {
    'cruise-deck': CruiseDeckProjectPage,
    'tip-tracker': TipTrackerProjectPage,
};

export function ProjectsPage() {
    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-4">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Project highlights</h1>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                    A closer look at the independent apps I've been building
                </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {projects.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                ))}
            </div>
        </section>
    );
}

export function ProjectDetailPage() {
    const { projectSlug } = useParams();
    const ProjectPage = projectSlug ? projectPages[projectSlug] : undefined;

    if (!ProjectPage) return <Navigate replace to="/projects" />;

    return <ProjectPage />;
}
