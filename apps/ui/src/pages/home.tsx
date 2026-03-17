import { CalendarDays, Code2, Download, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import type { ComponentType, SVGProps } from 'react';
import { Card, CardContent } from '@/components/card';
import resumePdf from '../../resources/derek-roemhildt-resume.pdf';
import profilePicture from '../../resources/profile-picture.png';

const OUTLINE_COLOR_STORAGE_KEY = 'outline-color';

const OUTLINE_COLORS = [
    { id: 'gray', label: 'Gray' },
    { id: 'blue', label: 'Blue' },
    { id: 'green', label: 'Green' },
    { id: 'red', label: 'Red' },
] as const;

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

    const handleEmailClick = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            navigator.clipboard.writeText('droemhildt28@gmail.com').catch(() => {
                // Clipboard can fail due to browser permissions; mailto still works.
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
                <Card className="rounded-2xl">
                    <CardContent className="space-y-6 p-6 sm:p-8">
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
                                        <span>Full Stack Developer</span>
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
                            I&apos;m a full-stack software engineer building reliable, practical systems that simplify
                            complex workflows. I specialize in SaaS platforms, automation, and data pipelines. I lean
                            towards backend development and infrastructure, but I ship complete solutions across both
                            frontend and backend.
                        </p>

                        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                            <SocialLinkButton download href={resumePdf} icon={Download} label="Resume" />
                            <SocialLinkButton
                                href="https://www.linkedin.com/in/droemhildt"
                                icon={LinkedInIcon}
                                label="LinkedIn"
                            />
                            <SocialLinkButton href="https://github.com/Droem19" icon={GitHubIcon} label="GitHub" />
                            <SocialLinkButton
                                href="mailto:droemhildt28@gmail.com"
                                icon={Mail}
                                label="Email"
                                onClick={handleEmailClick}
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex h-full flex-col gap-4">
                    <Card className="rounded-2xl lg:flex-1">
                        <CardContent className="space-y-3 p-6 lg:h-full">
                            <h2 className="text-xl font-semibold text-ring sm:text-2xl">About Me</h2>
                            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                                When I&apos;m not building software, I spend most of my time staying active and
                                exploring new places. I enjoy running, lifting, hiking, and traveling with my wife and
                                dog.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                        <CardContent className="p-4">
                            <fieldset aria-label="Outline color selector" className="space-y-3">
                                <legend className="text-center text-xs font-medium tracking-wide text-muted-foreground">
                                    I like to build interactive things
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
        </section>
    );
}

type SocialLinkButtonProps = {
    label: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    download?: boolean;
    onClick?: () => void;
};

function SocialLinkButton({ download, href, icon: Icon, label, onClick }: SocialLinkButtonProps) {
    const isMailTo = href.startsWith('mailto:');

    return (
        <a
            className="group flex min-h-20 w-full flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-black/15 px-2.5 py-2.5 text-xs font-medium text-foreground transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-ring hover:bg-black/25 hover:shadow-[0_12px_24px_-14px_var(--color-ring)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 sm:min-h-24 sm:text-sm"
            download={download}
            href={href}
            onClick={onClick}
            rel={isMailTo ? undefined : 'noreferrer'}
            target={isMailTo || download ? undefined : '_blank'}
        >
            <Icon className="h-5 w-5 text-ring transition-transform duration-200 ease-out group-hover:scale-115 group-hover:-translate-y-0.5" />
            <span>{label}</span>
        </a>
    );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.67H9.33V9h3.41v1.56h.05c.48-.9 1.64-1.86 3.37-1.86 3.61 0 4.28 2.37 4.28 5.46v6.29ZM5.31 7.43a2.06 2.06 0 1 1 0-4.11 2.06 2.06 0 0 1 0 4.11ZM7.09 20.45H3.53V9h3.56v11.45Z" />
        </svg>
    );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path d="M12 .5A11.5 11.5 0 0 0 .5 12.16c0 5.12 3.32 9.45 7.92 10.98.58.11.8-.26.8-.57v-2.02c-3.22.72-3.9-1.4-3.9-1.4-.53-1.37-1.3-1.74-1.3-1.74-1.07-.75.08-.74.08-.74 1.18.08 1.8 1.24 1.8 1.24 1.05 1.82 2.75 1.3 3.42.99.1-.77.4-1.3.74-1.6-2.57-.3-5.27-1.31-5.27-5.85 0-1.3.45-2.36 1.19-3.19-.12-.3-.52-1.5.11-3.13 0 0 .97-.32 3.18 1.22a10.9 10.9 0 0 1 5.8 0c2.2-1.54 3.17-1.22 3.17-1.22.64 1.64.24 2.84.12 3.13.74.83 1.18 1.89 1.18 3.19 0 4.55-2.7 5.55-5.28 5.84.42.37.8 1.08.8 2.18v3.23c0 .32.2.69.8.57a11.67 11.67 0 0 0 7.92-10.98A11.5 11.5 0 0 0 12 .5Z" />
        </svg>
    );
}
