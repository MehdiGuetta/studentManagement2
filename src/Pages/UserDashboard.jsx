import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Header from "../Layout/Header"
import UserNavigationBar from "../Layout/UserNavigationBar"
import UserSideBar from "../Layout/UserSideBar"
import Section from "../Layout/Section"
import Footer from "../Layout/Footer"

const UserDashboard = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-xl text-gray-800 mb-6">Unfortunately, no user data is available. Please log in.</p>
          <button
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={() => navigate("../")}
          >
            Log in
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <UserNavigationBar />
      <div className="flex-1 flex flex-col md:flex-row">
        <UserSideBar className="md:w-64 flex-shrink-0 bg-white shadow-md z-10" />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <Section />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default UserDashboard

