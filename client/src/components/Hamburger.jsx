import Hamburger from "hamburger-react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export default function MobileMenu({ open, setOpen }) {
  // close on ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setOpen]);

  // lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const linkClass = ({ isActive }) => (isActive ? "menuLink active" : "menuLink");

  return (
    <>
      {/* The hamburger icon button */}
      <div className="hamburgerOnly">
        <Hamburger size={20} toggled={open} toggle={setOpen} />
      </div>

      {/* Overlay */}
      {open && <div className="menuOverlay" onClick={() => setOpen(false)} />}

      {/* Slide-in Drawer */}
      <aside className={`menuDrawer ${open ? "open" : ""}`} aria-hidden={!open}>
        <div className="menuHeader">
          <span className="menuTitle"></span>
          <Hamburger size={20} toggled={open} toggle={setOpen} />
        </div>

        <nav className="menuNav">
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>
            Products
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={() => setOpen(false)}>
            Contact
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
