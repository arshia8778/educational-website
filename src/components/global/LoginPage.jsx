import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/Authentication";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
   const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: Yup.string()
      .min(8, "حداقل 8 کاراکتر باشد")
      .required("پسورد الزامی است"),
  });

  const handleSubmit = async (values, { setValues, setTouched }) => {
    const { email, password } = values;

    try {
      const response = await axios.get("http://localhost:3001/users");
      const existingUsers = response.data;

      const user = existingUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        toast.success("ورود با موفقیت انجام شد", {
          className: "toast-success",
        });
        setValues({ email: "", password: "" });
        setTouched({ name: false, email: false, password: false });
        navigate("/org-page")
        setUser(user)
      } else {
        toast.error("شما قبلاً ثبت‌نام نکرده‌اید", {
          className: "toast-error",
        });
        setValues({ email: "", password: "" });
        setTouched({ name: false, email: false, password: false });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        toast.error(error.response.data.message + "خطایی در ورود رخ داد", {
          className: "toast-error",
        });
      }
      setValues({ email: "", password: "" });
      setTouched({ name: false, email: false, password: false });
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ToastContainer />
          <div className="signup-container">
            <h2>ورود</h2>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="form-sign-up">
                  <div className="form-group">
                    <div className="input-container">
                      <Field
                        name="email"
                        type="email"
                        className={`form-control ${
                          errors.email && touched.email ? "input-error" : ""
                        }`}
                        placeholder="ایمیل"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="form-group password-container">
                    <div className="input-container">
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${
                          errors.password && touched.password
                            ? "input-error"
                            : ""
                        }`}
                        placeholder="پسورد"
                      />
                      <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="toggle-password"
                      >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                      </span>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <button type="submit" className="submit-button">
                    ورود
                  </button>

                  <div className="footer-links">
                    <p>
                      اگر قبلاً ثبت‌نام نکرده‌اید،{" "}
                      <Link className="login-rout" to={"/sign-up"}>
                        ثبت‌نام کنید
                      </Link>
                    </p>
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

export default LoginPage;
