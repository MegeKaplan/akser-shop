import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MESSAGES } from "../constants/messages";
import { toast } from "react-toastify";
import ProductShowcase from "../components/ProductShowcase";

interface Category {
  id: number;
  name: string;
  description?: string | null;
  is_active: boolean;
  slug: string;
  parent_category_id?: number | null;
  display_order?: number | null;
  is_featured: boolean;
  additional_info?: string | null;
  thumbnail_url?: string | null;
  is_deleted: boolean;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  created_at: string;
  updated_at: string;
}

const CategoryProducts: React.FC = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState<Category>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories/${categoryId}`
        );
        setCategory(response.data.response);
      } catch (error) {
        setError(MESSAGES.CATEGORY_NOT_FOUND);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  if (loading) return <p>{MESSAGES.CONTENT_LOADING}</p>;
  if (error) {
    toast.error(error);
    return <p>{error}</p>;
  }

  return (
    <div className="border md:border m-2 md:m-5 rounded-md md:rounded-lg overflow-hidden">
      <div className="w-full h-32 md:h-48 bg-secondary-100 flex items-center justify-evenly flex-col border-b">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          {category?.name}
        </h1>
        {category?.description && (
          <p className="text-md">{category.description}</p>
        )}
      </div>
      <div className="w-full pb-12">
        <ProductShowcase title="" query={`category_id=${category?.id}`} />
      </div>
    </div>
  );
};

export default CategoryProducts;
