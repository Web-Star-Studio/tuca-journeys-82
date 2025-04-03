
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ReportFiltersProps {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  setDateRange: React.Dispatch<
    React.SetStateAction<{
      from: Date | undefined;
      to: Date | undefined;
    }>
  >;
}

const ReportFilters = ({ dateRange, setDateRange }: ReportFiltersProps) => {
  return (
    <div className="flex items-center flex-1 md:flex-none">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className="w-full justify-start text-left font-normal border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <Calendar className="mr-2 h-4 w-4 text-tuca-ocean-blue" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "dd MMM", { locale: ptBR })} -{" "}
                  {format(dateRange.to, "dd MMM, yyyy", { locale: ptBR })}
                </>
              ) : (
                format(dateRange.from, "PPP", { locale: ptBR })
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 shadow-lg border border-gray-200" align="start">
          <CalendarComponent
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={{
              from: dateRange?.from,
              to: dateRange?.to,
            }}
            onSelect={(range) => {
              if (range) {
                setDateRange({
                  from: range.from,
                  to: range.to,
                });
              }
            }}
            numberOfMonths={2}
            locale={ptBR}
            className="rounded-md border-0"
          />
          <div className="p-3 border-t border-gray-100 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Set date range to current month
                const today = new Date();
                setDateRange({
                  from: new Date(today.getFullYear(), today.getMonth(), 1),
                  to: today
                });
              }}
              className="text-xs h-8"
            >
              Mês atual
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ReportFilters;
