"use client";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Planning Your Next Adventure
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Join thousands of happy travelers who plan better with TravelFlow
        </p>
        <Button size="lg" variant="secondary">
          Get Started for Free
        </Button>
      </div>
    </section>
  );
}