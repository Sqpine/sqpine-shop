import React from "react";
import {ItemType} from "../../../Redux/Reducers/ShopReducer";
import s from './s.module.css'
import {NavLink} from 'react-router-dom';
import {IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import {asyncLocalStorage} from "../../Shop/cartLocalStorage";
import {useDispatch} from "react-redux";
import {deleteItemThunk, setItemCount} from "../../../Redux/Reducers/CartReducer";

const CartItem = (props: ItemType) => {

    const dispatch = useDispatch()

    const addCount = () => {
        const plus = props.rating.count + 1

        asyncLocalStorage.setItemCount(props.id, plus).then(() => {
            asyncLocalStorage.getCount(props.id).then(e => e &&
                dispatch(setItemCount({count: e, id: props.id})))
        })
    }

    const minusItem = () => {
        const minus = props.rating.count - 1

        asyncLocalStorage.setItemCount(props.id, minus).then(() => {
            asyncLocalStorage.getCount(props.id).then(e => e &&
                dispatch(setItemCount({count: e, id: props.id})))
        })
    }
    const deleteItem = () => {
        dispatch(deleteItemThunk(props.id))
    }

    return (
        <div className={s.visibility}>
            <div className={s.itemBlock}>
                <NavLink to={`/item/${props.id}`}>
                    <div className={s.itemPhoto}>
                        <img src={props.image} alt='Photo'/>
                    </div>
                </NavLink>
                <div>
                    <NavLink to={`/item/${props.id}`}>
                        <h3>{props.title}</h3>
                        <p>{props.description}</p>
                    </NavLink>

                    <IconButton onClick={minusItem} disabled={props.rating.count === 1} color='primary'>
                        <RemoveIcon/>
                    </IconButton>

                    <span>{props.rating.count}</span>

                    <IconButton onClick={addCount} color='primary'>
                        <AddIcon/>
                    </IconButton>

                    <p>{props.price}$</p>

                </div>
                <div>
                    <IconButton onClick={deleteItem} color='primary'>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        </div>
    )
}
export default CartItem