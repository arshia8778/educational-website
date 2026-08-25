import React, { useEffect, useState } from "react";
import NotFound from "../global/NotFound";

import { getAllNews } from "../../services/CardsServices";

const NewsCard = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getAllNews();
        if (response.status == 200) {
          setNews(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
  }, []);

  return (
    <>
      <div class="clearfix"></div>
      <section class="blog mt-50">
        <div class="container">
          <p class="section-subtitle">آخرین اخبار و مقالات</p>
          <h2 class="category-pro-title">
            با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
            طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
          </h2>
          <div class="clearfix"></div>
          {news.length > 0 ? (
            news.map((news) => {
              return (
                <div class="blg-box">
                  <div class="blg-img">
                    <a href="blog-detail.html">
                      <img src={news.photo} alt="" />
                    </a>
                  </div>
                  <div class="blg-caption">
                    <div class="blg-tag">
                      <span>{news.topic}</span>
                    </div>
                    <div class="blg-title">
                      <h4>
                        <a href="blog-detail.html">{news.title}</a>
                      </h4>
                    </div>
                    <div class="blg-desc">
                      <p>{news.Description}</p>
                    </div>
                  </div>
                  <div class="blog-foot">
                    <div class="foot-author">
                      <a href="instructor-detail.html">
                        <img src={news.user} class="img-fluid circle" alt="" />
                      </a>
                    </div>
                    <div class="foot-list-info">
                      <ul>
                        <li>
                          <i class="fa fa-eye text-success"></i> {news.viewer}
                        </li>
                        <li>
                          <i class="fa fa-clock text-warning"></i>
                          {news.date}
                        </li>
                      </ul>
                    </div>
                  </div>
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

export default NewsCard;
