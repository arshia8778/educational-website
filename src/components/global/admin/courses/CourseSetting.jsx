import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { getAllCourse, removeCourse } from "../../../../services/CardsServices";
import { confirmAlert } from "react-confirm-alert";
import { IoMdAddCircleOutline } from "react-icons/io";

const CourseSetting = () => {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourse();
        if (response.status === 200) {
          setCourseData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, []);

  const deletCourse = (courseId, courseTitle) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            dir="rtl"
            style={{
              borderRadius: "1em",
              width: 400,
            }}
            className="p-4"
            id="alert2"
          >
            <h2 style={{ color: "var(--secondary-color)" }}>پاک کردن دوره</h2>
            <p style={{ color: "var(--secondary-color)" }}>
              آیا دوره {courseTitle} حذف شود؟
            </p>
            <button
              onClick={() => {
                handleRemoveCourse(courseId);
                onClose();
              }}
              className="btn btn-success mx-2"
              id="btn41"
            >
              بله
            </button>
            <button
              onClick={onClose}
              className="btn"
              id="btn4"
              style={{ backgroundColor: "gray" }}
            >
              انصراف
            </button>
          </div>
        );
      },
    });
  };

  const handleRemoveCourse = async (courseId) => {
    try {
      const { status } = await removeCourse(courseId);
      if (status === 200) {
        setCourseData((prevCourse) =>
          prevCourse.filter((course) => course.id !== courseId)
        );
      }
    } catch (error) {
      console.error("Error removing course:", error);
    }
  };

  return (
    <div>
      <section className="container mt-50">
        <div className="wrap-product-box">
          <div className="product-title-head">
            <div className="title-head-pr">
              <h3>
                <i className="fa-solid fa-list-check"></i>
                دوره‌های صفحه مخصوص
              </h3>
            </div>
          </div>
          <div className="clearfix"></div>
          {courseData.length > 0
            ? courseData.map((course) => {
                return (
                  <div className="product-box" key={course.id}>
                    <div className="buttons">
                      <Link to={`/edit-course/${course.id}`}>
                        <i className="edit">
                          <GrEdit />
                        </i>
                      </Link>
                      <i
                        className="delet"
                        onClick={() => deletCourse(course.id, course.title)}
                      >
                        <RiDeleteBin5Fill />
                      </i>
                    </div>
                    <div className="product-box-img">
                      <img src={course.photo} alt={course.title} />
                    </div>
                    <div className="title-discription">
                      <h2>
                        <a>{course.title}</a>
                      </h2>
                    </div>
                    <div className="meta">
                      <div className="user-edit">
                        <i className="fa-solid fa-chalkboard-user"></i>
                        {course.teacher}
                      </div>
                    </div>
                    <div className="price-box">
                      <div className="user-icon">
                        <i className="fa-solid fa-users"></i> {course.users}
                      </div>
                      <div className="price">
                        {course.price === "رایگان"
                          ? course.price
                          : course.price + " تومان"}
                      </div>
                    </div>
                    <div className="clearfix"></div>
                    <Link to={`/org-course/${course.id}`}>
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
              })
            : "صفحه یافت نشد"}
        </div>
      </section>
      <Link to={`/add-new-course`}>
        <div className="add-course-btn2">
          اضافه کردن دوره
          <IoMdAddCircleOutline
            style={{ fontSize: "20px", marginRight: "3px" }}
          />
        </div>
      </Link>
    </div>
  );
};

export default CourseSetting;
