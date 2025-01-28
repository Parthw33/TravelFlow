import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PartyPopper } from "lucide-react";
import Confetti from "./confetti";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  message: string;
}

export function SuccessDialog({
  open,
  onOpenChange,
  message,
}: SuccessDialogProps) {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        {open && <Confetti />} {/* Display confetti when dialog is open */}
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <PartyPopper className="h-8 w-8 text-yellow-500" />
            Thank You!
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-xl font-semibold mb-2">{message}</p>{" "}
          {/* Display message */}
          <p className="text-muted-foreground">
            Your have became now PRO Traveller
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
