
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import TeamAvatar from "./TeamAvatar";
import AvatarsBackground from "./AvatarsBackground";

const FloatingAvatars = () => {
  const teamMembers = [
    {
      name: "Karol Tuca",
      image: "/lovable-uploads/3e37da64-d22a-4127-8447-69d6e3c61dc4.png",
      initials: "KT",
      position: "top-0 left-0",
      borderColor: "border-tuca-ocean-blue",
      size: "w-32 h-32",
      animation: "animate-float-slow",
      zIndex: "z-10"
    },
    {
      name: "Rafael Oliveira",
      image: "/lovable-uploads/7b44c0fe-f8a4-490f-bc6d-4dd7e025c278.png",
      initials: "RO",
      position: "bottom-20 left-12",
      borderColor: "border-tuca-coral",
      size: "w-40 h-40",
      animation: "animate-float-medium",
      zIndex: "z-20"
    },
    {
      name: "Marina Santos",
      image: "/lovable-uploads/cd81e007-b687-426e-9059-a599e95ea9f8.png",
      initials: "MS",
      position: "top-10 right-0",
      borderColor: "border-tuca-light-blue",
      size: "w-36 h-36",
      animation: "animate-float-fast",
      zIndex: "z-10"
    },
    {
      name: "Lucas Mendes",
      image: "/lovable-uploads/c8a4052e-a65d-4ff5-ade2-082544f30b82.png",
      initials: "LM",
      position: "bottom-10 right-12",
      borderColor: "border-tuca-green",
      size: "w-32 h-32",
      animation: "animate-float-slow",
      zIndex: "z-20"
    }
  ];

  return (
    <div className="relative h-96">
      {/* Floating profile images */}
      {teamMembers.map((member, index) => (
        <TeamAvatar 
          key={index}
          name={member.name}
          image={member.image}
          initials={member.initials}
          position={member.position}
          borderColor={member.borderColor}
          size={member.size}
          animation={member.animation}
          zIndex={member.zIndex}
        />
      ))}
      
      {/* Background design elements */}
      <AvatarsBackground />
    </div>
  );
};

export default FloatingAvatars;
