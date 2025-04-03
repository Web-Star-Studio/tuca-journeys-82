
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  image: string;
  initials: string;
}

const TeamMember = ({ name, role, description, image, initials }: TeamMemberProps) => {
  return (
    <div className="text-center">
      <div className="relative mb-6 mx-auto">
        <Avatar className="w-48 h-48 mx-auto border-4 border-tuca-ocean-blue">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
      <h3 className="text-xl font-serif font-bold">{name}</h3>
      <p className="text-tuca-ocean-blue font-medium mb-2">{role}</p>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );
};

export default TeamMember;
