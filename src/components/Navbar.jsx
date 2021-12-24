import { FaSun, FaMoon, FaUsers } from "react-icons/fa";
import { ThemeContext } from "../App";
import { useContext } from "react";

const Navbar = ({ onThemeSwitch }) => {
  const darkTheme = useContext(ThemeContext);
  const classNames = `
    navbar 
    navbar-${darkTheme ? "dark" : "light"} 
    bg-${darkTheme ? "dark" : "light"} 
    text-${darkTheme ? "ligth" : "dark"}
  `;

  return (
    <nav className={classNames}>
      <div className="container-fluid">
        <div className="navbar-brand fw-light">
          <FaUsers className="fs-4" /> Client Manager
        </div>
        <div
          className="fs-4 me-4 d-flex align-items-center"
          onClick={onThemeSwitch}
        >
          {darkTheme ? (
            <FaSun className="text-warning" />
          ) : (
            <FaMoon className="text-dark" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
