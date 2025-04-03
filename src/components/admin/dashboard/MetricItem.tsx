
import React from "react";

interface MetricItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

const MetricItem = ({ icon, label, value, change, positive }: MetricItemProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <div className="rounded-full p-2 bg-tuca-light-blue/30">
        {icon}
      </div>
      <div className="ml-3">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
    <span className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
      {change}
    </span>
  </div>
);

export default MetricItem;
