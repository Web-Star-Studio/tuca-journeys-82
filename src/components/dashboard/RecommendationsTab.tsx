
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Recommendation {
  id: number;
  title: string;
  image: string;
  score: number;
}

const RecommendationsTab = ({ recommendations }: { recommendations: Recommendation[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {recommendations.map(rec => (
        <Card key={rec.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <img 
            src={rec.image} 
            alt={rec.title} 
            className="h-40 w-full object-cover"
          />
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{rec.title}</h3>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                {rec.score}% match
              </span>
            </div>
            <button className="mt-3 w-full bg-tuca-ocean-blue text-white py-1.5 rounded-md text-sm hover:bg-tuca-ocean-blue/90 transition-colors">
              Ver detalhes
            </button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecommendationsTab;
