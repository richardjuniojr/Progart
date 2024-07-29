import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { navbarRoutes } from "../../routes/navbarRoutes";

export default function NavbarLinks() {
  const [activeLink, setActiveLink] = useState("");

  const handleSetActive = (to) => {
    setActiveLink(to);
  };

  return (
    <>
      {navbarRoutes.map((route, index) => (
        <li key={index}>
          <ScrollLink
            to={route.path.slice(1)}
            spy={true}
            smooth={true}
            duration={500}
            offset={-100}
            className={
              activeLink === route.path.slice(1)
                ? "active-link cursor-pointer"
                : "cursor-pointer"
            }
            activeClass="active"
            onSetActive={() => handleSetActive(route.path.slice(1))}
          >
            {route.label}
          </ScrollLink>
        </li>
      ))}
    </>
  );
}
