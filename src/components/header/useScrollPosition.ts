
import { useState, useEffect } from "react";

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollTop, setLastScrollTop] = useState(0);
  
  useEffect(() => {
    const updatePosition = () => {
      const currentScrollPosition = window.pageYOffset;
      setScrollPosition(currentScrollPosition);
      
      // Determine scroll direction for enhanced UI effects
      if (currentScrollPosition > lastScrollTop) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      setLastScrollTop(currentScrollPosition);
    };
    
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, [lastScrollTop]);
  
  return { scrollPosition, scrollDirection };
};
