// components/patients/patient-filters.tsx
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { CalendarRange } from "lucide-react";

interface DateRange {
    from: Date | undefined;
    to: Date | undefined;
}

export const getDateRangeFilterComponent = (
    dateRange: DateRange,
    setDateRange: (range: DateRange) => void,
    getDateRangeText: () => string
) => () => (
    <Popover>
        <PopoverTrigger asChild>
            <Button variant="outline" className="w-50 justify-start text-left font-normal">
                <CalendarRange className="mr-2 h-4 w-4" />
                {dateRange.from || dateRange.to ? (
                    <span>{getDateRangeText()}</span>
                ) : (
                    <span className="text-muted-foreground">Patients Date Wise</span>
                )}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range as any)}
                numberOfMonths={2}
                initialFocus
            />
        </PopoverContent>
    </Popover>
);

export const getFilterComponents = () => ({
    type: (value: string) => (
        <Badge
            variant="outline"
            className={
                value === "In-Person"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
            }
        >
            {value}
        </Badge>
    ),
});

export const getFilters = () => [
    {
        key: "type",
        label: "Type",
        options: [
            { value: "In-Person", label: "In-Person" },
            { value: "Telehealth", label: "Telehealth" },
        ],
    },
];