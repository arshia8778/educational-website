import React from "react";
import FootImg from "../../images/footer/Newsletter.svg";

const Footer = () => {
  return (
    <>
      <div class="clearfix"></div>
      <footer class="container mt-50">
        <div class="footer-sec">
          <div class="about-footer">
            <h2>درباره پاسخ وردپرس</h2>
            <p>
              پاسخ وردپرس تداعی خلاقیت و نوآوری در دنیای وردپرس فارسی است ،
              کیفیت محصولات ، پشتیبانی ویژه و منحصربه فرد از ویژگی های برجسته
              پاسخ وردپرس میباشد.هدف پاسخ وردپرس رشد و ارتقای تجارت آنلاین و
              دیجیتال مارکتینگ در ایران به اندازه سهم خویش است. امیدواریم با کمک
              شما همراهان گرانقدر به این هدف دست یابیم.
            </p>
            <div class="list-icon-footer">
              <a href="#">
                <i class="fa-brands fa-square-twitter"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-telegram"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-square-facebook"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-square-instagram"></i>
              </a>
              <a href="#">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
          <div class="footer-menu">
            <h3>دسترسی سریع</h3>
            <ul>
              <li>
                <a href="#">صفحه اصلی</a>
              </li>
              <li>
                <a href="#">درباره ما</a>
              </li>
              <li>
                <a href="#">خدمات</a>
              </li>
              <li>
                <a href="#">دوره های آموزشی</a>
              </li>
              <li>
                <a href="#">تماس با ما</a>
              </li>
              <li>
                <a href="#">لیست وبلاگ</a>
              </li>
            </ul>
          </div>
          <div class="news">
            <img src={FootImg} />
            <h3>خبرنامه</h3>
            <div class="newsletter-form">
              <input
                class="form-control"
                type="email"
                name="EMAIL"
                placeholder="ایمیل خود را وارد کنید"
                required=""
              />
              <input type="submit" value="اشتراک" />
            </div>
          </div>
        </div>
      </footer>
      <div class="clearfix"></div>
      <div class="copy-right" style={{ margin: "0 auto" }}>
        <div class="background-overlay"></div>
        <p>
          تمامی حقوق مادی و معنوی این وبسایت متعلق به پاسخ وردپرس می باشد و هر
          گونه کپی برداری پیگرد قانونی دارد.
        </p>
      </div>
    </>
  );
};

export default Footer;
