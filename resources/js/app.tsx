import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),

    resolve: (name) => {
        const page = resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        );

        return page;
    },

    setup({ el, App, props }) {
        const root = createRoot(el);

        const Page = props.initialPage.component;
        const Layout = Page.layout || ((page) => page);

        root.render(<StrictMode>{Layout(<App {...props} />)}</StrictMode>);
    },

    progress: { color: '#4B5563' },
});

// This will set light / dark mode on load...
initializeTheme();
