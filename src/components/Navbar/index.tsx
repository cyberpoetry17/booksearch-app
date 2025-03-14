import { matchPath, NavLink, useLocation } from "react-router";
import HomeIcon from "../../assets/icons/Home";
import BackArrowIcon from "../../assets/icons/BackArrow";

const Navbar = () => {
  const location = useLocation();
  const isDetailsPageActive = matchPath(
    "/book/:id/:coverId",
    location.pathname
  );

  return (
    <nav className="bg-white px-2 rounded-sm shadow-lg z-10 w-fit h-full py-4 sticky top-0 flex flex-col justify-between">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `rounded-md flex gap-1 p-2 h-[36px] ${
            isActive
              ? "bg-[#0056FF] text-white"
              : "hover:bg-blue-100 text-neutral-600"
          }`
        }
      >
        <HomeIcon className="w-[20px] h-[20px]" />
        Home
      </NavLink>
      {isDetailsPageActive && (
        <NavLink
          to="/"
          className="rounded-md flex gap-1 p-2 h-[36px] hover:bg-blue-100 text-neutral-600 items-center justify-center"
        >
          <BackArrowIcon className="w-[20px] h-[20px]" />
        </NavLink>
      )}
    </nav>
  );
};

export default Navbar;
