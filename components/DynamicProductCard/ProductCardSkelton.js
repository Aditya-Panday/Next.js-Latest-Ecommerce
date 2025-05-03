import React from 'react';

const ProductCardSkeleton = () => {
    return (
        <div className="relative m-auto flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md animate-pulse">
            <div className="relative mx-3 mt-3 flex h-72 overflow-hidden rounded-xl bg-gray-200" />

            <div className="mt-4 px-5 pb-5">
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" /> {/* Title */}
                <div className="mt-2 mb-5">
                    <div className="h-6 w-1/2 bg-gray-200 rounded mb-1" /> {/* Price */}
                    <div className="h-4 w-1/3 bg-gray-200 rounded" /> {/* Discount */}
                </div>

                <div className="flex items-center gap-2 justify-between">
                    <div className="h-6 w-6 bg-gray-200 rounded-full" /> {/* Heart Icon Placeholder */}
                    <div className="h-10 w-24 bg-gray-300 rounded-md" /> {/* Add to cart button */}
                </div>
            </div>
        </div>
    );
};

export default ProductCardSkeleton;
