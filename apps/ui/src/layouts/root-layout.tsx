import { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import faviconIco from '../../resources/favicon.ico';
import favicon16 from '../../resources/favicon-16x16.png';
import favicon32 from '../../resources/favicon-32x32.png';

export function RootLayout() {
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

    return (
        <div className="flex min-h-svh flex-col text-foreground">
            <header className="sticky top-0 z-20 border-b border-white/10 bg-zinc-950/80 shadow-[0_8px_24px_rgb(0_0_0/0.35)] backdrop-blur-xl">
                <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <NavLink
                        className={({ isActive }) =>
                            [
                                'rounded-md border border-white/10 px-3 py-1.5 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-white text-zinc-900'
                                    : 'bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-zinc-100',
                            ].join(' ')
                        }
                        to="/"
                    >
                        Home
                    </NavLink>
                    <div className="flex items-center gap-3">
                        <nav
                            aria-label="Main navigation"
                            className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/20 p-1"
                        >
                            <NavItem to="/experience">Experience</NavItem>
                            <NavItem to="/projects">Projects</NavItem>
                        </nav>
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
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive ? 'bg-white text-zinc-900' : 'text-zinc-300 hover:bg-white/10 hover:text-zinc-100',
                ].join(' ')
            }
            to={to}
        >
            {children}
        </NavLink>
    );
}
