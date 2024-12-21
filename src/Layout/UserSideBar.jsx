import { NavLink } from "react-router-dom";
import useDynamicTextColor from "../Components/useDynamicTextColor";

const UserSideBar = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  return (
    <aside
      className="h-auto w-0 md:min-w-[16%]"
      style={{ color: textColor, backgroundColor: backgroundColor }}
    >
      <ul className="h-auto py-12 flex flex-col gap-10 text-xl font-semibold items-center">
        {[
          { path: "/user-dashboard/home", label: "Home" },
          { path: "/user-dashboard/profile", label: "My Profile" },
          { path: "/user-dashboard/edit-color", label: "Edit Color" },
        ].map(({ path, label }) => (
          <li key={path} className="list-none">
            <NavLink
              to={path}
              className={({ isActive }) =>
                ` text-lg font-semibold no-underline whitespace-nowrap cursor-pointer transition-colors duration-100 ease-in select-none ${
                  isActive
                    ? "border-black text-black"
                    : "border-transparent hover:border-black hover:text-black hover:underline"
                }`
              }
              style={({ isActive }) => ({
                transform: "perspective(1px) translateZ(0)",
                borderBottom: isActive
                  ? `2px solid ${textColor}`
                  : "2px solid transparent",
                color: textColor,
              })}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserSideBar;