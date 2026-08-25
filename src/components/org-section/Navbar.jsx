import React, { useContext, useEffect, useState } from "react";
import ModeToggle from "./ModeToggle";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/Authentication";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { user, carts } = useContext(UserContext);

  const handleMenuToggle = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  window.onscroll = function () {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      scrollToTopBtn.classList.remove("hide");
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
      scrollToTopBtn.classList.add("hide");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <button
        id="scrollToTopBtn"
        className="scroll-to-top hide"
        onClick={scrollToTop}
      >
        <i className="fas fa-angle-up"></i>{" "}
      </button>
      <div className="container">
        <div className="notification">
          <p>
            <i className="fa fa-star"></i>
            تخفیف ویژه نوروز، قبل از افزایش قیمت با تخفیف ویژه، دوره‌ات رو تهیه
            کن
            <a>
              اطلاعات بیشتر
              <i aria-hidden="true" className="fas fa-long-arrow-alt-left"></i>
            </a>
          </p>
        </div>
      </div>

      <div className="top-menu">
        <div className="container">
          <div
            className="menu-toggle"
            id="menu-toggle"
            onClick={handleMenuToggle}
          >
            {isMenuActive ? (
              <i className="fas fa-times"></i>
            ) : (
              <i className="fas fa-bars"></i>
            )}
          </div>
          <nav
            className={`main-menu ${isMenuActive ? "active" : ""}`}
            id="main-menu"
          >
            <ul>
              <li>
                <Link className="active-link" to={"/org-page"}>
                  <i className="fa fa-home"></i> خانه
                </Link>
              </li>
              <li>
                <a>
                  <i className="fa fa-newspaper-o"></i> آزمون روزانه
                </a>
              </li>
              <li>
                <Link to={"/course"}>
                  <i className="fa fa-graduation-cap"></i> دوره ها
                </Link>
              </li>
              <li>
                <Link to={"/articles"}>مقالات</Link>
              </li>
              <li>
                <Link to={"/FAQ"}>سوالات متداول</Link>
              </li>
              <li>
                <Link to={"/admin-panel"}>
                  <i className="fas fa-headphones-alt"></i> پنل مدیریت
                </Link>
              </li>
            </ul>
          </nav>
          <div className="left-menu">
            <ModeToggle />
            {user != null ? (
              <Link to={`/profile/${user.id}`} title="پروفایل" id="profile-btn">
                <FaRegUser className="profile-icon" />
                <span>پروفایل</span>
              </Link>
            ) : (
              <Link to={"/sign-up"} title="ثبت نام | ورود" id="login-sign">
                <i
                  className="fa-solid fa-user-plus"
                  style={{ paddingLeft: "7px" }}
                ></i>
                <span>ثبت نام | ورود</span>
              </Link>
            )}

            <div id="shop-icon" className="icon-menu" title="سبد خرید">
              <Link to={"/shop"}>
                <i
                  className="fas fa-shopping-cart"
                  style={{ fontSize: "16px" }}
                ></i>
              </Link>

              <span className="badge" style={{ fontFamily: "IRANSans" }}>
                {carts ? carts.length : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
