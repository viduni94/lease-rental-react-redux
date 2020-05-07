import React from "react";

const Footer = () => (
  <footer className="bg-dark text-white p-4 text-center">
    Copyright &copy; {new Date().getFullYear()} Viduni Wickramarachchi
  </footer>
);

export default React.memo(Footer);