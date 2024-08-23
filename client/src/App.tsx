import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastifyContainerConfig } from "./config/toastifyConfig";
import Auth from "./pages/Auth";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      <Footer />
      <ToastContainer {...toastifyContainerConfig} />
    </>
  );
}

export default App;
