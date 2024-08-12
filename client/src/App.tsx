import { useAppContext } from "./context/AppContext";

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
      <h1>Count {count}</h1>
      <button className="bg-emerald-400" onClick={() => buttonHandler(1)}>
        Increase 1
      </button>
      <button className="bg-red-400" onClick={() => buttonHandler(-1)}>
        Decrease 1
      </button>
    </>
  );
}

export default App;
