import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { MESSAGES } from "../constants/messages";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { MdShoppingCartCheckout } from "react-icons/md";

const Cart: React.FC = () => {
  const { cart, setCart } = useAppContext();
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchProductById = async (productId: number) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${productId}`
      );
      return response.data.response;
    } catch (error) {
      return MESSAGES.ERROR_OCCURRED;
    }
  };

  const fetchAllProducts = async (cart: any) => {
    try {
      const cartWithProducts = await Promise.all(
        cart.map(async (cartItem: any) => {
          const product = await fetchProductById(cartItem.productId);
          return { ...product, order_quantity: cartItem.orderQuantity };
        })
      );
      setCartProducts(cartWithProducts);
    } catch (error) {
      setError(MESSAGES.ERROR_OCCURRED);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllProducts(cart);
  }, [cart]);

  const removeFromCart = (product: any) => {
    setCart(cart.filter((cartItem) => cartItem.productId !== product.id));
    toast.warning(
      `${
        product.name.length < 21
          ? product.name
          : product.name.slice(0, 18) + "..."
      } sepetinizden çıkarıldı!`
    );
    setTimeout(() => {
      navigate("/cart");
    }, 100);
  };

  const checkoutCart = () => {
    toast.error(
      "Bu özellik henüz aktif değil! Lütfen telefon numarası üzerinden sipariş verin."
    );
  };

  return (
    <div className="border m-2 p-4 rounded-lg md:rounded-xl">
      <div className="mb-8 w-full">
        <h1 className="text-4xl border-b-4 border-primary-400 pb-2 w-full text-center px-2 md:w-min md:text-left">
          Sepetim({cart.reduce((acc, item) => acc + item.orderQuantity, 0)})
        </h1>
      </div>
      {cartProducts.length > 0 ? (
        <div className="w-full items-center justify-center flex-col">
          {cartProducts.map((cartProduct: any) => (
            <Link
              to={`/product/${cartProduct.id}`}
              key={cartProduct.id}
              className="h-28 md:h-40 border mb-4 rounded-md bg-secondary-100 flex items-center overflow-hidden"
            >
              <div className="size-28 md:size-40 flex items-center justify-center flex-shrink-0">
                <img
                  className="size-full object-cover"
                  src={cartProduct.thumbnail_url}
                  alt={"image of " + cartProduct.name}
                />
              </div>
              <div className="flex-grow p-2 h-full truncate">
                <h1 className="truncate font-medium text-lg">
                  {cartProduct.name}
                </h1>
                <h2>
                  Toplam: {cartProduct.order_quantity * cartProduct.price} TL (
                  {cartProduct.order_quantity}×{cartProduct.price})
                </h2>
                <button
                  onClick={() => removeFromCart(cartProduct)}
                  className="bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center justify-center px-2 py-1 mt-2"
                >
                  <FaTrash size={16} className="mr-1" />
                  Sepetten Çıkar
                </button>
              </div>
            </Link>
          ))}
          <button
            onClick={() => checkoutCart()}
            className="bg-emerald-500 text-white rounded hover:bg-emerald-600 transition flex items-center justify-center p-2 mt-2 w-full font-medium"
          >
            <MdShoppingCartCheckout size={24} className="mr-1" />
            Sepeti Sipariş Ver
          </button>
        </div>
      ) : (
        <Link to={"/"} className="text-lg text-blue-500">
          Sepetiniz şu anda boş! Anasayfaya gitmek için tıklayın.
        </Link>
      )}
    </div>
  );
};

export default Cart;
