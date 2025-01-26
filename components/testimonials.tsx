"use client";


import { TestimonialsProps } from "@/typescript/component";
import { AnimatedTestimonials } from "./ui/animated-testimonials";

export function Testimonials({ reviewer }: TestimonialsProps) {
 const testimonials = reviewer.map(review => ({
   quote: review.review || "No review provided",
   name: review.title || "Anonymous",
   designation: review.designation || "User",
   src: review.profile?.url || ""
 }));

 return (
   <section className="px-4 py-24 bg-background">
     <div className="container mx-auto">
       <h2 className="mb-16 text-3xl font-bold text-center md:text-4xl">
         Loved by Travelers Worldwide
       </h2>
       <AnimatedTestimonials 
         testimonials={testimonials.length > 0 ? testimonials : [
           { 
             quote: "No testimonials available", 
             name: "No Name", 
             designation: "No Designation", 
             src: "" 
           }
         ]} 
       />
     </div>
   </section>
 );
}