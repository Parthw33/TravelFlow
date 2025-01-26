"use client";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { onEntryChange } from "@/contentstack-sdk";
import { getAllEntriesforTrips, getFooterRes } from "@/helper";
import { FooterProps, HomePage, TripsData } from "@/typescript/layout";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Alltrips } from "./components/alltrips";

// Skeleton for Footer Data Loading
export const FooterSkeleton = () => (
  <div className="w-full h-20 mt-4 bg-gray-200 rounded-lg animate-pulse"></div>
);

// Skeleton for Header Loading
const HeaderSkeleton = () => (
  <div className="w-full h-16 mt-4 bg-gray-200 rounded-lg animate-pulse"></div>
);

export default function Page() {
  const [footerData, setFooterData] = useState<FooterProps | undefined>(undefined);
  const [tripData, setTripData] = useState<TripsData[]>([]);
  const [loading, setLoading] = useState(true);
  const entryUrl = usePathname();
  const [getEntry, setEntry] = useState<HomePage>();

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [footer, trips] = await Promise.all([
          getFooterRes(),
          getAllEntriesforTrips(),
        ]);
        //    const entryRes = await getPageRes(entryUrl);
        //     if (!entryRes) throw new Error('Status code 404');
        //     setEntry(entryRes);

        setFooterData(footer);
        setTripData(trips);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
    onEntryChange(fetchInitialData);
  }, []);

  // Use skeletons if loading
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Skeleton Header */}
        <HeaderSkeleton />
        <main className="flex-grow">
          {/* Skeleton for trips section */}
          <div className="px-4 py-24 bg-background">
            <div className="container mx-auto">
              <div className="flex flex-col items-center justify-between mb-12 space-y-4 md:flex-row md:space-y-0">
                <div className="relative w-full h-12 bg-gray-200 rounded-lg md:w-2/3 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="w-full bg-gray-200 rounded-lg animate-pulse h-72"></div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Suspense fallback={<FooterSkeleton />}>
          {/* Skeleton Footer */}
          <FooterSkeleton />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Alltrips
          featuredTrip={getEntry?.featuredtrip ? [getEntry.featuredtrips] : []}
          tripData={tripData}
        />
      </main>
      <Suspense fallback={<FooterSkeleton />}>
        <Footer navigation_menu={footerData?.navigation_menu} />
      </Suspense>
    </div>
  );
}
