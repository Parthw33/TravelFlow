"use client";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  MapPin, 
  Calendar, 
  Users, 
  Search, 
  Filter, 
  Mountain, 
  Sun, 
  Compass 
} from "lucide-react";
import { NumberTicker } from "@/components/ui/number-ticker";
import { FeaturedTrip, TripsData } from "@/typescript/layout";
import { RainbowButton } from "@/components/ui/rainbow-button";

// Define filter categories
const REGIONS = [
  { label: "North", icon: <Mountain /> },
  { label: "South", icon: <Sun /> },
  { label: "Middle East", icon: <Compass /> }
];

const BUDGET_RANGES = [
  { label: "Budget Friendly", min: 10000, max: 35000 },
  { label: "Mid-Range", min: 35000, max: 50000 },
  { label: "Luxury", min: 50000, max: 100000 }
];

// Skeleton Loader for a Single Trip Card
const TripCardSkeleton = () => (
  <Card className="overflow-hidden transition-shadow duration-300 group hover:shadow-xl animate-pulse">
    <div className="aspect-[4/3] overflow-hidden bg-gray-200"></div>
    <div className="p-6">
      <div className="w-3/4 h-6 mb-2 bg-gray-300 rounded"></div>
      <div className="w-5/6 h-4 mb-4 bg-gray-200 rounded"></div>
      <div className="space-y-2">
        <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
        <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
        <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
        <div className="w-1/3 h-6 bg-gray-200 rounded"></div>
      </div>
    </div>
  </Card>
);

// Skeleton Loader for Search and Filter
const FilterSkeleton = () => (
  <div className="flex flex-col items-center justify-between mb-12 space-y-4 md:flex-row md:space-y-0 animate-pulse">
    <div className="relative w-full md:w-2/3">
      <div className="absolute w-6 h-6 text-gray-400 -translate-y-1/2 bg-gray-200 rounded-full left-3 top-1/2"></div>
      <Input
        placeholder="Search trips by destination or title"
        className="w-full pl-10 bg-gray-200"
        disabled
      />
    </div>
    <div className="flex space-x-4">
      {/* Region Filters Skeleton */}
      <div className="flex space-x-2">
        {REGIONS.map((region) => (
          <Button
            key={region.label}
            variant="outline"
            size="icon"
            disabled
            className="bg-gray-200"
          >
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </Button>
        ))}
      </div>

      {/* Budget Filters Skeleton */}
      <div className="flex space-x-2">
        {BUDGET_RANGES.map((budget) => (
          <Button
            key={budget.label}
            variant="outline"
            disabled
            className="bg-gray-200"
          >
            <div className="w-24 h-6 bg-gray-300 rounded"></div>
          </Button>
        ))}
      </div>
    </div>
  </div>
);

export function Alltrips({
  featuredTrip,
  tripData
}: {
  featuredTrip: FeaturedTrip[],
  tripData: TripsData[]
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<{ min: number, max: number } | null>(null);

  // Filtering logic
  const filteredTrips = useMemo(() => {
    return tripData.filter(trip => {
      const matchesSearch = trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             trip.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = !selectedRegion ||
          trip.tags.some(tag => 
                        tag.toLowerCase() === selectedRegion.toLowerCase()
        );
      
      const matchesBudget = !selectedBudget || 
        (trip.price >= selectedBudget.min && trip.price <= selectedBudget.max);

      return matchesSearch && matchesRegion && matchesBudget;
    });
  }, [tripData, searchTerm, selectedRegion, selectedBudget]);

  return (
    <section className="px-4 py-24 bg-background">
      <div className="container mx-auto">
        {/* Search and Filter Section */}
        {filteredTrips.length === 0 ? (
          <div className="flex flex-col items-center justify-between mb-12 space-y-4 md:flex-row md:space-y-0">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
            <Input 
              placeholder="Search trips by destination or title"
              className="w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            {/* Region Filters */}
            <div className="flex space-x-2">
              {REGIONS.map((region) => (
                <Button
                  key={region.label}
                  variant={selectedRegion === region.label ? "default" : "outline"}
                  size="icon"
                  onClick={() => setSelectedRegion(
                    selectedRegion === region.label ? null : region.label
                  )}
                >
                  {region.icon}
                </Button>
              ))}
            </div>
      
            {/* Budget Filters */}
            <div className="flex space-x-2">
              {BUDGET_RANGES.map((budget) => (
                <Button
                  key={budget.label}
                  variant={
                    selectedBudget?.min === budget.min ? "default" : "outline"
                  }
                  onClick={() => setSelectedBudget(
                    selectedBudget?.min === budget.min ? null : budget
                  )}
                >
                  {budget.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        ) : (
          <div className="flex flex-col items-center justify-between mb-12 space-y-4 md:flex-row md:space-y-0">
            <div className="relative w-full md:w-2/3">
              <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" />
              <Input 
                placeholder="Search trips by destination or title"
                className="w-full pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex space-x-4">
              {/* Region Filters */}
              <div className="flex space-x-2">
                {REGIONS.map((region) => (
                  <Button
                    key={region.label}
                    variant={selectedRegion === region.label ? "default" : "outline"}
                    size="icon"
                    onClick={() => setSelectedRegion(
                      selectedRegion === region.label ? null : region.label
                    )}
                  >
                    {region.icon}
                  </Button>
                ))}
              </div>

              {/* Budget Filters */}
              <div className="flex space-x-2">
                {BUDGET_RANGES.map((budget) => (
                  <Button
                    key={budget.label}
                    variant={
                      selectedBudget?.min === budget.min ? "default" : "outline"
                    }
                    onClick={() => setSelectedBudget(
                      selectedBudget?.min === budget.min ? null : budget
                    )}
                  >
                    {budget.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trips Grid */}
        {filteredTrips.length === 0 ? (
          <div className="flex items-center justify-center w-full py-24">
            <div className="space-y-4 text-center">
              <div className="text-6xl font-bold text-gray-300">
                No Trips Found
              </div>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
      
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {filteredTrips.map((trip, index) => (
              <motion.div
                key={trip.uid}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/trips/${trip.url.split('/').pop()}`}>
                  <Card className="overflow-hidden transition-shadow duration-300 group hover:shadow-xl">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={trip.image.url}
                        alt={trip.title}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-semibold">{trip.title}</h3>
                      <p className="mb-4 text-muted-foreground">{trip.description}</p>
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
                          ₹<NumberTicker
                            value={trip.price}
                            className="text-lg font-medium tracking-tighter text-black whitespace-pre-wrap dark:text-white"
                          />
                        </span>
                        <RainbowButton>
                          View Details
                        </RainbowButton>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
