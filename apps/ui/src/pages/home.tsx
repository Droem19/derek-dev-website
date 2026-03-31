import { CalendarDays, Check, Code2, Download, Mail, MapPin } from 'lucide-react';
import type { ComponentType, MouseEvent, SVGProps } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Alert, AlertDescription } from '@/components/alert';
import { GitHubIcon, LinkedInIcon } from '@/components/custom-icons';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { KeySkillsSection } from '@/components/key-skills-section';
import resumePdf from '../../resources/derek-roemhildt-resume.pdf';
import profilePicture from '../../resources/profile-picture.png';

const EMAIL_ADDRESS = 'droemhildt28@gmail.com';

function getYearsOfExperience(startDate = new Date(2019, 4, 1)): number {
    const now = new Date();
    const anniversaryThisYear = new Date(now.getFullYear(), startDate.getMonth(), startDate.getDate());
    const years = now.getFullYear() - startDate.getFullYear();

    return now < anniversaryThisYear ? years - 1 : years;
}

export function HomePage() {
    const [showEmailCopiedAlert, setShowEmailCopiedAlert] = useState(false);
    const [emailAlertPosition, setEmailAlertPosition] = useState<{ x: number; y: number } | null>(null);
    const emailAlertTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => () => {
            if (emailAlertTimeoutRef.current) {
                clearTimeout(emailAlertTimeoutRef.current);
            }
        },
        []
    );

    const triggerEmailCopiedAlert = (target: HTMLElement) => {
        const rect = target.getBoundingClientRect();
        setEmailAlertPosition({
            x: rect.left + rect.width / 2,
            y: rect.top - 10,
        });
        setShowEmailCopiedAlert(true);
        if (emailAlertTimeoutRef.current) {
            clearTimeout(emailAlertTimeoutRef.current);
        }

        emailAlertTimeoutRef.current = setTimeout(() => {
            setShowEmailCopiedAlert(false);
        }, 1000);
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
        const target = event.currentTarget;

        if (copied) {
            triggerEmailCopiedAlert(target);
            return;
        }

        if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            void navigator.clipboard
                .writeText(EMAIL_ADDRESS)
                .then(() => triggerEmailCopiedAlert(target))
                .catch(() => {
                    // Browsers may block clipboard in some contexts.
                });
        }
    };

    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
            <section className="grid items-start gap-4 lg:grid-cols-[minmax(0,2.2fr)_minmax(13.5rem,0.8fr)] lg:items-stretch">
                <section className="space-y-7 pt-1 sm:pt-2">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-6">
                            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                                <span className="block">
                                    Hi, I&apos;m <span className="text-ring-gradient">Derek Roemhildt</span>
                                </span>
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

                            <div className="flex flex-wrap items-center gap-2">
                                <SocialLinkButton download href={resumePdf} icon={Download} label="Resume" />
                                <SocialLinkButton
                                    href="https://www.linkedin.com/in/droemhildt"
                                    icon={LinkedInIcon}
                                    label="LinkedIn"
                                />
                                <SocialLinkButton href="https://github.com/Droem19" icon={GitHubIcon} label="GitHub" />
                                <SocialLinkButton href="#" icon={Mail} label="Email" onClick={handleEmailClick} />
                            </div>
                        </div>

                        <img
                            alt="Portrait of Derek Roemhildt"
                            className="h-48 w-48 self-start rounded-2xl border border-border/60 bg-secondary/20 object-contain sm:h-56 sm:w-56"
                            src={profilePicture}
                        />
                    </div>

                    <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                        I&apos;m a full-stack software engineer focused on building reliable, practical systems that
                        simplify complex workflows at scale. I specialize in SaaS platforms, automation, and data
                        pipelines. I lean toward backend development and infrastructure, but I ship complete solutions
                        across both frontend and backend for real-world business needs.
                    </p>
                </section>

                <div className="flex h-full flex-col gap-4">
                    <section className="space-y-3 border-l border-border/60 pl-4 lg:flex-1">
                        <h2 className="text-ring-gradient text-xl font-semibold sm:text-2xl">About Me</h2>
                        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                            When I&apos;m not building software, I spend most of my time staying active and exploring
                            new places. Some of my favorite hobbies include working out, hiking, traveling with my wife
                            and dog, and cooking up delicious barbecue for friends and family.
                        </p>
                    </section>
                </div>
            </section>

            <KeySkillsSection />

            <ExperienceTimeline />

            {showEmailCopiedAlert && emailAlertPosition ? (
                <div
                    className="pointer-events-none fixed z-50"
                    style={{
                        left: `${emailAlertPosition.x}px`,
                        top: `${emailAlertPosition.y}px`,
                        transform: 'translate(-50%, -100%)',
                    }}
                >
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
            className="group inline-flex h-10 items-center gap-2 rounded-md border border-border/65 bg-white/[0.03] px-3 text-sm font-medium text-foreground transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-ring/60 hover:bg-white/[0.08] hover:shadow-[0_10px_20px_-12px_var(--color-ring)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 sm:h-11"
            download={download}
            href={href}
            onClick={onClick}
            rel={isExternal ? 'noreferrer' : undefined}
            title={label}
            target={isExternal ? '_blank' : undefined}
        >
            <Icon className="h-4 w-4 text-ring transition-transform duration-200 ease-out group-hover:scale-110" />
            <span>{label}</span>
        </a>
    );
}
