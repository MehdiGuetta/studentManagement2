import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png"; // Path to the image
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/actions";
import useDynamicTextColor from "../Components/useDynamicTextColor";
import { useState } from "react";

const Header = () => {
  const user = useSelector((state) => state.user);
  const { backgroundColor, textColor } = useDynamicTextColor();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToggleActive, setIsToggleActive] = useState(false);

  const handleToggle = () => {
    setIsToggleActive(!isToggleActive);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header
      className="w-full h-36 flex justify-between items-center pl-52 pr-44"
      style={{ color: textColor, backgroundColor: backgroundColor }}
    >
      <div>
        <img src={logo} className="w-24 select-none" />
      </div>
      <div className="flex justify-center items-center gap-12">
        <div>
        </div>
        <div className="pr-20">
          <img
            id="avatarButton"
            type="button"
            data-dropdown-toggle="userDropdown"
            data-dropdown-placement="bottom-start"
            className="w-20 h-20 rounded-full cursor-pointer"
            src={user.photo}
            alt="User dropdown"
            onClick={handleToggle}
          />

          {isToggleActive && (
            <div
              id="userDropdown"
              className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-50 dark:bg-gray-700 dark:divide-gray-600"
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>
                  <div>
                    {user.prenom} {user.nom}
                  </div>
                  <div className="font-medium truncate mb-1 ">{user.email}</div>
                </div>
                {user.admin === true ? (
                    <span className="-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      Admin
                    </span>
                  ) : (
                    <span className="-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      User
                    </span>
                  )}
              </div>

              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 w-full text-start text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
