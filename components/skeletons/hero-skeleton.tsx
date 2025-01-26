import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="pt-32 pb-24 px-4 relative overflow-hidden bg-background">
      <div className="container mx-auto relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-10 w-full max-w-2xl mx-auto mb-8" />
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
        
        <div className="relative mx-auto max-w-5xl">
          <Skeleton className="w-full h-[400px] rounded-xl" />
        </div>
      </div>
    </section>
  );
}