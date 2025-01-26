import { Skeleton } from "@/components/ui/skeleton";

export const TripSkeleton = () => (
  <div className="min-h-screen">
    <HeaderSkeleton />

    <main>
      {/* Hero Section Skeleton */}
      <section className="relative h-[60vh] overflow-hidden">
        <Skeleton className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container px-4 mx-auto">
            <Skeleton className="w-3/4 h-8 mb-4" />
            <Skeleton className="w-1/2 h-6 mb-8" />
            <div className="flex flex-wrap gap-6 text-white">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Trip Details Section */}
      <section className="px-4 py-16 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Main Content Skeleton */}
            <div className="space-y-8 lg:col-span-2">
              {/* Highlights Skeleton */}
              <CardSkeleton />
              {/* Itinerary Skeleton */}
              <CardSkeleton />
            </div>

            {/* Sidebar Skeleton */}
            <div className="space-y-6">
              <CardSkeleton />
              <CardSkeleton />
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
);

const HeaderSkeleton = () => (
  <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
    <div className="container flex items-center justify-between h-16 px-4 mx-auto">
      <div className="flex items-center space-x-2">
        <Skeleton className="w-8 h-8" />
        <Skeleton className="w-1/2 h-6" />
      </div>

      <div className="flex items-center ml-auto space-x-6">
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-20 h-6" />
      </div>
    </div>
  </nav>
);

const CardSkeleton = () => (
  <div className="p-6 rounded-lg shadow-md bg-muted">
    <Skeleton className="w-2/3 h-8 mb-4" />
    <Skeleton className="w-full h-4 mb-3" />
    <Skeleton className="w-full h-4 mb-3" />
    <Skeleton className="w-full h-4 mb-3" />
  </div>
);
