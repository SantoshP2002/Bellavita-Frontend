import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./styles/global.style.css";
import router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-dvw max-h-dvh min-w-dvw min-h-dvh w-full h-full overflow-y-scroll bg-primary-inverted text-primary">
        <div className="max-w-[1920px] w-full h-full mx-auto">
          <Toaster position="top-right" reverseOrder={false} />

          <RouterProvider router={router} />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
