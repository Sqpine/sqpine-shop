import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getItem, ItemStateType} from "../../Redux/Reducers/ItemReducer";
import {useParams} from "react-router-dom";
import {AppRootStateType} from "../../Redux/store";
import Item from "./Item";
import Preloader from "../Common/Preloader/Preloader";
import {asyncLocalStorage} from "../Shop/cartLocalStorage";

const ItemContainer = () => {

    const dispatch = useDispatch()
    const {id} = useParams()
    useEffect(() => {
        if (id) {
            dispatch(getItem(id))
        }
        return function cleanup() {
            debugger
            dispatch(getItem(null))
        }
    }, [])
    const buy = asyncLocalStorage.setItem

    const state = useSelector<AppRootStateType, ItemStateType>(state => state.itemPage)

    return (
        state.isFetching ?
            <Preloader/>
            :
            (state.item ? <Item buy={buy} {...state.item}/> : null)
    )
}
export default ItemContainer