import { useAppContext } from "./context/AppContext";
import Home from "./pages/Home";

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
      <Home />
    </>
  );
}

export default App;
