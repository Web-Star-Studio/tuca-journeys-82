
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

const NotificationsTab = ({ notifications }: { notifications: Notification[] }) => {
  return (
    <Card>
      <CardContent className="p-4">
        <ul className="divide-y">
          {notifications.map(notification => (
            <li key={notification.id} className={`py-4 ${!notification.read ? "bg-tuca-light-blue/10" : ""}`}>
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">{notification.title}</h4>
                  <span className="text-xs text-gray-500">{notification.date}</span>
                </div>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
