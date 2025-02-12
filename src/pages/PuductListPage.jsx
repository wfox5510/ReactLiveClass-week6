import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "bootstrap";

import ReactLoading from "react-loading";
import axios from "axios";

const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const ProductListPage = () => {
  const [productData, setProductData] = useState(null);

  const [tempProduct, setTempProduct] = useState(null);
  const [qtySelect, setQtySelect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const productModalRef = useRef(null);

  useEffect(() => {
    new Modal(productModalRef.current, { backdrop: false });
    getProduct();
  }, []);
  useEffect(() => {
    //console.log(productData);
  }, [productData]);

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
      setIsComponentLoading(false);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsComponentLoading(false);
    }
  };
  return (
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
      <table className="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {productData?.map((productItem) => {
            return (
              <tr key={productItem.id}>
                <td style={{ width: "200px" }}>
                  <div
                    style={{
                      height: "100px",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundImage: `url(${productItem.imageUrl})`,
                    }}
                  ></div>
                </td>
                <td>{productItem.title}</td>
                <td>
                  <div className="h5"></div>
                  <del className="h6">原價 {productItem.origin_price}</del>
                  <div className="h5">特價 {productItem.price}</div>
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <NavLink
                      className={`btn btn-outline-secondary ${isComponentLoading && "disabled"}`}
                      to={`/product/${productItem.id}`}
                      aria-disabled={isComponentLoading && "true"}
                    >
                      查看更多
                      {isComponentLoading && (
                        <i className="fas fa-spinner fa-pulse ms-1"></i>
                      )}
                    </NavLink>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      disabled={isComponentLoading}
                      onClick={() => {
                        addCart(productItem.id);
                      }}
                    >
                      加到購物車
                      {isComponentLoading && (
                        <i className="fas fa-spinner fa-pulse ms-1"></i>
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListPage;
