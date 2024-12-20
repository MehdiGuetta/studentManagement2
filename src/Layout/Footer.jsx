import useDynamicTextColor from "../Components/useDynamicTextColor";

const Footer = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  return (
    <footer
      className="w-full flex justify-center items-center h-auto py-12"
      style={{ color: textColor, backgroundColor: backgroundColor }}
    >
      Hola
    </footer>
  );
};

export default Footer;
