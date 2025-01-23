import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../state/auth/userAuthSlice';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className='bg-black text-white shadow-md z-10'>
      <div className='max-w-7xl mx-auto px-5 py-3 flex justify-between items-center'>
        {/* Logo */}
        <Link to='/' className='text-white text-4xl font-bold'>
          Logo
        </Link>

        {/* Hamburger Menu Icon */}
        <button
          className='text-white text-2xl md:hidden ml-auto'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop and Mobile Links */}
        <div className='md:flex md:justify-end'>
          <ul
            className={`md:flex md:space-x-6 md:ml-auto md:static absolute bg-black w-full left-0 transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'top-14' : 'top-[-200px]'
            }`}
          >
            <li className='md:inline-block'>
              <Link
                to='/'
                className='block text-white text-sm font-medium hover:text-blue-300 transition py-2 px-4 md:py-0'
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className='md:inline-block'>
              <Link
                to='/about'
                className='block text-white text-sm font-medium hover:text-blue-300 transition py-2 px-4 md:py-0'
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li className='md:inline-block'>
              <Link
                to='/contact'
                className='block text-white text-sm font-medium hover:text-blue-300 transition py-2 px-4 md:py-0'
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li className='md:inline-block'>
                  <Link
                    to='/favourite'
                    className='block text-white text-sm font-medium hover:text-blue-300 transition py-2 px-4 md:py-0'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Favourite
                  </Link>
                </li>
                <li className='md:inline-block'>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className='block text-white text-sm font-medium hover:text-blue-300 transition py-2 px-4 md:py-0'
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className='md:inline-block'>
                  <Link
                    to='/login'
                    className='block text-white text-sm font-medium hover:text-blue-300 transition py-2 px-4 md:py-0'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </li>
                <li className='md:inline-block'>
                  <Link
                    to='/register'
                    className='block text-white text-sm font-medium hover:text-blue-300 transition py-2 px-4 md:py-0'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
