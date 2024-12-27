import { NavLink } from "react-router-dom";
import useDynamicTextColor from "../Components/useDynamicTextColor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { faRectangleList } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faIdCardClip } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const NavigationBar = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { path: "/admin-dashboard/home", label: "Home", icon: faHouse },
    { path: "/admin-dashboard/profile", label: "My Profile", icon: faUser },
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
    { path: "/admin-dashboard/add-user", label: "Add User", icon: faUserPlus },
    {
      path: "/admin-dashboard/requests",
      label: "Requests",
      icon: faIdCardClip,
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav
      style={{ color: textColor, backgroundColor: backgroundColor }}
      className="relative"
    >
      <div className="lg:flex lg:justify-between sm:px-8 lg:px-16 flex flex-col px-4 w-1/2 mx-auto my-auto">
        <button className="lg:hidden text-xl py-2" onClick={toggleMobileMenu}>
          ☰
        </button>

        <ul
          className={`lg:flex w-full ${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:block justify-center items-center`}
        >
          {links.map(({ path, label, icon }) => (
            <li key={path} className="me-2 ">
              <NavLink
                to={path}
                className="inline-flex text-nowrap w-full items-center gap-2 select-none justify-center rounded-t-lg hover:text-gray-600 dark:hover:text-gray-300 group px-8 lg:py-4 py-3"
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
      </div>
    </nav>
  );
};

export default NavigationBar;
