"use client";

import { Suspense, useEffect, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import {
  getAllEntriesfor,
  getAllEntriesforTrips,
  getFooterRes,
  getPageRes,
} from "@/helper";
import { Reviewer } from "@/typescript/component";
import { FooterProps, HomePage, TripsData } from "@/typescript/layout";
import { onEntryChange } from "@/contentstack-sdk";
import { usePathname } from "next/navigation";
import { FeaturedTrips } from "@/components/featured-trip";

// Import Skeletons
import { FeaturesSkeleton } from "@/components/skeletons/features-skeleton";
import { HeroSkeleton } from "@/components/skeletons/hero-skeleton";
import { HowItWorksSkeleton } from "@/components/skeletons/how-it-works-skeleton";
import { FooterSkeleton } from "@/components/ui/footer-skeleton";
import { FeaturedTripsSkeleton } from "@/components/skeletons/featured-trip-skeleton";
import { TestimonialsSkeleton } from "@/components/skeletons/testimonail-skeleton";
import { TripWorldMap } from "@/components/world-map";

export default function Home() {
  const [footerData, setFooterData] = useState<FooterProps | undefined>(
    undefined
  );
  const [reviewerData, setReviewerData] = useState<Reviewer[]>([]);
  const [tripData, setTripData] = useState<TripsData[]>([]);
  const [loading, setLoading] = useState(true);
  const entryUrl = usePathname();
  const [getEntry, setEntry] = useState<HomePage>();

  async function fetchData() {
    try {
      const entryRes = await getPageRes(entryUrl);
      if (!entryRes) throw new Error("Status code 404");
      setEntry(entryRes);
      const fTrip = await getAllEntriesforTrips();
      setTripData(fTrip);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const footer = await getFooterRes();
        setFooterData(footer);
        const reviewer = await getAllEntriesfor();
        setReviewerData(reviewer);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />

        {/* Loading skeletons for sections */}
        <HeroSkeleton />
        <FeaturedTripsSkeleton />
        <FeaturesSkeleton />
        <HowItWorksSkeleton />
        <TestimonialsSkeleton />

        {/* Footer Skeleton */}
        <FooterSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero herobanner={getEntry?.herobanner ? [getEntry.herobanner] : []} />
      <FeaturedTrips
        featuredTrip={getEntry?.featuredtrips ? [getEntry.featuredtrips] : []}
        tripData={tripData}
      />
      <Features
        cardSection={getEntry?.card_section ? [getEntry.card_section] : []}
      />
      <HowItWorks
        workSection={getEntry?.works_section ? [getEntry.works_section] : []}
      />
      <Testimonials reviewer={reviewerData} />
      <TripWorldMap />
      <Suspense fallback={<FooterSkeleton />}>
        <Footer navigation_menu={footerData?.navigation_menu} />
      </Suspense>
    </div>
  );
}
