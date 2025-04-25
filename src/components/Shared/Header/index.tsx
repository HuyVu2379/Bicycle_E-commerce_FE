import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const Header: React.FC = () => {
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [showPagesDropdown, setShowPagesDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <div className="logo">
            <img src="/public/assets/images/logo.jpg" alt="logo" className="logo-img" />
            <span className="logo-text">Cycle</span>
            <span className="logo-text" style={{ color: "red" }}>City</span>
          </div>
        </Link>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menu */}
        <div className={`menu ${menuOpen ? "open" : ""}`}>
          {/* Navigation Links */}
          <nav className="nav">
            <Link to="/home" className="nav-link">HOME</Link>
            <Link to="/about" className="nav-link">ABOUT US</Link>
            <Link to="/service" className="nav-link">SERVICES</Link>

            {/* SHOP Dropdown */}
            <div
              className="dropdown"
              onMouseEnter={() => setShowShopDropdown(true)}
              onMouseLeave={() => setShowShopDropdown(false)}
            >
              SHOP <FaChevronDown className="dropdown-icon" />
              {showShopDropdown && (
                <div className="dropdown-menu">
                  <Link to="/shop/common-bikes">Common Bikes</Link>
                  <Link to="/shop/kids-bikes">Kids Bikes</Link>
                  <Link to="/shop/mountain-bikes">Mountain Bikes</Link>
                  <Link to="/shop/racing-bikes">Racing Bikes</Link>
                  <Link to="/shop/stunt-bikes">Stunt Bikes</Link>
                </div>
              )}
            </div>

            <Link to="/news" className="nav-link">NEWS</Link>
            <Link to="/contact" className="nav-link">CONTACT</Link>
          </nav>

          {/* Search Box */}
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <FaSearch className="search-icon" />
          </div>

          {/* Action Icons */}
          <div className="actions">
            <Link to="/auth/login" className="icons">
              <FaUser className="icon" />
            </Link>
            <Link to="/profile" className="icons">
              <ImProfile className="icon" />
            </Link>
            <div className="cart icons">
              <FaShoppingCart className="icon" />
              <span className="cart-badge">4</span>
            </div>
            <Link to="/logout" className="logout">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;