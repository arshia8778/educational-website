import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { getCourseInfo } from "../../../../../services/CardsServices";
import axios from "axios"; // اضافه کردن axios
import { useParams } from "react-router-dom";

const CourseEdit = () => {
  const { courseId } = useParams();
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [teacher, setTeacher] = useState("");
  const [users, setUser] = useState(0);
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [topics, setTopics] = useState("");
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, status } = await getCourseInfo(courseId);
        if (status === 200) {
          setPhoto(data.photo);
          setTitle(data.title);
          setPrice(data.price);
          setTeacher(data.teacher);
          setUser(data.users);
          setDescription(data.description);
          setCost(data.cost);
          setTopics(data.topics);
          setSessions(data.session);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourses();
  }, [courseId]);

  const addSession = () => {
    // به جای محاسبه sessionNumber، به آن یک عدد ثابت دهید
    const newSessionNumber = sessions.length + 1; // این شماره به ترتیب 1، 2، 3 و ...
    setSessions([...sessions, { sessionNumber: newSessionNumber, title: "", videoUrl: "" }]);
  };
  const removeSession = (index) => {
    const newSessions = sessions.filter((_, i) => i !== index);
    setSessions(newSessions);
  };

  const handleSessionChange = (index, field, value) => {
    const newSessions = [...sessions];
    newSessions[index][field] = value;
    setSessions(newSessions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // جلوگیری از ارسال فرم به صورت پیش‌فرض
    const courseData = {
      photo,
      title,
      price,
      teacher,
      users,
      description,
      cost,
      topics,
      session: sessions.map(session => ({
        sessionNumber: session.sessionNumber, // اینجا sessionNumber به صورت عددی باقی می‌ماند
        title: session.title,
        videoUrl: session.videoUrl,
      })),
    };
  
    try {
      const response = await axios.put(`http://localhost:3001/courses/${courseId}`, courseData); // آدرس API خود را وارد کنید
      if (response.status === 200) {
        alert("دوره با موفقیت ذخیره شد!");
      }
    } catch (error) {
      console.error("خطا در ذخیره دوره:", error);
      alert("خطا در ذخیره دوره. لطفا دوباره تلاش کنید.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="form-container">
      <h1 className="form-title">تغییر دادن دوره صفحه مخصوص</h1>
      <form onSubmit={handleSubmit}> {/* متصل کردن فرم به تابع handleSubmit */}
        <div className="form-group">
          <label className="form-label">عکس دوره (URL)</label>
          <input
            type="text"
            name="photo"
            className="form-input"
            value={photo}
            onChange={(text) => setPhoto(text.target.value)}
             
          />
        </div>
        <div className="form-group">
          <label className="form-label">عنوان</label>
          <input
            style={{ fontFamily: "IRANSans" }}
            type="text"
            name="title"
            className="form-input"
            value={title}
            onChange={(text) => setTitle(text.target.value)}
             
          />
        </div>
        <div className="form-group">
          <label className="form-label">قیمت</label>
          <input
            type="text" // تغییر نوع ورودی به text برای فرمت کاما
            name="price"
            className="form-input"
            value={price}
            onChange={(text) => setPrice(text.target.value)}
             
          />
        </div>
        <div className="form-group">
          <label className="form-label">نام مدرس</label>
          <input
            style={{ fontFamily: "IRANSans" }}
            type="text"
            name="teacher"
            className="form-input"
            value={teacher}
            onChange={(text) => setTeacher(text.target.value)}
             
          />
        </div>
        <div className="form-group">
          <label className="form-label">کاربران دوره</label>
          <input
            type="number"
            name="users"
            className="form-input"
            value={users}
            onChange={(text) => setUser(text.target.value)}
             
          />
        </div>
        <div className="form-group">
          <label className="form-label">توضیحات دوره</label>
          <textarea
            style={{ fontFamily: "IRANSans" }}
            name="description"
            className="form-textarea"
            value={description}
            onChange={(text) => setDescription(text.target.value)}
             
          ></textarea>
        </div>
        <div className="form-group">
          <label className="form-label">ارزش دوره</label>
          <select
            name="cost"
            className="form-input"
            value={cost}
            onChange={(text) => setCost(text.target.value)}
            style={{ fontFamily: "IRANSans" }}
             
          >
            <option value="">انتخاب کنید</option>
            <option value="ارزان">ارزان</option>
            <option value="گران">گران</option>
            <option value="رایگان">رایگان</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">دوره درباره چیست؟</label>
          <select
            name="topics"
            className="form-input"
            value={topics}
            onChange={(text) => setTopics(text.target.value)}
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
            <h3 className="session-title">جلسه {index + 1}</h3>

            <div className="form-group">
              <label className="form-label">عنوان جلسه</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={session.title}
                onChange={(e) => handleSessionChange(index, 'title', e.target.value)}
                 
              />
            </div>
            <div className="form-group">
              <label className="form-label">ویدیو جلسه (URL)</label>
              <input
                type="text"
                name="videoUrl"
                className="form-input"
                value={session.videoUrl}
                onChange={(e) => handleSessionChange(index, 'videoUrl', e.target.value)}
                 
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
        <button type="submit" className="submit-button">
          ذخیره تغییرات{" "}
          <FaRegSave style={{ fontSize: "19px", marginRight: "3px" }} />
        </button>
      </form>
    </div>
  );
};

export default CourseEdit;