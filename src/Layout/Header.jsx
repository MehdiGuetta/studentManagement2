import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png"; // Path to the image
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/actions";
import useDynamicTextColor from "../Components/useDynamicTextColor";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const user = useSelector((state) => state.user);
  const { backgroundColor, textColor } = useDynamicTextColor();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isToggleActive, setIsToggleActive] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsToggleActive(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsToggleActive((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleRequestBtn = () => {
    navigate("requests");
  };

  return (
    <header
      className="w-full h-auto flex justify-around items-center py-4 px-4 sm:px-8 md:px-16 lg:px-44"
      style={{ color: textColor, backgroundColor: backgroundColor }}
    >
      <div>
        <img src={logo} className="w-24 select-none" />
      </div>
      <div className="flex justify-center items-center gap-12 md:gap-16 lg:gap-20">
        <div>
          <div>
            <img
              id="avatarButton"
              type="button"
              data-dropdown-toggle="userDropdown"
              data-dropdown-placement="bottom-start"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full cursor-pointer"
              src={user.photo}
              alt="User dropdown"
              onClick={handleToggle}
            />

            {isToggleActive && (
              <div
                ref={dropdownRef}
                id="userDropdown"
                className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-50 dark:bg-gray-700 dark:divide-gray-600"
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>
                    <div>
                      {user.prenom} {user.nom}
                    </div>
                    <div className="font-medium truncate mb-1">
                      {user.email}
                    </div>
                  </div>
                  {user.admin === true ? (
                    <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      Admin
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      User
                    </span>
                  )}
                </div>

                {!user.admin && (
                  <>
                    <div
                      onClick={handleRequestBtn}
                      role="button"
                      className="block px-4 py-2 w-full text-start text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Request
                    </div>
                    <div
                      role="button"
                      className="block px-4 py-2 w-full text-start text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      See my requests
                    </div>
                  </>
                )}

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
      </div>
    </header>
  );
};

export default Header;
