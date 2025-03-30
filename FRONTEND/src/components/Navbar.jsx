import React, { useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={`p-4 shadow-md transition-all ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">
          <h1 className="text-xl font-bold cursor-pointer">SkyMist</h1>
        </Link>

        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="hover:text-gray-400 transition-colors">Home</Link></li>
          <li><Link to="/support" className="hover:text-gray-400 transition-colors">Support Us</Link></li>
          <li><Link to="/about" className="hover:text-gray-400 transition-colors">About</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="focus:outline-none"
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? 
              <Sun size={24} className="text-yellow-400 hover:text-yellow-300" /> : 
              <Moon size={24} className="text-gray-800 hover:text-gray-600" />
            }
          </button>
          
          <button 
            className="md:hidden focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? 
              <X size={24} className={darkMode ? "text-white" : "text-gray-800"} /> : 
              <Menu size={24} className={darkMode ? "text-white" : "text-gray-800"} />
            }
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={`md:hidden absolute left-0 right-0 z-20 py-2 px-4 shadow-lg transition-all ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
        }`}>
          <ul className="flex flex-col space-y-4 py-2">
            <li>
              <Link 
                to="/" 
                className="block py-2 hover:text-gray-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/support" 
                className="block py-2 hover:text-gray-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Support Us
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className="block py-2 hover:text-gray-400 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;