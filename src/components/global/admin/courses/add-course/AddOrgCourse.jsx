import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";

const AddOrgCourse = () => {
  const [courseData, setCourseData] = useState({
    photo: "",
    title: "",
    price: "",
    teacher: "",
    users: "",
    description: "",
    cost: "",
    topics: "",
  });

  const [sessions, setSessions] = useState([
    { sessionNumber: "جلسه 1", title: "", videoUrl: "" },
  ]);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      // حذف کاماها از ورودی
      const numericValue = value.replace(/,/g, '');

      // تبدیل به عدد
      const number = parseFloat(numericValue);

      // فرمت‌دهی عدد به شکل جداکننده‌های هزار
      const formattedValue = isNaN(number) ? '' : number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      setCourseData({ ...courseData, [name]: formattedValue });
    } else {
      setCourseData({ ...courseData, [name]: value });
    }
  };

  const handleSessionChange = (index, e) => {
    const { name, value } = e.target;
    const newSessions = [...sessions];
    newSessions[index][name] = value;
    setSessions(newSessions);
  };

  const addSession = () => {
    const newSessionNumber = `جلسه ${sessions.length + 1}`; // تعیین شماره جلسه جدید
    setSessions([...sessions, { sessionNumber: newSessionNumber, title: "", videoUrl: "" }]);
  };

  const removeSession = (index) => {
    const newSessions = sessions.filter((_, i) => i !== index)
      .map((session, i) => ({
        ...session,
        sessionNumber: `جلسه ${i + 1}`, // به‌روزرسانی شماره جلسه‌ها
      }));
    setSessions(newSessions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      ...courseData,
      sessions, // اضافه کردن جلسات که شامل sessionNumber است
    };

    try {
      const response = await axios.post("http://localhost:3001/cards-org-page", newCourse);
      if (response.status === 201) {
        alert("دوره جدید با موفقیت اضافه شد!");
        // Resetting all input fields
        setCourseData({
          title: "",
          photo: "",
          users: "",
          teacher: "",
          price: "",
          topics: "",
          cost: "",
          description: "",
        });
        setSessions([{ sessionNumber: "جلسه 1", title: "", videoUrl: "" }]); // Reset sessions
      }
    } catch (error) {
      console.error("Error adding course:", error);
      alert("خطا در اضافه کردن دوره. لطفاً دوباره تلاش کنید.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="form-container">
      <h1 className="form-title">اضافه کردن دوره به صفحه مخصوص</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group2">
          <label className="form-label">عکس دوره (URL)</label>
          <input
            type="text"
            name="photo"
            className="form-input"
            value={courseData.photo}
            onChange={handleCourseChange}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label">عنوان</label>
          <input
            style={{ fontFamily: "IRANSans" }}
            type="text"
            name="title"
            className="form-input"
            value={courseData.title}
            onChange={handleCourseChange}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label">قیمت</label>
          <input
            type="text"
            name="price"
            className="form-input"
            value={courseData.price}
            onChange={handleCourseChange}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label">نام مدرس</label>
          <input
            style={{ fontFamily: "IRANSans" }}
            type="text"
            name="teacher"
            className="form-input"
            value={courseData.teacher}
            onChange={handleCourseChange}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label">کاربران دوره</label>
          <input
            type="number"
            name="users"
            className="form-input"
            value={courseData.users}
            onChange={handleCourseChange}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label">توضیحات دوره</label>
          <textarea
            style={{ fontFamily: "IRANSans" }}
            name="description"
            className="form-textarea"
            value={courseData.description}
            onChange={handleCourseChange}
             
          ></textarea>
        </div>
        <div className="form-group2">
          <label className="form-label">ارزش دوره</label>
          <select
            name="cost"
            className="form-input"
            value={courseData.cost}
            onChange={handleCourseChange}
            style={{ fontFamily: "IRANSans" }}
             
          >
            <option value="">انتخاب کنید</option>
            <option value="ارزان">ارزان</option>
            <option value="گران">گران</option>
            <option value="رایگان">رایگان</option>
          </select>
        </div>
        <div className="form-group2">
          <label className="form-label">دوره درباره چیست؟</label>
          <select
            name="topics"
            className="form-input"
            value={courseData.topics}
            onChange={handleCourseChange}
            style={{ fontFamily: "IRANSans" }}
             
          >
            <option value="">انتخاب کنید</option>
            <option value="ترید">ترید</option>
            <option value="برنامه نویسی">برنامه نویسی</option>
          </select>
        </div>

        <h2 className="sessions-title">جلسات دوره</h2>
        {sessions.map((session, index) => (
          <div className="session-container" key={index}>
            <h3 className="session-title">
              {session.sessionNumber} {/* شماره جلسه به صورت "جلسه X" */}
            </h3>

            <div className="form-group2">
              <label className="form-label">عنوان جلسه</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={session.title}
                onChange={(e) => handleSessionChange(index, e)}
                 
              />
            </div>
            <div className="form-group2">
              <label className="form-label">ویدیو جلسه (URL)</label>
              <input
                type="text"
                name="videoUrl"
                className="form-input"
                value={session.videoUrl}
                onChange={(e) => handleSessionChange(index, e)}
                 
              />
            </div>
            <span
              className="remove-session-button"
              onClick={() => removeSession(index)}
            >
              حذف این جلسه{" "}
              <MdOutlineRemoveCircleOutline
                style={{ fontSize: "18px", marginRight: "3px" }}
              />
            </span>
          </div>
        ))}
        <button
          style={{ fontFamily: "IRANSans" }}
          type="button"
          className="add-session-button"
          onClick={addSession}
        >
          اضافه کردن جلسه جدید{" "}
          <IoMdAddCircleOutline
            style={{ fontSize: "19px", marginRight: "3px" }}
          />
        </button>
        <br />
        <br />
        <button type="submit" className="submit-button2">
          ذخیره دوره{" "}
          <FaRegSave style={{ fontSize: "19px", marginRight: "3px" }} />
        </button>
      </form>
    </div>
  );
};

export default AddOrgCourse;