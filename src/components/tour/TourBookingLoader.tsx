
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const TourBookingLoader = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
