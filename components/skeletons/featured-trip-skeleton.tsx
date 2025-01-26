"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming you have a Skeleton component for loading states

export function FeaturedTripsSkeleton() {
  return (
    <section className="px-4 py-24 bg-background">
      <div className="container mx-auto">
        {/* Title and description skeleton */}
        <div className="mb-16 text-center">
          <Skeleton className="w-1/2 h-8 mx-auto mb-4" /> {/* Title skeleton */}
          <Skeleton className="w-2/3 h-6 mx-auto" /> {/* Description skeleton */}
        </div>

        {/* Trip cards skeleton */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="group">
              <Card className="overflow-hidden transition-shadow duration-300 group hover:shadow-xl">
                {/* Image skeleton */}
                <div className="aspect-[4/3] overflow-hidden">
                  <Skeleton className="w-full h-full" />
                </div>

                {/* Content skeleton */}
                <div className="p-6">
                  <Skeleton className="w-3/4 h-6 mb-2" /> {/* Title skeleton */}
                  <Skeleton className="w-5/6 h-4 mb-4" /> {/* Description skeleton */}
                  
                  <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4" /> {/* Duration skeleton */}
                    <Skeleton className="w-3/4 h-4" /> {/* Group size skeleton */}
                    <Skeleton className="w-3/4 h-4" /> {/* Location skeleton */}
                  </div>

                  {/* Price and button skeleton */}
                  <div className="flex items-center justify-between mt-4">
                    <Skeleton className="w-24 h-6" /> {/* Price skeleton */}
                    <Skeleton className="w-32 h-10" /> {/* Button skeleton */}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
