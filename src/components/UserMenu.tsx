
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AuthButtons from "./user-menu/AuthButtons";
import UserAvatar from "./user-menu/UserAvatar";
import UserDropdownContent from "./user-menu/UserDropdownContent";

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) {
    return <AuthButtons />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative w-10 h-10 rounded-full p-0 hover:bg-tuca-light-blue/50">
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>
      <UserDropdownContent user={user} onSignOut={handleSignOut} />
    </DropdownMenu>
  );
};

export default UserMenu;
