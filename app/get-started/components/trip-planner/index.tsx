"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TripBasicInfo } from "./trip-basic-info";
import { ItineraryBuilder } from "./itinerary-builder";
import { TripSummary } from "./trip-summary";

type Step = "basic-info" | "itinerary" | "summary";

export function TripPlanner() {
  const [step, setStep] = useState<Step>("basic-info");
  const [tripData, setTripData] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: 1,
    itinerary: [] as any[],
  });

  const handleBasicInfoSubmit = (data: any) => {
    setTripData({ ...tripData, ...data });
    setStep("itinerary");
  };

  const handleItinerarySubmit = (itinerary: any[]) => {
    setTripData({ ...tripData, itinerary });
    setStep("summary");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {["basic-info", "itinerary", "summary"].map((s, index) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === s
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className="w-20 h-0.5 mx-2 bg-muted">
                    <div
                      className={`h-full bg-primary transition-all ${
                        ["basic-info", "itinerary", "summary"].indexOf(step) >
                        index
                          ? "w-full"
                          : "w-0"
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Basic Info</span>
            <span>Itinerary</span>
            <span>Summary</span>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card p-6 rounded-lg shadow-lg border">
          {step === "basic-info" && (
            <TripBasicInfo
              initialData={tripData}
              onSubmit={handleBasicInfoSubmit}
            />
          )}
          {step === "itinerary" && (
            <ItineraryBuilder
              startDate={tripData.startDate}
              endDate={tripData.endDate}
              onSubmit={handleItinerarySubmit}
              onBack={() => setStep("basic-info")}
            />
          )}
          {step === "summary" && (
            <TripSummary
              tripData={tripData}
              onBack={() => setStep("itinerary")}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
