"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Calendar, Users } from "lucide-react";
import { FeaturedTrip, TripsData } from "@/typescript/layout";
import { NumberTicker } from "./ui/number-ticker";
import { FeaturedTripsSkeleton } from "./skeletons/featured-trip-skeleton";

export function FeaturedTrips({
  featuredTrip,
  tripData,
}: {
  featuredTrip: FeaturedTrip[];
  tripData: TripsData[];
}) {
  return (
    <section className="px-4 py-24 bg-background hover:file:first-line:backdrop:">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {featuredTrip?.[0]?.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {featuredTrip?.[0]?.description}
          </p>
        </motion.div>
        {tripData.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {tripData.map((trip, index) => (
              <motion.div
                key={trip.uid}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/trips/${trip.url.split("/").pop()}`}>
                  <Card className="overflow-hidden transition-shadow duration-300 group hover:shadow-xl">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={trip.image.url}
                        alt={trip.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold">
                        {trip.title}
                      </h3>
                      <p className="mb-4 text-muted-foreground">
                        {trip.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-2" />
                          {trip.duration}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="w-4 h-4 mr-2" />
                          {trip.groupsize}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {trip.location}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span>
                          ₹
                          <NumberTicker
                            value={trip.price}
                            className="text-lg font-medium tracking-tighter text-black whitespace-pre-wrap dark:text-white"
                          />
                        </span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <FeaturedTripsSkeleton />
        )}
      </div>
    </section>
  );
}
