import { NavLink } from "react-router-dom";
import { useState } from "react";
import MobileMenu from "./Hamburger";
import "./NavBar.css";

export default function NavBar() {
  // STATE
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) => (isActive ? "navLink active" : "navLink");

  return (
    <header className="navbar">
      <div className="navbarInner">
        <NavLink to="/" className="brandGroup" onClick={() => setOpen(false)}>
          <img
            className="navLogo"
            src="./images/logoprofile.PNG"
            alt="Brand graphic"
          />
          <span className="brandName">DINOCO</span>
        </NavLink>

        {/* Desktop links (hidden on mobile via CSS) */}
        <nav className="desktopNav">
          <NavLink to="/" className={linkClass}>HOME</NavLink>
          <NavLink to="/products" className={linkClass}>PRODUCTS</NavLink>
          <NavLink to="/contact" className={linkClass}>CONTACT</NavLink>
        </nav>

        {/* Mobile hamburger + drawer (hidden on desktop via CSS) */}
        <MobileMenu open={open} setOpen={setOpen} />
      </div>
    </header>
  );
}
