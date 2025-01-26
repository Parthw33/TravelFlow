"use client";

export const FooterSkeleton = () => {
  return (
    <div className="w-full h-48 mt-8 bg-gray-200 animate-pulse">
      <div className="container py-12 mx-auto">
        {/* Footer Logo (Placeholder) */}
        <div className="w-32 h-8 mb-6 bg-gray-300 rounded-lg"></div>

        {/* Navigation Links Placeholder */}
        <div className="flex mb-6 space-x-8">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-24 h-4 bg-gray-300 rounded"></div>
          ))}
        </div>

        {/* Footer Description Placeholder */}
        <div className="w-1/2 h-4 mb-6 bg-gray-300 rounded"></div>

        {/* Social Links Placeholder */}
        <div className="flex space-x-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
