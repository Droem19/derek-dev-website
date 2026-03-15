import { Component, type ErrorInfo, type ReactNode } from 'react';

import { Button } from '@/components/button';

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
                    <Button onClick={() => window.location.reload()} variant="outline">
                        Refresh Page
                    </Button>
                </main>
            );
        }

        return this.props.children;
    }
}
