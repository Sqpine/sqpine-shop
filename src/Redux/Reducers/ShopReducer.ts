import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {shopAPI} from "../../API/api";
import {AxiosResponse} from "axios";
import {setError} from "./AppReducer";

export type ItemType = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: RatingType
}


export type RatingType = {
    "rate": number
    "count": number
}

export type ItemsType = {
    items: ItemType[] | []
    isFetching: boolean
}

const initialState: ItemsType = {
    items: [],
    isFetching: false
}

export const slice = createSlice({
    name: 'itemsPage',
    initialState,
    reducers: {
        setAllItems: (state, action: PayloadAction<{ items: ItemType[] | [] }>) => {
            state.items = action.payload.items
        },
        setFetching: (state, action: PayloadAction<{ isFetching: boolean }>) => {
            state.isFetching = action.payload.isFetching
        }
    },
})

type SetFetchingType = ReturnType<typeof setFetching>
type SetAllItemsType = ReturnType<typeof setAllItems>

export const {setAllItems, setFetching} = slice.actions
export const itemsPageReducer = slice.reducer

export const getAllItems = () => {
    return (dispatch: Dispatch) => {

        dispatch<SetFetchingType>(setFetching({isFetching: true}))
        const response: Promise<AxiosResponse<ItemType[]>> = shopAPI.getAllProducts()

        response.then(response => {
            if (response.status === 200) {
                dispatch<SetAllItemsType>(setAllItems({items: response.data}))
            }
        }).catch(e => {
            alert(e)
        }).then(() => {
            dispatch<SetFetchingType>(setFetching({isFetching: false}))
        })
    };
};

export const getSomethingItemsInCategory = (category: string) => {
    return (dispatch: Dispatch) => {

        dispatch<SetFetchingType>(setFetching({isFetching: true}))
        const response: Promise<AxiosResponse<ItemType[]>> = shopAPI.getSomethingItems(category)

        response.then(response => {
            if (response.status === 200) {
                dispatch<SetAllItemsType>(setAllItems({items: response.data}))
            }
        }).catch(e => {
            dispatch(setError(e))
        }).then(() => {
            dispatch<SetFetchingType>(setFetching({isFetching: false}))
        })
    };
}