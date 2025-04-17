
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// This is a redirect component to make sure existing links to /loja/:id work
const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Redirect to the new URL
    navigate(`/loja/${id}`, { replace: true });
  }, [navigate, id]);

  // Return null as this component will redirect immediately
  return null;
};

export default ProductDetail;
