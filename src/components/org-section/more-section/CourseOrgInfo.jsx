import React, { useContext, useEffect, useState } from "react";
import { HiOutlineArrowTrendingDown } from "react-icons/hi2";
import { useNavigate, useParams } from "react-router-dom";
import { getCourseOrgInfo } from "../../../services/CardsServices";
import NotFound from "../../global/NotFound";
import Spinner from "../../global/Spinner";
import { TiArrowLeftOutline } from "react-icons/ti";
import { UserContext } from "../../../context/Authentication";
import { FaCartShopping } from "react-icons/fa6";
import { confirmAlert } from "react-confirm-alert";
import { toast, ToastContainer } from "react-toastify";

const CoursesOrgInfo = () => {
  const { courseOrgId } = useParams();
  const [courseInfo, setCourseInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const navigate = useNavigate();
  const { user, carts, purchesCart, addCourseToCart } = useContext(UserContext); // اصلاح شده
 const [existingCourseInPurchesCart, setExistingCourseInPurchesCart] =
     useState(null);
     useEffect(() => {
       const courseInCart = purchesCart.find(
         (item) => item.cartTitle === courseInfo.title
       );
       setExistingCourseInPurchesCart(courseInCart);
     }, [purchesCart, courseInfo]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchCoursedetails = async () => {
      try {
        const { data, status } = await getCourseOrgInfo(courseOrgId);
        if (status === 200) {
          setCourseInfo(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchCoursedetails();
  }, [courseOrgId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addCartHandling = () => {
    if (user != null) {
      const existingCourseInCarts = carts.find(
        (item) => item.cartTitle === courseInfo.title
      );
      if (existingCourseInCarts) {
        toast.error("شما قبلاً این دوره را به سبد خرید اضافه کرده‌اید", {
          className: "toast-error",
        });
        return;
      }
      const userCart = {
        cartImg: courseInfo.photo,
        cartPrice: courseInfo.price,
        cartTitle: courseInfo.title,
        cartId: courseInfo.id,
        cartTeacher: courseInfo.teacher,
      };

      addCourseToCart(userCart);
      toast.success("دوره با موفقیت به سبد خرید اضافه شد", {
        className: "toast-success",
      });
    } else {
      confirmAlert({
        title: "ورود یا ثبت‌نام",
        message:
          "برای خرید دوره‌ها، ابتدا باید ثبت‌نام کنید یا به حساب قبلی خود وارد شوید.",
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
                <h1 style={{ color: "var(--secondary-color)" }}>
                  ورود یا ثبت‌نام
                </h1>
                <p>
                  برای خرید دوره‌ها، ابتدا باید ثبت‌نام کنید یا به حساب قبلی خود
                  وارد شوید.
                </p>
              </div>
              <button onClick={onClose} className="btn3 btn-danger mx-2">
                بستن
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate("/sign-up");
                }}
                className="btn3 btn-success mx-2"
              >
                ثبت‌نام
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate("/login");
                }}
                className="btn3 btn-primary mx-2"
              >
                ورود
              </button>
            </div>
          );
        },
      });
    }
  };

  const handleViewSession = (sessionId) => {
    if (user === null) {
      confirmAlert({
        title: "ورود یا ثبت‌نام",
        message:
          "برای خرید دوره‌ها، ابتدا باید ثبت‌نام کنید یا به حساب قبلی خود وارد شوید.",
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
                <h1 style={{ color: "var(--secondary-color)" }}>
                  ورود یا ثبت‌نام
                </h1>
                <p>
                  برای تماشای ویدیو های رایگان ابتدا باید ثبت‌نام کنید یا به حساب قبلی خود
                  وارد شوید.
                </p>
              </div>
              <button onClick={onClose} className="btn3 btn-danger mx-2">
                بستن
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate("/sign-up");
                }}
                className="btn3 btn-success mx-2"
              >
                ثبت‌نام
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate("/login");
                }}
                className="btn3 btn-primary mx-2"
              >
                ورود
              </button>
            </div>
          );
        },
      });
      return;
    }
    setCurrentSessionId(sessionId);
    setShowVideo(true);
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    setCurrentSessionId(null); // reset session ID
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ToastContainer />
          {(courseInfo && courseInfo.cost === "رایگان") ||
          existingCourseInPurchesCart ? ( // اصلاح شده
            <div className="course-info-con">
              <div className="course-info-wrap">
                <div className="course-info-one">
                  <h1>{courseInfo.title}</h1>
                  <div className="image-container">
                    <img src={courseInfo.photo} alt="" />
                    <p>{courseInfo.description}</p>
                  </div>
                  <h2>از اینجا شروع کنید</h2>
                  <HiOutlineArrowTrendingDown className="flash-icon" />
                </div>
                <div className="course-info-two">
                  {Array.isArray(courseInfo.session) &&
                  courseInfo.session.length > 0
                    ? courseInfo.session.map((session) => (
                        <>
                          <div className="session-card" key={session.id}>
                            <div className="session-image">
                             جلسه {session.sessionNumber}
                            </div>
                            <h5 className="session-name">{session.title}</h5>
                            <div className="session-more">
                              <p className="session-number">
                               جلسه {session.sessionNumber}
                                <TiArrowLeftOutline className="flash-icon2" />
                              </p>
                              <button
                                className="view-session"
                                onClick={() => handleViewSession(session.id)}
                              >
                                مشاهده
                              </button>
                            </div>
                          </div>

                 {showVideo && currentSessionId === session.id && (
                        <div className="video-modal">
                          <div className="video-container">
                            <button
                              className="close-button"
                              onClick={handleCloseVideo}
                            >
                              بستن
                            </button>
                            <video controls>
                              <source
                                src={session.videoUrl}
                                type="video/mp4"
                              />
                              مرورگر شما از تگ ویدیو پشتیبانی نمی‌کند.
                            </video>
                          </div>
                        </div>
                      )}
                        </>
                      ))
                    : "صفحه یافت نشد"}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="course-info-con">
                <div className="course-info-wrap">
                  <div className="course-info-one">
                    <h1>{courseInfo.title}</h1>
                    <div className="image-container">
                      <img src={courseInfo.photo} alt="" />
                      <p>{courseInfo.description}</p>
                      <button onClick={addCartHandling}>
                        افزودن به سبد خرید{" "}
                        <FaCartShopping
                          style={{ position: "relative", top: "5px" }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default CoursesOrgInfo;
