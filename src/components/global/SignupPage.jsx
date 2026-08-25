import React, { useEffect, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { ToastContainer, toast } from "react-toastify";
import { UserContext, UserProvider } from "../../context/Authentication";
import axios from "axios";

const SignupPage = () => {
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
    name: Yup.string().required("نام الزامی است"),
    email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: Yup.string()
      .min(8, "حداقل 8 کاراکتر باشد")
      .required("پسورد الزامی است"),
  });

  const handleSubmit = async (values, { setValues, setTouched }) => {
    const newUser = {
      name: values.name,
      email: values.email,
      password: values.password,
      avatar: "",
      carts: [],
    };

    try {
      const response = await axios.get("http://localhost:3001/users");
      const existingUsers = response.data;

      const userExists = existingUsers.some(
        (user) => user.email === newUser.email || user.name === newUser.name
      );

      if (userExists) {
        toast.error("ایمیل یا نام کاربری تکراری است", {
          className: "toast-error",
        });
        setValues({ name: "", email: "", password: "" });
        setTouched({ name: false, email: false, password: false });
        return;
      }

      const createdUserResponse = await axios.post(
        "http://localhost:3001/users",
        newUser
      );
      const createdUser = createdUserResponse.data;

      toast.success("ثبت نام با موفقیت انجام شد", {
        className: "toast-success",
      });

      setUser(createdUser);

      setValues({ name: "", email: "", password: "" });
      setTouched({ name: false, email: false, password: false });
      navigate("/org-page");
    } catch (error) {
      console.error(error);

      if (error.response) {
        toast.error(error.response.data.message + "خطایی در ثبت نام رخ داد", {
          className: "toast-error",
        });
      }
      setValues({ name: "", email: "", password: "" });
      setTouched({ name: false, email: false, password: false });
    }
  };

  return (
    <UserProvider>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ToastContainer />
          <div className="signup-container">
            <h2>ثبت نام</h2>
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="form-sign-up">
                  <div className="form-group">
                    <div className="input-container">
                      <Field
                        name="name"
                        type="text"
                        className={`form-control ${
                          errors.name && touched.name ? "input-error" : ""
                        }`}
                        placeholder="نام"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>

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
                    ثبت نام
                  </button>

                  <div className="footer-links">
                    <p>
                      اگر قبلاً ثبت‌نام کرده‌اید،{" "}
                      <Link className="login-rout" to={"/login"}>
                        وارد شوید
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
            {/* <button onClick={() => navigate("/org-page")}>click</button> */}
          </div>
        </>
      )}
    </UserProvider>
  );
};

export default SignupPage;
