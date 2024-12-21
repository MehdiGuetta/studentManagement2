import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../Layout/Header";
import Section from "../Layout/Section";
import Footer from "../Layout/Footer";
import UserNavigationBar from "../Layout/UserNavigationBar";
import UserSideBar from "../Layout/UserSideBar";


const UserDashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="login-back">
        <p>No user data available. Please log in.</p>
        <button onClick={() => navigate("../")}>Log in Page</button>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <UserNavigationBar />
      <div className="flex">
        <UserSideBar />
        <Section />
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
