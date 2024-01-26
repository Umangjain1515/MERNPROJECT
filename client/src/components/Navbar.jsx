import React, { useEffect, useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContext } from "../store/auth";
import { FaCartShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { isLoggedIn, logout, hasRole, authData,  cartItemCounts } = useContext(AuthContext);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`main-header ${scrolled ? 'sticky-header' : ''}`}>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">Bharat Tech</NavLink>
        </div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/product">Products</NavLink>
            </li>
            <li>
              <NavLink to="/service">Service</NavLink>
            </li>

            {isLoggedIn ? (
              <>
                <li className="cart-icons2">
                  <NavLink className="cart" to="/add-cart"> <FaCartShopping />
                  <span className="total-cart-items">{(cartItemCounts > 0) ? cartItemCounts : null}</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/search"> <FaSearch /></NavLink>
                </li>

                <li>
                  <div className="navImg">
                    <NavLink><img src={authData.avtar} alt="" /></NavLink>
                    <div className="dropdown">
                      <ul>
                        <li><NavLink to="/user-profile">Profile</NavLink></li>
                        <li><NavLink to="/my-orders">MyOrder</NavLink></li>
                        {hasRole('admin') && (
                          <li>
                            <NavLink to="/view-all-user">Users</NavLink>
                          </li>

                        )}
                        {hasRole('admin') && (
                          <li>
                            <NavLink to="/add-product">Add Product</NavLink>
                          </li>
                        )}
                        {hasRole('admin') && (
                          <li>
                            <NavLink to="/product-list">Product List</NavLink>
                          </li>
                        )}
                        {hasRole('admin') && (
                          <li>
                            <NavLink to="/view-all-contact">Contacts</NavLink>
                          </li>
                        )}
                        <li>
                          <Link to="/" onClick={logout}>
                            Logout
                          </Link>
                        </li>

                      </ul>
                    </div>
                  </div>
                </li>


              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>

                </li>
              </>
            )}
          </ul>
        </nav >
      </div >
    </header >
  );
};

export default Navbar;
