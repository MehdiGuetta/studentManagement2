import { useSelector } from "react-redux";
import { Mail, MapPin, Calendar, Briefcase } from "lucide-react";
import useDynamicTextColor from "../../Components/useDynamicTextColor";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const { backgroundColor, textColor } = useDynamicTextColor();

  return (
    <div className="min-h-screen flex items-start justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden ">
        <div
          className="relative h-48"
          style={{
            color: textColor,
            backgroundColor: backgroundColor,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl pb-10"
              style={{ color: textColor }}
            >
              Welcome back, {user.prenom} {user.nom}!
            </h1>
          </div>
        </div>
        <div className="p-6 sm:p-8 lg:p-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full opacity-75 group-hover:opacity-100 transition duration-300 ease-in-out"></div>
                <img
                  src={user.photo || "/placeholder.svg"}
                  alt="Profile Avatar"
                  className="relative w-48 h-48 rounded-full mx-auto border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="md:w-2/3 space-y-6">
              <p className="text-xl text-gray-600 leading-relaxed">
                We{"'"}re glad to see you back on our platform. Here{"'"}s a
                quick overview of your profile:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoItem icon={<Mail />} label="Email" value={user.email} />
                <InfoItem
                  icon={<MapPin />}
                  label="Location"
                  value={user.Pays}
                />
                <InfoItem icon={<Calendar />} label="Age" value={user.age} />
                <InfoItem
                  icon={<Briefcase />}
                  label="Role"
                  value={user.admin ? "Admin" : "User"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-md">
    <div className="text-purple-600">{icon}</div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-lg font-semibold text-gray-900 break-all">{value}</p>
    </div>
  </div>
);

export default HomePage;
