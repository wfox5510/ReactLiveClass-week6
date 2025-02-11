import { createRoot } from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import router from "./router/router"

createRoot(document.getElementById("root")).render(<RouterProvider router={createBrowserRouter(router)}/>);
