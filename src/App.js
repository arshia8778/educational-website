import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./Styles/style.css";
import { ShopContext } from "./context/ShopContext";
import ShopCards from "./components/global/ShopCards";
import { useEffect, useState } from "react";
import OrgPage from "./components/OrgPage";
import Navbar from "./components/org-section/Navbar";
import CoursesInfo from "./components/other-section/more-section/CoursesInfo";
import CoursesOrgInfo from "./components/org-section/more-section/CourseOrgInfo";
import CoursesCard from "./components/other-section/CoursesCard";
import Faq1 from "./components/other-section/Faq1";
import Articles1 from "./components/other-section/Articles1";
import ArticlesOrgInfo from "./components/org-section/more-section/ArticlesOrgInfo";
import ArticlesInfo from "./components/other-section/more-section/ArticlesInfo";
import FaqOrgInfo from "./components/org-section/more-section/FaqOrgInfo";
import FaqInfo from "./components/other-section/more-section/FaqInfo";
import Spinner from "./components/global/Spinner";
import NotFound from "./components/global/NotFound";
import SignupPage from "./components/global/SignupPage";
import LoginPage from "./components/global/LoginPage";
import { UserProvider } from "./context/Authentication";
import UserProfile from "./components/global/UserProfile";
import UserCourse from "./components/global/UserCourse";
import PaymentPage from "./components/global/PaymentPage";
import AdminPanelMain from "./components/global/admin/AdminPanelMain";
import AddCourse from "./components/global/admin/courses/add-course/AddCourse";
import AddOrgCourse from "./components/global/admin/courses/add-course/AddOrgCourse";
import AddArticle from "./components/global/admin/articles/add-article/AddArticle";
import AddOrgArticle from "./components/global/admin/articles/add-article/AddOrgArticle";
import AddFaq from "./components/global/admin/FAQ/add-faq/AddFaq";
import AddOrgFaq from "./components/global/admin/FAQ/add-faq/AddOrgFaq";
import CourseEdit from "./components/global/admin/courses/edit-course/CourseEdit";
import CourseOrgEdit from "./components/global/admin/courses/edit-course/CourseOrgEdit";
import ArticleEdit from "./components/global/admin/articles/edit-article/ArticleEdit";
import ArticleOrgEdit from "./components/global/admin/articles/edit-article/ArticleOrgEdit";
import FaqEdit from "./components/global/admin/FAQ/edit-faq/FaqEdit";
import FaqOrgEdit from "./components/global/admin/FAQ/edit-faq/FaqOrgEdit";


function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const modeToggle = () => {
    let toggleButton = document.getElementById("mode-toggle");
    let sunIcon = document.getElementById("sun-icon");
    let moonIcon = document.getElementById("moon-icon");

    // Check for existence of elements before accessing style
    if (!toggleButton || !sunIcon || !moonIcon) return;

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      sunIcon.style.display = "inline";
      moonIcon.style.display = "none";
      document.documentElement.style.setProperty("--primary-color", "#0a0c20");
      document.documentElement.style.setProperty("--black-color", "#fff");
      document.documentElement.style.setProperty("--gray-color", "#fff");
      document.documentElement.style.setProperty(
        "--background-color",
        "#0a0c20"
      );
      document.documentElement.style.setProperty("--header-color", "#143D60");
      document.documentElement.style.setProperty("--toast-color", "#143D60");
      document.documentElement.style.setProperty("--secondary-color", "#fff");
      toggleButton.style.backgroundColor = "#0a0c20";
    } else {
      sunIcon.style.display = "none";
      moonIcon.style.display = "inline";
      document.documentElement.style.setProperty("--primary-color", "#fff");
      document.documentElement.style.setProperty("--black-color", "#000");
      document.documentElement.style.setProperty("--gray-color", "#333");
      document.documentElement.style.setProperty(
        "--background-color",
        "#D1F8EF"
      );
      document.documentElement.style.setProperty(
        "--header-color",
        "rgba(255, 255, 255, 0.9)"
      );
      document.documentElement.style.setProperty("--toast-color", "#ffffff");
      document.documentElement.style.setProperty(
        "--secondary-color",
        "#0077ff"
      );
      toggleButton.style.backgroundColor = "#8bd4ff";
    }
  };

  // Using useEffect to call modeToggle
  useEffect(() => {
    modeToggle();
  }, []);

  return (
    <Router>
      {loading ? (
        <Spinner />
      ) : (
        <ShopContext.Provider value={{ modeToggle }}>
          <UserProvider>
            <Navbar />
            <Routes>
            <Route path="/add-new-course" element={<AddCourse />} />
            <Route path="/add-org-new-course" element={<AddOrgCourse />} />
            <Route path="/add-new-article" element={<AddArticle />} />
            <Route path="/add-org-new-article" element={<AddOrgArticle />} />
            <Route path="/add-new-faq" element={<AddFaq />} />
            <Route path="/add-org-new-faq" element={<AddOrgFaq />} />
            //edit route
            <Route path="/edit-course/:courseId" element={<CourseEdit />} />
            <Route path="/edit-org-course/:courseOrgId" element={<CourseOrgEdit />} />
            <Route path="/edit-article/:ArticleId" element={<ArticleEdit />} />
            <Route path="/edit-org-article/:ArticleOrgId" element={<ArticleOrgEdit />} />
            <Route path="/edit-faq/:FaqId" element={<FaqEdit />} />
            <Route path="/edit-org-faq/:FaqOrgId" element={<FaqOrgEdit />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/org-page" element={<OrgPage />} />
              <Route path="/" element={<Navigate to="/org-page" />} />
              <Route path="/shop" element={<ShopCards />} />
              <Route path="/course" element={<CoursesCard />} />
              <Route path="/articles" element={<Articles1 />} />
              <Route path="/FAQ" element={<Faq1 />} />
              <Route path="/admin-panel" element={<AdminPanelMain />} />
              <Route path="/course/:courseId" element={<CoursesInfo />} />
              <Route
                path="/org-course/:courseOrgId"
                element={<CoursesOrgInfo />}
              />
              <Route
                path="/org-article/:ArticleOrgId"
                element={<ArticlesOrgInfo />}
              />
              <Route path="/articles/:ArticleId" element={<ArticlesInfo />} />
              <Route path="/org-faq/:FaqOrgId" element={<FaqOrgInfo />} />
              <Route path="/FAQ/:FaqId" element={<FaqInfo />} />
              <Route path="/profile/:userId" element={<UserProfile />} />
              <Route path="/user-courses/:userId" element={<UserCourse />} />
              <Route path="/payment-page" element={<PaymentPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </UserProvider>
        </ShopContext.Provider>
      )}
    </Router>
  );
}

export default App;
