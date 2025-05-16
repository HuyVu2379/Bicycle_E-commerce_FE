import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import useAuth from "@/hook/api/useAuth";
import { useCart } from "@/hook/api/useCart";
const Header: React.FC = () => {
  const { handleLogout } = useAuth();
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { accessToken } = localStorage;
  const { cartItemCount } = useCart();

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
            <Link to="/" className="nav-link">HOME</Link>
            <Link to="/about" className="nav-link">ABOUT US</Link>
            <Link to="/service" className="nav-link">SERVICES</Link>

            {/* SHOP Dropdown */}
            <Link
              className="dropdown"
              to="/shop"
              onMouseEnter={() => setShowShopDropdown(true)}
              onMouseLeave={() => setShowShopDropdown(false)}
            >
              SHOP <FaChevronDown className="dropdown-icon" />
              {showShopDropdown && (
                <div className="dropdown-menu">
                  <Link to="/shop">Common Bikes</Link>
                  <Link to="/shop">Kids Bikes</Link>
                  <Link to="/shop">Mountain Bikes</Link>
                  <Link to="/shop">Racing Bikes</Link>
                  <Link to="/shop">Stunt Bikes</Link>
                </div>
              )}
            </Link>

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
            <Link to="/auth/profile" className="icons">
              <ImProfile className="icon" />
            </Link>
            <Link to="/cart" className="cart icons">
              <FaShoppingCart className="icon" />
              <span className="cart-badge">{cartItemCount || 0}</span>
            </Link>
            {accessToken ? (< Link to="/auth/login" onClick={handleLogout} className="logout">
              Logout
            </Link>)
              : <></>
            }
          </div>
        </div>
      </div>
    </header >
  );
};

export default Header;