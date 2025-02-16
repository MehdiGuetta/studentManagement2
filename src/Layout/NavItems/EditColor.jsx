import axios from "axios";
import { useState, useEffect } from "react";
import { CompactPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { updateColor } from "../../Redux/actions";
import useDynamicTextColor from "../../Components/useDynamicTextColor";
import { FaPalette, FaCheck, FaSyncAlt } from "react-icons/fa";

const EditColor = () => {
  const user = useSelector((state) => state.user);
  const [color, setColor] = useState(user.couleur || "#653294");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const { backgroundColor, textColor } = useDynamicTextColor();

  const handleColorChange = (selectedColor) => {
    setColor(selectedColor.hex);
    setShowSuccess(false);
  };

  const handleApply = async () => {
    setIsLoading(true);
    try {
      const res = await axios.put(
        `https://676187c546efb37323720b38.mockapi.io/stagiaires/${user.id}`,
        {
          ...user,
          couleur: color,
        }
      );
      dispatch(updateColor(color));
      setShowSuccess(true);
      localStorage.setItem("color", color);
    } catch (err) {
      console.error("Error from API:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset success message after 3 seconds
  useEffect(() => {
    let timeout;
    if (showSuccess) {
      timeout = setTimeout(() => setShowSuccess(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showSuccess]);

  return (
    <div className="w-full max-w-md mx-auto pt-5">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform  transition-all duration-300">
        <div
          className="p-6 relative overflow-hidden"
          style={{ backgroundColor: backgroundColor }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaPalette
                className="w-8 h-8 text-white"
                style={{ color: textColor }}
              />
              <h1
                className="text-3xl font-bold text-white"
                style={{ color: textColor }}
              >
                Color Picker
              </h1>
            </div>
            <div className="flex justify-center items-center gap-4"></div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex justify-center">
            <div className="p-4 bg-gray-50 rounded-2xl">
              <CompactPicker color={color} onChange={handleColorChange} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-gray-600 font-medium text-sm text-center">
              Preview
            </h3>
            <div className="flex gap-4 justify-center">
              <div
                className="w-16 h-16 rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300"
                style={{ backgroundColor: color }}
              />
              <div
                className="w-16 h-16 rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300"
                style={{
                  background: `linear-gradient(135deg, ${color}, ${color}88)`,
                }}
              />
              <div
                className="w-16 h-16 rounded-2xl shadow-lg transition-transform hover:scale-105 duration-300"
                style={{
                  background: `linear-gradient(135deg, white, ${color})`,
                }}
              />
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={handleApply}
              disabled={isLoading || showSuccess}
              className={`
                relative px-8 py-3 rounded-xl font-semibold text-white
                shadow-lg hover:shadow-xl transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                group overflow-hidden
              `}
              style={{
                backgroundColor: backgroundColor,
                color: textColor,
              }}
            >
              <span
                className={`
                flex items-center gap-2
                transition-transform duration-300
                ${showSuccess ? "translate-y-8" : "translate-y-0"}
              `}
              >
                {isLoading ? (
                  <>
                    <FaSyncAlt className="w-4 h-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>Apply Changes</>
                )}
              </span>
              <span
                className={`
                absolute inset-0 flex items-center justify-center
                transition-transform duration-300
                ${showSuccess ? "translate-y-0" : "-translate-y-8"}
              `}
              >
                <FaCheck className="w-5 h-5 mr-2" />
                Updated!
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditColor;
