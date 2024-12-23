import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="h-[50vh] px-3">
      <h1 className="mb-2 text-5xl font-medium leading-tight text-primary">
        Welcome back {user.prenom} {user.nom}
      </h1>
    </div>
  );
};

export default HomePage;
