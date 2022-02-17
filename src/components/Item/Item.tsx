import React, {useState} from "react";
import {RatingType} from "../../Redux/Reducers/ShopReducer";
import {Button} from "@mui/material";
import s from './s.module.css'

type PropsType = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: RatingType
    buy: (id: number, count?: number) => Promise<void>
}

const Item = (props: PropsType) => {

    const [click, setClick] = useState(false)

    const onClick = () => {
        props.buy(props.id).then(() => {
            setClick(true)
        })
    }

    return (
        <div className={s.itemPage}>
            <div className={s.itemPhoto}>
                <img src={props.image} alt='Item photo'/>
            </div>
            <div>
                <h1>{props.title}</h1>
                <p>{props.description}</p>
                <p>{props.price}$</p>
                {click ?
                    <Button size='large' variant='contained' disabled color='inherit'>Bought</Button>
                    :
                    <Button size='large' onClick={onClick} disabled={click} variant='contained'
                            color='primary'>Buy</Button>
                }
            </div>
        </div>
    )
}
export default Item