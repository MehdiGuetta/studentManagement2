import axios from "axios";
import { useState } from "react";
import CountrySelector from "./CountrySelector";

const EditUserButton = ({ userId, onUserEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fd, setFd] = useState({
    prenom: "",
    nom: "",
    email: "",
    pseudo: "",
    Pays: "",
    admin: true,
    age: "",
    photo: "https://loremflickr.com/640/480",
  });

  const handleEdit = async () => {
    const response = await axios.get(
      `https://676187c546efb37323720b38.mockapi.io/stagiaires/${userId}`
    );
    setFd(response.data);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFd((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleRoleChange = (role) => {
    setFd((prev) => ({
      ...prev,
      admin: role === "admin",
    }));
  };

  const hadleSave = async () => {
    try {
      const response = await axios.put(
        `https://676187c546efb37323720b38.mockapi.io/stagiaires/${userId}`,
        fd
      );
      setIsModalOpen(false);
      onUserEdit(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <a
        onClick={handleEdit}
        role="button"
        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
      >
        Edit
      </a>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full ">
            <h2 className="text-lg font-semibold text-gray-800">Edit User</h2>
            <form className="space-y-4 mt-4 flex flex-col">
              <label htmlFor="">
                <input
                  className="w-full py-2 px-3 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                  type="text"
                  name="prenom"
                  placeholder="First Name"
                  value={fd.prenom}
                  onChange={handleInputChange}
                />
              </label>
              <input
                className="w-full py-2 px-3 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                type="text"
                name="nom"
                placeholder="Last Name"
                value={fd.nom}
                onChange={handleInputChange}
              />
              <input
                className="w-full py-2 px-3 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                type="text"
                name="email"
                placeholder="Email"
                value={fd.email}
                onChange={handleInputChange}
              />
              <input
                className="w-full py-2 px-3 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                type="text"
                name="pseudo"
                placeholder="Username"
                value={fd.pseudo}
                onChange={handleInputChange}
              />
              <input
                className=" w-full py-2 px-3 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                type="number"
                name="age"
                placeholder="Age"
                value={fd.age}
                onChange={handleInputChange}
              />
              <CountrySelector onChange={handleInputChange} name="Pays" />
              <input
                className=" w-full py-2 px-3 border-none outline-blue-500 bg-[#eee] text-black rounded-md"
                type="url"
                name="photo"
                placeholder="Profile photo"
                value={fd.photo}
                onChange={handleInputChange}
              />

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={fd.admin}
                    onChange={() => handleRoleChange("admin")}
                    className="w-4 h-4"
                  />
                  <span>Admin</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!fd.admin}
                    onChange={() => handleRoleChange("user")}
                    className="w-4 h-4"
                  />
                  <span>User</span>
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  onClick={hadleSave}
                  type="button"
                  className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUserButton;
