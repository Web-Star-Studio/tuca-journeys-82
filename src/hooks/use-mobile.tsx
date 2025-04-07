
import * as React from "react"

// These breakpoints match Tailwind's default breakpoints
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
}

export type Breakpoint = keyof typeof BREAKPOINTS

/**
 * Hook to check if the screen size is below a specified breakpoint
 * @param breakpoint The breakpoint to check against (sm, md, lg, xl, 2xl)
 * @returns Boolean indicating if the screen is below the breakpoint
 */
export function useIsBelowBreakpoint(breakpoint: Breakpoint = "md") {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`)
    
    const onChange = () => {
      setIsBelowBreakpoint(window.innerWidth < BREAKPOINTS[breakpoint])
    }
    
    mql.addEventListener("change", onChange)
    setIsBelowBreakpoint(window.innerWidth < BREAKPOINTS[breakpoint])
    
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!isBelowBreakpoint
}

/**
 * Legacy hook for backward compatibility
 * @returns Boolean indicating if the screen is below the md breakpoint
 */
export function useIsMobile() {
  return useIsBelowBreakpoint("md")
}
