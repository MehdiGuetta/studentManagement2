import { useSelector } from "react-redux";
import {
  FaEnvelope,
  FaUser,
  FaAt,
  FaFlag,
  FaCoins,
  FaPalette,
  FaShieldAlt,
  FaCalendarAlt,
} from "react-icons/fa";

export default function Profile() {
  const user = useSelector((state) => state.user);
  const color = useSelector((state) => state.color);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg  shadow-2xl overflow-hidden transform transition-all duration-300">
          {/* Header with cover photo */}
          <div className="relative h-64 sm:h-80">
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-10" />
            <img
              src={user.photo}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute -bottom-20 left-8 z-20 transform hover:scale-105 transition-transform duration-300">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 animate-pulse group-hover:animate-none transition-all duration-300 -m-1 blur opacity-70" />
                <img
                  src={user.avatar}
                  alt={`${user.prenom} ${user.nom}`}
                  className="w-40 h-40 rounded-full border-4 border-white shadow-2xl object-cover relative z-10"
                />
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-24 px-8 pb-12">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                  {user.prenom} {user.nom}
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaAt size={18} className="text-purple-500" />
                  <span className="font-medium">{user.pseudo}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {user.admin && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <FaShieldAlt size={16} className="mr-2" /> Admin
                  </span>
                )}
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <FaCalendarAlt size={16} className="mr-2" /> Joined 2025
                </span>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="group p-4 rounded-2xl hover:bg-purple-50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                      <FaUser size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Age</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {user.age} years
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-2xl hover:bg-purple-50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                      <FaEnvelope size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="group p-4 rounded-2xl hover:bg-purple-50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                      <FaFlag size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Country
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {user.Pays}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="group p-4 rounded-2xl hover:bg-purple-50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                      <FaCoins size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Currency
                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {user.Devise}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="group p-4 rounded-2xl hover:bg-purple-50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors duration-300">
                      <FaPalette size={24} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Theme Color
                      </p>
                      <div
                        className="size-6 rounded-lg"
                        style={{ backgroundColor: color }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
