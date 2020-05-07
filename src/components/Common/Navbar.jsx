import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <Link className="navbar-brand" to="/">
      Property Leasing
    </Link>
  </nav>
);

export default React.memo(Navbar);