import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import LoadingPage from '@/Components/LoadingPage';

export default function MainLayout({ children }) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        router.on('start', () => setLoading(true));
        router.on('finish', () => setLoading(false));
    }, []);

    return (
        <div>
            {loading && <LoadingPage />}
            {children}
        </div>
    );
}
