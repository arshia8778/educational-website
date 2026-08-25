import React, { useEffect, useState } from "react";
import NotFound from "../global/NotFound";
import { getAllTeacherCard } from "../../services/CardsServices";

const TeacherCard = () => {
  const [teacher, setTeacherCard] = useState([]);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await getAllTeacherCard();
        if (response.status == 200) {
          setTeacherCard(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTeacher();
  }, []);

  return (
    <>
      <div class="clearfix"></div>
      <section class="container category-product mt-50">
        <p class="section-subtitle">برترین اساتید</p>
        <h2 class="category-pro-title">مربیان و اساتید ما را دنبال کنید...</h2>
        <div class="clearfix"></div>
        <div class="teacher-box">
          {teacher.length > 0 ? (
            teacher.map((teacher) => {
              return (
                <div class="teacher-card">
                  <div class="teacher-img-box">
                    <img src={teacher.photo} alt="" />
                    <div class="social-link">
                      <a href="" class="instagram">
                        <i class="fa-brands fa-instagram"></i>
                      </a>
                      <a href="" class="facebook">
                        <i class="fa-brands fa-square-facebook"></i>
                      </a>
                      <a href="" class="twitter">
                        <i class="fa-brands fa-square-twitter"></i>
                      </a>
                    </div>
                  </div>
                  <a href="./teacher.html">
                    <h4 class="teacher-nam">{teacher.name}</h4>
                  </a>
                  <p class="teacher-title">{teacher.work}</p>
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

export default TeacherCard;
