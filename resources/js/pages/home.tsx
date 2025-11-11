import AppLayout from '@/pages/Layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <AppLayout>
            <Head title="Home" />
            <div className="text-xl font-semibold">home</div>
        </AppLayout>
    );
}
