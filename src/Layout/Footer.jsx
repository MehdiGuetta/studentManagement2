import useDynamicTextColor from "../Components/useDynamicTextColor";

const Footer = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  return (
    <footer
      className="w-full flex justify-center fixed left-0 bottom-0 items-center h-auto py-12"
      style={{ color: textColor, backgroundColor: backgroundColor }}
    >
      <div>Footer</div>
    </footer>
  );
};

export default Footer;
