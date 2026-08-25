import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import axios from "axios";

const AddOrgFaq = () => {
  const [faqData, setFaqData] = useState({
    photo: "",
    title: "",
    finalyParagraph: "",
  });

  const [moreOfFaq, setMoreOfFaq] = useState([
    { title: "", subtitle: "", paragraph: "", subtitle2: "", paragraph2: "" },
  ]);

  const handleFaqChange = (e) => {
    const { value, name } = e.target;
    setFaqData({ ...faqData, [name]: value });
  };

  const handleMoreOfFaqChange = (index, e) => {
    const { name, value } = e.target;
    const newFaq = [...moreOfFaq];
    newFaq[index][name] = value;
    setMoreOfFaq(newFaq);
  };

  const addMoreOfFaq = () => {
    setMoreOfFaq([
      ...moreOfFaq,
      { title: "", subtitle: "", paragraph: "", subtitle2: "", paragraph2: "" },
    ]);
  };

  const removeMoreOfFaq = (index) => {
    const newFaq = moreOfFaq.filter((_, i) => i !== index);
    setMoreOfFaq(newFaq);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFaq = {
      ...faqData,
      moreOfFaq: moreOfFaq,
    };

    try {
      const response = await axios.post("http://localhost:3001/FAQ-org-page", newFaq);

      if (response.status === 201) {
        alert("سوال جدید با موفقیت اضافه شد!");
        // Resetting all input fields
        setFaqData({
          photo: "",
          title: "",
          finalyParagraph: "",
        });
        setMoreOfFaq([
          {
            title: "",
            subtitle: "",
            paragraph: "",
            subtitle2: "",
            paragraph2: "",
          },
        ]); // Reset moreOfFaq
      }
    } catch (error) {
      console.error("Error adding article:", error);
      alert(
        `خطا در اضافه کردن سوال: ${
          error.response?.data?.message || "لطفاً دوباره تلاش کنید."
        }`
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="form-container">
      <h1 className="form-title">اضافه کردن سوال به صفحه اصلی</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group2">
          <label className="form-label">عکس سوال (URL)</label>
          <input
            type="text"
            name="photo"
            className="form-input"
            value={faqData.photo}
            onChange={handleFaqChange}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label">عنوان</label>
          <input
            style={{ fontFamily: "IRANSans" }}
            type="text"
            name="title"
            className="form-input"
            value={faqData.title}
            onChange={handleFaqChange}
             
          />
        </div>
        <div className="form-group2">
          <label className="form-label"> توضیح پایانی</label>
          <textarea
            style={{ fontFamily: "IRANSans" }}
            name="finalyParagraph"
            className="form-textarea"
            value={faqData.finalyParagraph}
            onChange={handleFaqChange}
             
          ></textarea>
        </div>
        <h2 className="moreOfFaq-title">توضیحات مقاله</h2>
        {moreOfFaq.map((session, index) => (
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
                onChange={(e) => handleMoreOfFaqChange(index, e)}
                 
              />
            </div>
            <div className="form-group2">
              <label className="form-label">توضیح 1</label>
              <textarea
                style={{ fontFamily: "IRANSans" }}
                name="subtitle"
                className="form-textarea"
                value={session.subtitle} // اصلاح شده
                onChange={(e) => handleMoreOfFaqChange(index, e)}
                 
              ></textarea>
            </div>
            <div className="form-group2">
              <label className="form-label">توضیح 2</label>
              <textarea
                style={{ fontFamily: "IRANSans" }}
                name="paragraph"
                className="form-textarea"
                value={session.paragraph} // اصلاح شده
                onChange={(e) => handleMoreOfFaqChange(index, e)}
                 
              ></textarea>
            </div>
            <div className="form-group2">
              <label className="form-label">توضیح 2,1</label>
              <textarea
                style={{ fontFamily: "IRANSans" }}
                name="subtitle2"
                className="form-textarea"
                value={session.subtitle2} // اصلاح شده
                onChange={(e) => handleMoreOfFaqChange(index, e)}
                 
              ></textarea>
            </div>
            <div className="form-group2">
              <label className="form-label">توضیح 2,2</label>
              <textarea
                style={{ fontFamily: "IRANSans" }}
                name="paragraph2"
                className="form-textarea"
                value={session.paragraph2} // اصلاح شده
                onChange={(e) => handleMoreOfFaqChange(index, e)}
                 
              ></textarea>
            </div>
            <span
              className="remove-session-button"
              onClick={() => removeMoreOfFaq(index)}
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
          onClick={addMoreOfFaq}
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

export default AddOrgFaq;
