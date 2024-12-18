import { useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate = useNavigate();
  return (
    <aside className="sidebar-container">
      <ul className="sidebar-list">
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
    </aside>
  );
};

export default SideBar;
