const CardLoader = () => {
  return (
    <div className="animate-pulse bg-white p-4 shadow rounded-md">
      <div className="bg-gray-300 hw-[320px] h-[500px] rounded"></div>{" "}
      {/* Image */}
      <div className="mt-4 h-6 w-3/4 bg-gray-300 rounded"></div> {/* Title */}
      <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>{" "}
      {/* Subtitle */}
    </div>
  );
};

export default CardLoader;
