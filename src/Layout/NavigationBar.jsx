import { useNavigate } from "react-router-dom";

const NavigationBar = () => {
    const navigate =useNavigate()
  return (
    <nav className="nav-section">
      <ul className="nav-list">
        <li>
          <a onClick={() => navigate("./Home")}>Home</a>
        </li>
        <li>
          <a onClick={() => navigate("./profile")}>My Profile</a>
        </li>
        <li>
          <a onClick={() => navigate("./edit-color")}>Edit Color</a>
        </li>
        <li>
          <a onClick={() => navigate("./users-list")}>Users List</a>
        </li>
        <li>
          <a onClick={() => navigate("./add-user")}>Add User</a>
        </li>
        <li>
          <a onClick={() => navigate("./request")}>Requests</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
