import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 w-screen flex flex-wrap items-center justify-between px-2 py-3 bg-violet-600 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between items-center lg:w-auto lg:static lg:block lg:justify-start">
            <button className="lg:hidden flex h-fit" onClick={() => setNavbarOpen(!navbarOpen)}>
              <IoIosMenu className="w-6 h-6 text-white" />
            </button>
            <p className=" font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-lg text-white">
              Welcome
            </p>
          </div>
          <div className={"lg:flex flex-grow items-center" + (navbarOpen ? " flex justify-start" : " hidden")}>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold text-white hover:opacity-75"
                  to="/gallery"
                >
                  <span className="">Gallery</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold text-white hover:opacity-75"
                  to="/favorites"
                >
                  <span className="">Favorites</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
