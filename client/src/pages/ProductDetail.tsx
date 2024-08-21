import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  return <div>ProductDetail Page - Product Id: {productId}</div>;
};

export default ProductDetail;
