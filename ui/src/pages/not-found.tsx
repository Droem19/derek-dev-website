import { Link } from 'react-router-dom';

export function NotFoundPage() {
    return (
        <section className="mx-auto flex min-h-[60svh] w-full max-w-5xl flex-col items-start justify-center gap-4 px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">404</p>
            <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
            <p className="max-w-xl text-muted-foreground">The page you requested does not exist or may have moved.</p>
            <Link
                className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                to="/"
            >
                Go back home
            </Link>
        </section>
    );
}
