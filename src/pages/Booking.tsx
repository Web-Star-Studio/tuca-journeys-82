
import React from "react";
import BookingForm from "@/components/booking/BookingForm";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "tour";
  const name = searchParams.get("name") || "Item";
  const price = parseFloat(searchParams.get("price") || "100");
  const minGuests = parseInt(searchParams.get("min") || "1");
  const maxGuests = parseInt(searchParams.get("max") || "10");
  
  if (!id) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold mb-4">Erro</h1>
        <p>ID do item não especificado.</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-primary text-white rounded"
        >
          Voltar
        </button>
      </div>
    );
  }
  
  const onSuccess = (bookingId: string) => {
    navigate(`/confirmacao?id=${bookingId}`);
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Formulário de Reserva</h1>
      
      <BookingForm
        itemId={parseInt(id)}
        itemType={type as 'tour' | 'accommodation' | 'event' | 'vehicle'}
        itemName={name}
        basePrice={price}
        minGuests={minGuests}
        maxGuests={maxGuests}
        onSuccess={onSuccess}
      />
    </div>
  );
};

export default BookingPage;
