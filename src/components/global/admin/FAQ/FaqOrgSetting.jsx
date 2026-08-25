import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllFAQ, removeOrgFAQ } from "../../../../services/CardsServices";
import NotFound from "../../NotFound";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { confirmAlert } from "react-confirm-alert";
import { IoMdAddCircleOutline } from "react-icons/io";

const FaqOrgSetting = () => {
  const [faq, setFaqCard] = useState([]);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const response = await getAllFAQ();
        if (response.status == 200) {
          setFaqCard(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFaq();
  }, []);

  const deletFaq = (faqId, faqTitle) => {
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
              آیا مقاله {faqTitle} حذف شود؟
            </p>
            <button
              onClick={() => {
                handleRemoveFAQ(faqId);
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

  const handleRemoveFAQ = async (faqId) => {
    try {
      const { status } = await removeOrgFAQ(faqId);
      if (status === 200) {
        setFaqCard((prevFaq) => prevFaq.filter((faq) => faq.id !== faqId));
      }
    } catch (error) {
      console.error("Error removing faq:", error);
    }
  };

  return (
    <>
      <div className="clearfix"></div>
      <section className="container mt-50 course-card">
        <div className="course-head-title">
          <p> سوالات متداول صفحه اصلی</p>
        </div>
        <div className="clearfix"></div>
        <div className="course-card-wrapper">
          {faq.length > 0 ? (
            faq.map((faq, index) => {
              const faqWithId = { ...faq, id: index };
              return (
                <div className="course-card-box" key={faqWithId.id}>
                  <div className="course-banner">
                    <img src={faqWithId.photo} />
                  </div>
                  <div className="course-content">
                    <h3 className="card-title">
                      <a
                        href="./course.html"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {faqWithId.title}
                      </a>
                    </h3>
                    <div className="buttons-FAQ">
                      <Link to={`/edit-org-faq/${faq.id}`}>
                        <li className="edit3">
                          <GrEdit />
                          ویرایش
                        </li>
                      </Link>

                      <li
                        className="delet3"
                        onClick={() => deletFaq(faq.id, faqWithId.title)}
                      >
                        <RiDeleteBin5Fill />
                        حذف
                      </li>
                    </div>
                  </div>
                  <Link to={`/org-faq/${faq.id}`}>
                    <div className="view-more">
                      بیشتر
                      <i
                        aria-hidden="true"
                        className="fas fa-long-arrow-alt-left"
                      ></i>
                    </div>
                  </Link>
                </div>
              );
            })
          ) : (
            <NotFound />
          )}
        </div>
      </section>
      <Link to={`/add-org-new-faq`}>
        <div className="add-course-btn2">
          اضافه کردن سوال
          <IoMdAddCircleOutline
            style={{ fontSize: "20px", marginRight: "3px" }}
          />
        </div>
      </Link>
    </>
  );
};

export default FaqOrgSetting;
