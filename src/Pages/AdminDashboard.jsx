import { useSelector } from "react-redux";
import Header from "../Layout/Header";
import NavigationBar from "../Layout/NavigationBar";
import { useNavigate } from "react-router-dom";
import SideBar from "../Layout/SideBar";
import Section from "../Layout/Section";
import Footer from "../Layout/Footer";

const AdminDashboard = () => {
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavigationBar />
      <main className="flex-1">
        <div className="flex justify-between">
          <SideBar />
          <Section />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
