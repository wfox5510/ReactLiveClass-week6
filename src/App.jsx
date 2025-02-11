import "./App.css";

import { useState, useEffect, useRef } from "react";

import { Modal } from "bootstrap";
import ReactLoading from "react-loading";
import axios from "axios";

import NavBar from "./component/Navbar";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const [productData, setProductData] = useState(null);
  const [cartData, setCartData] = useState(null);
  const [tempProduct, setTempProduct] = useState(null);
  const [qtySelect, setQtySelect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const productModalRef = useRef(null);

  useEffect(() => {
    new Modal(productModalRef.current, { backdrop: false });
    getProduct();
    getCart();
  }, []);
  useEffect(() => {
    //console.log(cartData);
  }, [cartData]);

  const getProduct = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
      setProductData(res.data.products);
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const getCart = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      setCartData(res.data.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleModalBtn = async (id, qty) => {
    await addCart(id, qty);
    closeModal();
  };
  const openModal = () => {
    let modal = Modal.getInstance(productModalRef.current);
    modal.show();
  };
  const closeModal = () => {
    let modal = Modal.getInstance(productModalRef.current);
    modal.hide();
  };

  const addCart = async (id, qty = 1) => {
    try {
      setIsComponentLoading(true);
      await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
        data: {
          product_id: id,
          qty: Number(qty),
        },
      });
      await getCart();
      setIsComponentLoading(false);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsComponentLoading(false);
    }
  };

  return (
    <div id="app">
      <NavBar />
      <div className="container">
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(255,255,255,0.3)",
              zIndex: 1000,
            }}
          >
            <ReactLoading
              type="spinningBubbles"
              color="black"
              height={"100px"}
              width={"100px"}
            />
          </div>
        )}
        <div className="mt-4">
          <div
            ref={productModalRef}
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            className="modal fade"
            id="productModal"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title fs-5">
                    產品名稱：{tempProduct?.title}
                  </h2>
                  <button
                    // onClick={closeModal}
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <img
                    src={tempProduct?.imageUrl}
                    alt={tempProduct?.title}
                    className="img-fluid"
                  />
                  <p>內容：{tempProduct?.content}</p>
                  <p>描述：{tempProduct?.description}</p>
                  <p>
                    價錢：{tempProduct?.price}{" "}
                    <del>{tempProduct?.origin_price}</del> 元
                  </p>
                  <div className="input-group align-items-center">
                    <label htmlFor="qtySelect">數量：</label>
                    <select
                      onChange={(e) => setQtySelect(e.target.value)}
                      id="qtySelect"
                      className="form-select"
                    >
                      {Array.from({ length: 10 }).map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      handleModalBtn(tempProduct.id, qtySelect);
                    }}
                    disabled={isComponentLoading}
                  >
                    加入購物車
                    {isComponentLoading && (
                      <i className="fas fa-spinner fa-pulse ms-1"></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
