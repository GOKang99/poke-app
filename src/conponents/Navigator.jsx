import "./Navigator.css";
import { Link, NavLink } from "react-router-dom";

const Navigator = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-white text-base sm:text-xl font-bold hover:text-orange-500 px-4">
            포켓몬 앱
          </h1>
        </Link>
        <div>
          <NavLink
            to="/"
            className="text-white text-15pt sm:text-xl hover:text-orange-500 px-4"
          >
            포켓몬 리스트
          </NavLink>
          <NavLink
            to="/quiz"
            className="text-white text-15pt sm:text-xl hover:text-orange-500 px-4"
          >
            퀴즈 게임
          </NavLink>
          <NavLink
            to="/card"
            className="text-white text-15pt sm:text-xl hover:text-orange-500 px-4"
          >
            카드게임
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigator;
