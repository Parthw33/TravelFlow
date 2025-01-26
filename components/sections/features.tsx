"use client";

import { Card } from "@/components/ui/card";
import { Calendar, Clock, Map, Plane, Route, Users } from "lucide-react";

const features = [
  {
    icon: Map,
    title: "Interactive Trip Planning",
    description: "Plan your trips with our intuitive drag-and-drop interface and interactive maps."
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Get instant updates about flight changes, weather conditions, and local events."
  },
  {
    icon: Users,
    title: "Collaborative Planning",
    description: "Share and edit itineraries with travel companions in real-time."
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Optimize your daily schedule with our AI-powered recommendations."
  },
  {
    icon: Route,
    title: "Route Optimization",
    description: "Find the best routes between destinations to maximize your time."
  },
  {
    icon: Plane,
    title: "Travel Logistics",
    description: "Manage flights, accommodations, and activities all in one place."
  }
];

export function Features() {
  return (
    <section id="features" className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Everything You Need for Perfect Travel Planning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}