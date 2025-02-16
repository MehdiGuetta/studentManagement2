import { useDispatch, useSelector } from "react-redux";
import blackLogo from "../assets/blackLogo.png";
import whiteLogo from "../assets/whiteLogo.png";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/actions";
import useDynamicTextColor from "../Components/useDynamicTextColor";
import { useEffect, useRef, useState } from "react";
import {
  FaSignOutAlt,
  FaUser,
  FaFileAlt,
  FaCommentAlt,
  FaChevronDown,
  FaCrown,
} from "react-icons/fa";

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

  const getImageBackground = () => {
    if (textColor === "black") {
      return blackLogo; 
    } else {
      return whiteLogo; 
    }
  };


  const handleToggle = () => {
    setIsToggleActive((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="w-full z-50">
      <div
        className="absolute  pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${backgroundColor}CC, ${backgroundColor}00)`,
        }}
      />

      <div
        className="relative w-full px-4 sm:px-6 lg:px-8 py-4 backdrop-blur-sm transition-all duration-300"
        style={{ backgroundColor: `${backgroundColor}`, color: textColor }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <img
              src={getImageBackground()}
              className="w-[150px] h-[150px]"
              alt="Logo"
              style={{
                backgroundColor: backgroundColor,
                color: textColor,
              }}
            />
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleToggle}
              className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-black/5 transition-colors duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white/50"
                    src={user.photo}
                    alt={`${user.prenom} ${user.nom}`}
                  />
                  {user.admin && (
                    <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                      <FaCrown className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="font-medium">
                    {user.prenom} {user.nom}
                  </p>
                  <p className="text-sm opacity-75">{user.email}</p>
                </div>
              </div>
              <FaChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  isToggleActive ? "rotate-180" : ""
                }`}
              />
            </button>

            {isToggleActive && (
              <div className="absolute right-0 mt-2 w-72 origin-top-right">
                <div className="bg-white rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
                  <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
                    <div className="flex items-start gap-4">
                      <img
                        className="w-16 h-16 rounded-xl object-cover"
                        src={user.photo}
                        alt={`${user.prenom} ${user.nom}`}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {user.prenom} {user.nom}
                        </h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <div className="mt-2">
                          {user.admin ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-orange-700">
                              <FaCrown className="w-3 h-3" />
                              Admin
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                              <FaUser className="w-3 h-3" />
                              User
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100">
                    {!user.admin && (
                      <>
                        <button
                          onClick={() => navigate("requests")}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <FaFileAlt className="w-4 h-4 text-gray-400" />
                          New Request
                        </button>
                        <button
                          onClick={() => navigate("see-requests")}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <FaCommentAlt className="w-4 h-4 text-gray-400" />
                          View My Requests
                        </button>
                      </>
                    )}
                  </div>

                  <div className="border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <FaSignOutAlt className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
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
