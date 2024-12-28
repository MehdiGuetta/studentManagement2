import axios from "axios";
import { useEffect, useState } from "react";
import DeleteUserButton from "../../Components/DeleteUserButton";

export default function UserList() {
  const [users, setUsers] = useState([]);
  console.log("users from usestate", users);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://676187c546efb37323720b38.mockapi.io/stagiaires"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleUserDeleted = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
    console.log("User deleted with id:", userId);
  };

  return (
    <div className="w-full bg-white border-b-2 rounded-bl-xl rounded-br-xl shadow shadow-gray-200 mb-10">
      <div className="overflow-x-auto w-full h-screen ">
        <table className="overflow-x-auto text-sm text-black w-full">
          <thead className="text-xs w-full text-black bg-gray-300">
            <tr>
              <th scope="col" className="px-2 py-3">
                Photo
              </th>
              <th scope="col" className="px-2 py-3 ">
                Name
              </th>
              <th scope="col" className="px-2 py-3 ">
                Country
              </th>
              <th scope="col" className="px-2 py-3 ">
                Role
              </th>
              <th scope="col" className="px-2 py-3 ">
                Email
              </th>
              <th scope="col" className="px-2 py-3 ">
                Age
              </th>
              <th scope="col" className="px-2 py-3 ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b text-gray-500 dark:border-white hover:bg-gray-100 dark:hover:bg-gray-200"
              >
                <td className="w-4 p-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.photo}
                    alt={`${user.prenom} ${user.nom}`}
                  />
                </td>
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-black"
                >
                  <div>
                    <div className="text-base font-semibold text-start">
                      {user.prenom} {user.nom}
                    </div>
                    <div className="font-normal text-gray-500 text-start">
                      {user.pseudo}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4 font-semibold">{user.Pays}</td>
                <td className="px-6 py-4 font-semibold">
                  {user.admin ? (
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      Admin
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      User
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 font-semibold">{user.email}</td>
                <td className="px-6 py-4 font-semibold">
                  {user.age} years old
                </td>
                <td className="px-6 py-4 space-x-2">
                  <a className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2">
                    Edit
                  </a>
                  <DeleteUserButton
                    userId={user.id}
                    onUserDeleted={handleUserDeleted}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
