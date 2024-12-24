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
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg text-center mb-4">
          Unfortunately.. No user data available. Please log in.
        </p>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-16 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => navigate("../")}
        >
          Log in
        </button>
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
