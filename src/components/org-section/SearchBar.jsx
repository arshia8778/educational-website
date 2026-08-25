import React from 'react';
import bgLeftImg from "../../images/Programming-pana.svg";

const SearchBar = () => {
  return (
    <>
       <header class="header-site">
        <div class="search-box">
          <div class="container">
            <div class="search-box-right">
              <div class="bg-search-box">
                <div class="wrap-search">
                  <span class="top-title">کلیه آموزش ها را در</span>
                  <div class="center-title">
                    <span> کسب مهارت های ویژه بازار کار</span>
                  </div>
                  <span class="bt-title">دنبال کنید...</span>
                  <form class="form-search-box">
                    <div class="form-search-wrapp">
                      <input
                        type="search"
                        placeholder="دنبال چه دوره ای هستی؟"
                        id="searchInput"
                      />
                      <button type="submit">جستجو</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="search-box-left">
              <img src={bgLeftImg} alt="" class="bg-left" />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default SearchBar