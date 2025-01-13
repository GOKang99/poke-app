import loading from "/loading.gif";

function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <img src={loading} className="w-24 h-24 animate-spin" alt="Loading..." />
    </div>
  );
}

export default Loading;
