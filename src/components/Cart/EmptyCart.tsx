import s from "./s.module.css";
import emptyCart from "../../Images/emptyCart.png";
import React from "react";

const EmptyCart = () => {
    return (
        <div className={s.emptyCart}>
            <div>
                <h1>Your cart <br/>
                    is empty</h1>
            </div>
            <div className={s.emptyCartImg}>
                <img src={emptyCart} alt="Empty Cart"/>
            </div>
        </div>
    )
}
export default EmptyCart