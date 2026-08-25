import React from "react";
import InstaImg from "../images/ins-foot/index_instagram_phone.png";
import Categories from "./org-section/Categories";
import Courses from "./org-section/Courses";
import Articles from "./org-section/Articles";
import Faq from "./org-section/Faq";
import TeacherCard from "./org-section/TeacherCard";
import NewsCard from "./org-section/NewsCard";
import Footer from "./org-section/Footer";
import SearchBar from "./org-section/SearchBar";

const OrgPage = () => {
  return (
    <>
      <SearchBar />

      <Categories />

      <section class="benefits-section">
        <h2 class="benefits-title">مزایای دوره‌های آموزشی ما</h2>
        <div class="benefits-container">
          <div class="benefit-card">
            <h3>آموزش‌های حرفه‌ای</h3>
            <p>
              دوره‌های ما توسط اساتید مجرب و حرفه‌ای طراحی شده‌اند تا بهترین
              تجربه یادگیری را برای شما فراهم کنند.
            </p>
          </div>
          <div class="benefit-card">
            <h3>دسترسی نامحدود</h3>
            <p>
              شما می‌توانید به تمامی دوره‌ها و محتواها به صورت نامحدود دسترسی
              داشته باشید و در هر زمان که خواستید یاد بگیرید.
            </p>
          </div>
          <div class="benefit-card">
            <h3>گواهینامه معتبر</h3>
            <p>
              پس از اتمام دوره‌ها، گواهینامه‌های معتبر و قابل استعلام دریافت
              خواهید کرد که می‌توانید در رزومه خود استفاده کنید.
            </p>
          </div>
          <div class="benefit-card">
            <h3>پشتیبانی 24/7</h3>
            <p>
              تیم پشتیبانی ما در هر ساعت از شبانه‌روز آماده پاسخگویی به سوالات و
              مشکلات شماست.
            </p>
          </div>
        </div>
      </section>

      <Courses />

      <Articles />
      <Faq />
      <TeacherCard />

      <NewsCard />
      <div class="instagram-ad">
        <div class="instagram-ad-content">
          <h2 class="instagram-ad-title">به ما در اینستاگرام بپیوندید!</h2>
          <p class="instagram-ad-description">
            هر روز محتوای آموزشی و جالب در صفحه اینستاگرام ما منتشر می‌شود.
          </p>
          <a href="#" class="instagram-ad-button">
            مشاهده پست ها
          </a>
        </div>
        <div class="instagram-ad-image">
          <img src={InstaImg} alt="Instagram" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrgPage;
