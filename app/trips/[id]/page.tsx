import { featuredTrips } from "@/lib/trip-data";
import { TripPageClient } from "./trip-page-client";

export function generateStaticParams() {
  return featuredTrips.map((trip) => ({
    id: trip.id,
  }));
}

export default function TripPage({ params }: { params: { id: string } }) {
  const trip = featuredTrips.find(t => t.id === params.id);
  
  if (!trip) {
    return <div>Trip not found</div>;
  }

  return <TripPageClient tripId={params.id} />;
}