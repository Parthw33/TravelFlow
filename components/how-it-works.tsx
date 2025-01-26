"use client";
import { WorkSection } from "@/typescript/layout";

export function HowItWorks({ workSection }: { workSection: WorkSection[] }) {
  return (
    <section id="how-it-works" className="px-4 py-24 bg-muted">
      <div className="container mx-auto">
        <h2 className="mb-16 text-3xl font-bold text-center md:text-4xl">
          {workSection?.[0]?.title}
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {workSection?.[0]?.steps?.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10">
                <span className="text-2xl font-bold text-primary">{index + 1}</span>
              </div>
              <h3 className="mb-4 text-xl font-semibold">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}