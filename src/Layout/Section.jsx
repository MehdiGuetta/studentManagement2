import { Outlet } from "react-router-dom";

const Section = () => {
  return (
    <section className="flex-1 w-full px-4  sm:px-6 md:px-8 lg:px-10 xl:px-12 overflow-y-auto">
      <Outlet />
    </section>
  );
};
export default Section;
