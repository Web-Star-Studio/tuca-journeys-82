
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@supabase/supabase-js";

interface UserAvatarProps {
  user: User;
}

const UserAvatar = ({ user }: UserAvatarProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const displayName = user.user_metadata?.name || user.email || "";
  const initials = displayName ? getInitials(displayName) : "UN";

  return (
    <Avatar className="w-10 h-10 border border-tuca-light-blue/20">
      <AvatarFallback className="bg-gradient-to-r from-tuca-deep-blue to-tuca-ocean-blue text-white">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
