import React, {useEffect} from "react";
import EmptyCart from "./EmptyCart";
import Cart from "./Cart";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../Redux/store";
import Preloader from "../Common/Preloader/Preloader";
import {deleteAllItems, getSomethingItems, StateType} from "../../Redux/Reducers/CartReducer";
import {cartData} from "../Shop/cartLocalStorage";

const CartContainer = () => {

    const dispatch = useDispatch()

    const state = useSelector<AppRootStateType, StateType>(state => state.cartPage)
    let totalPrice = 0

    if (state.items.length !== 0) {
        const euros = state.items.map(e => e.price)
        totalPrice = Math.round(
            euros.reduce((total, amount) => total + amount
            ) * Math.pow(10, 2)) / Math.pow(10, 2)
    }

    useEffect(() => {
        const cart = localStorage.getItem('cart')

        if (cart) {
            const parseCart: cartData = JSON.parse(cart)
            const keys = Object.keys(parseCart)
            const count = Object.values(parseCart)

            dispatch(getSomethingItems(keys, count))
        }
    }, [])

    const deleteItems = () => {
        dispatch(deleteAllItems())
    }

    return state.isFetching
        ?
        <Preloader/>
        :
        (state.items.length !== 0 ?
                <Cart deleteItems={deleteItems} state={state} totalPrice={totalPrice}/> : <EmptyCart/>
        )
}
export default CartContainer