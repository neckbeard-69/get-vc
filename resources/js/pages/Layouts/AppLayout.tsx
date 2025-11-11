import Navbar from '@/components/Navbar';
import { type PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
