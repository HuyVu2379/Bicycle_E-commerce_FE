import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import SearchBar from "@/components/SearchBar";

const Header: React.FC = () => {
  const [showBikesDropdown, setShowBikesDropdown] = useState(false);
  const [showAccessoriesDropdown, setShowAccessoriesDropdown] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <img src="/public/assets/images/logo.jpg" alt="logo" className="logo-img" />
          <span className="logo-text">CycleCity</span>
        </div>

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
        {/* <div className="search-box">
          <input type="text" placeholder="Search Bikes, Gear & Accessories" />
          <FaSearch className="search-icon" />
        </div> */}
        <SearchBar />

        {/* Icon user, cart, logout */}
        <div className="actions">
          <Link to="/auth/login">
            <FaUser className="icon" />
          </Link>

          <div className="cart">
            <FaShoppingCart className="icon" />
            <span className="cart-badge">4</span>
          </div>
          <Link to="/logout" className="logout">
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
