import React from "react";
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import ProductList from "../components/ProductList";

const Dashboard: React.FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-blue-600 flex items-center justify-evenly flex-row p-4">
      <Sidebar />
      <div className="flex-grow-1 size-full bg-secondary-50 rounded-xl ml-4 overflow-y-scroll p-3">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/list-products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
