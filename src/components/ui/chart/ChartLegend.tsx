
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { cn } from "@/lib/utils";
import { useChart } from "./ChartContext";
import { getPayloadConfigFromPayload } from "./utils";
import { useIsMobile } from "@/hooks/use-mobile";

export const ChartLegend = RechartsPrimitive.Legend;

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart();
    const isMobile = useIsMobile();

    if (!payload?.length) {
      return null;
    }

    // Function to safely truncate any label type
    const truncateLabel = (label: React.ReactNode, maxLength: number): React.ReactNode => {
      if (typeof label === 'string') {
        return label.length > maxLength ? label.substring(0, maxLength) + '...' : label;
      }
      if (typeof label === 'number') {
        return label.toString();
      }
      return label; // Return as is for other types
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center justify-center gap-3",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const label = itemConfig?.label || item.value;

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              <span className="text-xs">
                {isMobile ? truncateLabel(label, 10) : label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegendContent.displayName = "ChartLegend";
