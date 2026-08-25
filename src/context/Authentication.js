import { createContext, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { getUsers } from "../services/CardsServices";
import axios from "axios";

export const UserContext = createContext();

const SECRET_KEY = "secret-key"; 

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? decryptData(storedUser) : null;
  });

  const [carts, setCarts] = useState([]); // سبد خرید
  const [purchesCart, setPurchesCart] = useState([]); // سبد خرید خریداری شده
  const [users, setUsers] = useState([]);

  // ذخیره‌سازی در localStorage
  const saveToLocalStorage = (key, value) => {
    const encryptedValue = key === "user" ? encryptData(value) : JSON.stringify(value);
    localStorage.setItem(key, encryptedValue);
  };

  // بارگذاری کاربران از پایگاه داده
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); 

  // به‌روزرسانی carts هنگام تغییر کاربر
  useEffect(() => {
    if (user) {
      const currentUser = users.find((u) => u.id === user.id);
      if (currentUser) {
        const userCarts = currentUser.carts || [];
        setCarts(userCarts); // بارگذاری carts از کاربر
        setPurchesCart(currentUser.purchesCart || []); 
      }
    }
  }, [user, users]);

  // ذخیره‌سازی کاربر در localStorage
  useEffect(() => {
    if (user) {
      saveToLocalStorage("user", user);
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // به‌روزرسانی carts
  const updateCarts = async (newCarts) => {
    setCarts(newCarts); 
    if (user) {
      try {
        await axios.patch(`http://localhost:3001/users/${user.id}`, {
          carts: newCarts, 
        });
      } catch (error) {
        console.error("Error updating carts in database:", error);
      }
    }
  };

  const updatePurchesCart = async (newPurchesCart) => {
    setPurchesCart(newPurchesCart);
    if (user) {
      try {
        await axios.patch(`http://localhost:3001/users/${user.id}`, {
          purchesCart: newPurchesCart, 
        });
      } catch (error) {
        console.error("Error updating purchesCart in database:", error);
      }
    }
  };

  // اضافه کردن دوره به carts
  const addCourseToCart = (course) => {
    const updatedCarts = [...carts, course];
    updateCarts(updatedCarts);
  };

  // حذف دوره از carts
  const removeCourseFromCart = (courseId) => {
    const updatedCarts = carts.filter(course => course.cartId !== courseId);
    updateCarts(updatedCarts);
  };

  // به‌روزرسانی داده‌های کاربر
  const updateUser = (newUserData) => {
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        ...newUserData,
      };
      saveToLocalStorage("user", updatedUser); // اطمینان از اینکه اینجا saveToLocalStorage قابل دسترسی است
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      updateUser, 
      setCarts,
      users, 
      carts, 
      purchesCart, 
      updateCarts, 
      updatePurchesCart, 
      addCourseToCart, 
      removeCourseFromCart,
    }}>
      {children}
    </UserContext.Provider>
  );
};