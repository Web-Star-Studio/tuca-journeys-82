
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TeamAvatarProps {
  name: string;
  image: string;
  initials: string;
  position: string;
  borderColor: string;
  size: string;
  animation: string;
  zIndex: string;
}

const TeamAvatar = ({
  name,
  image,
  initials,
  position,
  borderColor,
  size,
  animation,
  zIndex
}: TeamAvatarProps) => {
  return (
    <div className={`absolute ${position} ${zIndex} ${animation}`}>
      <Avatar className={`${size} border-4 ${borderColor}`}>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default TeamAvatar;
