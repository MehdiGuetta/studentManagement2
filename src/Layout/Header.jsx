import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png"; // Path to the image
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/actions";
import useDynamicTextColor from "../Components/useDynamicTextColor";

const Header = () => {
  const user = useSelector((state) => state.user);
  const { backgroundColor, textColor } = useDynamicTextColor();
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
          <h3 className=" font-bold text-3xl" style={{ color: textColor }}>
            {user.prenom} {user.nom}
          </h3>
        </div>
        <div className="logout">
          <button
            onClick={handleLogout}
            className="bg-white w-[200px] h-[50px] cursor-pointer border-red-500 border-2 outline-none text-red-500 rounded-2xl text-base font-semibold hover:opacity-85"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
