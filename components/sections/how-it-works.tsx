"use client";

const steps = [
  {
    title: "Create Your Trip",
    description: "Start by entering your destination and travel dates. Our platform will help you organize everything."
  },
  {
    title: "Add Activities",
    description: "Browse through curated activities or add your own. Drag and drop to arrange your perfect schedule."
  },
  {
    title: "Travel with Confidence",
    description: "Access your itinerary anywhere, get real-time updates, and enjoy your journey worry-free."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How TravelFlow Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}