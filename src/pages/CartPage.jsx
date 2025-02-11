import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
const CartPage = () => {
  const handleProductBtn = (productItem) => {
    setTempProduct(productItem);
    openModal();
  };
  const delCartItem = async (id) => {
    try {
      setIsComponentLoading(true);
      res = await axios.delete(`${API_BASE}/api/${API_PATH}/cart/${id}`);
      await getCart();
      setIsComponentLoading(false);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsComponentLoading(false);
    }
  };
  const delCarts = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`${API_BASE}/api/${API_PATH}/carts`);
      await getCart();
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const { name, email, tel, address, message } = formData;
    try {
      setIsLoading(true);
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data: {
          user: {
            name: name,
            email: email,
            tel: tel,
            address: address,
          },
          message: message,
        },
      });
      console.log(res);
      reset();
      await getCart();
      setIsLoading(false);
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
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
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => handleProductBtn(productItem)}
                      disabled={isComponentLoading}
                    >
                      查看更多
                      {isComponentLoading && (
                        <i className="fas fa-spinner fa-pulse ms-1"></i>
                      )}
                    </button>
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

      {cartData?.carts.length !== 0 && (
        <>
          <div className="text-end">
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={delCarts}
            >
              清空購物車
            </button>
          </div>
          <table className="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style={{ width: "150px" }}>數量/單位</th>
                <th>單價</th>
              </tr>
            </thead>
            <tbody>
              {cartData?.carts?.map((cartItem) => {
                return (
                  <tr key={cartItem.id}>
                    <th>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => delCartItem(cartItem.id)}
                      >
                        X
                      </button>
                    </th>
                    <th>{cartItem.product.title}</th>
                    <th style={{ width: "150px" }}>{cartItem.qty}</th>
                    <th>{cartItem.product.origin_price}</th>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">
                  總計
                </td>
                <td className="text-end">{cartData?.total}</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-end text-success">
                  折扣價
                </td>
                <td className="text-end text-success">
                  {cartData?.final_total}
                </td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
      <div className="my-5 row justify-content-center">
        <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="請輸入 Email"
              {...register("email", {
                required: "請輸入Email",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email格式錯誤",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className="form-error text-start">{message}</p>
              )}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              收件人姓名
            </label>
            <input
              id="name"
              name="姓名"
              type="text"
              className="form-control"
              placeholder="請輸入姓名"
              {...register("name", { required: "請輸入姓名" })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="form-error text-start">{message}</p>
              )}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tel" className="form-label">
              收件人電話
            </label>
            <input
              id="tel"
              name="電話"
              type="text"
              className="form-control"
              placeholder="請輸入電話"
              {...register("tel", {
                required: "請輸入電話",
                pattern: {
                  value: /^(0[2-8]\d{7}|09\d{8})$/,
                  message: "電話格式錯誤",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="tel"
              render={({ message }) => (
                <p className="form-error text-start">{message}</p>
              )}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              收件人地址
            </label>
            <input
              id="address"
              name="地址"
              type="text"
              className="form-control"
              placeholder="請輸入地址"
              {...register("address", {
                required: "請輸入地址",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="address"
              render={({ message }) => (
                <p className="form-error text-start">{message}</p>
              )}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              留言
            </label>
            <textarea
              id="message"
              className="form-control"
              cols="30"
              rows="10"
              {...register("message")}
            ></textarea>
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-danger">
              送出訂單
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
