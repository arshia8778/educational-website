import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../services/CardsServices';
import userImg from "../../../images/user.png";
const UserSetting = () => {
    const [users, setUsers] = useState([]);


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
  return (
    <div className='users-section'>
      <p className="users-section-title">کاربران</p>
      <div className="users-container">
        {users && users.length > 0 ? users.map((user) =>{
          return(
            <div className="user-card">
              <div className="user-avatar">
                <img src={user.avatar ? user.avatar : userImg} alt="avatar" />
              </div>
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
              <button className='remove-user'>اخراج کاربر</button>
            </div>
          )
        }) : "کاربری وجود ندارد"}
      </div>
    </div>
  )
}

export default UserSetting