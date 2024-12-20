import { NavLink, Outlet } from "react-router-dom";

const NavigationBar = () => {
  const links = [
    { path: "/dashboard/home", label: "Home" },
    { path: "/dashboard/profile", label: "My Profile" },
    { path: "/dashboard/edit-color", label: "Edit Color" },
    { path: "/dashboard/users-list", label: "Users List" },
    { path: "/dashboard/add-user", label: "Add User" },
    { path: "/dashboard/request", label: "Requests" },
  ];

  return (
    <nav className="w-full h-20 bg-gray-300">
      <ul className="h-full flex justify-center items-center gap-10">
        {links.map(({ path, label }) => (
          <li key={path} className="list-none">
            <NavLink
              to={path}
              className={({ isActive }) =>
                `text-black text-lg font-bold no-underline whitespace-nowrap cursor-pointer transition-colors duration-100 ease-in select-none ${
                  isActive
                    ? "border-black text-black underline"
                    : "border-transparent hover:border-black hover:text-black hover:underline"
                }`
              }
              style={({ isActive }) => ({
                transform: "perspective(1px) translateZ(0)",
                borderBottom: isActive
                  ? "2px solid #000"
                  : "2px solid transparent",
              })}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <Outlet />
    </nav>
  );
};

export default NavigationBar;
