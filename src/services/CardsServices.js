import axios from "axios";

const SERVER_URL = "http://localhost:3001";

export const getAllCart = () => {
  const url = `${SERVER_URL}/cards-org-page`;
  return axios.get(url);
};

export const getAllArticle = () => {
  const url = `${SERVER_URL}/article-org-page`;
  return axios.get(url);
};

export const getAllFAQ = () => {
  const url = `${SERVER_URL}/FAQ-org-page`;
  return axios.get(url);
};

export const getAllTeacherCard = () => {
  const url = `${SERVER_URL}/teacher-card`;
  return axios.get(url);
};

export const getAllNews = () => {
  const url = `${SERVER_URL}/news-section`;
  return axios.get(url);
};

export const getAllCourse = () => {
  const url = `${SERVER_URL}/courses`;
  return axios.get(url);
};

export const getAllArticle1 = () => {
  const url = `${SERVER_URL}/articles`;
  return axios.get(url);
};

export const getAllFAQ1 = () => {
  const url = `${SERVER_URL}/FAQ`;
  return axios.get(url);
};

export const getCourseInfo = (Id) => {
  const url = `${SERVER_URL}/courses/${Id}`;
  return axios.get(url);
};

export const getCourseOrgInfo = (Id) => {
  const url = `${SERVER_URL}/cards-org-page/${Id}`;
  return axios.get(url);
};

export const getArticleOrgInfo = (Id1) => {
  const url = `${SERVER_URL}/article-org-page/${Id1}`;
  return axios.get(url);
};

export const getArticleInfo = (Id1) => {
  const url = `${SERVER_URL}/articles/${Id1}`;
  return axios.get(url);
};

export const getFaqOrgInfo = (Id1) => {
  const url = `${SERVER_URL}/FAQ-org-page/${Id1}`;
  return axios.get(url);
};

export const getFaqInfo = (Id1) => {
  const url = `${SERVER_URL}/FAQ/${Id1}`;
  return axios.get(url);
};


export const getUsers = () => {
  const url = `${SERVER_URL}/users`; 
  return axios.get(url);
};


export const deleteCartItem = async (userId, cartId) => {

  const usersResponse = await axios.get(`${SERVER_URL}/users`);
  const users = usersResponse.data;

  const updatedUser = users.map(user => {
    if (user.id === userId) {
      return {
        ...user,
        carts: user.carts.filter(cart => cart.cartId !== cartId) 
      };
    }
    return user;
  }).find(user => user.id === userId); 

 
  await axios.put(`${SERVER_URL}/users/${userId}`, updatedUser);
};

export const removeOrgCourse = (Id) => {
  const url = `${SERVER_URL}/cards-org-page/${Id}`;
  return axios.delete(url);
};

export const removeCourse = (Id) => {
  const url = `${SERVER_URL}/courses/${Id}`;
  return axios.delete(url);
};

export const removeOrgArticle = (Id1) => {
  const url = `${SERVER_URL}/article-org-page/${Id1}`;
  return axios.delete(url);
};

export const removeArticle = (Id) => {
  const url = `${SERVER_URL}/articles/${Id}`;
  return axios.delete(url);
};

export const removeOrgFAQ = (Id) => {
  const url = `${SERVER_URL}/FAQ-org-page/${Id}`;
  return axios.delete(url);
};

export const removeFAQ = (Id) => {
  const url = `${SERVER_URL}/FAQ/${Id}`;
  return axios.delete(url);
};

export const getCourse = (Id) => {
  const url = `${SERVER_URL}/courses/${Id}`;
  return axios.get(url);
};

export const getArticle = () => {
  const url = `${SERVER_URL}/article-org-page`;
  return axios.get(url);
};

export const getFAQ = () => {
  const url = `${SERVER_URL}/FAQ-org-page`;
  return axios.get(url);
};