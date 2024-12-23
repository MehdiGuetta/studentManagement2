import { NavLink } from "react-router-dom";
import useDynamicTextColor from "../Components/useDynamicTextColor";

const SideBar = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  return (
    <aside
      className="pt-10 h-auto w-0 md:min-w-[16%]"
      style={{ color: textColor, backgroundColor: backgroundColor }}
    >
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 ">
        {[
          {
            path: "/admin-dashboard/home",
            label: "Home",
            d1: "M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z",
          },
          {
            path: "/admin-dashboard/profile",
            label: "My Profile",
            d1: "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z",
          },
          {
            path: "/admin-dashboard/edit-color",
            label: "Edit Color",
            d1: "M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z",
          },
          {
            path: "/admin-dashboard/users-list",
            label: "Users List",
            d: "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
          },
          {
            path: "/admin-dashboard/add-user",
            label: "Add User",
            d: "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
          },
          {
            path: "/admin-dashboard/requests",
            label: "Requests",
            d: "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z",
          },
        ].map(({ path, label, d1 }) => (
          <li key={path} className="list-none">
            <NavLink
              to={path}
              className="inline-flex items-center px-4 py-3 rounded-lg active w-full cursor-pointer transition-colors duration-100 ease-in select-none"
              style={({ isActive }) => ({
                backgroundColor: isActive ? textColor : backgroundColor,
                color: isActive ? backgroundColor : textColor,
              })}
            >
              <svg
                className="w-5 h-4 me-3 "
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d={d1} />
              </svg>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
