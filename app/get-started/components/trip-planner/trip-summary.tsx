"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Car,
  Plane,
  Train,
  Bus,
} from "lucide-react";
import { SuccessDialog } from "@/components/ui/success-dialog";

const transportIcons = {
  car: Car,
  plane: Plane,
  train: Train,
  bus: Bus,
};

interface TripSummaryProps {
  tripData: any;
  onBack: () => void;
}

export function TripSummary({ tripData, onBack }: TripSummaryProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [message, setMessage] = useState(""); // State to hold the message for the dialog

  const handleSave = () => {
    // Here you would typically save the trip data to your backend
    console.log("Saving trip:", tripData);

    // Set the custom message for the success dialog
    setMessage("Your trip has been successfully saved!");

    // Show the success dialog
    setIsDialogOpen(true);
  };

  const TransportIcon = ({ type }: { type: keyof typeof transportIcons }) => {
    const Icon = transportIcons[type] || Car;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Trip Summary</h2>

      {/* Basic Info Card */}
      <Card className="p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">{tripData.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{tripData.destination}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {format(new Date(tripData.startDate), "MMM d")} -{" "}
              {format(new Date(tripData.endDate), "MMM d, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{tripData.travelers} Travelers</span>
          </div>
        </div>
      </Card>

      {/* Itinerary Summary */}
      <div className="space-y-6">
        {tripData.itinerary.map((day: any, index: number) => (
          <Card key={index} className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Day {index + 1} - {format(new Date(day.date), "EEEE, MMMM d")}
            </h3>
            <div className="space-y-4">
              {day.activities.map((activity: any, actIndex: number) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>{activity.time}</span>
                      </div>
                      {activity.transport && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <TransportIcon type={activity.transport as any} />
                          <span className="capitalize">
                            {activity.transport}
                          </span>
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium">{activity.title}</h4>
                    {activity.location && (
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{activity.location}</span>
                      </div>
                    )}
                    {activity.notes && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {activity.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSave}>Save Trip</Button>
      </div>

      {/* SuccessDialog to show after saving trip */}
      <SuccessDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        message={message} // Pass the message
      />
    </div>
  );
}
