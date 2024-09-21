import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MESSAGES } from "../constants/messages";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(undefined);
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );
        setProduct({
          ...response.data.response,
          image_urls: JSON.parse(response.data.response.image_urls),
          tags: JSON.parse(response.data.response.tags).join(","),
        });
      } catch (err) {
        console.error(err);
        toast.error(MESSAGES.ERROR_OCCURRED);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        setCategories(response.data.response);
      } catch (err) {
        console.error(err);
        toast.error(MESSAGES.ERROR_OCCURRED);
      }
    };

    fetchCategories();
  }, []);

  const uploadImages = async (images: any) => {
    try {
      const formData = new FormData();

      formData.append("name", product.name);

      images.forEach((image: any) => {
        formData.append("files", image);
      });

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData
      );

      return response.data.response;
    } catch (error) {
      console.log(error);
      toast.error(MESSAGES.ERROR_OCCURRED);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProduct({ ...product, [name]: checked });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      var image_urls = await uploadImages(images);

      const { id, created_at, updated_at, ...restOfProduct } = product;

      const formattedProduct =
        image_urls.length > 0
          ? {
              ...restOfProduct,
              image_urls: image_urls,
              tags: product.tags.split(",").map((tag: string) => tag.trim()),
            }
          : {
              ...restOfProduct,
              tags: product.tags.split(",").map((tag: string) => tag.trim()),
            };

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        formattedProduct
      );

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(MESSAGES.ERROR_OCCURRED);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const deleteProduct = async () => {
    var deleteValidation = confirm(
      `${product.name} isimli ürünü silmek istediğinize emin misiniz? (Bu işlem geri alınamaz!)`
    );
    if (deleteValidation) {
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_URL}/products/${id}`
        );
        toast.success(response.data.message);
        navigate("/admin/dashboard/list-products");
      } catch (error) {
        console.log(error);
        toast.error(MESSAGES.ERROR_OCCURRED);
      }
    }
  };

  const changeProductStatus = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        { is_active: !product.is_active }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(MESSAGES.ERROR_OCCURRED);
    }
  };

  if (!product) {
    return <div>Ürün bilgileri yükleniyor...</div>;
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-6">Yeni Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          {product.image_urls.length > 0 && (
            <label className="block font-semibold mb-2">
              Seçilen Ürün Resimleri
            </label>
          )}
          <div className="flex items-center justify-start flex-row mb-4 overflow-x-scroll">
            {images.length > 0
              ? images.map((image: any, index: number) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(image)}
                    alt={`Selected image ${index + 1}`}
                    className="size-28 object-cover rounded-md m-1"
                  />
                ))
              : product.image_urls.map((url: any, index: number) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Selected image ${index + 1}`}
                    className="size-28 object-cover rounded-md m-1"
                  />
                ))}
          </div>
          <label className="block font-semibold">Ürün Resmi Seç</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Ürün İsmi</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Ürün Açıklaması</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md min-h-24"
            rows={4}
          />
        </div>
        <div>
          <label className="block font-semibold">Ürün Fiyatı</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            step="1"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Ürün Kategorisi</label>
          <select
            name="category_id"
            value={product.category_id}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          >
            <option value="">Aşağıdan bir kategori seçin...</option>
            {categories.map((category: any) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-semibold">Ürün Stoğu</label>
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
            step={1}
          />
        </div>
        <div>
          <label className="block font-semibold">Ürün Boyutları</label>
          <input
            type="text"
            name="dimensions"
            value={product.dimensions}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block font-semibold">Ürün Etiketleri</label>
          <input
            type="text"
            name="tags"
            value={product.tags}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_featured"
            checked={product.is_featured}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label className="font-semibold">
            Ürün önerilenlerde gösterilsin mi?
          </label>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Ürünü Güncelle
          </button>
        </div>
        <div>
          <button
            onClick={() => deleteProduct()}
            className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
          >
            Ürünü Sil
          </button>
        </div>
        <div>
          <button
            disabled
            onClick={() => changeProductStatus()}
            className="w-full bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-600 disabled:bg-emerald-300 disabled:cursor-not-allowed"
          >
            {product.is_active
              ? "Ürünü Pasif Duruma Getir"
              : "Ürünü Aktif Duruma Getir"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
