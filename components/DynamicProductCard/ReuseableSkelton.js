import React from 'react';

const ReuseableSkelton = ({ width = "80px", height = "16px", className = "" }) => {
    return (
        <div
            className={`bg-gray-200 rounded animate-pulse ${className}`}
            style={{ width, height }}
        ></div>
    );
};

export default ReuseableSkelton;
