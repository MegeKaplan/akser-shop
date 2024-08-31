import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifyContainerConfig } from "./config/toastifyConfig";
import Auth from "./pages/Auth";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/auth/:page" element={<Auth />} />
      </Routes>
      <Footer />
      <ToastContainer {...toastifyContainerConfig} />
    </>
  );
}

export default App;
