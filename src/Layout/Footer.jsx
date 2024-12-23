import useDynamicTextColor from "../Components/useDynamicTextColor";

const Footer = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  return (
    <footer
      className="w-full flex justify-center items-center h-auto py-8 absolute"
      style={{ color: textColor, backgroundColor: backgroundColor }}
    >
      <div>Footer</div>
    </footer>
  );
};

export default Footer;
