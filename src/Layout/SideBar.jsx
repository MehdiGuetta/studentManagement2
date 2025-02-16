import { NavLink } from "react-router-dom";
import useDynamicTextColor from "../Components/useDynamicTextColor";
import {
  RiHome5Line,
  RiHome5Fill,
  RiIdCardLine,
  RiIdCardFill,
  RiUserAddLine,
  RiUserAddFill,
  RiFileListLine,
  RiFileListFill,
  RiPaletteLine,
  RiPaletteFill,
  RiUser3Line,
  RiUser3Fill,
} from "react-icons/ri";

const SideBar = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  const links = [
    {
      path: "/admin-dashboard/home",
      label: "Home",
      IconOutline: RiHome5Line,
      IconFill: RiHome5Fill,
    },
    {
      path: "/admin-dashboard/profile",
      label: "My Profile",
      IconOutline: RiUser3Line,
      IconFill: RiUser3Fill,
    },
    {
      path: "/admin-dashboard/edit-color",
      label: "Edit Color",
      IconOutline: RiPaletteLine,
      IconFill: RiPaletteFill,
    },
    {
      path: "/admin-dashboard/users-list",
      label: "Users List",
      IconOutline: RiFileListLine,
      IconFill: RiFileListFill,
    },
    {
      path: "/admin-dashboard/add-user",
      label: "Add User",
      IconOutline: RiUserAddLine,
      IconFill: RiUserAddFill,
    },
    {
      path: "/admin-dashboard/requests",
      label: "Requests",
      IconOutline: RiIdCardLine,
      IconFill: RiIdCardFill,
    },
  ];

  return (
    <aside
      className=" h-[calc(100vh-80px)] transition-all duration-300 ease-in-out"
      style={{
        backgroundColor: `${backgroundColor}DD`,
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="h-full w-40 md:w-48 lg:w-60 xl:w-64 p-4 flex flex-col">
        {/* Navigation Links */}
        <nav className="flex-1 pt-6">
          <ul className="space-y-2">
            {links.map(({ path, label, IconOutline, IconFill }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) => `
                  group relative flex items-center px-4 py-3 rounded-xl
                  transition-all duration-200 ease-in-out
                  hover:bg-black/5
                  ${isActive ? "bg-black/5" : ""}
                `}
                  style={({ isActive }) => ({
                    color: isActive ? textColor : textColor,
                  })}
                >
                  {({ isActive }) => (
                    <>
                      {/* Icon */}
                      {isActive ? (
                        <IconFill className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                      ) : (
                        <IconOutline className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                      )}

                      {/* Label */}
                      <span className="ml-3 text-sm font-medium">{label}</span>

                      {/* Active Indicator */}
                      <div
                        className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full transition-all duration-200 transform origin-right ${
                          isActive ? "scale-x-100" : "scale-x-0"
                        }`}
                        style={{
                          backgroundColor: textColor,
                        }}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Decorative Elements */}
        <div
          className="absolute bottom-0 left-0 w-full h-20 opacity-5"
          style={{
            background: `linear-gradient(to top, ${textColor}, transparent)`,
          }}
        />
      </div>
    </aside>
  );
};

export default SideBar;
