import NoData from "../assets/icons/NoData";

const NotFound = () => {
  return (
    <div className="w-full bg-[#EAF0F5] flex flex-col justify-center items-center font-bold text-neutral-400">
      <NoData className="w-[100px] h-[100px]" />
      Ooops! 404! Page not found.
    </div>
  );
};

export default NotFound;
