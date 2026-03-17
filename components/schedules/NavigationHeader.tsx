import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavigationHeaderProps {
  title: string;
  onPrev: () => void;
  onNext: () => void;
}

export const NavigationHeader = ({ title, onPrev, onNext }: NavigationHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={onPrev}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};