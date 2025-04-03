
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const FloatingAvatars = () => {
  return (
    <div className="relative h-96">
      {/* Floating profile images */}
      <div className="absolute top-0 left-0 z-10 animate-float-slow">
        <Avatar className="w-32 h-32 border-4 border-tuca-ocean-blue">
          <AvatarImage src="/team-karol.jpg" alt="Karol Tuca" />
          <AvatarFallback>KT</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute bottom-20 left-12 z-20 animate-float-medium">
        <Avatar className="w-40 h-40 border-4 border-tuca-coral">
          <AvatarImage src="/team-rafael.jpg" alt="Rafael Oliveira" />
          <AvatarFallback>RO</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute top-10 right-0 z-10 animate-float-fast">
        <Avatar className="w-36 h-36 border-4 border-tuca-light-blue">
          <AvatarImage src="/team-marina.jpg" alt="Marina Santos" />
          <AvatarFallback>MS</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute bottom-10 right-12 z-20 animate-float-slow">
        <Avatar className="w-32 h-32 border-4 border-tuca-green">
          <AvatarImage src="/team-lucas.jpg" alt="Lucas Mendes" />
          <AvatarFallback>LM</AvatarFallback>
        </Avatar>
      </div>
      {/* Background design elements */}
      <div className="absolute -bottom-6 -left-6 w-48 h-48 border-4 border-tuca-coral rounded-lg -z-10"></div>
      <div className="absolute -top-6 -right-6 w-32 h-32 border-4 border-tuca-light-blue rounded-lg -z-10"></div>
    </div>
  );
};

export default FloatingAvatars;
