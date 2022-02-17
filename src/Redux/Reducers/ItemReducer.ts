import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {shopAPI} from "../../API/api";
import {ItemType} from "./ShopReducer";
import {setError} from "./AppReducer";


export type ItemStateType = {
    item: ItemType | null,
    isFetching: boolean
}
const initialState: ItemStateType = {
    item: null,
    isFetching: false,
}
export const slice = createSlice({
    name: 'itemPage',
    initialState,
    reducers: {
        setItem: (state, action: PayloadAction<{ item: ItemType | null }>) => {
            state.item = action.payload.item
        },
        setFetching: (state, action: PayloadAction<{ isFetching: boolean }>) => {
            state.isFetching = action.payload.isFetching
        }
    }
})
export const {setItem, setFetching} = slice.actions

type SetFetchingType = ReturnType<typeof setFetching>
type SetItemType = ReturnType<typeof setItem>

export const itemReducer = slice.reducer

export const getItem = (id: string | null) => {
    return (dispatch: Dispatch) => {
        if (typeof id == 'string') {

            dispatch<SetFetchingType>(setFetching({isFetching: true}))

            shopAPI.getSinglePorduct(id).then(res => {

                if (res.status === 200) {
                    dispatch<SetItemType>(setItem({item: res.data}))
                }
            }).catch(e => {
                dispatch(setError(e))
            }).then(() => {
                dispatch<SetFetchingType>(setFetching({isFetching: false}))
            })
        } else dispatch<SetItemType>(setItem({item: null}))
    }
}