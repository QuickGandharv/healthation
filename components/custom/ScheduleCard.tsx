// components/ScheduleCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ScheduleCardProps {
    title: string;
    date: string;
    count: number;
    countLabel: string;
    children: ReactNode;
    viewAllText: string;
    viewAllCount?: number;
    onViewAll?: () => void;
    emptyIcon?: ReactNode;
    emptyMessage?: string;
    emptySubMessage?: string;
}

export function ScheduleCard({
    title,
    date,
    count,
    countLabel,
    children,
    viewAllText,
    viewAllCount,
    onViewAll,
    emptyIcon,
    emptyMessage = "No data available",
    emptySubMessage = "Select a date to view details"
}: ScheduleCardProps) {
    return (
        <Card className="border-border h-full py-0 flex flex-col">
            {/* Header */}
            <CardHeader className="bg-primary text-white rounded-t-lg py-2">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-sm">{title}</CardTitle>
                        <p className="text-xs opacity-80">{date}</p>
                    </div>
                    <Badge variant="secondary">
                        {count} {countLabel}
                    </Badge>
                </div>
            </CardHeader>

            {/* Scrollable Content Area */}
            <CardContent className="pt-4 flex-1 overflow-y-auto max-h-100">
                <div className="space-y-3">
                    {count > 0 ? children : (
                        <div className="text-center py-6 text-muted-foreground">
                            {emptyIcon}
                            <p className="text-sm">{emptyMessage}</p>
                            <p className="text-xs">{emptySubMessage}</p>
                        </div>
                    )}
                </div>
            </CardContent>

            {/* View All Button */}
            {count > 0 && (
                <div className="p-4 pt-0 border-border mt-auto">
                    <Button variant="outline" className="w-full text-xs" size="sm" onClick={onViewAll}>
                        {viewAllText} ({viewAllCount !== undefined ? viewAllCount : count})
                    </Button>
                </div>
            )}
        </Card>
    );
}