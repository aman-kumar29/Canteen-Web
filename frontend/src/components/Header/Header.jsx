import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart.js';
import { useAuth } from '../../hooks/useAuth';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

export default function Header() {
  const { user, logout } = useAuth();
  const cart = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to='/' className="text-2xl font-bold">
          Night Canteen
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {user ? (
            <>
              <Link to='/profile' className="hover:text-gray-400">
                Profile
              </Link>
              <Link to='/orders' className="hover:text-gray-400">
                Orders
              </Link>
                <Link to='/cart' className="hover:text-gray-400">
                    Cart {cart.totalCount > 0 && <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs">{cart.totalCount}</span>}
                </Link>
              <a href="/#" onClick={logout} className="hover:text-gray-400">
                Logout
              </a>
            </>
          ) : (
            <Link to='/login' className="hover:text-gray-400">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <MenuOutlined className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Nav (Overlay) */}
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-95 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl font-bold">Night Canteen</h2>
          <button onClick={toggleMenu} className="text-white">
            <CloseOutlined className="text-2xl" />
          </button>
        </div>

        <nav className="space-y-6 p-4">
          {user ? (
            <>
              <Link to='/profile' className="block text-white text-lg" onClick={toggleMenu}>
                Profile
              </Link>
              <Link to='/orders' className="block text-white text-lg" onClick={toggleMenu}>
                Orders
              </Link>
              <a href="/#" onClick={() => { logout(); toggleMenu(); }} className="block text-white text-lg">
                Logout
              </a>
            </>
          ) : (
            <Link to='/login' className="block text-white text-lg" onClick={toggleMenu}>
              Login
            </Link>
          )}
          <Link to='/cart' className="block text-white text-lg" onClick={toggleMenu}>
            Cart {cart.totalCount > 0 && <span className="bg-red-600 text-white rounded-full px-2 py-1 text-xs">{cart.totalCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
