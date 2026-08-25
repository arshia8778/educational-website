import React, { useContext, useEffect, useState } from "react";
import { getAllCourse } from "../../services/CardsServices";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, UserProvider } from "../../context/Authentication";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const CoursesCard = () => {
  const [course, setCourse] = useState([]);
  const [selectedCost, setSelectedCost] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [filteredCourse, setFilteredCourse] = useState([]);
    const [existingCourseInPurchesCart, setExistingCourseInPurchesCart] = useState(null);
  const { user, carts, purchesCart, addCourseToCart } = useContext(UserContext);
  const navigate = useNavigate();


  const Selectactiveclass = () => {
    const custom_select_container = document.getElementById("select-items");
    custom_select_container.classList.toggle("active");
  };
  const Selectactiveclass2 = () => {
    const custom_select_container2 = document.getElementById("select-items2");
    custom_select_container2.classList.toggle("active");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getAllCourse();
        if (response.status == 200) {
          setCourse(response.data);
          setFilteredCourse(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, []);

  const filterCourses = () => {
    setFilteredCourse(
      course.filter((course1) => {
        const costMatch = selectedCost
          ? course1.cost.toLowerCase().includes(selectedCost.toLowerCase())
          : true;
        const topicMatch = selectedTopic
          ? course1.topics.toLowerCase().includes(selectedTopic.toLowerCase())
          : true;
        return costMatch && topicMatch;
      })
    );
  };

  const Selecthandle = (event) => {
    if (!event || !event.target) {
      console.error("Event or event.target is undefined");
      return;
    }

    const selectedValue = event.target.dataset.value;
    if (!selectedValue) return;

    setSelectedCost(selectedValue); // ذخیره مقدار انتخاب شده از cost
    filterCourses(); // فیلتر دوره‌ها
  };

  const selectOption = function (event) {
    if (!event || !event.target) {
      console.error("Event or event.target is undefined");
      return;
    }
    const selectedValue = event.target.dataset.value;
    const selectSelected = document.getElementById("select-selected");

    if (!selectSelected) {
      console.error("Element with id 'select-selected' not found");
      return;
    }

    selectSelected.innerHTML =
      selectedValue + ' <i class="fas fa-angle-down"></i>';
    const custom_select_container = document.getElementById("select-items");

    if (!custom_select_container) {
      console.error("Element with id 'select-items' not found");
      return;
    }

    RemoveactiveClass(event);
    Selecthandle(event);
  };

  const RemoveactiveClass = (event) => {
    const custom_select_container = document.getElementById("select-items");
    const selectSelected = document.getElementById("select-selected");

    if (!custom_select_container || !selectSelected) {
      console.error("Elements not found");
      return;
    }

    if (
      !custom_select_container.contains(event.target) &&
      !selectSelected.contains(event.target)
    ) {
      custom_select_container.classList.remove("active");
    }
  };

  const Selecthandle2 = (event) => {
    if (!event || !event.target) {
      console.error("Event or event.target is undefined");
      return;
    }

    const selectedValue = event.target.dataset.value;
    if (!selectedValue) return;

    setSelectedTopic(selectedValue);
    filterCourses();
  };

  const selectOption2 = function (event) {
    if (!event || !event.target) {
      console.error("Event or event.target is undefined");
      return;
    }

    const selectedValue = event.target.dataset.value;
    const selectSelected2 = document.getElementById("select-selected2");

    if (!selectSelected2) {
      console.error("Element with id 'select-selected2' not found");
      return;
    }

    selectSelected2.innerHTML =
      selectedValue + ' <i class="fas fa-angle-down"></i>';
    const custom_select_container2 = document.getElementById("select-items2");

    if (!custom_select_container2) {
      console.error("Element with id 'select-items2' not found");
      return;
    }

    RemoveactiveClass2(event);
    Selecthandle2(event);
  };

  const RemoveactiveClass2 = (event) => {
    const custom_select_container2 = document.getElementById("select-items2");
    const selectSelected2 = document.getElementById("select-selected2");

    if (!custom_select_container2 || !selectSelected2) {
      console.error("Elements not found");
      return;
    }

    if (
      !custom_select_container2.contains(event.target) &&
      !selectSelected2.contains(event.target)
    ) {
      custom_select_container2.classList.remove("active");
    }
  };

  useEffect(() => {
    addOptionListeners();
    addOptionListeners2();

    const handleClickOutside = (event) => {
      RemoveactiveClass(event);
      RemoveactiveClass2(event);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const addOptionListeners = () => {
    const options = document.querySelectorAll(".select-items div");
    options.forEach((option) => {
      option.addEventListener("click", selectOption.bind(this));
    });
  };

  const addOptionListeners2 = () => {
    const options2 = document.querySelectorAll(".select-items2 div");
    options2.forEach((option2) => {
      option2.addEventListener("click", selectOption2.bind(this));
    });
  };

  useEffect(() => {
    const courseInCart = purchesCart.find(
      (item) => item.cartTitle === course.title
    );
    setExistingCourseInPurchesCart(courseInCart);
  }, [purchesCart, course]); 

  const addToCartHandling = (courseWithId) => {
    if (user != null) {
      const existingCourseInCarts = carts.find(item => item.cartTitle === courseWithId.title);
  

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
        cartId: courseWithId.id, // استفاده از id دوره
        cartTeacher: courseWithId.teacher,
      };

      // استفاده از تابع addCourseToCart از UserContext
      addCourseToCart(userCart);
      toast.success("دوره با موفقیت به سبد خرید اضافه شد", {
        className: "toast-success",
      });
    } else {
      // اگر کاربر وارد نشده باشد
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

  const renderCourse1 = (course, index) => {
    const courseWithId = { ...course, id: index };
    const existingCourseInPurchesCart = purchesCart.find(item => item.cartTitle === courseWithId.title);
    return (
      <div className="product-box" key={courseWithId.id}>
        <div className="product-box-img">
          <img src={courseWithId.photo} />
        </div>
        <div className="title-discription">
          <h2>
            <a>{courseWithId.title}</a>
          </h2>
          {existingCourseInPurchesCart ? (
            <a
            className="shop-btn1"
            style={{color:"green", fontWeight:"600",pointerEvents:"none",borderColor:"green"}}
            onClick={() => addToCartHandling(courseWithId, course)}
          >
            <span>خریداری شده !</span>
          </a>
          ):(
            <a
            className="shop-btn1"
            onClick={() => addToCartHandling(courseWithId, course)}
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
            {courseWithId.teacher}
          </div>
        </div>
        <div className="price-box">
          <div className="user-icon">
            <i className="fa-solid fa-users"></i>{" "}
            {courseWithId.users}
          </div>
          <div className="price">
            {course.price === "رایگان" ? course.price : course.price + " تومان"}
          </div>
        </div>
        <div className="clearfix"></div>

        <Link to={`/course/${course.id}`}>
          <div className="more">
            مشاهده دوره
            <i
              aria-hidden="true"
              className="fas fa-long-arrow-alt-left"
            ></i>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <UserProvider>
      <ToastContainer />
      <div className="clearfix"></div>
      <section className="container mt-50 mb-50">
        <div className="wrap-product-box">
          <div className="title-course">
            <h1>همه دوره ها</h1>
          </div>
          <div className="custom-select-container" onClick={Selectactiveclass}>
            <div className="custom-select">
              <div
                className="select-selected"
                id="select-selected"
                onClick={(event) => Selecthandle(event)}
              >
                مرتب‌سازی <i className="fas fa-angle-down"></i>
              </div>
              <div className="select-items" id="select-items">
                <div data-value="رایگان" onClick={selectOption}>
                  رایگان
                </div>
                <div data-value="گران" onClick={selectOption}>
                  گران
                </div>
                <div data-value="ارزان" onClick={selectOption}>
                  ارزان
                </div>
              </div>
            </div>
          </div>

          <div
            className="custom-select-container2"
            onClick={Selectactiveclass2}
          >
            <div className="custom-select2">
              <div
                className="select-selected2"
                id="select-selected2"
                onClick={(event) => Selecthandle2(event)}
              >
                چه دوره ای میخوای؟ <i className="fas fa-angle-down"></i>
              </div>
              <div className="select-items2" id="select-items2">
                <div data-value="برنامه نویسی" onClick={selectOption2}>
                  برنامه نویسی
                </div>
                <div data-value="ترید" onClick={selectOption2}>
                  ترید
                </div>
              </div>
            </div>
          </div>

          <div className="clearfix"></div>
          {filteredCourse.length > 0
            ? filteredCourse.map(renderCourse1)
            : "datas not found"}
        </div>
      </section>
    </UserProvider>
  );
};

export default CoursesCard;
