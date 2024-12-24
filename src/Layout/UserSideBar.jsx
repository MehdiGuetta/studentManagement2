import { NavLink } from "react-router-dom";
import useDynamicTextColor from "../Components/useDynamicTextColor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";

const UserSideBar = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  const links = [
    { path: "/user-dashboard/home", label: "Home", icon: faHouse },
    { path: "/user-dashboard/profile", label: "My Profile", icon: faUser },
    {
      path: "/user-dashboard/edit-color",
      label: "Edit Color",
      icon: faPalette,
    },
  ];
  return (
    <aside
      className="pt-10 h-[80vh] w-0 md:min-w-[16%]"
      style={{ color: textColor, backgroundColor: backgroundColor }}
    >
      <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0 ">
        {links.map(({ path, label, icon }) => (
          <li key={path} className="list-none">
          <NavLink
            to={path}
            className="inline-flex items-center px-4 py-3 rounded-lg active w-full cursor-pointer transition-colors duration-100 ease-in select-none"
            style={({ isActive }) => ({
              backgroundColor: isActive ? textColor : backgroundColor,
              color: isActive ? backgroundColor : textColor,
            })}
          >
            <FontAwesomeIcon className="w-5 h-4 me-3" icon={icon} />
            {label}
          </NavLink>
        </li>
        ))}
      </ul>
    </aside>
  );
};

export default UserSideBar;
