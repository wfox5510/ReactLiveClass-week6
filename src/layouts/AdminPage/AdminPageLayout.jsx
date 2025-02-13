import "./AdminPageLayout";

import { Outlet } from "react-router-dom";

import NavBar from "../../components/Navbar";

function AdminPageLayout() {

  const navItemList = [
    {
      name: "首頁",
      path: "/",
    },
    {
      name: "後台產品頁面",
      path: "/admin/productList",
    },
    {
      name: "訂單頁面",
      path: "/admin/order",
    } 
  ];

  return (
    <>
      <NavBar navItemList={navItemList} />
      <Outlet />
    </>
  );
}
export default AdminPageLayout;
