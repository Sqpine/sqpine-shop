import React from "react";
import s from './style.module.css'

const Preloader = () => {
    return (
        <div className={s.blocks}>
            <div className={s.block + ' ' + s.orange}></div>
            <div className={s.block + ' ' + s.blue}></div>
        </div>
    )
}
export default Preloader