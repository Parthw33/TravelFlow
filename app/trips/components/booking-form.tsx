"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  managerName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  mobileNumber: z.string().min(10, {
    message: "Please enter a valid mobile number.",
  }),
  groupSize: z.string().min(1, {
    message: "Please select group size preference.",
  }),
  preferredItinerary: z.string().min(1, {
    message: "Please select preferred itinerary.",
  }),
});

interface BookingFormProps {
  tripTitle: string;
  itinerary: Array<{
    day: number;
    title: string;
  }>;
  maxGroupSize: string;
  basePrice: number;
}

export function BookingForm({
  tripTitle,
  itinerary,
  maxGroupSize,
  basePrice,
}: BookingFormProps) {
  const [open, setOpen] = useState(false);
  const [selectedGroupSize, setSelectedGroupSize] = useState<string>("");
  const [calculatedPrice, setCalculatedPrice] = useState(basePrice);
  console.log("efew ", itinerary);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      managerName: "",
      mobileNumber: "",
      groupSize: "",
      preferredItinerary: "",
    },
  });

  useEffect(() => {
    // Calculate price based on group size
    const calculatePrice = () => {
      switch (selectedGroupSize) {
        case "private":
          return basePrice * 1.5; // 50% premium for private groups
        case "small":
          return basePrice * 1.2; // 20% premium for small groups
        case "medium":
          return basePrice; // Standard price for medium groups
        default:
          return basePrice;
      }
    };

    setCalculatedPrice(calculatePrice());
  }, [selectedGroupSize, basePrice]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, totalPrice: calculatedPrice });
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Book Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book Your Trip to {tripTitle}</DialogTitle>
          <DialogDescription>
            Fill in the details below to book your adventure. We'll get back to
            you within 24 hours.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="managerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trip Manager Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your mobile number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="groupSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Group Size</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedGroupSize(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select group size preference" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="private">Private Group</SelectItem>
                      <SelectItem value="small">
                        Small Group (4-8 people)
                      </SelectItem>
                      <SelectItem value="medium">
                        Medium Group (8-12 people)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredItinerary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Itinerary</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select preferred itinerary" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {itinerary?.map((day) => (
                        <SelectItem key={day.day} value={day.title}>
                          Day {day.day}: {day.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="py-4 text-center">
              <p className="text-lg font-semibold">Total Price</p>
              <p className="text-2xl font-bold text-primary">
                ₹{calculatedPrice}
              </p>
              {selectedGroupSize && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedGroupSize === "private"
                    ? "Includes private group premium"
                    : selectedGroupSize === "small"
                    ? "Includes small group rate"
                    : "Standard group rate"}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Submit Booking
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
