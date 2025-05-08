import { ReactNode } from 'react';

interface CardProps {
    title?: string;
    subtitle?: string;
    children: ReactNode;
    variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
    className?: string;
    headerAction?: ReactNode;
    footer?: ReactNode;
}

const Card = ({
    title,
    subtitle,
    children,
    variant = 'default',
    className = '',
    headerAction,
    footer
}: CardProps) => {
    const variants = {
        default: 'bg-white',
        info: 'bg-blue-50 border-blue-200',
        success: 'bg-green-50 border-green-200',
        warning: 'bg-amber-50 border-amber-200',
        error: 'bg-red-50 border-red-200'
    };

    const headerColors = {
        default: 'text-gray-800',
        info: 'text-blue-800',
        success: 'text-green-800',
        warning: 'text-amber-800',
        error: 'text-red-800'
    };

    return (
        <div className={`rounded-lg shadow-md overflow-hidden border ${variants[variant]} ${className}`}>
            {(title || subtitle || headerAction) && (
                <div className="px-6 py-4 border-b">
                    <div className="flex justify-between items-start">
                        <div>
                            {title && (
                                <h3 className={`text-lg font-semibold ${headerColors[variant]}`}>
                                    {title}
                                </h3>
                            )}
                            {subtitle && (
                                <p className="mt-1 text-sm text-gray-600">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                        {headerAction && (
                            <div className="ml-4">
                                {headerAction}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="px-6 py-4">
                {children}
            </div>

            {footer && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                    {footer}
                </div>
            )}
        </div>
    );
};

export default Card; 