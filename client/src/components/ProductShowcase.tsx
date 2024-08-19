import React, { useEffect, useState } from "react";
import axios from "axios";
import { MESSAGES } from "../constants/messages.ts";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  category_id: number;
  stock_quantity: number;
  weight?: number;
  dimensions: string;
  brand?: string;
  is_active: boolean;
  rating?: number;
  review_count: number;
  tags?: any;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  is_featured?: boolean;
  view_count: number;
  vendor_id?: number;
  shipping_details?: string;
  warranty_info?: string;
  additional_info?: string;
  image_urls: string;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

interface ProductShowcaseProps {
  title: string;
  query: string;
}

const ProductShowcase: React.FC<ProductShowcaseProps> = ({ title, query }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products?${query}`
        );
        setProducts(response.data.response);
      } catch (err) {
        console.error(err);
        setError(MESSAGES.ERROR_OCCURRED);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) return <p>{MESSAGES.CONTENT_LOADING}</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full px-2 md:px-5 text-md flex items-center justify-center flex-col mt-10">
      <div className="w-full flex items-center justify-center md:justify-start">
        <h1 className="p-4 md:pl-2 text-2xl sm:text-3xl">{title}</h1>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 place-items-center gap-4">
        {products.map((product) => {
          const tagsArray = product.tags
            ? JSON.parse(product.tags as string)
            : [];
          return (
            <div
              key={product.id}
              className="col-span-1 bg-secondary-100 mx-2 grid grid-rows-7 h-80 w-80 md:w-auto border rounded-lg overflow-hidden"
            >
              <div className={"row-span-4 overflow-hidden bg-green-400 h-full"}>
                <img
                  className="w-full h-full object-cover"
                  src={product.thumbnail_url}
                  alt={"image of " + product.name}
                />
              </div>
              <div
                className={`row-span-4 p-2 grid ${
                  tagsArray.length > 0 ? "grid-rows-3" : "grid-rows-2"
                }`}
              >
                <h2 className="text-lg font-semibold row-span-1 truncate">
                  {product.name}
                </h2>
                <p className="text-md text-gray-700 row-span-1">
                  ${product.price}
                </p>
                {tagsArray.length > 0 ? (
                  <div
                    className={`grid grid-cols-${tagsArray.length} gap-2 mt-2`}
                  >
                    {tagsArray.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="bg-gray-300 text-center text-sm py-1 px-2 rounded col-span-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="bg-gray-300 text-center text-sm py-1 px-2 rounded col-span-1">
                    Önerilen Ürün
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductShowcase;
