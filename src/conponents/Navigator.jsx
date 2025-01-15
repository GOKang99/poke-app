import { Link } from "react-router-dom";

const Navigator = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-white text-2xl font-bold">포켓몬 앱</h1>
        </Link>
        <div>
          <Link to="/" className="text-white hover:text-blue-300 px-4">
            포켓몬 리스트
          </Link>
          <Link to="/quiz" className="text-white hover:text-blue-300 px-4">
            퀴즈 게임
          </Link>
          <Link to="/card" className="text-white hover:text-blue-300 px-4">
            카드게임
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigator;
