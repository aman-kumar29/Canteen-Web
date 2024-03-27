import React from 'react'
import classes from './header.module.css'
import { Link } from 'react-router-dom';

export default function Header() {
    const user = {
        name:'Aman',
    };
    const cart = {
        totalCount : 10,
    };
    const logout = ()=>{};

  return (
    <header className={classes.header}>
        <div className={classes.container}>
            <Link to='/' className={classes.logo}>
                Night Canteen
            </Link>
            <nav>
                <ul >
                {
                    user?
                    <li className={classes.menu_container}>
                        <Link to='/profile'>{user.name}</Link>
                        <div className={classes.menu}>
                            <Link to='/profile'>Profile</Link>
                            <Link to='/orders'>Orders</Link>
                            <a href="/#" onClick={logout}>Logout</a>
                        </div>
                    </li> :
                    <li>
                        <Link to='/login'>
                            Login
                        </Link>
                    </li>
                }
                <li>
                    <Link to='/cart'>
                        Cart {cart.totalCount > 0 ? <span className={classes.cart_count}>{cart.totalCount}</span> : <></>}
                    </Link>
                </li>
                </ul>
            </nav>
        </div>
    </header>
  )
}
