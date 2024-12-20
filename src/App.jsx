import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import RegistrationForm from "./Pages/Register";
import Dashboard from "./Pages/Dashboard";
import NotFound from "./NotFound";
import HomePage from "./Layout/NavItems/Home";
import UserProfile from "./Layout/NavItems/UserProfile";
import EditColor from "./Layout/NavItems/EditColor";
import UserList from "./Layout/NavItems/UserList";
import AddUser from "./Layout/NavItems/AddUser";
import Requests from "./Layout/NavItems/Requests";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<HomePage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="edit-color" element={<EditColor />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="requests" element={<Requests />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
