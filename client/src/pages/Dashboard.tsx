import React from "react";
import Sidebar from "../components/Sidebar";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import ProductList from "../components/ProductList";
import AddCategory from "../components/AddCategory";
import CategoryList from "../components/CategoryList";
import UpdateCategory from "../components/UpdateCategory";
import { FaHeart } from "react-icons/fa6";

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-rows-[32] w-[100vw] h-[100vh] bg-secondary-150">
      <div className="size-full flex items-center justify-evenly flex-row p-4 row-span-11">
        <Sidebar />
        <div className="flex-grow-1 w-full h-[90vh] bg-secondary-200 rounded-xl ml-4 overflow-y-scroll p-3">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/list-products" element={<ProductList />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/list-categories" element={<CategoryList />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/update-category/:id" element={<UpdateCategory />} />
          </Routes>
        </div>
      </div>
      <span className="flex items-center justify-center flex-row row-span-1 m-4 mt-0 rounded-bl-2xl rounded-tr-2xl p-2">
        Made with
        <span className="mx-1">{<FaHeart color="red" />}</span>
        by
        <a
          className="mx-1 hover:underline"
          href="https://github.com/MegeKaplan"
        >
          MegeKaplan
        </a>
      </span>
    </div>
  );
};

export default Dashboard;
