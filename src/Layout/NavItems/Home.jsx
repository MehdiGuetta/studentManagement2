import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="h-full px-3 flex justify-center items-center"> 
      <h1 className="mb-2 text-5xl font-medium leading-tight text-primary">
        Welcome back {user.prenom} {user.nom}
      </h1>
    </div>
  );
};

export default HomePage;
