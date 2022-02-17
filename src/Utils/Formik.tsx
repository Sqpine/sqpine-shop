import React from "react";
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import {schema} from "./validators";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import s from './style.module.css'
import {useNavigate} from "react-router-dom";

type PropsType = {
    deleteItems: () => void
}
const MainForm = (props: PropsType) => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            name: '',
            phoneNumber: ''
        },
        validationSchema: schema,
        onSubmit: () => {
            props.deleteItems()
            navigate('/redirect')
        },
    });

    return (
        <div className={s.formik}>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.field}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </div>
                <div className={s.field}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Name"
                        type="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </div>
                <div className={s.field}>
                    <TextField
                        required
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Phone Number"
                        type="phoneNumber"
                        placeholder="09-362-27-04"
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    />
                </div>
                <div className={s.buttons}>
                    <Button
                        onClick={props.deleteItems}
                        size='small'
                        color="error" variant="contained"
                        endIcon={<ClearAllIcon/>}
                    >
                        Delete All
                    </Button>
                    <Button
                        color="primary" variant="contained" type="submit"
                        endIcon={<ShoppingCartIcon/>}
                    >
                        Buy
                    </Button>
                </div>
            </form>
        </div>
    )
        ;
};
export default MainForm