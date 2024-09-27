import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <div className="w-72 h-full rounded-xl select-none bg-[#1E3A8A] p-4">
      <div className="bg-[#F59E0B] w-full h-28 p-3 rounded-xl select-none mb-4 truncate flex items-center justify-evenly flex-col">
        <span className="text-3xl font-semibold text-secondary-50">
          AkserShop
        </span>
        <span className="text-2xl font-light text-secondary-50">
          Admin Panel
        </span>
      </div>
      <Link
        to={"/"}
        // className="w-full bg-secondary-50 p-3 text-lg hover:bg-secondary-200 transition cursor-pointer block mb-2 truncate rounded-br-2xl rounded-tl-2xl hover:rounded-tl-none hover:rounded-br-none hover:rounded-bl-2xl hover:rounded-tr-2xl"
        className="w-full bg-secondary-50 p-3 text-lg hover:bg-secondary-200 transition cursor-pointer block mb-2 truncate rounded-tl-2xl rounded-br-2xl"
      >
        Anasayfa
      </Link>
      <Link
        to={"/admin/dashboard/list-products"}
        className="w-full bg-secondary-50 p-3 text-lg hover:bg-secondary-200 transition cursor-pointer block mb-2 truncate rounded-tl-2xl rounded-br-2xl"
      >
        Ürünleri Listele
      </Link>
      <Link
        to={"/admin/dashboard/add-product"}
        className="w-full bg-secondary-50 p-3 text-lg hover:bg-secondary-200 transition cursor-pointer block mb-2 truncate rounded-tl-2xl rounded-br-2xl"
      >
        Yeni Ürün Ekle
      </Link>
      <Link
        to={"/admin/dashboard/list-categories"}
        className="w-full bg-secondary-50 p-3 text-lg hover:bg-secondary-200 transition cursor-pointer block mb-2 truncate rounded-tl-2xl rounded-br-2xl"
      >
        Kategorileri Listele
      </Link>
      <Link
        to={"/admin/dashboard/add-category"}
        className="w-full bg-secondary-50 p-3 text-lg hover:bg-secondary-200 transition cursor-pointer block mb-2 truncate rounded-tl-2xl rounded-br-2xl"
      >
        Yeni Kategori Ekle
      </Link>
    </div>
  );
};

export default Sidebar;
