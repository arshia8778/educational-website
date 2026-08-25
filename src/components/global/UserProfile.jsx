import React, { useContext, useState, useEffect } from "react";
import userImg from "../../images/user.png";
import { UserContext } from "../../context/Authentication";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const UserProfile = () => {
  const { user, updateUser, setUser, setCarts } = useContext(UserContext);
  const [avatar, setAvatar] = useState(userImg);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (user && user.id) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/users/${user.id}`
          );
          const userData = response.data;

          if (userData.avatar) {
            setAvatar(userData.avatar);
          } else {
            setAvatar(userImg); // اگر عکسی وجود نداشته باشد، از عکس پیش‌فرض استفاده کن
          }
        } catch (error) {
          console.error("خطا در بارگذاری اطلاعات کاربر:", error);
        }
      };

      fetchUserData();
    }
  }, [user]);

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const avatarDataUrl = reader.result;
        setAvatar(avatarDataUrl);

        try {
          await axios.patch(`http://localhost:3001/users/${user.id}`, {
            avatar: avatarDataUrl,
          });
        } catch (error) {
          toast.error("خطا در ذخیره عکس پروفایل");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async (values, { setSubmitting }) => {
    try {
      updateUser({
        name: values.username,
        email: values.email,
        password: values.currentPassword,
      });

      const response = await axios.patch(
        `http://localhost:3001/users/${user.id}`,
        {
          name: values.username,
          email: values.email,
          password: values.currentPassword,
        }
      );

      toast.success("تغییرات با موفقیت ثبت شد", {
        className: "toast-success",
      });
    } catch (error) {
      toast.error("خطایی در ثبت تغییرات رخ داد", {
        className: "toast-error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const logOutHandeling = () => {
    const confirmLogout = window.confirm(
      "آیا می‌خواهید از حساب کاربری خود خارج شوید؟"
    );

    if (confirmLogout) {
      setUser(null);
      navigate("/org-page");
      setCarts([]); // خالی کردن سبد خرید
    }
  };

  const removeProfile = async () => {
    setAvatar(userImg); // تغییر عکس به عکس پیش‌فرض
    try {
      await axios.patch(`http://localhost:3001/users/${user.id}`, {
        avatar: "", 
      });
      toast.success("عکس پروفایل با موفقیت حذف شد", {
        className: "toast-success",
      });
    } catch (error) {
      toast.error("خطا در حذف عکس پروفایل", {
        className: "toast-error",
      });
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("نام الزامی است"),
    email: Yup.string()
      .email("ایمیل را به درستی وارد کنید")
      .required("وارد کردن ایمیل ضروری است"),
    currentPassword: Yup.string()
      .min(8, "پسورد باید 8 کاراکتر باشد")
      .required("وارد کردن رمز عبور ضروری است"),
  });

  if (!user) {
    return <div>لطفاً وارد حساب کاربری خود شوید.</div>;
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ToastContainer />
          <div className="user-profile">
            <div className="avatar-section">
              <img src={avatar} alt="Avatar" className="avatar" />
              <input
                type="file"
                id="avatar-input"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
              />
              <div className="buttons2">
                <button
                  className="change-avatar-btn"
                  onClick={() =>
                    document.getElementById("avatar-input").click()
                  }
                >
                  تنظیم عکس پروفایل
                </button>
                <button className="remove-profile" onClick={removeProfile}>
                  حذف پروفایل
                </button>
                <Link to={`/user-courses/${user.id}`}>
                <button className="user-carts-btn">
                  دوره های خریداری شده
                </button>
                </Link>
              </div>
            </div>

            <Formik
              initialValues={{
                username: user ? user.name : "",
                email: user ? user.email : "",
                currentPassword: user ? user.password : "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSaveChanges}
            >
              {({ isSubmitting }) => (
                <Form className="user-info">
                  <label htmlFor="username">نام کاربری:</label>
                  <Field type="text" id="username" name="username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error2"
                  />

                  <label htmlFor="email">ایمیل:</label>
                  <Field type="email" id="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error2"
                  />

                  <label htmlFor="current-password">رمز عبور فعلی:</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="current-password"
                    name="currentPassword"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="toggle-password2"
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </span>
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="error23"
                  />
                  <div className="buttons3">
                    <input
                      type="submit"
                      className="save-btn"
                      disabled={isSubmitting}
                      value="ذخیره تغییرات"
                    />
                    <input
                      type="button"
                      onClick={logOutHandeling}
                      className="log-out"
                      value="خروج از حساب کاربری"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
};

export default UserProfile;
