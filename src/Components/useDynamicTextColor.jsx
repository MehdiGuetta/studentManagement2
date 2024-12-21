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

const useDynamicTextColor = () => {
  const userColor = useSelector((state) => state.user.couleur); 
  const updatedColor = useSelector((state) => state.color); 

  const [textColor, setTextColor] = useState("black");
  const [backgroundColor, setBackgroundColor] = useState(userColor); 

  useEffect(() => {
    const colorToUse = updatedColor || userColor;
    setBackgroundColor(colorToUse);

    if (colorToUse) {
      const luminance = getLuminance(colorToUse);
      setTextColor(luminance > 0.5 ? "black" : "white");
    }
  }, [updatedColor, userColor]); 

  return { backgroundColor, textColor };
};

export default useDynamicTextColor;
