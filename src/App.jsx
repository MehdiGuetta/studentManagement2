import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './Pages/Auth';
import Profile from './Pages/Profile';
import DeleteUser from './Pages/DeleteUser';
import RegistrationForm from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import SideBar from './Layout/SideBar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/delete" element={<DeleteUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sidevar" element={<SideBar />} />
      </Routes>
    </Router>
  );
};

export default App;
