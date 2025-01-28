"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { TripPlanner } from "./components/trip-planner";

export default function CreateTripPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <TripPlanner />
      </main>
      <Footer navigation_menu={[]} />
    </div>
  );
}
