import ProductPageLayout from "../layouts/ProductPage/ProductPageLayout";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/PuductListPage";
import ProductPage from "../pages/ProductPage";
import LoginPage from "../pages/LoginPage";
const router = [
  {
    path: "/",
    element: <ProductPageLayout />,
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
  {
    path: "/admin",
    element: <LoginPage />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
];

export default router;
