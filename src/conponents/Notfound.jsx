const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-500 to-indigo-800 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">
        Oops! The page you are looking for has disappeared like a wild Pokémon!
      </p>
      <img
        src="/Notfound.png" // 포켓몬과 비슷한 이미지를 여기 추가하거나 직접 로컬 이미지 파일을 넣으세요.
        alt="Pokémon Style Icon"
        className="w-60 h-60 mb-8"
      />
      <a
        href="/"
        className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow-md hover:bg-yellow-300 hover:shadow-lg transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
