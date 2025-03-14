import { NavLink } from "react-router";
import HomeIcon from "../../assets/icons/Home";

const Navbar = () => {
  return (
    <nav className="bg-white px-2 rounded-sm shadow-lg z-10 w-fit py-4">
      <div className="">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `rounded-md flex gap-1 p-2 ${
              isActive
                ? "bg-[#0056FF] text-white"
                : "hover:bg-blue-100 text-neutral-600"
            }`
          }
        >
          <div>
            <HomeIcon />
          </div>
          Home
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
