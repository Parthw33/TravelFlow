"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="pt-32 pb-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20" />
      <div className="container mx-auto relative">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Plan Your Perfect Trip with Ease
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Create, organize, and share detailed travel itineraries with our intelligent travel planning platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto">
              Start Planning Free
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="rounded-xl overflow-hidden shadow-2xl border">
            <img
              src="https://images.unsplash.com/photo-1672243777342-0698e84a41fc?auto=format&fit=crop&q=80"
              alt="Dashboard Preview"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}