import { NavLink } from "react-router-dom";
import useDynamicTextColor from "../Components/useDynamicTextColor";
import { useState, useEffect } from "react";
import {
  RiHome5Line,
  RiHome5Fill,
  RiCloseLine,
  RiMenuLine,
  RiPaletteLine,
  RiPaletteFill,
  RiUser3Line,
  RiUser3Fill,
} from "react-icons/ri";

const UserNavigationBar = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const links = [
    { 
      path: "/user-dashboard/home", 
      label: "Home", 
      IconOutline: RiHome5Line,
      IconFill: RiHome5Fill
    },
    { 
      path: "/user-dashboard/profile", 
      label: "My Profile", 
      IconOutline: RiUser3Line,
      IconFill: RiUser3Fill
    },
    {
      path: "/user-dashboard/edit-color",
      label: "Edit Color",
      IconOutline: RiPaletteLine,
      IconFill: RiPaletteFill
    },
  ];

  return (
    <nav
      className={`z-40 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
      style={{ 
        backgroundColor: `${backgroundColor}DD`,
        backdropFilter: 'blur(8px)',
        color: textColor 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="lg:hidden absolute inset-y-0 left-0 flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-black/5 transition-colors duration-200"
              aria-expanded="false"
            >
              {isMobileMenuOpen ? (
                <RiCloseLine className="block h-6 w-6" />
              ) : (
                <RiMenuLine className="block h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-center">
            <div className="flex space-x-4">
              {links.map(({ path, label, IconOutline, IconFill }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => `
                    group relative px-6 py-2 rounded-xl text-sm font-medium 
                    transition-all duration-200 ease-in-out
                    hover:bg-black/5
                    ${isActive ? 'bg-black/5' : ''}
                  `}
                  style={({ isActive }) => ({
                    color: isActive ? textColor : textColor,
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-2">
                        {isActive ? (
                          <IconFill className="w-5 h-5" />
                        ) : (
                          <IconOutline className="w-5 h-5" />
                        )}
                        <span>{label}</span>
                      </div>
                      <div
                        className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full transition-all duration-200 transform origin-left ${
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        }`}
                        style={{
                          backgroundColor: textColor
                        }}
                      />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          {links.map(({ path, label, IconOutline, IconFill }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) => `
                block px-3 py-4 rounded-xl text-base font-medium
                transition-all duration-200 ease-in-out
                hover:bg-black/5
                ${isActive ? 'bg-black/5' : ''}
              `}
              style={({ isActive }) => ({
                color: isActive ? textColor : `${textColor}CC`,
              })}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {({ isActive }) => (
                <div className="flex items-center gap-3">
                  {isActive ? (
                    <IconFill className="w-5 h-5" />
                  ) : (
                    <IconOutline className="w-5 h-5" />
                  )}
                  <span>{label}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default UserNavigationBar;