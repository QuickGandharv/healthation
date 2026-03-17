import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ReactNode } from "react";

interface ScheduleTabsProps {
  defaultValue: string;
  children: ReactNode;
}

export const ScheduleTabs = ({ defaultValue, children }: ScheduleTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="grid w-full max-w-md grid-cols-3">
        <TabsTrigger value="day">Today</TabsTrigger>
        <TabsTrigger value="week">Week</TabsTrigger>
        <TabsTrigger value="month">Month</TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};