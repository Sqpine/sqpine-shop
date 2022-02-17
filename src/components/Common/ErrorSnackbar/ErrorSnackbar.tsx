import React from "react";
import {AppRootStateType} from "../../../Redux/store";
import {useDispatch, useSelector} from "react-redux";
import {Alert, AlertProps, Snackbar} from "@mui/material";
import {setError} from "../../../Redux/Reducers/AppReducer";

const AlertError = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <Alert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType, string | null>(state => state.appPage.error)
    const dispatch = useDispatch();

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setError({error: null}))
    };

    return (
        <Snackbar
            open={error !== null}
            autoHideDuration={6000}
        >
            <AlertError onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </AlertError>
        </Snackbar>
    )
}
export default ErrorSnackbar