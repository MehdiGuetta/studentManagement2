import { Outlet } from "react-router-dom";

const Section = () => {
  return (
    <section className="w-[calc(100%-16%)]">
      <Outlet />
    </section>
  );
};

export default Section;
