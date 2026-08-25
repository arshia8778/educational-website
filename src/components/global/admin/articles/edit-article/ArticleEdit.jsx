import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import {
  getArticleInfo,
  getCourseInfo,
} from "../../../../../services/CardsServices";
import axios from "axios"; // اضافه کردن axios
import { useParams } from "react-router-dom";

const ArticleEdit = () => {
  const { ArticleId } = useParams();
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [basicDiscription, setBasicDiscription] = useState('');
  const [finalyDescription, setFinalyDescription] = useState("");
  const [moreOfArticle, setMoreOfArticle] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, status } = await getArticleInfo(ArticleId);
        if (status === 200) {
          setPhoto(data.photo);
          setTitle(data.title);
          setBasicDiscription(data.basicDiscription);
          setFinalyDescription(data.finalyDescription);
          setMoreOfArticle(data.moreOfArticle);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, [ArticleId]);

  const handleArticleChange = (index, field, value) => {
    const newArticle = [...moreOfArticle];
    newArticle[index][field] = value;
    setMoreOfArticle(newArticle);
  };

  const addMoreOfArticle = () => {
    setMoreOfArticle([...moreOfArticle, { title: "", subsection: "", introduction: "", detail: "" }]);
  };

  const removeMoreOfArticle = (index) => {
    const newArticle = moreOfArticle.filter((_, i) => i !== index);
    setMoreOfArticle(newArticle);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // جلوگیری از ارسال فرم به صورت پیش‌فرض
    const articleData = {
      photo,
      title,
      basicDiscription,
      finalyDescription,
      moreOfArticle: moreOfArticle.map((moreOfArticle) => ({
        title: moreOfArticle.title,
        subsection: moreOfArticle.subsection,
        introduction: moreOfArticle.introduction,
        detail: moreOfArticle.detail,
      })),
    };

    try {
      const response = await axios.put(
        `http://localhost:3001/articles/${ArticleId}`,
        articleData
      ); // آدرس API خود را وارد کنید
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
      <h1 className="form-title">اضافه کردن مقاله به صفحه مخصوص</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group2">
          <label className="form-label">عکس مقاله (URL)</label>
          <input
            type="text"
            name="photo"
            className="form-input"
            value={photo}
            onChange={(text) => setPhoto(text.target.value)}
             
          />
        </div>
        <div className="form-group2">
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
        <div className="form-group2">
          <label className="form-label">مقدمه</label>
          <input
            style={{ fontFamily: "IRANSans" }}
            type="text"
            name="basicDiscription"
            className="form-input"
            value={basicDiscription}
            onChange={(text) => setBasicDiscription(text.target.value)}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label">نتیجه گیری</label>
          <textarea
            style={{ fontFamily: "IRANSans" }}
            name="finalyDescription"
            className="form-textarea"
            value={finalyDescription}
            onChange={(text) => setFinalyDescription(text.target.value)}
             
          ></textarea>
        </div>
        <h2 className="moreOfArticle-title">توضیحات مقاله</h2>
        {moreOfArticle.map((session, index) => (
          <div className="session-container" key={index}>
            <h3 className="session-title">توضیح شماره {index + 1}</h3>

            <div className="form-group2">
              <label className="form-label">عنوان توضیح</label>
              <input
              style={{ fontFamily: "IRANSans" }}
                type="text"
                name="title"
                className="form-input"
                value={session.title}
                onChange={(e) => handleArticleChange(index, 'title', e.target.value)}
                 
              />
            </div>
            <div className="form-group2">
              <label className="form-label">عنوان توضیح 2</label>
              <input
              style={{ fontFamily: "IRANSans" }}
                type="text"
                name="subsection"
                className="form-input"
                value={session.subsection}
                onChange={(e) => handleArticleChange(index, 'subsection', e.target.value)}
                 
              />
            </div>
            <div className="form-group2">
              <label className="form-label">توضیح اولیه</label>
              <textarea
                style={{ fontFamily: "IRANSans" }}
                name="introduction"
                className="form-textarea"
                value={session.introduction}
                onChange={(e) => handleArticleChange(index, 'introduction', e.target.value)}
                 
              ></textarea>
            </div>
            <div className="form-group2">
              <label className="form-label">توضیح ثانویه</label>
              <textarea
                style={{ fontFamily: "IRANSans" }}
                name="detail"
                className="form-textarea"
                value={session.detail}
                onChange={(e) => handleArticleChange(index, 'detail', e.target.value)}
                 
              ></textarea>
            </div>
            <span
              className="remove-session-button"
              onClick={() => removeMoreOfArticle(index)}
            >
              حذف این توضیح{" "}
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
          onClick={addMoreOfArticle}
        >
          اضافه کردن توضیح بیشتر{" "}
          <IoMdAddCircleOutline
            style={{ fontSize: "19px", marginRight: "3px" }}
          />
        </button>
        <br />
        <br />
        <button type="submit" className="submit-button2">
          ذخیره مقاله{" "}
          <FaRegSave style={{ fontSize: "19px", marginRight: "3px" }} />
        </button>
      </form>
    </div>
  );
};

export default ArticleEdit;
