import { Outlet } from "react-router-dom";

const Section = () => {
  return (
    <section className=" h-screen w-0 md:min-w-[calc(100%-16%)] ">
      <Outlet />
    </section>
  );
};

export default Section;
