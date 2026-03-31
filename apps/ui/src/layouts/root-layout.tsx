import { Copyright, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { GitHubIcon, LinkedInIcon } from '@/components/custom-icons';
import faviconIco from '../../resources/favicon.ico';
import favicon16 from '../../resources/favicon-16x16.png';
import favicon32 from '../../resources/favicon-32x32.png';

const OUTLINE_COLOR_STORAGE_KEY = 'outline-color';
const EMAIL_ADDRESS = 'droemhildt28@gmail.com';

const OUTLINE_COLORS = [
    { id: 'blue', label: 'Blue' },
    { id: 'green', label: 'Green' },
    { id: 'red', label: 'Red' },
    { id: 'gray', label: 'Gray' },
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

export function RootLayout() {
    const [outlineColor, setOutlineColor] = useState<OutlineColorId>(getInitialOutlineColor);

    useEffect(() => {
        document.title = 'Derek Roemhildt';

        const setFavicon = (selector: string, href: string, type?: string) => {
            const existing = document.head.querySelector<HTMLLinkElement>(selector);
            const link = existing ?? document.createElement('link');

            if (!existing) {
                document.head.appendChild(link);
            }

            link.rel = 'icon';
            link.href = href;
            if (type) {
                link.type = type;
            } else {
                link.removeAttribute('type');
            }
        };

        setFavicon('link[rel="icon"][sizes="16x16"]', favicon16, 'image/png');
        const icon16 = document.head.querySelector<HTMLLinkElement>('link[rel="icon"][sizes="16x16"]');
        if (icon16) {
            icon16.sizes = '16x16';
        }

        setFavicon('link[rel="icon"][sizes="32x32"]', favicon32, 'image/png');
        const icon32 = document.head.querySelector<HTMLLinkElement>('link[rel="icon"][sizes="32x32"]');
        if (icon32) {
            icon32.sizes = '32x32';
        }

        setFavicon('link[rel="icon"]:not([sizes])', faviconIco, 'image/x-icon');
    }, []);

    useEffect(() => {
        document.documentElement.dataset.outlineColor = outlineColor;
        localStorage.setItem(OUTLINE_COLOR_STORAGE_KEY, outlineColor);
    }, [outlineColor]);

    return (
        <div className="flex min-h-svh flex-col text-foreground">
            <header className="sticky top-0 z-20 border-b border-border/60 bg-background/70 shadow-[0_8px_24px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md">
                <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <nav aria-label="Home navigation" className="flex items-center gap-2">
                        <NavItem to="/">Home</NavItem>
                    </nav>
                    <div className="flex items-center gap-4">
                        <fieldset aria-label="Outline color selector" className="hidden items-center gap-2 sm:flex">
                            <legend className="sr-only">Try Your Own Style</legend>
                            {OUTLINE_COLORS.map((color) => (
                                <button
                                    aria-label={`Set outline color to ${color.label}`}
                                    className={[
                                        'h-6 w-6 rounded-full border-2 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-110 hover:shadow-[0_10px_20px_-12px_var(--color-ring)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
                                        `outline-color-${color.id}`,
                                        outlineColor === color.id ? 'ring-2 ring-foreground/70' : 'ring-0',
                                    ].join(' ')}
                                    key={color.id}
                                    onClick={() => setOutlineColor(color.id)}
                                    type="button"
                                />
                            ))}
                        </fieldset>
                        <nav aria-label="Main navigation" className="flex items-center gap-2">
                            <NavItem to="/projects">Projects</NavItem>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="flex-1" id="main-content">
                <Outlet />
            </main>

            <footer className="border-t border-border/80 bg-black/10">
                <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
                    <p className="flex items-center gap-2 text-xs text-muted-foreground/90 sm:text-sm">
                        <Copyright className="h-4 w-4 shrink-0 text-ring" />
                        <span>{new Date().getFullYear()} Derek Roemhildt</span>
                    </p>

                    <div className="flex items-center gap-2">
                        <a
                            aria-label="Send email"
                            className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-black/15 px-2.5 py-2 text-sm text-ring transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-ring hover:bg-black/25 hover:shadow-[0_10px_20px_-12px_var(--color-ring)]"
                            href={`mailto:${EMAIL_ADDRESS}`}
                        >
                            <Mail className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110" />
                            <span>Email</span>
                        </a>
                        <a
                            aria-label="LinkedIn profile"
                            className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-black/15 px-2.5 py-2 text-sm text-ring transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-ring hover:bg-black/25 hover:shadow-[0_10px_20px_-12px_var(--color-ring)]"
                            href="https://www.linkedin.com/in/droemhildt"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <LinkedInIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110" />
                            <span>LinkedIn</span>
                        </a>
                        <a
                            aria-label="GitHub profile"
                            className="group inline-flex items-center gap-1.5 rounded-md border border-border bg-black/15 px-2.5 py-2 text-sm text-ring transition-[transform,box-shadow,border-color,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:border-ring hover:bg-black/25 hover:shadow-[0_10px_20px_-12px_var(--color-ring)]"
                            href="https://github.com/Droem19"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <GitHubIcon className="h-4 w-4 transition-transform duration-200 ease-out group-hover:scale-110" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function NavItem({ children, to }: { children: string; to: string }) {
    return (
        <NavLink
            className={({ isActive }) =>
                [
                    'rounded-md border border-border px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                        ? 'bg-white text-zinc-900'
                        : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-zinc-100',
                ].join(' ')
            }
            to={to}
        >
            {children}
        </NavLink>
    );
}
