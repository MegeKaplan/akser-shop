import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-72 h-full rounded-xl select-none">
      <div className="bg-primary-400 w-full h-28 p-3 rounded-xl select-none mb-4 truncate flex items-center justify-evenly flex-col">
        <span className="text-3xl font-semibold text-secondary-50">
          AkserShop
        </span>
        <span className="text-2xl font-light text-secondary-50">
          Admin Panel
        </span>
      </div>
      <Link
        to={"/"}
        className="w-full bg-secondary-50 p-3 rounded-xl text-lg hover:bg-secondary-200 transition cursor-pointer block mb-2 truncate"
      >
        Anasayfa
      </Link>
      <Link
        to={"/admin/dashboard/list-products"}
        className="w-full bg-secondary-50 p-3 rounded-xl text-lg hover:bg-secondary-200 transition cursor-pointer block mb-2 truncate"
      >
        Ürünleri Listele
      </Link>
      <Link
        to={"/admin/dashboard/add-product"}
        className="w-full bg-secondary-50 p-3 rounded-xl text-lg hover:bg-secondary-200 transition cursor-pointer block mb-2 truncate"
      >
        Yeni Ürün Ekle
      </Link>
    </div>
  );
};

export default Sidebar;
