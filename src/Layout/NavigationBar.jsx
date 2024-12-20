import { NavLink } from "react-router-dom";
import useDynamicTextColor from "../Components/useDynamicTextColor";

const NavigationBar = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  const links = [
    { path: "/admin-dashboard/home", label: "Home" },
    { path: "/admin-dashboard/profile", label: "My Profile" },
    { path: "/admin-dashboard/edit-color", label: "Edit Color" },
    { path: "/admin-dashboard/users-list", label: "Users List" },
    { path: "/admin-dashboard/add-user", label: "Add User" },
    { path: "/admin-dashboard/requests", label: "Requests" },
  ];

  return (
    <nav
      className="w-full h-20"
      style={{ color: textColor, backgroundColor: backgroundColor }}
    >
      <ul className="h-full flex justify-center items-center gap-10">
        {links.map(({ path, label }) => (
          <li key={path} className="list-none">
            <NavLink
              to={path}
              className={({ isActive }) =>
                ` text-lg font-bold no-underline whitespace-nowrap cursor-pointer transition-colors duration-100 ease-in select-none ${
                  isActive
                    ? "border-black text-black underline"
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
    </nav>
  );
};

export default NavigationBar;
