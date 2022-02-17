import React from "react";
import s from './style.module.css'
import success from '../../Images/success.png'

type PropsType = {
    count: number
}
const Success = (props: PropsType) => {

    return (
        <div className={s.centerItem}>
            <div>
                <img src={success}
                     alt="Successfully"/>
            </div>
            <div>
                <h1>The purchase has been successfully completed. <br/> Please wait for a call.</h1>
                <p>You will be redirected to store after {props.count}</p>
            </div>
        </div>
    )
}
export default Success