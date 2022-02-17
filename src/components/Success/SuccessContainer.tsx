import React, {useEffect, useState} from "react";
import Success from "./Success";
import {useNavigate} from "react-router-dom";

const SuccessContainer = () => {
    const navigate = useNavigate()
    const [count, setCount] = useState(5)

    const Counter = () => {
        if (count > 0) {
            setTimeout(() => {
                    setCount(count - 1)
                }
                , 1000)
        } else {
            navigate('/store')
        }
    }

    useEffect(() => {
        Counter()
    }, [count])

    return (
        <Success count={count}/>
    )
}
export default SuccessContainer