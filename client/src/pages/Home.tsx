import React from "react";
import Header from "../components/Header";
import Slider from "../components/Slider";
import ProductShowcase from "../components/ProductShowcase";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Slider />
      <ProductShowcase title="Çok Satılan Ürünler" query="is_featured=1" />
      <ProductShowcase title="En Yeni Ürünler" query="category_id=1" />
      <ProductShowcase title="En Sevilen Ürünler" query="category_id=2" />
    </>
  );
};

export default Home;
