import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorBoundary } from '@/components/error-boundary';
import { RootLayout } from '@/layouts/root-layout';

import './index.css';

const HomePage = lazy(() => import('@/pages/home').then((m) => ({ default: m.HomePage })));
const ExperiencePage = lazy(() => import('@/pages/experience').then((m) => ({ default: m.ExperiencePage })));
const ProjectsPage = lazy(() => import('@/pages/projects').then((m) => ({ default: m.ProjectsPage })));
const NotFoundPage = lazy(() => import('@/pages/not-found').then((m) => ({ default: m.NotFoundPage })));

const loadingFallback = (
    <main className="mx-auto flex min-h-[60svh] w-full max-w-5xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">Loading page...</p>
    </main>
);

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={loadingFallback}>
                        <HomePage />
                    </Suspense>
                ),
            },
            {
                path: '/experience',
                element: (
                    <Suspense fallback={loadingFallback}>
                        <ExperiencePage />
                    </Suspense>
                ),
            },
            {
                path: '/projects',
                element: (
                    <Suspense fallback={loadingFallback}>
                        <ProjectsPage />
                    </Suspense>
                ),
            },
            {
                path: '*',
                element: (
                    <Suspense fallback={loadingFallback}>
                        <NotFoundPage />
                    </Suspense>
                ),
            },
        ],
    },
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
    <StrictMode>
        <ErrorBoundary>
            <RouterProvider router={router} />
        </ErrorBoundary>
    </StrictMode>
);
