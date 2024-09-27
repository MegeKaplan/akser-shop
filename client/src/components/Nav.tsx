import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MESSAGES } from "../constants/messages";
import { Link } from "react-router-dom";

export interface Category {
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

const Nav: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleScroll = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= (e.deltaY * 40) / 10;
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        setCategories(response.data.response);
      } catch (err) {
        console.error(err);
        setError(MESSAGES.ERROR_OCCURRED);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>{MESSAGES.CONTENT_LOADING}</p>;
  if (error) return <p>{error}</p>;

  return (
    <nav
      className="w-full flex flex-row items-center justify-around overflow-x-scroll select-none scroll-smooth h-full row-span-3 px-1"
      ref={scrollRef}
      onWheel={handleScroll}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {categories.map((category, index) => (
        <div key={index} className="flex items-center justify-center">
          <Link
            to={`/category/${category.id}`}
            className="bg-secondary-150 px-3 py-2 m-1.5 whitespace-nowrap text-lg cursor-pointer hover:bg-primary-400 transition rounded-full border-secondary-200 border-[1px] hover:border-primary-400"
          >
            {category.name}
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default Nav;
