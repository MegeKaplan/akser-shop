import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MESSAGES } from "../constants/messages";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<any>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories/${id}`
        );
        setCategory({
          ...response.data.response,
        });
      } catch (err) {
        console.error(err);
        toast.error(MESSAGES.ERROR_OCCURRED);
      }
    };

    fetchCategory();
  }, [id]);

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
      const { id, created_at, updated_at, ...restOfCategory } = category;

      console.log(restOfCategory);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/categories/${id}`,
        restOfCategory
      );

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(MESSAGES.ERROR_OCCURRED);
    }
  };

  const deleteCategory = async () => {
    var deleteValidation = confirm(
      `${category.name} isimli kategoriyi silmek istediğinize emin misiniz? (Bu işlem geri alınamaz!)`
    );
    if (deleteValidation) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/categories/${id}`
        );
        toast.success(response.data.message);
        navigate("/admin/dashboard/list-categories");
      } catch (error) {
        console.log(error);
        toast.error(MESSAGES.ERROR_OCCURRED);
      }
    }
  };

  const changeCategoryStatus = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/categories/${id}`,
        { is_active: !category.is_active }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(MESSAGES.ERROR_OCCURRED);
    }
  };

  if (!category) {
    return <div>Kategori bilgileri yükleniyor...</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Yeni Kategori Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_featured"
            checked={category.is_featured}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="font-semibold">Önerilen kategori?</label>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Kategoriyi Güncelle
          </button>
        </div>
        <div>
          <button
            onClick={() => deleteCategory()}
            className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Kategoriyi Sil
          </button>
        </div>
        <div>
          <button
            disabled
            onClick={() => changeCategoryStatus()}
            className="w-full bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed"
          >
            {category.is_active
              ? "Kategoriyi Pasif Duruma Getir"
              : "Kategoriyi Aktif Duruma Getir"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
