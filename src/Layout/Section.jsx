import { Outlet } from "react-router-dom";

const Section = () => {
  return (
    <section className="w-[calc(100%-16%)] flex justify-center items-center h-auto ">
      <Outlet />
    </section>
  );
};

export default Section;
