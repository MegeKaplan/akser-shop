import { useAppContext } from "./context/AppContext";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";

function App() {
  const { count, setCount } = useAppContext();

  setCount(
    localStorage.getItem("count") ? Number(localStorage.getItem("count")) : 0
  );

  const buttonHandler = (value: number) => {
    setCount((prev) => prev + value);
    localStorage.setItem("count", String(count + value));
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
