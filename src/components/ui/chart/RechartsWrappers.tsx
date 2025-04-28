
import React from "react";
import {
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  XAxisProps,
  YAxisProps
} from "recharts";

// Create wrapper components for XAxis and YAxis that use
// default parameters instead of defaultProps
export const XAxis = ({ 
  stroke = "#888888", 
  fontSize = 12,
  tickLine = false,
  xAxisId = "default",  // Add default xAxisId
  ...props 
}: XAxisProps) => {
  return (
    <RechartsXAxis
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      xAxisId={xAxisId}
      {...props}
    />
  );
};

export const YAxis = ({ 
  stroke = "#888888", 
  fontSize = 12,
  tickLine = false,
  yAxisId = "left",  // Add default yAxisId
  ...props 
}: YAxisProps) => {
  return (
    <RechartsYAxis
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      yAxisId={yAxisId}
      {...props}
    />
  );
};
