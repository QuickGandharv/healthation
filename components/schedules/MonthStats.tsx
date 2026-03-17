interface MonthStatsProps {
  monthTotal: number;
  appointmentDays: number[];
  peakDayValue: number;
  isLoading?: boolean;
}

export const MonthStats = ({ 
  monthTotal, 
  appointmentDays, 
  peakDayValue,
  isLoading = false 
}: MonthStatsProps) => {
  const avgPerDay = appointmentDays.length > 0 
    ? (monthTotal / appointmentDays.length).toFixed(1) 
    : "0";

  if (isLoading) {
    return (
      <div className="mt-6 border-t border-border pt-4">
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="text-center p-2 bg-accent/20 rounded-lg animate-pulse">
              <div className="h-8 w-16 bg-gray-200 rounded mx-auto mb-1"></div>
              <div className="h-3 w-12 bg-gray-200 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 border-t border-border pt-4">
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="text-center p-2 bg-accent/20 rounded-lg">
          <p className="text-2xl font-bold text-primary">{monthTotal}</p>
          <p className="text-xs text-muted-foreground">Total OPD</p>
        </div>
        <div className="text-center p-2 bg-accent/20 rounded-lg">
          <p className="text-2xl font-bold text-primary">{appointmentDays.length}</p>
          <p className="text-xs text-muted-foreground">Active Days</p>
        </div>
        <div className="text-center p-2 bg-accent/20 rounded-lg">
          <p className="text-2xl font-bold text-primary">{avgPerDay}</p>
          <p className="text-xs text-muted-foreground">Avg/Day</p>
        </div>
        <div className="text-center p-2 bg-accent/20 rounded-lg">
          <p className="text-2xl font-bold text-primary">{peakDayValue}</p>
          <p className="text-xs text-muted-foreground">Peak Day</p>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
        <div className="h-2 w-full rounded-full bg-accent/30 overflow-hidden">
          <div
            className="h-2 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${Math.min((monthTotal / 50) * 100, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};