import App from "../App";
import CartPage from "../pages/CartPage";
import HomePage from "../pages/HomePage";
import ProductListPage from "../pages/PuductListPage";
const router = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "productList",
        element: <ProductListPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
    ],
  },
];

export default router;
