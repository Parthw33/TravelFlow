"use client";

import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component for loading states

export function TestimonialsSkeleton() {
  return (
    <section className="px-4 py-24 bg-background">
      <div className="container mx-auto">
        {/* Title Skeleton */}
        <div className="mb-16 text-center">
          <Skeleton className="w-1/3 h-8 mx-auto mb-4" /> {/* Title Skeleton */}
        </div>

        {/* AnimatedTestimonials Skeleton */}
        <div className="space-y-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center justify-center max-w-md mx-auto space-x-6">
              {/* Profile Image Skeleton */}
              <div className="w-16 h-16 overflow-hidden rounded-full">
                <Skeleton className="w-full h-full rounded-full" />
              </div>

              {/* Text Skeletons for Review Content */}
              <div className="flex-1 space-y-2">
                <Skeleton className="w-2/3 h-6" /> {/* Name Skeleton */}
                <Skeleton className="w-1/2 h-4" /> {/* Designation Skeleton */}
                <Skeleton className="w-full h-4" /> {/* Quote Skeleton */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
