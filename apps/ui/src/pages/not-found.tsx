import { Link } from 'react-router-dom';

import { Button } from '@/components/button';

export function NotFoundPage() {
    return (
        <section className="mx-auto flex min-h-[60svh] w-full max-w-5xl flex-col items-start justify-center gap-4 px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-wide text-muted-foreground">404</p>
            <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
            <p className="max-w-xl text-muted-foreground">The page you requested does not exist or may have moved.</p>
            <Button asChild variant="outline">
                <Link to="/">Go back home</Link>
            </Button>
        </section>
    );
}
