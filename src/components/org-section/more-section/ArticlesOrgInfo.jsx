import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../global/NotFound";
import { getArticleOrgInfo } from "../../../services/CardsServices";
import Spinner from "../../global/Spinner";

const ArticlesOrgInfo = () => {
  const { ArticleOrgId } = useParams();
  const [articleInfo, setArticleInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchArticleOrgdetails = async () => {
      try {
        const { data, status } = await getArticleOrgInfo(ArticleOrgId);
        if (status === 200) {
          setArticleInfo(data);
          console.log(data); // بررسی داده‌ها
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };
    fetchArticleOrgdetails();
  }, [ArticleOrgId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <header className="site-header">
            <h1 className="main-title">{articleInfo.title}</h1>
            <p className="header-description">{articleInfo.basicDiscription}</p>
          </header>

          <main className="content-area">
            <img src={articleInfo.photo} alt="" className="img-article" />
            {Array.isArray(articleInfo.moreOfArticle) && articleInfo.moreOfArticle.length > 0 ? (
              articleInfo.moreOfArticle.map((moreOfArticle, index) => {
                return (
                  <section className="article-section" key={index}>
                    <h2 className="section-heading">{moreOfArticle.title}</h2>
                    <h3 className="subsection-heading">{moreOfArticle.subsection}</h3>
                    <p className="section-introduction">{moreOfArticle.introduction}</p>
                    <p className="section-detail">{moreOfArticle.detail}</p>
                    <ul className="bullet-list">
                      {/* بررسی وجود list و استفاده از مقادیر پیش‌فرض */}
                      {Array.isArray(moreOfArticle.list) && moreOfArticle.list.length > 0 ? (
                        moreOfArticle.list.map((listItem, listIndex) => (
                          <li className="list-item" key={listIndex}>
                            {listItem.item}
                          </li>
                        ))
                      ) : (
                        <p></p>
                      )}
                    </ul>
                  </section>
                );
              })
            ) : (
              "صفحه یافت نشد"
            )}

            <footer className="site-footer">
              <h2 className="footer-heading">نتیجه‌گیری</h2>
              <p className="footer-summary">{articleInfo.finalyDescription}</p>
            </footer>
          </main>
        </>
      )}
    </>
  );
};

export default ArticlesOrgInfo;