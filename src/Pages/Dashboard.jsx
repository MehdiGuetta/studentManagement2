import { useSelector } from "react-redux";
import Header from "../Layout/Header";
import NavigationBar from "../Layout/NavigationBar";
import { useNavigate } from "react-router-dom";
import SideBar from "../Layout/SideBar";
import Section from "../Layout/Section";
import Footer from "../Layout/Footer";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  console.log(user)

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
      <NavigationBar />
      <div className="flex">
        <SideBar />
        <Section />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
