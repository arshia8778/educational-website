import React, { useContext, useEffect, useState } from "react";
import ShopImg from "../../images/online-shopping.png";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { UserContext } from "../../context/Authentication";

const ShopCards = () => {
  const [loading, setLoading] = useState(true);
  const { user, carts, addCourseToCart, removeCourseFromCart } = useContext(UserContext); 
  const [message, setMessage] = useState(""); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // محاسبه جمع قیمت دوره‌ها
  const calculateTotal = (carts) => {
    if (!Array.isArray(carts)) return 0; // بررسی اینکه carts یک آرایه است
    return carts.reduce(
      (acc, cart) => acc + parseFloat(cart.cartPrice.replace(/,/g, "")),
      0
    );
  };

  const totalPrice = calculateTotal(carts); // استفاده از carts به‌طور مستقیم
  const discount = totalPrice > 0 ? 100000 : 0; // اعمال تخفیف تنها در صورت وجود محصول
  const taxPerItem = 25000; // مالیات به ازای هر دوره
  const totalTax = carts.length * taxPerItem; // مالیات کل
  const finalAmount = totalPrice - discount + totalTax; // قیمت نهایی

  const handleContinueShopping = () => {
    if (carts.length === 0) {
      setMessage("محصولی در سبد خرید وجود ندارد."); // نمایش پیام
    } else {
      setMessage(""); // پاک کردن پیام
      navigate("/payment-page"); // هدایت به صفحه پرداخت
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section className="shop-cart-box">
          <div className="right-item">
            {carts.length > 0 ? (
              carts.map((cart) => (
                <div className="right-item2" key={cart.cartId}>
                  <div
                    className="delete-icon"
                    onClick={() => removeCourseFromCart(cart.cartId)} // استفاده از تابع حذف
                  >
                    <i className="fas fa-trash-alt"></i>
                  </div>
                  <div className="img-cart">
                    <img src={cart.cartImg} alt={cart.cartTitle} />
                  </div>
                  <div className="description-cart product-info">
                    <h5>
                      عنوان محصول: <span>{cart.cartTitle}</span>
                    </h5>
                    <div className="separator"></div>
                    <h5>
                      قیمت: <span>{cart.cartPrice}</span>
                    </h5>
                    <div className="separator"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="right-item1">
                <img src={ShopImg} alt="" />
                <h3>هیچ دوره‌ای در سبد خرید وجود ندارد!</h3>
                <p>
                  به صفحه اصلی بروید و در بین دوره‌ها دوره مورد نظر خود را انتخاب کرده و خریداری کنید.{" "}
                  <Link to={`/org-page`} style={{ color: "#0077ff" }}>
                    صفحه اصلی
                  </Link>
                </p>
              </div>
            )}
          </div>

          <div className="left-item">
            <h4>خلاصه سفارش</h4>
            <h5>
              جمع
              <span className="total-prize">
                {totalPrice.toLocaleString()} تومان
              </span>
            </h5>
            <hr />
            <h5>
              تخفیف محصولات
              <span className="cart-discount">
                {discount.toLocaleString()} تومان
              </span>
            </h5>
            <h5>
              مالیات
              <span className="tax-prize">
                {totalTax.toLocaleString()} تومان
              </span>
            </h5>
            <hr />
            <h5>
              قابل پرداخت
              <span className="finaly-prize">
                {finalAmount.toLocaleString()} تومان
              </span>
            </h5>
            <button className="next-shopping" onClick={handleContinueShopping}>
              ادامه دادن خرید
            </button>
            {message && <p style={{ color: "red" }}>{message}</p>} {/* نمایش پیام خطا */}
          </div>
        </section>
      )}
    </>
  );
};

export default ShopCards;