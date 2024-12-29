import { Outlet } from "react-router-dom";

const Section = () => {
  return (
    <section className="flex h-screen w-full flex-col px-4 bg-gray-100 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      <Outlet />
    </section>
  );
};

export default Section;
