"use client";
import { useTheme } from "next-themes";
import { MagicCard } from "./ui/magic-card";
import { MapPin, Clock, Users, Calendar, Route, Plane } from "lucide-react";
import { CardSection, HomePage } from "@/typescript/layout";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { motion } from "framer-motion";

const iconMap = {
  "Interactive Trip Planning": MapPin,
  "Real-time Updates": Clock,
  "Collaborative Planning": Users,
  "Smart Scheduling": Calendar,
  "Route Optimization": Route,
  "Travel Logistics": Plane
};

export function Features({ cardSection }: { cardSection: CardSection[] }) {
  const { theme } = useTheme();

  return (
    <section id="features" className="px-4 py-24 bg-background">
      <div className="container mx-auto">
        <h2 className="mb-16 text-3xl font-bold text-center md:text-4xl">
          {/* {cardSection?.[0]?.title} */}
          <Highlight className="text-black dark:text-white">
            {cardSection?.[0]?.title}
          </Highlight>
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cardSection?.[0]?.card_section?.map((card:any, index:any) => {
            const Icon = iconMap[card.title as keyof typeof iconMap] || Plane;
            
            return (
              <MagicCard
                key={index}
                className="relative p-8 min-h-[300px] flex flex-col hover:shadow-xl transition-shadow rounded-2xl"
                gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
              >
                <div className="flex flex-col h-full">
                  <Icon className="w-12 h-12 mb-6 text-primary" />
                  <h3 className="mb-4 text-2xl font-bold">{card.title}</h3>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {card.card_description}
                  </p>
                </div>
              </MagicCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}