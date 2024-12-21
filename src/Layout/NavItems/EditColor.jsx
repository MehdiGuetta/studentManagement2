import { CirclePicker } from "react-color";

const EditColor = () => {
  return (
    <div>
      <CirclePicker circleSize="40px" width="500px" />
      <button className="w-96 py-3 px-4 border-none bg-blue-600 text-white rounded-md hover:opacity-85 transition duration-200">
        Apply changes
      </button>
    </div>
  );
};

export default EditColor;