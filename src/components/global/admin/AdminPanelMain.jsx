import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileAlt,
  faBook,
  faQuestionCircle,
  faUsers,
  faChartBar,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import CourseSetting from "./courses/CourseSetting";
import ArticleSetting from "./articles/ArticleSetting";
import FaqSetting from "./FAQ/FaqSetting";
import CourseOrgSetting from "./courses/CourseOrgSetting";
import ArticleOrgSetting from "./articles/ArticleOrgSetting";
import FaqOrgSetting from "./FAQ/FaqOrgSetting";
import Dashboard from "./Dashboard";
import UserSetting from "./UserSetting";
import { HiMenu, HiMenuAlt1 } from "react-icons/hi";

const AdminPanelMain = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    articles: false,
    courses: false,
    faq: false,
  });
  const [content, setContent] = useState({
    articleSetting: false,
    articleOrgSetting: false,
    courseSetting: false,
    courseOrgSetting: false,
    FaqSetting: false,
    FaqOrgSetting: false,
    dashboard: false,
    userSetting: false,
  });

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const contentHandling = (con) => {
    setContent((prev) => ({
      [con]: !prev[con],
    }));
  };

  const toggleDropdown = (section) => {
    setDropdownOpen((prev) => ({
      [section]: !prev[section],
    }));
  };

  return (
    <div className="container1">
      <motion.div
        className={`sidebar ${isOpen ? "active" : ""}`}
        initial={{ width: "5vh" }}
        animate={{ width: isOpen ? "70vw" : "15vh" }} // تغییر عرض بر اساس وضعیت
        exit={{ width: "0" }} // عرض هنگام خروج
        transition={{ duration: 0.5, ease: "easeInOut" }} // مدت زمان و نوع انیمیشن
      >
        <div className="toggle-button-container">
          {isOpen ? (
            <button className="toggle-button" onClick={toggleSidebar}>
              <HiMenuAlt1 />
            </button>
          ) : (
            <button className="toggle-button1" onClick={toggleSidebar}>
              <HiMenu />
            </button>
          )}
        </div>
        {isOpen && (
          <>
            <h2>ادمین: ارشیااردلان</h2>
            <ul>
              <li onClick={() => toggleDropdown("articles")}>
                <FontAwesomeIcon icon={faFileAlt} />
                <span>مقالات</span>
                <FontAwesomeIcon
                  icon={dropdownOpen.articles ? faChevronUp : faChevronDown}
                  className={`dropdown-arrow ${
                    dropdownOpen.articles ? "open" : ""
                  }`}
                />
              </li>
              {/* Dropdown for Articles */}
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: dropdownOpen.articles ? "auto" : 0 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {dropdownOpen.articles && (
                  <>
                    <li onClick={() => contentHandling("articleOrgSetting")}>
                      صفحه اصلی
                    </li>
                    <li onClick={() => contentHandling("articleSetting")}>
                      صفحه مخصوص
                    </li>
                  </>
                )}
              </motion.ul>

              <li onClick={() => toggleDropdown("courses")}>
                <FontAwesomeIcon icon={faBook} />
                <span>دوره ها</span>
                <FontAwesomeIcon
                  icon={dropdownOpen.courses ? faChevronUp : faChevronDown}
                  className={`dropdown-arrow ${
                    dropdownOpen.courses ? "open" : ""
                  }`}
                />
              </li>
              {/* Dropdown for Courses */}
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: dropdownOpen.courses ? "auto" : 0 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {dropdownOpen.courses && (
                  <>
                    <li onClick={() => contentHandling("courseOrgSetting")}>
                      صفحه اصلی
                    </li>
                    <li onClick={() => contentHandling("courseSetting")}>
                      صفحه مخصوص
                    </li>
                  </>
                )}
              </motion.ul>

              <li onClick={() => toggleDropdown("faq")}>
                <FontAwesomeIcon icon={faQuestionCircle} />
                <span>سوالات متداول</span>
                <FontAwesomeIcon
                  icon={dropdownOpen.faq ? faChevronUp : faChevronDown}
                  className={`dropdown-arrow ${dropdownOpen.faq ? "open" : ""}`}
                />
              </li>
              {/* Dropdown for FAQ */}
              <motion.ul
                initial={{ height: 0 }}
                animate={{ height: dropdownOpen.faq ? "auto" : 0 }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {dropdownOpen.faq && (
                  <>
                    <li onClick={() => contentHandling("FaqOrgSetting")}>
                      صفحه اصلی
                    </li>
                    <li onClick={() => contentHandling("FaqSetting")}>
                      صفحه مخصوص
                    </li>
                  </>
                )}
              </motion.ul>

              <li onClick={() => contentHandling("userSetting")}>
                <FontAwesomeIcon icon={faUsers} />
                <span>کاربران</span>
              </li>
              <li onClick={() => contentHandling("dashboard")}>
                <FontAwesomeIcon icon={faChartBar} />
                <span>آمار سایت</span>
              </li>
            </ul>
          </>
        )}
      </motion.div>
      <motion.div
        className="content active"
        id="content"
        initial={{ width: "172vh" }}
        animate={{ width: "80%" }} /* برای محتوای اصلی */
        transition={{ duration: 0.3 }}
      >
        {content.articleSetting ? <ArticleSetting /> : ""}
        {content.articleOrgSetting ? <ArticleOrgSetting /> : ""}
        {content.courseSetting ? <CourseSetting /> : ""}
        {content.courseOrgSetting ? <CourseOrgSetting /> : ""}
        {content.FaqSetting ? <FaqSetting /> : ""}
        {content.FaqOrgSetting ? <FaqOrgSetting /> : ""}
        {content.dashboard ? <Dashboard /> : ""}
        {content.userSetting ? <UserSetting /> : ""}
      </motion.div>
    </div>
  );
};

export default AdminPanelMain;
