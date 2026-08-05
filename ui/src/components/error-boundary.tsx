import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="mx-auto flex min-h-svh w-full max-w-xl flex-col items-center justify-center gap-4 px-4 py-10 text-center sm:px-6">
                    <h1 className="text-2xl font-semibold">Something went wrong</h1>
                    <p className="text-sm text-muted-foreground">
                        An unexpected error occurred. Please try refreshing the page.
                    </p>
                    <button
                        className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-3 text-sm font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70"
                        onClick={() => window.location.reload()}
                        type="button"
                    >
                        Refresh Page
                    </button>
                </main>
            );
        }

        return this.props.children;
    }
}
