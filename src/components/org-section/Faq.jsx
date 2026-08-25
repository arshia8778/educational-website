import React, { useEffect, useState } from "react";
import NotFound from "../global/NotFound";
import { getAllFAQ, getAllFAQ1 } from "../../services/CardsServices";
import { Link } from "react-router-dom";

const Faq = () => {
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

  return (
    <>
      <div className="clearfix"></div>
      <section className="container mt-50 course-card">
        <div className="course-head-title">
          <p>جدیدترین سوالات متداول</p>
          <h2>میتونی جواب سوالت را اینجا پیدا کنی</h2>
        </div>
        <Link to={"/FAQ"}>
          <button className="btn btn-primary" style={{ cursor: "pointer" }}>
            <p className="btn-text">همه سوالات</p>
            <span className="square"></span>
          </button>
        </Link>

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
    </>
  );
};

export default Faq;
