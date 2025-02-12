import "./ProductPageLayout.css";

import { Outlet } from "react-router-dom";

import NavBar from "../../components/Navbar";



const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductPageLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
export default ProductPageLayout;
