import React, { useEffect, useState } from "react";
import NotFound from "../global/NotFound";
import { getAllArticle } from "../../services/CardsServices";
import { Link } from "react-router-dom";

const Articles = () => {
   const [article, setArticle] = useState([]);


     useEffect(() => {
       const fetchArticles = async () => {
         try {
           const response = await getAllArticle();
           if (response.status == 200) {
             setArticle(response.data);
           }
         } catch (error) {
           console.log(error);
         }
       };
       fetchArticles();
     }, []);


  return (
    <>
      <div class="articles-section">
        <p class="section-subtitle">جدیدترین مقالات</p>
        <div class="articles-container">
          {article.length > 0 ? (
            article.map((article,index) => {
              const ArticleWithId = {...article, id: index }
              return (
                <div class="article-card" key={ArticleWithId.id}>
                  <img src={ArticleWithId.photo} alt="Article 1" />
                  <p class="card-description">{ArticleWithId.title}</p>
                  <Link to={`/org-article/${article.id}`}>
                  <div className="view-more">
                    ادامه
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
        <Link to={'/articles'} class="more-articles-button">
          مقالات بیشتر{" "}
          <i aria-hidden="true" className="fas fa-long-arrow-alt-left"></i>
        </Link>
      </div>
    </>
  );
};

export default Articles;
