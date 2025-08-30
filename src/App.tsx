import { RouterProvider } from "react-router-dom";
import "./styles/global.style.css";
import router from "./routes";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="max-w-dvw max-h-dvh min-w-dvw min-h-dvh w-full h-full overflow-y-scroll bg-primary-inverted text-primary">
      <div className="max-w-[1920px] w-full h-full mx-auto">
        <ToastContainer position="top-right" autoClose={3000} />
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
