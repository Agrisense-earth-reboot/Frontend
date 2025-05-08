'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getCurrentUser } from '../../services/auth';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const authenticated = isAuthenticated();
            if (!authenticated) {
                router.push('/login');
                return;
            }

            if (allowedRoles) {
                const user = getCurrentUser();
                if (!user || !allowedRoles.includes(user.role)) {
                    router.push('/unauthorized');
                }
            }
        };

        checkAuth();
    }, [router, allowedRoles]);

    return <>{children}</>;
} 