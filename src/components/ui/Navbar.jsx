import { Link } from "react-router-dom";
import NavbarLinks from "./NavbarLinks";
import Logo from "../../assets/logo.png";

export default function Navbar() {
  return (
    <>
      <div className="navbar sticky top-0 left-0 right-0 bg-base-100 z-50 shadow border-none">
        <div className="navbar-start">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl text-primary font-bold"
          >
            <img src={Logo} alt="logo" width={40} />
            ProgArt
          </Link>
        </div>
        <div className="navbar-end gap-2">
          <ul className="hidden gap-1 sm:menu sm:menu-horizontal">
            <NavbarLinks />
          </ul>
          <details className="block dropdown dropdown-bottom dropdown-end sm:hidden">
            <summary className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              <NavbarLinks />
            </ul>
          </details>
        </div>
      </div>
    </>
  );
}
