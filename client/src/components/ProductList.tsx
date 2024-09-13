import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MESSAGES } from "../constants/messages";
import { Link } from "react-router-dom";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`
        );
        setProducts(response.data.response);
        toast.success(response.data.message);
      } catch (err) {
        console.error(err);
        toast.error(MESSAGES.ERROR_OCCURRED);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {products.map((product: any) => (
        <Link
          key={product.id}
          to={`/admin/dashboard/update-product/${product.id}`}
          className="p-4 m-2 bg-secondary-100 rounded-md flex truncate"
        >
          <div className="h-full w-auto ">
            <span className="text-blue-500">#{product.id}</span> -{" "}
            {product.is_active ? (
              <span className="text-emerald-500">Aktif</span>
            ) : (
              <span className="text-red-500">Pasif</span>
            )}{" "}
            -<span className="truncate">{product.name}</span>
          </div>
        </Link>
      ))}
    </>
  );
};

export default ProductList;
