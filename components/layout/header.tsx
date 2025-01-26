"use client";

import { Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Globe2 className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TravelFlow</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm hover:text-primary transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm hover:text-primary transition-colors">How it Works</a>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Log in</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </nav>
  );
}