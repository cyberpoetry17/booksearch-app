import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white px-2 rounded-sm shadow-lg z-10 w-fit py-4">
      <div className="">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white rounded-md ${
              isActive ? "bg-[#0056FF]" : "hover:bg-blue-400"
            }`
          }
        >
          Home
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
