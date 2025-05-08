interface LoadingProps {
    size?: 'sm' | 'md' | 'lg';
    overlay?: boolean;
    text?: string;
}

const Loading = ({ size = 'md', overlay = false, text = 'Loading...' }: LoadingProps) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    const textSizes = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg'
    };

    const LoadingContent = () => (
        <div className="flex flex-col items-center justify-center">
            <svg
                className={`animate-spin ${sizes[size]} text-green-600`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                />
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
            </svg>
            {text && (
                <p className={`mt-2 font-medium text-gray-700 ${textSizes[size]}`}>
                    {text}
                </p>
            )}
        </div>
    );

    if (overlay) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-xl">
                    <LoadingContent />
                </div>
            </div>
        );
    }

    return <LoadingContent />;
};

export default Loading; 