import React, { useState } from 'react';
import { useGlobalState } from '../../../../globalVariables';
import './profilePage.css';
import { FooterBanner } from '../../components/genericComponents/decor/footer/footerBanner';
import { NavBar } from '../../components/genericComponents/themeComponents/navBar';
import axios from 'axios';

export const ProfilePage: React.FC<{}> = ({}) => {
  const { user, userList, cosmerePath} = useGlobalState();
  const token = sessionStorage.getItem('token')
  const [editableUserList, setEditableUserList] = useState(userList);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editUser, setEditUser] = useState<any>(null);

  const handleEdit = (index: number, user: any) => {
    setEditIndex(index);
    setEditUser({ ...user });
  };

  const handleSave = async (index: number) => {
    const newList = [...editableUserList];
    newList[index] = editUser;
    await axios.put(cosmerePath + "/mongoUsers/" + editUser._id, {
        accessLevel: editUser.accessLevel
    }, {headers: {Authorization: `${token}`}});
    setEditableUserList(newList);
    setEditIndex(null);
    setEditUser(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditUser({ ...editUser, accessLevel: e.target.value });
  };

  return (
    <>
    <NavBar searchText={""} setSearchText={null} searchShouldBeComputed={false} setSearchShouldBeComputed={null}></NavBar>
    <div className="profile-page">
      <div className="current-user-box">
        <h2>Current User</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Access Level: {user.accessLevel}</p>
      </div>
      {user.accessLevel == "Knight Radiant" && 
      
      
      <>
        <h2>Other Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Access Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {editableUserList.map((user: any, index: number) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                {editIndex === index ? (
                  <select
                    value={editUser.accessLevel}
                    onChange={handleChange}
                  >
                    <option value="Bridgeman">Bridgeman</option>
                    <option value="Surgebinder">Surgebinder</option>
                    <option value="Knight Radiant">Knight Radiant</option>
                  </select>
                ) : (
                  user.accessLevel
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <button onClick={() => handleSave(index)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(index, user)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      }


      
    </div>
    <FooterBanner></FooterBanner>
    </>
  );
};