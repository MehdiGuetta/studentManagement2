import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="flex flex-col items-center justify-center bg-white p-6 rounded-bl-xl rounded-br-xl shadow shadow-gray-200 sm:p-8 lg:p-12">
      <h1 className="mb-4 text-3xl font-medium leading-tight text-primary sm:text-4xl md:text-5xl text-center">
        Welcome back {user?.prenom} {user?.nom}
      </h1>
    </div>
  );
};

export default HomePage;
