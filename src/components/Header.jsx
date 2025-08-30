import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <div className="bg-indigo-700 text-white shadow-md">
      <ul className="flex justify-center font-semibold text-lg py-4 items-center gap-10">
        <li>
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              location.pathname === "/"
                ? "bg-indigo-900 text-white shadow-inner"
                : "hover:bg-indigo-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              location.pathname === "/contact"
                ? "bg-indigo-900 text-white shadow-inner"
                : "hover:bg-indigo-600"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Base64 Converter
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
