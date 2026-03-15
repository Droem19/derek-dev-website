const projects = [
    {
        name: 'Project One',
        description: 'Placeholder description for project page.',
        stack: ['React', 'TypeScript', 'AWS'],
    },
    {
        name: 'Project Two',
        description: 'Placeholder description for project page.',
        stack: ['React', 'TypeScript', 'AWS'],
    },
];

export function ProjectsPage() {
    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <section className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
                <p className="text-muted-foreground">A few things I have built recently.</p>
            </section>

            <section className="mt-8 grid gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                    <article className="rounded-xl border bg-card p-5 text-card-foreground" key={project.name}>
                        <h2 className="font-medium">{project.name}</h2>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            {project.stack.map((item) => (
                                <li
                                    className="rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                                    key={item}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </section>
        </section>
    );
}
