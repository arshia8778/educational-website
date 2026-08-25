import React, { useContext, useEffect, useState } from "react";
import NotFound from "../global/NotFound";
import { Link, useNavigate } from "react-router-dom";
import { getAllCart } from "../../services/CardsServices";
import { UserContext } from "../../context/Authentication";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast, ToastContainer } from "react-toastify";

const Courses = () => {
  const { user, carts, purchesCart, addCourseToCart } = useContext(UserContext);
  const [courseData, setCourseData] = useState([]);
  const [existingCourseInPurchesCart, setExistingCourseInPurchesCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const courseInCart = purchesCart.find(
      (item) => item.cartTitle === courseData.title
    );
    setExistingCourseInPurchesCart(courseInCart);
  }, [purchesCart, courseData, user]); 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCart();
        if (response.status === 200) {
          setCourseData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const addToCartHandling = (courseWithId) => {
    if (user != null) {
      const existingCourseInCarts = carts.find(
        (item) => item.cartTitle === courseWithId.title
      );


      if (existingCourseInPurchesCart) {
        toast.error("شما قبلاً این دوره را خریداری کرده‌اید", {
          className: "toast-error",
        });
        return;
      }

      if (existingCourseInCarts) {
        toast.error("شما قبلاً این دوره را به سبد خرید اضافه کرده‌اید", {
          className: "toast-error",
        });
        return;
      }

      if (courseWithId.cost === "رایگان") {
        toast.error("این دوره رایگان است و نیازی به خرید ندارد", {
          className: "toast-error",
        });
        return;
      }

      const userCart = {
        cartImg: courseWithId.photo,
        cartPrice: courseWithId.price,
        cartTitle: courseWithId.title,
        cartId: courseWithId.id,
        cartTeacher: courseWithId.teacher,
      };

      addCourseToCart(userCart);
      toast.success("دوره با موفقیت به سبد خرید اضافه شد", {
        className: "toast-success",
      });
    } else {
      confirmAlert({
        title: "ورود یا ثبت‌نام",
        message: "برای خرید دوره‌ها، ابتدا باید ثبت‌نام کنید یا به حساب قبلی خود وارد شوید.",
        buttons: [
          {
            label: "بستن",
            onClick: () => {},
          },
          {
            label: "ثبت‌نام",
            onClick: () => {
              navigate("/sign-up");
            },
          },
          {
            label: "ورود",
            onClick: () => {
              navigate("/login");
            },
          },
        ],
        customUI: ({ onClose }) => {
          return (
            <div
              className="co-alert"
              dir="rtl"
              style={{
                backgroundColor: "var(--header-color)",
                border: "3px solid var(--secondary-color)",
                borderRadius: "1em",
                width: 400,
                padding: "50px 20px",
                color: "var(--black-color)",
              }}
            >
              <div className="alert-text">
                <h1 style={{ color: "var(--secondary-color)" }}>ورود یا ثبت‌نام</h1>
                <p>برای خرید دوره‌ها، ابتدا باید ثبت‌نام کنید یا به حساب قبلی خود وارد شوید.</p>
              </div>
              <button onClick={onClose} className="btn3 btn-danger mx-2">بستن</button>
              <button onClick={() => { onClose(); navigate("/sign-up"); }} className="btn3 btn-success mx-2">ثبت‌نام</button>
              <button onClick={() => { onClose(); navigate("/login"); }} className="btn3 btn-primary mx-2">ورود</button>
            </div>
          );
        },
      });
    }
  };

  const renderCourse = (course) => {
    const existingCourseInPurchesCart = purchesCart.find(
      (item) => item.cartTitle === course.title
    );

    return (
      <div className="product-box" key={course.id}>
        <div className="product-box-img">
          <img src={course.photo} alt={course.title} />
        </div>
        <div className="title-discription">
          <h2>
            <a>{course.title}</a>
          </h2>
          {existingCourseInPurchesCart ? (
            <a
            className="shop-btn1"
            style={{color:"green", fontWeight:"600",pointerEvents:"none",borderColor:"green"}}
            onClick={() => addToCartHandling(course)}
          >
            <span>خریداری شده !</span>
          </a>
          ):(
            <a
            className="shop-btn1"
            onClick={() => addToCartHandling(course)}
          >
            <i
              className="fa fa-shopping-cart"
              style={{ paddingLeft: "5px" }}
            ></i>
            <span>خرید</span>
          </a>
          )
          }
        </div>
        <div className="meta">
          <div className="user-edit">
            <i className="fa-solid fa-chalkboard-user"></i>
            {course.teacher}
          </div>
        </div>
        <div className="price-box">
          <div className="user-icon">
            <i className="fa-solid fa-users"></i> {course.users}
          </div>
          <div className="price">
          {course.price === "رایگان" ? course.price : course.price + " تومان"}
          </div>
        </div>
        <div className="clearfix"></div>
        <Link to={`/org-course/${course.id}`}>
          <div className="more">
            مشاهده دوره
            <i aria-hidden="true" className="fas fa-long-arrow-alt-left"></i>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <div>
      <ToastContainer />
      <section className="container mt-50">
        <div className="wrap-product-box">
          <div className="product-title-head">
            <div className="title-head-pr">
              <h3>
                <i className="fa-solid fa-list-check"></i>
                جدیدترین دوره‌ها
              </h3>
            </div>
            <div className="link-head-pr">
              <Link to={"/course"}>
                مشاهده همه دوره‌ها
                <i aria-hidden="true" className="fas fa-long-arrow-alt-left"></i>
              </Link>
            </div>
          </div>
          <div className="clearfix"></div>
          {courseData.length > 0 ? (
            courseData.map(renderCourse) // استفاده از تابع renderCourse
          ) : (
            "صفحه یافت نشد"
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;