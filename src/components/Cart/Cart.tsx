import React from "react";
import s from './s.module.css'
import CartItem from "./CartItem/CartItem";
import {StateType} from "../../Redux/Reducers/CartReducer";
import MainForm from "../../Utils/Formik";

type PropsType = {
    state: StateType
    deleteItems: () => void
    totalPrice: number
}

const Cart = (props: PropsType) => {

    const CartItems = props.state.items && props.state.items.map(e => <CartItem key={e.id} {...e}/>)

    return (
        <div className={s.cartPage}>
            {
                CartItems
            }
            <p>Total price: {props.totalPrice}$</p>
            <hr/>
            <MainForm deleteItems={props.deleteItems}/>
        </div>
    )
}
export default Cart