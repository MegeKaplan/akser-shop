import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MESSAGES } from "../constants/messages";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaCartPlus, FaTurkishLiraSign } from "react-icons/fa6";
import { FaShare } from "react-icons/fa";

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
  image_urls: any;
  thumbnail_url?: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

const ProductDetail: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(0);

  const increaseOrderQuantity = (max: number) => {
    setOrderQuantity((prev) => Math.min(prev + 1, max));
  };

  const decreaseOrderQuantity = () => {
    setOrderQuantity((prev) => Math.max(prev - 1, 0));
  };

  const buyNow = () => {
    console.log("Buy now button clicked!");
  };

  const addToCart = () => {
    console.log("Add to cart button clicked!");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/products/${productId}`
        );
        const parsedImageUrls: object = JSON.parse(
          response.data.response.image_urls
        );
        setProduct({ ...response.data.response, image_urls: parsedImageUrls });
      } catch (err) {
        console.error(err);
        setError(MESSAGES.PRODUCT_NOT_FOUND);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>{MESSAGES.CONTENT_LOADING}</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full md:min-h-96 flex flex-col md:flex-row p-2 md:p-4">
      <div className="w-full md:w-1/2">
        <Swiper
          className="rounded-lg sm:rounded-xl m-1 sm:m-2 md:m-3 w-auto h-72 md:h-96 border"
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          {product?.image_urls.map((imageUrl: string, index: number) => (
            <SwiperSlide
              key={index}
              className="w-full h-full flex items-center justify-center"
            >
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={`Slide ${index + 1}`}
                  className="w-auto h-full object-cover object-center"
                />
              </div>
            </SwiperSlide>
          ))}
          <div className="swiper-button-next text-primary-500 scale-75"></div>
          <div className="swiper-button-prev text-primary-500 scale-75"></div>
        </Swiper>
      </div>
      <div className="w-full md:w-1/2 p-2 md:p-3">
        <div className="text-xl md:text-2xl border-b py-2 px-2 break-all">
          {product?.name}
        </div>
        <div className="text-2xl md:text-3xl border-b py-2 flex items-center flex-row px-2">
          <span className="text-xl md:text-2xl mr-2">Fiyat: </span>
          <span className="text-emerald-600">{product?.price}₺</span>
        </div>
        <div className="text-lg md:text-lg border-b py-2 indent-4 px-2">
          {product?.description}
        </div>
        {JSON.parse(product?.tags).length > 0 && (
          <div className="text-lg md:text-lg border-b py-2 px-2">
            {JSON.parse(product?.tags).map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-secondary-200 text-center text-sm py-1 px-2 rounded m-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="text-lg md:text-lg border-b py-2 px-2 grid grid-cols-3 gap-2">
          <div className="w-full min-w-32 col-span-2">
            <div className="w-32 grid grid-cols-3 bg-secondary-200 rounded place-items-center overflow-hidden">
              <button
                onClick={() => decreaseOrderQuantity()}
                className="p-2 flex items-center justify-center col-span-1 hover:bg-primary-400 w-full"
              >
                -
              </button>
              <input
                disabled
                className="w-10 h-4/5 rounded-sm outline-none p-1 text-center bg-secondary-150 border"
                type="number"
                name="orderQuantity"
                min={0}
                max={product?.stock_quantity}
                value={orderQuantity}
              />
              <button
                onClick={() =>
                  increaseOrderQuantity(
                    product?.stock_quantity ? product?.stock_quantity : 0
                  )
                }
                className="p-2 flex items-center justify-center col-span-1 hover:bg-primary-400 w-full"
              >
                +
              </button>
            </div>
          </div>
          <div className="w-full col-span-2">
            <button
              className="w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600 transition flex items-center justify-center"
              onClick={() => addToCart()}
            >
              <FaCartPlus size={22} className="mr-2" />
              Sepete Ekle
            </button>
          </div>
          <div className="w-full col-span-1">
            <button className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition flex items-center justify-center">
              <FaShare size={22} className="mr-2" />
              Paylaş
            </button>
          </div>
          <div className="w-full col-span-3">
            <button
              className="w-full bg-secondary-500 text-white py-2 rounded hover:bg-secondary-600 transition flex items-center justify-center"
              onClick={() => buyNow()}
            >
              <FaTurkishLiraSign size={20} className="mr-2" />
              Hemen Al
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
