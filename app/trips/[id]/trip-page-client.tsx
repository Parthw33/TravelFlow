"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Utensils,
  Hotel,
  Car,
} from "lucide-react";
import { motion } from "framer-motion";
import { onEntryChange } from "@/contentstack-sdk";
import { getFooterRes, getTripDetailPageRes, getTripPageRes } from "@/helper";
import { useEffect, useState } from "react";
import { FooterProps } from "@/typescript/layout";
import { usePathname } from "next/navigation";
import { TripSkeleton } from "@/components/ui/single-trip-skeleton";
import { BookingForm } from "../components/booking-form";

interface TripPageClientProps {
  tripId: string;
}

export function TripPageClient({ tripId }: TripPageClientProps) {
  const [singleTrip, setSingletrip] = useState<any | []>([]);
  const [footerData, setFooterData] = useState<FooterProps | undefined>(
    undefined
  );
  const [tripData, setTripData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const entryUrl = usePathname();
  const onlyEntryUrl = usePathname().replace("/trips", "");

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [footer, trips, soloTrip] = await Promise.all([
          getFooterRes(),
          getTripPageRes(entryUrl),
          getTripDetailPageRes(onlyEntryUrl),
        ]);

        setFooterData(footer);
        setTripData(trips);
        setSingletrip(soloTrip);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInitialData();
    onEntryChange(fetchInitialData);
  }, []);

  const extractModularBlockData = (singleTrip: any | null) => {
    if (!singleTrip?.modular_blocks)
      return {
        highlights: [],
        itinerary: [],
        tripDetails: null,
        perks: [],
      };

    return {
      highlights:
        singleTrip.modular_blocks.find(
          (block: { highlights: any }) => block.highlights
        )?.highlights?.highlights || [],
      itinerary:
        singleTrip.modular_blocks.find(
          (block: { itinerary: any }) => block.itinerary
        )?.itinerary?.itineraryblocks || [],
      tripDetails:
        singleTrip.modular_blocks.find(
          (block: { trip_details: any }) => block.trip_details
        )?.trip_details || null,
      perks:
        singleTrip.modular_blocks.find((block: { perks: any }) => block.perks)
          ?.perks?.includes || [],
    };
  };

  const { highlights, itinerary, tripDetails, perks } =
    extractModularBlockData(singleTrip);

  console.log("qwwqw ", highlights);

  if (loading) return <TripSkeleton />;
  if (!singleTrip) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center w-full py-80">
          <div className="space-y-4 text-center">
            <div className="text-6xl font-bold text-gray-300">
              No Trips Found
            </div>
          </div>
        </div>
        <Footer navigation_menu={footerData?.navigation_menu} />
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="relative h-[60vh] overflow-hidden">
          <img
            src={tripData.image?.url || ""}
            alt={tripData.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex items-center">
            <div className="container px-4 mx-auto">
              <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
                {tripData.title}
              </h1>
              <p className="mb-8 text-xl text-white/90">
                {tripData.description}
              </p>
              <div className="flex flex-wrap gap-6 text-white">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {tripData.duration}
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  {tripData.groupsize}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {tripData.location}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trip Details */}
        <section className="px-4 py-16 bg-background">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="space-y-8 lg:col-span-2">
                {/* Highlights */}
                <Card className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Trip Highlights</h2>
                  <ul className="space-y-3">
                    {highlights.map((highlight: any, index: any) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center text-muted-foreground"
                      >
                        <span className="w-2 h-2 mr-3 rounded-full bg-primary" />
                        {highlight}
                      </motion.li>
                    ))}
                  </ul>
                </Card>

                {/* Itinerary */}
                <Card className="p-6">
                  <h2 className="mb-4 text-2xl font-bold">Itinerary</h2>
                  <div className="space-y-6">
                    {itinerary.map((day: any, index: any) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="pl-4 border-l-2 border-primary"
                      >
                        <h3 className="mb-2 text-xl font-semibold">
                          {day.title}
                        </h3>
                        <ul className="space-y-2">
                          {day.events.map((activity: any, actIndex: any) => (
                            <li
                              key={actIndex}
                              className="flex items-center text-muted-foreground"
                            >
                              <Clock className="w-4 h-4 mr-2" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Booking Card */}
                <Card className="p-6">
                  <div className="mb-4 text-3xl font-bold">
                    ₹{tripData?.price}
                  </div>
                  <BookingForm
                    tripTitle={tripData?.title}
                    itinerary={itinerary}
                    maxGroupSize={tripData?.groupSize}
                    basePrice={tripData?.price}
                  />
                  <div className="mt-4 space-y-4">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="w-5 h-5 mr-3" />
                      <div>
                        <div className="font-semibold">Duration</div>
                        <div>{tripData?.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="w-5 h-5 mr-3" />
                      <div>
                        <div className="font-semibold">Group Size</div>
                        <div>{tripData?.groupSize}</div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Inclusions Card */}
                <Card className="p-6">
                  <h3 className="mb-4 text-xl font-semibold">
                    What&apos;s Included
                  </h3>
                  <div className="space-y-3">
                    {perks.map((perk: any, index: any) => (
                      <div
                        key={index}
                        className="flex items-center text-muted-foreground"
                      >
                        {index === 0 && <Hotel className="w-5 h-5 mr-3" />}
                        {index === 1 && <Utensils className="w-5 h-5 mr-3" />}
                        {index === 2 && <Car className="w-5 h-5 mr-3" />}
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer navigation_menu={footerData?.navigation_menu} />
    </div>
  );
}
