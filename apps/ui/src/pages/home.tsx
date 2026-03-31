import {
    Atom,
    Braces,
    CalendarDays,
    Check,
    Cloud,
    Code2,
    Database,
    Download,
    GitBranch,
    Mail,
    MapPin,
    Package,
    Server,
    Workflow,
} from 'lucide-react';
import type { ComponentType, MouseEvent, SVGProps } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Alert, AlertDescription } from '@/components/alert';
import { Card, CardContent } from '@/components/card';
import { GitHubIcon, LinkedInIcon } from '@/components/custom-icons';
import { ExperienceTimeline } from '@/components/experience-timeline';
import resumePdf from '../../resources/derek-roemhildt-resume.pdf';
import profilePicture from '../../resources/profile-picture.png';

const EMAIL_ADDRESS = 'droemhildt28@gmail.com';
const OUTLINE_COLOR_STORAGE_KEY = 'outline-color';
const OUTLINE_COLORS = [
    { id: 'blue', label: 'Blue' },
    { id: 'green', label: 'Green' },
    { id: 'red', label: 'Red' },
    { id: 'gray', label: 'Gray' },
] as const;
const SKILLS: { icon: ComponentType<SVGProps<SVGSVGElement>>; label: string }[] = [
    { icon: Braces, label: 'TypeScript' },
    { icon: Atom, label: 'React' },
    { icon: Server, label: 'Node.js' },
    { icon: Cloud, label: 'AWS' },
    { icon: Database, label: 'PostgreSQL' },
    { icon: Package, label: 'Docker' },
    { icon: GitBranch, label: 'CI/CD' },
    { icon: Workflow, label: 'Microservices + REST APIs' },
];

type OutlineColorId = (typeof OUTLINE_COLORS)[number]['id'];

function isOutlineColorId(value: string): value is OutlineColorId {
    return OUTLINE_COLORS.some((color) => color.id === value);
}

function getInitialOutlineColor(): OutlineColorId {
    if (typeof window === 'undefined') {
        return 'blue';
    }

    const storedOutlineColor = localStorage.getItem(OUTLINE_COLOR_STORAGE_KEY);
    return storedOutlineColor && isOutlineColorId(storedOutlineColor) ? storedOutlineColor : 'blue';
}

function getYearsOfExperience(startDate = new Date(2019, 4, 1)): number {
    const now = new Date();
    const anniversaryThisYear = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());
    const years = now.getFullYear() - startDate.getFullYear();

    return now < anniversaryThisYear ? years - 1 : years;
}

export function HomePage() {
    const [outlineColor, setOutlineColor] = useState<OutlineColorId>(getInitialOutlineColor);
    const [showEmailCopiedAlert, setShowEmailCopiedAlert] = useState(false);
    const emailAlertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (emailAlertTimeoutRef.current) {
                clearTimeout(emailAlertTimeoutRef.current);
            }
        },
        []
    );

    const triggerEmailCopiedAlert = () => {
        setShowEmailCopiedAlert(true);
        if (emailAlertTimeoutRef.current) {
            clearTimeout(emailAlertTimeoutRef.current);
        }

        emailAlertTimeoutRef.current = setTimeout(() => {
            setShowEmailCopiedAlert(false);
        }, 2200);
    };

    const copyEmailWithExecCommand = () => {
        if (typeof document === 'undefined') {
            return false;
        }

        const textArea = document.createElement('textarea');
        textArea.value = EMAIL_ADDRESS;
        textArea.setAttribute('readonly', '');
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        textArea.setSelectionRange(0, textArea.value.length);
        const copied = document.execCommand('copy');
        document.body.removeChild(textArea);
        return copied;
    };

    const handleEmailClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const copied = copyEmailWithExecCommand();

        if (copied) {
            triggerEmailCopiedAlert();
            return;
        }

        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            void navigator.clipboard
                .writeText(EMAIL_ADDRESS)
                .then(triggerEmailCopiedAlert)
                .catch(() => {
                    // Browsers may block clipboard in some contexts.
                });
        }
    };

    const handleOutlineColorClick = (color: OutlineColorId) => {
        setOutlineColor(color);
        document.documentElement.dataset.outlineColor = color;
        localStorage.setItem(OUTLINE_COLOR_STORAGE_KEY, color);
    };

    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <section className="grid items-start gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(13.5rem,0.8fr)] lg:items-stretch">
                <Card className="rounded-2xl border-2">
                    <CardContent className="space-y-6 px-6 pt-6 pb-6 sm:px-8 sm:pt-8 sm:pb-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                            <div className="space-y-6">
                                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                    <span className="block">
                                        Hi, I&apos;m <span className="text-ring">Derek</span>
                                    </span>
                                    <span className="block text-ring">Roemhildt</span>
                                </h1>

                                <div className="space-y-3 text-base text-muted-foreground sm:text-lg">
                                    <p className="flex items-center gap-3">
                                        <MapPin className="h-5 w-5 shrink-0 text-ring" />
                                        <span>Based in Minneapolis, Minnesota</span>
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <Code2 className="h-5 w-5 shrink-0 text-ring" />
                                        <span>Full-Stack Software Engineer</span>
                                    </p>
                                    <p className="flex items-center gap-3">
                                        <CalendarDays className="h-5 w-5 shrink-0 text-ring" />
                                        <span>{getYearsOfExperience()}+ Years of Experience</span>
                                    </p>
                                </div>
                            </div>

                            <img
                                alt="Portrait of Derek Roemhildt"
                                className="h-48 w-48 self-start rounded-xl border-2 border-border bg-secondary/30 object-contain sm:h-56 sm:w-56"
                                src={profilePicture}
                            />
                        </div>

                        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                            I&apos;m a full-stack software engineer focused on building reliable, practical systems that
                            simplify complex workflows at scale. I specialize in SaaS platforms, automation, and data
                            pipelines. I lean toward backend development and infrastructure, but I ship complete
                            solutions across both frontend and backend for real-world business needs.
                        </p>

                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                            <SocialLinkButton download href={resumePdf} icon={Download} label="Resume" />
                            <SocialLinkButton
                                href="https://www.linkedin.com/in/droemhildt"
                                icon={LinkedInIcon}
                                label="LinkedIn"
                            />
                            <SocialLinkButton href="https://github.com/Droem19" icon={GitHubIcon} label="GitHub" />
                            <SocialLinkButton href="#" icon={Mail} label="Email" onClick={handleEmailClick} />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex h-full flex-col gap-4">
                    <Card className="rounded-2xl border-2 lg:flex-1">
                        <CardContent className="space-y-3 p-6 lg:h-full">
                            <h2 className="text-xl font-semibold text-ring sm:text-2xl">About Me</h2>
                            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                                When I&apos;m not building software, I spend most of my time staying active and
                                exploring new places. Some of my favorite hobbies include working out, hiking, traveling
                                with my wife and dog, and cooking up delicious barbecue for friends and family.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-2">
                        <CardContent className="p-4">
                            <fieldset aria-label="Outline color selector" className="space-y-3">
                                <legend className="text-center text-sm font-medium tracking-wide text-muted-foreground sm:text-base">
                                    Try Your Own Style
                                </legend>
                                <div className="grid grid-cols-4 place-items-center gap-2">
                                    {OUTLINE_COLORS.map((color) => (
                                        <button
                                            aria-label={`Set outline color to ${color.label}`}
                                            className={[
                                                'h-7 w-7 rounded-full border-2 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 hover:shadow-[0_10px_20px_-12px_var(--color-ring)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
                                                `outline-color-${color.id}`,
                                                outlineColor === color.id ? 'ring-2 ring-foreground/70' : 'ring-0',
                                            ].join(' ')}
                                            key={color.id}
                                            onClick={() => handleOutlineColorClick(color.id)}
                                            type="button"
                                        />
                                    ))}
                                </div>
                            </fieldset>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Card className="mt-4 rounded-2xl border-2">
                <CardContent className="space-y-4 p-6 sm:p-7">
                    <h2 className="text-xl font-semibold text-ring sm:text-2xl">Key Skills</h2>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        {SKILLS.map((skill) => (
                            <SkillTile icon={skill.icon} key={skill.label} label={skill.label} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <ExperienceTimeline />

            {showEmailCopiedAlert ? (
                <div className="pointer-events-none fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6">
                    <Alert className="w-auto max-w-xs border-ring/40 bg-black/85 px-3 py-2 shadow-xl backdrop-blur-sm">
                        <AlertDescription className="flex items-center gap-2 text-xs sm:text-sm">
                            <Check className="h-4 w-4 shrink-0 text-ring" />
                            <span>Email copied to clipboard!</span>
                        </AlertDescription>
                    </Alert>
                </div>
            ) : null}
        </section>
    );
}

type SocialLinkButtonProps = {
    label: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    download?: boolean;
    onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function SocialLinkButton({ download, href, icon: Icon, label, onClick }: SocialLinkButtonProps) {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');

    return (
        <a
            className="group flex min-h-20 w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-black/15 px-2.5 py-2.5 text-xs font-medium text-foreground transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-ring hover:bg-black/25 hover:shadow-[0_12px_24px_-14px_var(--color-ring)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 sm:min-h-24 sm:text-sm"
            download={download}
            href={href}
            onClick={onClick}
            rel={isExternal ? 'noreferrer' : undefined}
            target={isExternal ? '_blank' : undefined}
        >
            <Icon className="h-5 w-5 text-ring transition-transform duration-200 ease-out group-hover:scale-115 group-hover:-translate-y-0.5" />
            <span>{label}</span>
        </a>
    );
}

function SkillTile({ icon: Icon, label }: { icon: ComponentType<SVGProps<SVGSVGElement>>; label: string }) {
    return (
        <div className="group flex min-h-14 items-center gap-3 rounded-lg border border-border/80 bg-black/10 px-3 py-2 transition-colors duration-200 hover:border-ring/60 hover:bg-black/20">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border/70 bg-black/20">
                <Icon className="h-4 w-4 text-ring transition-transform duration-200 ease-out group-hover:scale-110" />
            </div>
            <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
    );
}
