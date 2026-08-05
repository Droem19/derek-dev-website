import type { ComponentType } from 'react';
import { useEffect, useRef, useState } from 'react';

import {
    AngularIcon,
    AwsIcon,
    CicdIcon,
    DockerIcon,
    GitHubIcon,
    JavaIcon,
    MicroservicesIcon,
    NodeIcon,
    PostgresIcon,
    PythonIcon,
    ReactIcon,
    RedisIcon,
    SpringIcon,
    TypeScriptIcon,
} from './custom-icons';

type SkillItem = {
    label: string;
    icon?: ComponentType<{ className?: string }>;
};

const SKILLS: SkillItem[] = [
    { label: 'TypeScript', icon: TypeScriptIcon },
    { label: 'AWS', icon: AwsIcon },
    { label: 'PostgreSQL', icon: PostgresIcon },
    { label: 'CI/CD', icon: CicdIcon },
    { label: 'React', icon: ReactIcon },
    { label: 'Node.js', icon: NodeIcon },
    { label: 'Docker', icon: DockerIcon },
    { label: 'Angular', icon: AngularIcon },
    { label: 'Java', icon: JavaIcon },
    { label: 'Python', icon: PythonIcon },
    { label: 'Redis', icon: RedisIcon },
    { label: 'Microservices', icon: MicroservicesIcon },
    { label: 'git', icon: GitHubIcon },
    { label: 'Spring', icon: SpringIcon },
];

const COLLAPSED_HEIGHT_PX = 204; // 2 rows of h-24 cards + one gap-3 row gap

export function KeySkillsSection() {
    const [expanded, setExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);
    const gridRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const updateCanExpand = () => {
            const gridElement = gridRef.current;
            if (!gridElement) {
                return;
            }

            setCanExpand(gridElement.scrollHeight > COLLAPSED_HEIGHT_PX + 1);
        };

        updateCanExpand();

        const observer = new ResizeObserver(updateCanExpand);
        if (gridRef.current) {
            observer.observe(gridRef.current);
        }

        window.addEventListener('resize', updateCanExpand);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', updateCanExpand);
        };
    }, []);

    return (
        <section className="mt-5 space-y-4">
            <h2 className="text-ring-gradient text-center text-3xl font-semibold tracking-tight sm:text-4xl">
                Key Skills
            </h2>
            <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-out ${expanded ? 'max-h-[1000px]' : 'max-h-[12.75rem]'}`}
            >
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7" ref={gridRef}>
                    {SKILLS.map((skill) => (
                        <SkillCard key={skill.label} skill={skill} />
                    ))}
                </div>
            </div>
            {canExpand ? (
                <div className="flex justify-center">
                    <button
                        className="inline-flex items-center rounded-md border border-border/70 bg-white/[0.03] px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-ring/60 hover:bg-white/[0.08] hover:text-foreground"
                        onClick={() => setExpanded((current) => !current)}
                        type="button"
                    >
                        {expanded ? 'Show less' : 'Show more'}
                    </button>
                </div>
            ) : null}
        </section>
    );
}

function SkillCard({ skill }: { skill: SkillItem }) {
    const Icon = skill.icon;

    return (
        <article className="flex h-24 min-w-0 flex-col items-center justify-center gap-2.5 py-2 text-center">
            {Icon ? (
                <Icon className="h-11 w-11" />
            ) : (
                <div className="h-11 w-11 rounded-sm border border-ring/70 bg-ring/20" />
            )}
            <p className="text-xs leading-tight text-muted-foreground sm:text-[13px]">{skill.label}</p>
        </article>
    );
}
