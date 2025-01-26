import { Skeleton } from "@/components/ui/skeleton";

export function FeaturesSkeleton() {
  return (
    <section className="py-24 px-4 bg-background">
      <div className="container mx-auto">
        <Skeleton className="h-12 w-3/4 mx-auto mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="p-8">
              <Skeleton className="w-16 h-16 mb-6 rounded-full" />
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}