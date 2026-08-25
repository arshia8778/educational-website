import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import {
  getFaqInfo,
  getFaqOrgInfo,
} from "../../../../../services/CardsServices";
import axios from "axios"; // اضافه کردن axios
import { useParams } from "react-router-dom";

const FaqOrgEdit = () => {
  const { FaqOrgId } = useParams();
  const [photo, setPhoto] = useState("");
  const [title, setTitle] = useState("");
  const [finalyParagraph, setFinalyParagraph] = useState("");
  const [moreFaq, setMoreFaq] = useState([]);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const { data, status } = await getFaqOrgInfo(FaqOrgId);
        if (status === 200) {
          setPhoto(data.photo);
          setTitle(data.title);
          setFinalyParagraph(data.finalyParagraph);
          setMoreFaq(data.moreFaq);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFaq();
  }, [FaqOrgId]);

  const handleMoreOfFaqChange = (index, field, value) => {
    const  newFaq = [...moreFaq];
     newFaq[index][field] = value;
    setMoreFaq( newFaq);
  };

  const addMoreOfFaq = () => {
    setMoreFaq([...moreFaq, { title: "", subtitle: "", paragraph: "", subtitle2: "",paragraph2:""  }]);
  };

  const removeMoreOfFaq = (index) => {
    const  newFaq = moreFaq.filter((_, i) => i !== index);
    setMoreFaq( newFaq);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // جلوگیری از ارسال فرم به صورت پیش‌فرض
    const articleData = {
      photo,
      title,
      finalyParagraph,
      moreFaq: moreFaq.map((moreFaq) => ({
        title: moreFaq.title,
        subtitle: moreFaq.subtitle,
        paragraph: moreFaq.paragraph,
        subtitle2: moreFaq.subtitle2,
        paragraph2: moreFaq.paragraph2,
      })),
    };

    try {
      const response = await axios.put(
        `http://localhost:3001/FAQ-org-page/${FaqOrgId}`,
        articleData
      ); // آدرس API خود را وارد کنید
      if (response.status === 200) {
        alert("سوال با موفقیت ذخیره شد!");
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
       <h1 className="form-title">اضافه کردن سوال به صفحه اصلی</h1>
       <form onSubmit={handleSubmit}>
         <div className="form-group2">
           <label className="form-label">عکس سوال (URL)</label>
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
           <label className="form-label"> توضیح پایانی</label>
           <textarea
             style={{ fontFamily: "IRANSans" }}
             name="finalyParagraph"
             className="form-textarea"
             value={finalyParagraph}
             onChange={(text) => setFinalyParagraph(text.target.value)}
              
           ></textarea>
         </div>
         <h2 className="moreOfFaq-title">توضیحات مقاله</h2>
         {moreFaq.map((session, index) => (
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
                 onChange={(e) => handleMoreOfFaqChange(index, 'title', e.target.value)}
                  
               />
             </div>
             <div className="form-group2">
               <label className="form-label">توضیح 1</label>
               <textarea
                 style={{ fontFamily: "IRANSans" }}
                 name="subtitle"
                 className="form-textarea"
                 value={session.subtitle}
                 onChange={(e) => handleMoreOfFaqChange(index, 'subtitle', e.target.value)}
                  
               ></textarea>
             </div>
             <div className="form-group2">
               <label className="form-label">توضیح 2</label>
               <textarea
                 style={{ fontFamily: "IRANSans" }}
                 name="paragraph"
                 className="form-textarea"
                 value={session.paragraph}
                 onChange={(e) => handleMoreOfFaqChange(index, 'paragraph', e.target.value)}
                  
               ></textarea>
             </div>
             <div className="form-group2">
               <label className="form-label">توضیح 2,1</label>
               <textarea
                 style={{ fontFamily: "IRANSans" }}
                 name="subtitle2"
                 className="form-textarea"
                 value={session.subtitle2}
                 onChange={(e) => handleMoreOfFaqChange(index, 'subtitle2', e.target.value)}
                  
               ></textarea>
             </div>
             <div className="form-group2">
               <label className="form-label">توضیح 2,2</label>
               <textarea
                 style={{ fontFamily: "IRANSans" }}
                 name="paragraph2"
                 className="form-textarea"
                 value={session.paragraph2}
                 onChange={(e) => handleMoreOfFaqChange(index, 'paragraph2', e.target.value)}
                  
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
           ذخیره تغییرات{" "}
           <FaRegSave style={{ fontSize: "19px", marginRight: "3px" }} />
         </button>
       </form>
     </div>
   );
};

export default FaqOrgEdit;
