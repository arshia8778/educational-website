import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";

const AddArticle = () => {
  const [articleData, setArticleData] = useState({
    photo: "",
    title: "",
    basicDiscription: "",
    finalyDescription: "",
  });

  const [moreOfArticle, setMoreOfArticle] = useState([
    { title: "", subsection: "", introduction: "", detail: "" },
  ]);

  const handleArticleChange = (e) => {
    const { value, name } = e.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleMoreOfArticleChange = (index, e) => {
    const { name, value } = e.target;
    const newArticle = [...moreOfArticle];
    newArticle[index][name] = value;
    setMoreOfArticle(newArticle);
  };

  const addMoreOfArticle = () => {
    setMoreOfArticle([...moreOfArticle, { title: "", subsection: "", introduction: "", detail: "" }]);
  };

  const removeMoreOfArticle = (index) => {
    const newArticle = moreOfArticle.filter((_, i) => i !== index);
    setMoreOfArticle(newArticle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = {
      ...articleData,
      moreOfArticle: moreOfArticle,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/articles",
        newArticle
      );

      if (response.status === 201) {
        alert("مقاله جدید با موفقیت اضافه شد!");
        // Resetting all input fields
        setArticleData({
          photo: "",
          title: "",
          basicDiscription: "",
          finalyDescription: "",
        });
        setMoreOfArticle([{ title: "", subsection: "", introduction: "", detail: "" }]); // Reset moreOfArticle
      }
    } catch (error) {
      console.error("Error adding article:", error);
      alert(`خطا در اضافه کردن مقاله: ${error.response?.data?.message || "لطفاً دوباره تلاش کنید."}`);
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
            value={articleData.photo}
            onChange={handleArticleChange}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label">عنوان</label>
          <input
            style={{ fontFamily: "IRANSans" }}
            type="text"
            name="title"
            className="form-input"
            value={articleData.title}
            onChange={handleArticleChange}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label">مقدمه</label>
          <input
            style={{ fontFamily: "IRANSans" }}
            type="text"
            name="basicDiscription"
            className="form-input"
            value={articleData.basicDiscription} // اصلاح شده
            onChange={handleArticleChange}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label">نتیجه گیری</label>
          <textarea
            style={{ fontFamily: "IRANSans" }}
            name="finalyDescription"
            className="form-textarea"
            value={articleData.finalyDescription} // اصلاح شده
            onChange={handleArticleChange}
             
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
                onChange={(e) => handleMoreOfArticleChange(index, e)}
                 
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
                onChange={(e) => handleMoreOfArticleChange(index, e)}
                 
              />
            </div>
            <div className="form-group2">
              <label className="form-label">توضیح اولیه</label>
              <textarea
                style={{ fontFamily: "IRANSans" }}
                name="introduction"
                className="form-textarea"
                value={session.introduction} // اصلاح شده
                onChange={(e) => handleMoreOfArticleChange(index, e)}
                 
              ></textarea>
            </div>
            <div className="form-group2">
              <label className="form-label">توضیح ثانویه</label>
              <textarea
                style={{ fontFamily: "IRANSans" }}
                name="detail"
                className="form-textarea"
                value={session.detail} // اصلاح شده
                onChange={(e) => handleMoreOfArticleChange(index, e)}
                 
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

export default AddArticle;