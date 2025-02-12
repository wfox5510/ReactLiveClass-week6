import { createRoot } from "react-dom/client";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import router from "./router/router"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
createRoot(document.getElementById("root")).render(<RouterProvider router={createBrowserRouter(router)}/>);
