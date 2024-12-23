import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((state) => state.user);

  return (
    <div className="w-auto border border-gray-200 rounded-lg shadow bg-white p-10 ">
      <div className="flex flex-col items-center py-10 justify-center ">
        <img
          className="w-24 h-24 mb-10 rounded-full shadow-lg "
          src={user.photo}
          alt="Bonnie image"
        />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black">
          {user.prenom} {user.nom}
        </h5>
        <table>
          <tbody>
            <tr>
              <td className="px-20">Role: </td>
              <td className="px-20">
                {user.admin === true ? "Admin" : "User"}
              </td>
            </tr>
            <tr>
              <td className="px-20">Age: </td>
              <td className="px-20">{user.age} years old</td>
            </tr>
            <tr>
              <td className="px-20">Username:</td>
              <td className="px-20">{user.pseudo}</td>
            </tr>
            <tr>
              <td className="px-20">Email:</td>
              <td className="px-20">{user.email}</td>
            </tr>
            <tr>
              <td className="px-20">Country:</td>
              <td className="px-20">{user.Pays}</td>
            </tr>
            <tr>
              <td className="px-20">Currency:</td>
              <td className="px-20">{user.Devise}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
