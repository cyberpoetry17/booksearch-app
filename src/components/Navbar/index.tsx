import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-white p-2 rounded-sm shadow-lg z-10 w-fit">
      <div className="">
        <Link to="/" className="text-stone-500 block">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
