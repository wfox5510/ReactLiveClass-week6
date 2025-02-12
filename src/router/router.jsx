import App from "../App";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/PuductListPage";
import ProductPage from "../pages/ProductPage";
const router = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "productList",
        element: <ProductListPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "product/:id",
        element: <ProductPage />,
      },
    ],
  },
];

export default router;
