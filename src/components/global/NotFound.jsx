import React, { useEffect, useState } from "react";
import Error404 from "../../images/2205_w046_n004_125b_p1_125.jpg";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const NotFound = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="notfound-main">
            <img src={Error404} alt="" />
            <h1>خطای 404</h1>
            <p>
              دوست عزیز صفحه مورد نظر شما یافت نشده احتمالا مسیر وارد شده اشتباه
              است یا اینکه آنچه شما به دنبالش هستید در سایت ما موجود نیست
            </p>
            <Link to={"/org-page"}>
              <button>برگشت به صفحه اصلی</button>
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default NotFound;
