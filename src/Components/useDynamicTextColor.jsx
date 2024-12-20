import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const getLuminance = (color) => {
  const rgb = color
    .replace("#", "")
    .match(/.{2}/g)
    .map((hex) => parseInt(hex, 16) / 255);
  const [r, g, b] = rgb.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

// Custom hook
const useDynamicTextColor = () => {
  const userColor = useSelector((state) => state.user.couleur || "#ffffff"); // Default to white
  const [textColor, setTextColor] = useState("black");

  useEffect(() => {
    const luminance = getLuminance(userColor);
    setTextColor(luminance > 0.5 ? "black" : "white");
  }, [userColor]);

  return { backgroundColor: userColor, textColor };
};

export default useDynamicTextColor;
