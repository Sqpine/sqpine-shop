import React, {useState} from "react";
import {NavLink} from 'react-router-dom';
import s from './style.module.css';
import {RatingType} from "../../../Redux/Reducers/ShopReducer";
import Rating from '@mui/material/Rating';
import {Button} from '@mui/material';

type PropsType = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: RatingType
    buy: (s: number) => void

}
const ShopItem = (props: PropsType) => {

    const [click, setClick] = useState(false)
    const onClick = () => {
        props.buy(props.id)
        setClick(true)
    }

    return (
        <div className={s.itemBlock}>
            <NavLink to={`/item/${props.id}`}>
                <div className={s.itemPhoto}>
                    <img src={props.image} alt=""/>
                </div>
                <p>{props.title}</p>
            </NavLink>
            <div className={s.price}>
                <div>
                    <p>{props.price}$</p>
                </div>
                {click ?
                    <div>
                        <Button variant='contained' disabled color='inherit'>Bought</Button>
                    </div>
                    :
                    <div>
                        <Button onClick={onClick} disabled={click} variant='contained' color='primary'>Buy</Button>
                    </div>
                }
            </div>
            <Rating name="read-only" value={props.rating.rate} readOnly/>
        </div>
    )
}
export default ShopItem