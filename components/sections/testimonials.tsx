"use client";

import { Card } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Travel Blogger",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=256",
    quote: "TravelFlow has completely transformed how I plan my trips. It's intuitive, powerful, and saves me hours of planning time."
  },
  {
    name: "Michael Chen",
    title: "Business Traveler",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256",
    quote: "The best travel planning tool I've ever used. Perfect for managing complex itineraries and sharing with colleagues."
  },
  {
    name: "Emma Davis",
    title: "Family Traveler",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=256",
    quote: "Planning family trips used to be stressful, but TravelFlow makes it easy and even fun! Highly recommended."
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Loved by Travelers Worldwide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{testimonial.quote}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}