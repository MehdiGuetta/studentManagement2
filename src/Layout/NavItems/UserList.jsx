import axios from "axios";
import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://676187c546efb37323720b38.mockapi.io/stagiaires")
      .then((res) => {
        setUsers(res.data); // Update the state with the fetched users
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="relative overflow-x-auto  w-full ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Photo
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Age
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="">
                  <div className="text-base font-semibold">
                    {user.prenom} {user.nom}
                  </div>
                  <div className="font-normal text-gray-500">{user.pseudo}</div>
                </div>
              </th>
              <td className="px-6 py-4  font-semibold">{user.Pays}</td>
              <td className="px-6 py-4  font-semibold">
                <div className="flex items-center">
                  {user.admin === true ? "Admin" : "User"}
                </div>
              </td>
              <td className="px-6 py-4  font-semibold">
                <div className="flex items-center">{user.email}</div>
              </td>
              <td className="px-6 py-4  font-semibold">
                <div className="flex items-center">{user.age} years old</div>
              </td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Edit
                </a>
                <a
                  href="#"
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:red-800"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
