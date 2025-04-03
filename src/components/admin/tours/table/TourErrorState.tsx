
import React from "react";

const TourErrorState: React.FC = () => {
  return (
    <div className="flex justify-center p-8 text-red-500">
      <p>Erro ao carregar passeios. Tente novamente mais tarde.</p>
    </div>
  );
};

export default TourErrorState;
