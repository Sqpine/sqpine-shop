import s from "../style.module.css";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {NavLink} from "react-router-dom";
import React, {useEffect, useState} from "react";

type Filter = number
type PropsType = {
    isFetching: boolean
    currentCategory: number
}
const Categories = (props: PropsType) => {
    const [alignment, setAlignment] = useState<Filter>(0);

    useEffect(() => {
        setAlignment(props.currentCategory)
    }, [props.currentCategory])

    const handleChange = (event: React.SyntheticEvent, newAlignment: Filter) => {
        setAlignment(newAlignment);
    };

    return (
        <div className={s.buttons}>
            <Box color='primary' sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs variant="fullWidth"
                      onChange={handleChange}
                      value={alignment}
                      aria-label="basic tabs example"
                >
                    <Tab component={NavLink}
                         disabled={props.isFetching}
                         to="all"
                         label="All"/>
                    <Tab component={NavLink}
                         disabled={props.isFetching}
                         to="electronics"
                         label="Electronics"/>
                    <Tab component={NavLink}
                         disabled={props.isFetching}
                         to="jewelery"
                         label="Jewelery"/>
                    <Tab component={NavLink}
                         disabled={props.isFetching}
                         to="men's clothing"
                         label="Men's clothing"/>
                    <Tab component={NavLink}
                         disabled={props.isFetching}
                         to="women's clothing"
                         label="Women's clothing"/>
                </Tabs>
            </Box>
        </div>
    )
}
export default Categories