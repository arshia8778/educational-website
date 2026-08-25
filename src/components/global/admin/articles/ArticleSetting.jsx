import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllArticle1,
  removeArticle,
} from "../../../../services/CardsServices";
import NotFound from "../../NotFound";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import { IoMdAddCircleOutline } from "react-icons/io";

const ArticleSetting = () => {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getAllArticle1();
        if (response.status == 200) {
          setArticle(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  const deletArticle = (articleId, articleTitle) => {
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
              آیا مقاله {articleTitle} حذف شود؟
            </p>
            <button
              onClick={() => {
                handleRemoveArticle(articleId);
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

  const handleRemoveArticle = async (articleId) => {
    try {
      const { status } = await removeArticle(articleId);
      if (status === 200) {
        setArticle((prevArticle) =>
          prevArticle.filter((article) => article.id !== articleId)
        );
      }
    } catch (error) {
      console.error("Error removing article:", error);
    }
  };

  return (
    <>
      <div class="articles-section">
        <p class="section-subtitle" style={{ fontSize: "2rem" }}>
          مقالات صفحه مخصوص
        </p>
        <div class="articles-container">
          {article.length > 0 ? (
            article.map((article, index) => {
              const ArticleWithId = { ...article, id: index };
              return (
                <div class="article-card" key={ArticleWithId.id}>
                  <img src={ArticleWithId.photo} alt="Article 1" />
                  <p class="card-description">{ArticleWithId.title}</p>
                  <div className="buttons-article">
                   <Link to={`/edit-article/${article.id}`}>
                   <li className="edit2">
                      <GrEdit style={{ paddingLeft: "3px" }} />
                      ویرایش
                    </li>
                   </Link>
                    <li
                      className="delet2"
                      onClick={() =>
                        deletArticle(article.id, ArticleWithId.title)
                      }
                    >
                      <RiDeleteBin5Fill style={{ paddingLeft: "3px" }} />
                      حذف
                    </li>
                  </div>
                  <Link to={`/articles/${article.id}`}>
                    <div className="view-more">
                      ادامه{" "}
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
      </div>
      <Link to={`/add-new-article`}>
        <div className="add-course-btn2">
          اضافه کردن مقاله
          <IoMdAddCircleOutline
            style={{ fontSize: "20px", marginRight: "3px" }}
          />
        </div>
      </Link>
    </>
  );
};

export default ArticleSetting;
