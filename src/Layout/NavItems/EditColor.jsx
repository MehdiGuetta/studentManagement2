import axios from "axios";
import { useState } from "react";
import { CompactPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { updateColor } from "../../Redux/actions";

const EditColor = () => {
  const user = useSelector((state) => state.user); // Assuming `state.user` contains the user object
  const userColor = useSelector((state) => state.color); // Assuming `state.user` contains the user object
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  console.log(userColor)


  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  const handleApply = () => {
    console.log("Payload being sent:", { ...user, couleur: color });

    axios
      .put(
        `https://676187c546efb37323720b38.mockapi.io/stagiaires//${user.id}`,
        {
          ...user,
          couleur: color,
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(updateColor(color));
      })
      .catch((err) => {
        console.error("Error from API:", err);
      });

      console.log(userColor)
  };

  return (
    <div>
      <CompactPicker onChange={handleColorChange} />
      <button
        onClick={handleApply}
        className="w-96 py-3 px-4 border-none bg-blue-600 text-white rounded-md hover:opacity-85 transition duration-200"
      >
        Apply changes
      </button>
    </div>
  );
};

export default EditColor;
