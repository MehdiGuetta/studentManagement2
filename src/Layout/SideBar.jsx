import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="h-auto w-[16%] bg-gray-300">
      <ul className="h-auto py-12 px-24 flex flex-col gap-10 text-xl font-semibold">
        {[
          { path: "/home", label: "Home" },
          { path: "/profile", label: "My Profile" },
          { path: "/edit-color", label: "Edit Color" },
          { path: "/users-list", label: "Users List" },
          { path: "/add-user", label: "Add User" },
          { path: "/request", label: "Requests" },
        ].map(({ path, label }) => (
          <li key={path} className="list-none">
            <NavLink
              to={path}
              className={({ isActive }) =>
                `text-black text-lg font-semibold no-underline whitespace-nowrap cursor-pointer transition-colors duration-100 ease-in select-none ${
                  isActive
                    ? "border-black text-black"
                    : "border-transparent hover:border-black hover:text-black hover:underline"
                }`
              }
              style={({ isActive }) => ({
                transform: "perspective(1px) translateZ(0)",
                borderBottom: isActive ? "2px solid #000" : "2px solid transparent",
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

export default SideBar;
