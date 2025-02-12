import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container">
        <ul className="navbar-nav flex-row gap-5 fs-5">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              首頁
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="productList">
              產品頁
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cart">
              購物車
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              登入
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
