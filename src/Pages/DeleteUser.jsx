import axios from "axios";


const DeleteUser = () => {
  const deleteById = (id) => {
    axios
      .delete(`https://676187c546efb37323720b38.mockapi.io/stagiaires/${id}`)
      .then((response) => console.log("Deleted:", response.data))
      .catch((error) => console.error("Error deleting by id:", error));
  };

  return (
    <div>
      <button onClick={() => deleteById(80)}>DELETE</button>
    </div>
  );
};

export default DeleteUser;
