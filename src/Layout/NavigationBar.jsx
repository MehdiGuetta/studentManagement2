import { NavLink } from "react-router-dom";
import useDynamicTextColor from "../Components/useDynamicTextColor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faIdCardClip } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  const links = [
    {
      path: "/admin-dashboard/home",
      label: "Home",
      icon: faHouse,
    },
    {
      path: "/admin-dashboard/profile",
      label: "My Profile",
      icon: faUser,
    },
    {
      path: "/admin-dashboard/edit-color",
      label: "Edit Color",
      icon: faPalette,
    },
    {
      path: "/admin-dashboard/users-list",
      label: "Users List",
      icon: faRectangleList,
    },
    {
      path: "/admin-dashboard/add-user",
      label: "Add User",
      icon: faUserPlus,
    },
    {
      path: "/admin-dashboard/requests",
      label: "Requests",
      icon: faIdCardClip,
    },
  ];

  return (
    <nav
      style={{ color: textColor, backgroundColor: backgroundColor }}
    >
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 justify-center ">
        {links.map(({ path, label, icon }) => (
          <li key={path} className="me-2 ">
            <NavLink
              to={path}
              className="inline-flex items-center gap-3 select-none justify-center rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300 group px-8 py-4"
              style={({ isActive }) => ({
                backgroundColor: isActive ? textColor : backgroundColor,
                color: isActive ? backgroundColor : textColor,
              })}
            >
              <FontAwesomeIcon icon={icon} />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBar;
