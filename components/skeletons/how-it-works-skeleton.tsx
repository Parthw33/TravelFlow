import { Skeleton } from "@/components/ui/skeleton";

export function HowItWorksSkeleton() {
  return (
    <section className="py-24 px-4 bg-muted">
      <div className="container mx-auto">
        <Skeleton className="h-12 w-3/4 mx-auto mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="text-center">
              <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
              <Skeleton className="h-8 w-3/4 mx-auto mb-4" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}