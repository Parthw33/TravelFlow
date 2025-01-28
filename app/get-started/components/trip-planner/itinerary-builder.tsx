"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  MapPin,
  Plus,
  Trash2,
  GripVertical,
  Car,
  Plane,
  Train,
  Bus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format, addDays, differenceInDays } from "date-fns";

interface ItineraryBuilderProps {
  startDate: string;
  endDate: string;
  onSubmit: (itinerary: any[]) => void;
  onBack: () => void;
}

interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  notes: string;
  transport: string;
}

interface DayPlan {
  date: Date;
  activities: Activity[];
}

export function ItineraryBuilder({
  startDate,
  endDate,
  onSubmit,
  onBack,
}: ItineraryBuilderProps) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const numberOfDays = differenceInDays(end, start) + 1;

  const [itinerary, setItinerary] = useState<DayPlan[]>(
    Array.from({ length: numberOfDays }, (_, i) => ({
      date: addDays(start, i),
      activities: [],
    }))
  );

  const addActivity = (dayIndex: number) => {
    const newActivity = {
      id: Math.random().toString(36).substr(2, 9),
      time: "",
      title: "",
      location: "",
      notes: "",
      transport: "",
    };

    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities.push(newActivity);
    setItinerary(newItinerary);
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities.splice(activityIndex, 1);
    setItinerary(newItinerary);
  };

  const updateActivity = (
    dayIndex: number,
    activityIndex: number,
    field: keyof Activity,
    value: string
  ) => {
    const newItinerary = [...itinerary];
    newItinerary[dayIndex].activities[activityIndex][field] = value;
    setItinerary(newItinerary);
  };

  const handleSubmit = () => {
    onSubmit(itinerary);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Plan Your Itinerary</h2>
      <div className="space-y-8">
        {itinerary.map((day, dayIndex) => (
          <Card key={dayIndex} className="p-6">
            <h3 className="text-xl font-semibold mb-4">
              Day {dayIndex + 1} - {format(day.date, "EEEE, MMMM d, yyyy")}
            </h3>
            <div className="space-y-4">
              {day.activities.map((activity, activityIndex) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-muted rounded-lg relative group"
                >
                  <GripVertical className="w-5 h-5 text-muted-foreground mt-1" />
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <Input
                          type="time"
                          value={activity.time}
                          onChange={(e) =>
                            updateActivity(
                              dayIndex,
                              activityIndex,
                              "time",
                              e.target.value
                            )
                          }
                          className="w-32"
                        />
                      </div>
                      <Select
                        value={activity.transport}
                        onValueChange={(value) =>
                          updateActivity(
                            dayIndex,
                            activityIndex,
                            "transport",
                            value
                          )
                        }
                      >
                        <SelectTrigger className="w-full md:w-40">
                          <SelectValue placeholder="Transport" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">
                            <div className="flex items-center gap-2">
                              <Car className="w-4 h-4" /> Car
                            </div>
                          </SelectItem>
                          <SelectItem value="plane">
                            <div className="flex items-center gap-2">
                              <Plane className="w-4 h-4" /> Plane
                            </div>
                          </SelectItem>
                          <SelectItem value="train">
                            <div className="flex items-center gap-2">
                              <Train className="w-4 h-4" /> Train
                            </div>
                          </SelectItem>
                          <SelectItem value="bus">
                            <div className="flex items-center gap-2">
                              <Bus className="w-4 h-4" /> Bus
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      placeholder="Activity Title"
                      value={activity.title}
                      onChange={(e) =>
                        updateActivity(
                          dayIndex,
                          activityIndex,
                          "title",
                          e.target.value
                        )
                      }
                    />
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Location"
                        value={activity.location}
                        onChange={(e) =>
                          updateActivity(
                            dayIndex,
                            activityIndex,
                            "location",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <Textarea
                      placeholder="Notes"
                      value={activity.notes}
                      onChange={(e) =>
                        updateActivity(
                          dayIndex,
                          activityIndex,
                          "notes",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeActivity(dayIndex, activityIndex)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => addActivity(dayIndex)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleSubmit}>Continue to Summary</Button>
      </div>
    </div>
  );
}
