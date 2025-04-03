
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import TeamAvatar from "./TeamAvatar";
import AvatarsBackground from "./AvatarsBackground";

const FloatingAvatars = () => {
  const teamMembers = [
    {
      name: "Karol Tuca",
      image: "/team-karol.jpg",
      initials: "KT",
      position: "top-0 left-0",
      borderColor: "border-tuca-ocean-blue",
      size: "w-32 h-32",
      animation: "animate-float-slow",
      zIndex: "z-10"
    },
    {
      name: "Rafael Oliveira",
      image: "/team-rafael.jpg",
      initials: "RO",
      position: "bottom-20 left-12",
      borderColor: "border-tuca-coral",
      size: "w-40 h-40",
      animation: "animate-float-medium",
      zIndex: "z-20"
    },
    {
      name: "Marina Santos",
      image: "/team-marina.jpg",
      initials: "MS",
      position: "top-10 right-0",
      borderColor: "border-tuca-light-blue",
      size: "w-36 h-36",
      animation: "animate-float-fast",
      zIndex: "z-10"
    },
    {
      name: "Lucas Mendes",
      image: "/team-lucas.jpg",
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
