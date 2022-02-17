import React from "react";
import {NavLink} from "react-router-dom";

import s from './style.module.css'
import logo from "../../../Images/logo.png";
import cart from "../../../Images/cart.png";


const Header = () => {
    return (
        <div className={s.header}>
            <div className={s.logo}>
                <img src={logo} alt="Logo"/>
            </div>
            <div>
                <NavLink to='/store' className={({isActive}) => (isActive ? s.selected : s.unselected)}>
                    <div>
                        <p>Store</p>
                    </div>
                </NavLink>
            </div>
            <div>
                <NavLink to='/cart' className={({isActive}) => (isActive ? s.selected : s.unselected)}>
                    <div className={s.cart}>
                        <p>Cart</p>
                        <div>
                            <img src={cart} alt=""/>
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    )
}
export default Header
