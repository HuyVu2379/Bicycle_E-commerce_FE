import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { useNavigate } from "react-router-dom";
const Header: React.FC = () => {
  const navigate = useNavigate();
  const [showBikesDropdown, setShowBikesDropdown] = useState(false);
  const [showAccessoriesDropdown, setShowAccessoriesDropdown] = useState(false);
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
          {/* Dropdown Danh mục */}
          <nav className="nav">
            <div
              className="dropdown"
              onMouseEnter={() => setShowBikesDropdown(true)}
              onMouseLeave={() => setShowBikesDropdown(false)}
            >
              Xe đạp ▼
              {showBikesDropdown && (
                <div className="dropdown-menu">
                  <Link to="/bikes/common">Xe đạp phổ thông</Link>
                  <Link to="/bikes/kids">Xe đạp trẻ em</Link>
                  <Link to="/bikes/mountain">Xe đạp địa hình</Link>
                  <Link to="/bikes/racing">Xe đạp đua</Link>
                  <Link to="/bikes/stunt">Xe đạp biểu diễn</Link>
                </div>
              )}
            </div>

            <div
              className="dropdown"
              onMouseEnter={() => setShowAccessoriesDropdown(true)}
              onMouseLeave={() => setShowAccessoriesDropdown(false)}
            >
              Phụ kiện ▼
              {showAccessoriesDropdown && (
                <div className="dropdown-menu">
                  <Link to="/accessories/clothing">Trang phục</Link>
                  <Link to="/accessories/bottle">Chai nước/Gọng kẹp</Link>
                  <Link to="/accessories/lights">Đèn</Link>
                </div>
              )}
            </div>
          </nav>

          {/* Ô tìm kiếm */}
          <div className="search-box">
            <input type="text" placeholder="Search Bikes, Gear & Accessories" />
            <FaSearch className="search-icon" />
          </div>

          {/* Icon user, cart, logout */}
          <div className="actions">
            <Link to="/auth/profile" className="icons">
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
