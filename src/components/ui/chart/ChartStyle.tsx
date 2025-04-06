
import * as React from "react";
import { ChartConfig } from "./types";
import { THEMES } from "./types";

export const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color
  );

  if (!colorConfig.length) {
    return null;
  }
  
  // Generate the CSS classes dynamically
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    
    const cssText = Object.entries(THEMES)
      .map(
        ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;
    return color ? `  --color-${key}: ${color};` : null;
  })
  .filter(Boolean)
  .join("\n")}
}
`
      )
      .join("\n");
    
    styleElement.textContent = cssText;
    document.head.appendChild(styleElement);
    
    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, [id, colorConfig]);

  // Return null since we're applying styles via useEffect
  return null;
};
