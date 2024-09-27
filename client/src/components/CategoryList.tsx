import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MESSAGES } from "../constants/messages";
import { Link } from "react-router-dom";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        setCategories(response.data.response);
        toast.success(response.data.message);
      } catch (err) {
        console.error(err);
        toast.error(MESSAGES.ERROR_OCCURRED);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {categories.map((category: any) => (
        <Link
          key={category.id}
          to={`/admin/dashboard/update-category/${category.id}`}
          className="p-4 m-2 bg-secondary-100 rounded-md flex truncate"
        >
          <div className="h-full w-auto ">
            <span className="text-blue-500">#{category.id}</span> -{" "}
            {category.is_active ? (
              <span className="text-emerald-500">Aktif</span>
            ) : (
              <span className="text-red-500">Pasif</span>
            )}{" "}
            -<span className="truncate">{category.name}</span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default CategoryList;
