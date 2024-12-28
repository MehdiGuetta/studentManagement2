import axios from "axios";
import { useState } from "react";

const DeleteUserButton = ({ userId, onUserDeleted }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://676187c546efb37323720b38.mockapi.io/stagiaires/${userId}`
      );
      if (response.status === 200) {
        console.log("User deleted successfully");
        onUserDeleted(userId);
        setIsPopupOpen(false);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <>
      <a
        onClick={() => setIsPopupOpen(true)}
        role="button"
        className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
      >
        Delete
      </a>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this user?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-600 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUserButton;
