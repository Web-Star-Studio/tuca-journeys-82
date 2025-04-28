
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
  ...props 
}: XAxisProps) => {
  return (
    <RechartsXAxis
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      {...props}
    />
  );
};

export const YAxis = ({ 
  stroke = "#888888", 
  fontSize = 12,
  tickLine = false,
  ...props 
}: YAxisProps) => {
  return (
    <RechartsYAxis
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      {...props}
    />
  );
};
