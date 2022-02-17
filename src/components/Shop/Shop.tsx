import React from "react";
import ShopItem from "./ItemBlock/ShopItem";
import {ItemsType} from "../../Redux/Reducers/ShopReducer";
import s from './style.module.css'

type TypeProps = {
    state: ItemsType
    category: string | undefined
    buy: (id: number, count?: number) => Promise<void>
}
const Shop = (props: TypeProps) => {
    if (props.state.items) {

        if (props.category !== 'all' && props.category) {
            const items = props.state.items.filter(e => e.category === props.category)

            return (
                <div className={s.items}>
                    {items.map(e => <ShopItem buy={props.buy} key={e.id} {...e}/>)}
                </div>
            )

        } else {

            const items = props.state.items.map(e => <ShopItem buy={props.buy} key={e.id} {...e}/>)

            return (
                <div className={s.items}>
                    {items}
                </div>
            )
        }
    }
    return null
}
export default Shop