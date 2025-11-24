import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
            <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        </div>
    );
};

export default LoadingSpinner;