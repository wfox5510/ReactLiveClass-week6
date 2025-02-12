import { useParams } from "react-router-dom";
import { useState } from "react";
const API_BASE = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const ProductPage = () => {
  const [tempProduct, setTempProduct] = useState(null);
  const [isComponentLoading, setIsComponentLoading] = useState(false);
  const param = useParams();
  return (
    <>
      <div className="container">
        <div className="mt-4">
          <div>
            <div>
              <div>
                <div>
                  <h2 className="fs-5">產品名稱：{tempProduct?.title}</h2>
                </div>
                <div>
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
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"

                    // disabled={isComponentLoading}
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
    </>
  );
};
export default ProductPage;
