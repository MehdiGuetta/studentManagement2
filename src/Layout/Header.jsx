import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.png"; // Path to the image
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/actions";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="header-section">
      <div className="left-header">
        <img src={logo} className="logo-img" />
      </div>
      <div className="right-header">
        <div className="name-user">
          <h3>
            Welcome, {user.prenom} {user.nom}
          </h3>
        </div>
        <div className="logout">
          <button onClick={handleLogout} className="logoutBtn">
            Log out
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
