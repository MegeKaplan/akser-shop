import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MESSAGES } from "../constants/messages";

const AddCategory: React.FC = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    is_active: true,
    is_featured: false,
    is_deleted: false,
  });
  const [categories, setCategories] = useState<any>([]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategory({ ...category, [name]: checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(category);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/categories`,
        category
      );

      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error(MESSAGES.ERROR_OCCURRED);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Yeni Kategori Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold">Kategori İsmi</label>
          <input
            type="text"
            name="name"
            value={category.name}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Kategori Açıklaması</label>
          <textarea
            name="description"
            value={category.description}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md min-h-24"
            rows={4}
          />
        </div>

        {/* Is Featured */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_featured"
            checked={category.is_featured}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="font-semibold">
            Kategori önerilenlerde gösterilsin mi?
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Kategoriyi Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
