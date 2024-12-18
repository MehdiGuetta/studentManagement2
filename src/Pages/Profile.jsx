import { useDispatch, useSelector } from "react-redux";
import { logout, updateColor } from "../Redux/actions";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const color = user.couleur // color in API
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeColor = (color) => {
    document.documentElement.style.setProperty("--main-color", color);
  };

  if (!user) {
    return <p>No user data available. Please log in.</p>;
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleColor = () => {
    changeColor(color);
    dispatch(updateColor(color));
  };

  return (
    <div className="container">
      <h1>
        Welcome, {user.prenom} {user.nom}
      </h1>
      <img src={user.avatar} className="avatar" />
      <p>Email: {user.email}</p>
      <p>Age: {user.age}</p>
      <p>Country: {user.Pays}</p>

      <button className="color-button" onClick={handleColor}>
        Change Color
      </button>

      <button onClick={handleLogout} className="color-button">
        Logout
      </button>
    </div>
  );
};

export default Profile;
