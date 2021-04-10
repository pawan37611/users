import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";

export default function SearchPage() {
  const dispatch = useDispatch();
  const [showAddUser, setShowAddUser] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const users = useSelector((state) => state.userReducer.users?.data);
  const [filteredUsers, setFilteredUsers] = useState();

  const handleAddUser = (isVisible) => {
    setShowAddUser(isVisible);
  };

  const handleEdit = (isVisible, user) => {
    setIsEdit(true);
    setSelectedUser(user);
    setShowAddUser(isVisible);
  };

  const searchUsers = (e) => {
    let searchText = e.target.value;
    let temp = [];
    if (searchText) {
      users.forEach((item) => {
        for (let key in item) {
          console.log(`${item[key]}`.indexOf(searchText));
          if (`${item[key]}`.indexOf(searchText) > -1) temp.push(item);
        }
      });
      setFilteredUsers(temp);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    dispatch({
      type: "USER_FETCH_REQUESTED",
      url: "https://reqres.in/api/users",
    });
  }, [dispatch]);

  console.log(filteredUsers, users);

  return (
    <div>
      {showAddUser ? (
        <AddUser
          handleAddUser={handleAddUser}
          isEdit={isEdit}
          user={selectedUser}
        />
      ) : (
        <div>
          <input
            style={{ width: "600px", height: "30px" }}
            placeholder="Search users"
            onChange={searchUsers}
          ></input>
          <button onClick={() => handleAddUser(true)}>Add User</button>
          <table>
            <thead>
              <tr>
                <td>FirstName</td>
                <td>LastName</td>
                <td>Email</td>
                <td>Pic</td>
                <td colSpan="2">actions</td>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user, index) => (
                <tr key={index}>
                  <td>{user.first_name} </td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>
                    <img src={user.avatar} alt="No pic"></img>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(true, user)}>Edit</button>
                  </td>
                  <td>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
