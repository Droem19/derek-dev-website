import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type ComponentType, useMemo, useState } from 'react';

import {
    AngularIcon,
    AwsIcon,
    CicdIcon,
    DockerIcon,
    JavaIcon,
    MicroservicesIcon,
    PostgresIcon,
    PythonIcon,
    ReactIcon,
    RedisIcon,
    TypeScriptIcon,
} from '@/components/custom-icons';

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
    { label: 'Docker', icon: DockerIcon },
    { label: 'Angular', icon: AngularIcon },
    { label: 'Java', icon: JavaIcon },
    { label: 'Python', icon: PythonIcon },
    { label: 'Redis', icon: RedisIcon },
    { label: 'Microservices', icon: MicroservicesIcon },
];

export function KeySkillsSection() {
    const [startIndex, setStartIndex] = useState(0);
    const totalSkills = SKILLS.length;

    const orderedSkills = useMemo(() => [...SKILLS.slice(startIndex), ...SKILLS.slice(0, startIndex)], [startIndex]);

    const moveLeft = () => {
        setStartIndex((current) => (current - 1 + totalSkills) % totalSkills);
    };

    const moveRight = () => {
        setStartIndex((current) => (current + 1) % totalSkills);
    };

    return (
        <section className="mt-8 space-y-4">
            <h2 className="text-ring-gradient text-center text-3xl font-semibold tracking-tight sm:text-4xl">
                Key Skills
            </h2>
            <div className="flex items-center justify-between gap-2">
                <button
                    aria-label="Scroll skills left"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-white/[0.03] text-foreground transition-colors hover:border-ring/60 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                    onClick={moveLeft}
                    type="button"
                >
                    <ChevronLeft className="h-5 w-5 text-ring" />
                </button>

                <div className="max-w-4xl overflow-hidden">
                    <div className="flex w-max min-w-full gap-3 px-1 py-1">
                        {orderedSkills.map((skill) => (
                            <SkillCard key={skill.label} skill={skill} />
                        ))}
                    </div>
                </div>

                <button
                    aria-label="Scroll skills right"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border/70 bg-white/[0.03] text-foreground transition-colors hover:border-ring/60 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                    onClick={moveRight}
                    type="button"
                >
                    <ChevronRight className="h-5 w-5 text-ring" />
                </button>
            </div>
        </section>
    );
}

function SkillCard({ skill }: { skill: SkillItem }) {
    const Icon = skill.icon;

    return (
        <article className="flex w-28 shrink-0 flex-col items-center justify-center gap-2.5 py-2 text-center sm:w-32">
            {Icon ? (
                <Icon className="h-11 w-11" />
            ) : (
                <div className="h-11 w-11 rounded-sm border border-ring/70 bg-ring/20" />
            )}
            <p className="text-xs leading-tight text-muted-foreground sm:text-[13px]">{skill.label}</p>
        </article>
    );
}
