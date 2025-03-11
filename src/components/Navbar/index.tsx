import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-[#40534C] p-2 m-2 rounded-sm">
      <div className="">
        <Link to="/" className="text-white block">
          Home
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
