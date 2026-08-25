import React, { useEffect, useState } from "react";
import { getAllArticle1 } from "../../services/CardsServices";
import NotFound from "../global/NotFound";
import { Link } from "react-router-dom";
import Spinner from "../global/Spinner";

const Articles1 = () => {
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div class="articles-section">
            <p class="section-subtitle" style={{ fontSize: "2rem" }}>
              همه مقالات
            </p>
            <div class="articles-container">
              {article.length > 0 ? (
                article.map((article, index) => {
                  const ArticleWithId = { ...article, id: index };
                  return (
                    <div class="article-card" key={ArticleWithId.id}>
                      <img src={ArticleWithId.photo} alt="Article 1" />
                      <p class="card-description">{ArticleWithId.title}</p>
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
        </>
      )}
    </>
  );
};

export default Articles1;
