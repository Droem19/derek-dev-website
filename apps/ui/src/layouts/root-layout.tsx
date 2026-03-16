import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import faviconIco from '../../resources/favicon.ico';
import favicon16 from '../../resources/favicon-16x16.png';
import favicon32 from '../../resources/favicon-32x32.png';

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

export function RootLayout() {
    const [outlineColor, setOutlineColor] = useState<OutlineColorId>('gray');

    useEffect(() => {
        document.title = 'Derek Roemhildt';

        const storedOutlineColor = localStorage.getItem(OUTLINE_COLOR_STORAGE_KEY);
        const normalizedStoredColor =
            storedOutlineColor === 'zinc'
                ? 'gray'
                : storedOutlineColor === 'emerald'
                  ? 'green'
                  : storedOutlineColor === 'rose'
                    ? 'red'
                    : storedOutlineColor === 'amber'
                      ? 'red'
                      : storedOutlineColor === 'cyan'
                        ? 'blue'
                        : storedOutlineColor === 'violet'
                          ? 'blue'
                          : storedOutlineColor;

        if (normalizedStoredColor && isOutlineColorId(normalizedStoredColor)) {
            setOutlineColor(normalizedStoredColor);
            document.documentElement.dataset.outlineColor = normalizedStoredColor;
        } else {
            document.documentElement.dataset.outlineColor = 'gray';
        }

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
            <header className="sticky top-0 z-20 border-b border-border bg-zinc-950/80 shadow-[0_8px_24px_rgb(0_0_0/0.35)] backdrop-blur-xl">
                <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <nav aria-label="Home navigation" className="flex items-center gap-2">
                        <NavItem to="/">Home</NavItem>
                    </nav>
                    <div className="flex items-center gap-3">
                        <nav aria-label="Main navigation" className="flex items-center gap-2">
                            <NavItem to="/experience">Experience</NavItem>
                            <NavItem to="/projects">Projects</NavItem>
                        </nav>
                        <fieldset
                            aria-label="Outline color selector"
                            className="flex items-center gap-1 rounded-lg border border-border bg-black/20 p-1"
                        >
                            <legend className="sr-only">Outline color selector</legend>
                            {OUTLINE_COLORS.map((color) => (
                                <button
                                    aria-label={`Set outline color to ${color.label}`}
                                    className={[
                                        'h-7 w-7 rounded-full border-2 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
                                        `outline-color-${color.id}`,
                                        outlineColor === color.id ? 'ring-2 ring-foreground/70' : 'ring-0',
                                    ].join(' ')}
                                    key={color.id}
                                    onClick={() => setOutlineColor(color.id)}
                                    type="button"
                                />
                            ))}
                        </fieldset>
                    </div>
                </div>
            </header>

            <main className="flex-1" id="main-content">
                <Outlet />
            </main>

            <footer className="border-t">
                <div className="mx-auto w-full max-w-5xl px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
                    <p>© {new Date().getFullYear()} Derek Roemhildt</p>
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
