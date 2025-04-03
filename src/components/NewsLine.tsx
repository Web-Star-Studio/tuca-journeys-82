
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Thermometer, Clock, Waves, Moon, Sun, Calendar } from "lucide-react";

const NewsLine = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update the time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Format the time as HH:MM
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };
  
  // Get the current season in the Southern hemisphere
  const getSeason = () => {
    const month = currentTime.getMonth();
    
    if (month >= 11 || month < 2) return "Verão";
    if (month >= 2 && month < 5) return "Outono";
    if (month >= 5 && month < 8) return "Inverno";
    return "Primavera";
  };
  
  // Simulated data (in a real app, these would come from an API)
  const temperature = "28°C";
  const tide = "Alta - 1.8m";
  const moonPhase = "Lua Crescente";
  
  const newsItems = [
    { 
      icon: <Thermometer className="h-4 w-4 mr-2" />,
      text: `Temperatura: ${temperature}`
    },
    { 
      icon: <Clock className="h-4 w-4 mr-2" />,
      text: `Horário: ${formatTime(currentTime)}`
    },
    { 
      icon: <Waves className="h-4 w-4 mr-2" />,
      text: `Maré: ${tide}`
    },
    { 
      icon: <Moon className="h-4 w-4 mr-2" />,
      text: `${moonPhase}`
    },
    { 
      icon: <Sun className="h-4 w-4 mr-2" />,
      text: `Estação: ${getSeason()}`
    },
    { 
      icon: <Calendar className="h-4 w-4 mr-2" />,
      text: `Fernando de Noronha - Paraíso Natural`
    }
  ];
  
  return (
    <div className="bg-gradient-to-r from-tuca-deep-blue to-tuca-ocean-blue text-white py-1 overflow-hidden text-sm">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center space-x-10 whitespace-nowrap"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              x: { 
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }
            }}
          >
            {/* Double the news items to create a seamless loop */}
            {[...newsItems, ...newsItems].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default NewsLine;
