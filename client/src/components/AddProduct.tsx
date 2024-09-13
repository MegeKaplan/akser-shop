import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MESSAGES } from "../constants/messages";

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category_id: 0,
    stock_quantity: 0,
    dimensions: "",
    tags: [],
    is_featured: false,
    image_urls: [],
    thumbnail_url: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);

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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "tags") {
      const tagArray: any = value.split(",").map((tag) => tag.trim());
      setProduct({ ...product, [name]: tagArray });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setProduct({ ...product, [name]: checked });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  useEffect(() => {
    // uploadImages(images).then((imageUrlss) => {
    //   console.log(imageUrlss);
    //   setProduct({
    //     ...product,
    //     image_urls: imageUrlss,
    //     thumbnail_url: imageUrlss[0],
    //   });
    // });
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

        console.log(response.data.response);
        setImageUrls(response.data.response);
        setProduct({
          ...product,
          image_urls: response.data.response,
          thumbnail_url: response.data.response[0],
        });
        return response.data.response;
      } catch (error) {
        console.error(error);
        toast.error(MESSAGES.ERROR_OCCURRED);
      }
    };
    uploadImages(images);
  }, [images]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(product);

      if (product.image_urls.length === 0) {
        toast.error("Ürün resmi eklenmesi zorunludur!");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        product
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
      <h1 className="text-2xl font-bold mb-6">Yeni Ürün Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image Upload */}
        <div className="">
          {images.length > 0 && (
            <label className="block font-semibold mb-2">
              Seçilen Ürün Resimleri
            </label>
          )}
          <div className="flex items-center justify-start flex-row mb-4 overflow-x-scroll">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
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

        {/* Name */}
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

        {/* Description */}
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

        {/* Price */}
        <div>
          <label className="block font-semibold">Ürün Fiyatı</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            step="0.01"
            required
          />
        </div>

        {/* Category */}
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

        {/* Stock Quantity */}
        <div>
          <label className="block font-semibold">Ürün Stoğu</label>
          <input
            type="number"
            name="stock_quantity"
            value={product.stock_quantity}
            onChange={handleInputChange}
            className="w-full mt-1 p-2 border rounded-md"
            required
          />
        </div>

        {/* Dimensions */}
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

        {/* Tags */}
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

        {/* Is Featured */}
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

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Ürünü Ekle
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
