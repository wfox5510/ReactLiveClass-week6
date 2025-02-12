import "./App.css";


import { Outlet } from "react-router-dom";

import NavBar from "./component/Navbar";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {


  return (
    <div id="app">
      <NavBar />
      <Outlet />
      
    </div>
  );
}
export default App;
