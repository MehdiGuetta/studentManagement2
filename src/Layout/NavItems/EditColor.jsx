import axios from "axios";
import { useState } from "react";
import { CompactPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { updateColor } from "../../Redux/actions";
import useDynamicTextColor from "../../Components/useDynamicTextColor";

const EditColor = () => {
  const user = useSelector((state) => state.user);
  const [color, setColor] = useState("");
  const dispatch = useDispatch();
  const { backgroundColor, textColor } = useDynamicTextColor();

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
  };

  const handleApply = () => {
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
  };

  return (
    <div className="h-full">
      <div className="h-full flex justify-center flex-col gap-10">
        <h1
          className="font-bold text-4xl flex flex-col"
          style={{
            color: backgroundColor === "#ffffff" ? textColor : backgroundColor,
          }}
        >
          Pick a Color
        </h1>
        <CompactPicker color={color} onChange={handleColorChange} />

        <button
          onClick={handleApply}
          className="bg-white px-8 py-4 font-bold rounded-lg hover:opacity-80"
          style={{
            color: textColor,
            backgroundColor: backgroundColor,
            border: `1px solid ${textColor}`,
          }}
        >
          Apply changes
        </button>
      </div>
    </div>
  );
};

export default EditColor;
