import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {Item, shopAPI} from "../../API/api";
import {RatingType} from "./ShopReducer";
import {asyncLocalStorage} from "../../components/Shop/cartLocalStorage";
import {setError} from "./AppReducer";
import {AxiosResponse} from "axios";

type ItemType = {
    id: number
    title: string
    price: number
    cartPrice: number
    description: string
    category: string
    image: string
    rating: RatingType
}

export type StateType = {
    items: ItemType[] | []
    allPrice: number
    isFetching: boolean
}

const initialState: StateType = {
    items: [],
    allPrice: 0,
    isFetching: false,


}
export const slice = createSlice({
    name: 'cartPage',
    initialState,
    reducers: {
        addItems: (state, action: PayloadAction<{ items: ItemType[] | [] }>) => {
            state.items = action.payload.items
        },
        setItemCount: (state, action: PayloadAction<{ count: number, id: number }>) => {
            if (state.items) {
                const index = state.items.findIndex(e => e.id === action.payload.id)
                state.items[index].rating.count = action.payload.count
                state.items[index].price = Math.round((state.items[index].cartPrice * action.payload.count) * Math.pow(10, 2)) / Math.pow(10, 2)
            }

        },
        removeItem(state, action: PayloadAction<{ id: number }>) {
            if (state.items) {
                const tasks = state.items
                const index = tasks.findIndex(t => t.id === action.payload.id)
                if (index > -1) {
                    tasks.splice(index, 1)
                }
            }
        },
        setFetching: (state, action: PayloadAction<{ isFetching: boolean }>) => {
            state.isFetching = action.payload.isFetching
        }
    }
})

export type DataType = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: {
        rate: number
        count: number
    }
}

export const getSomethingItems = (id: string[], count: number[]) => {
    return (dispatch: Dispatch) => {

        dispatch<SetFetchingType>(setFetching({isFetching: true}))
        dispatch<AddItemsType>(addItems({items: []}))

        const response: Promise<AxiosResponse<Item>>[] = id.map(e => shopAPI.getSinglePorduct(e))
        Promise.all(response).then((response) => {

            const data = response.map((e, key) => {
                e.data.rating.count = count[key]
                e.data.cartPrice = e.data.price
                e.data.price = Math.round(e.data.price * count[key] * Math.pow(10, 2)) / Math.pow(10, 2)
                return e.data
            })

            dispatch<AddItemsType>(addItems({items: data}))
        }).catch(e => {
            dispatch(setError(e))
        }).then(() => {
            dispatch<SetFetchingType>(setFetching({isFetching: false}))
        })

    }
}

export const deleteAllItems = () => {
    return (dispatch: Dispatch) => {

        localStorage.clear()
        dispatch(addItems({items: []}))
    }
}

export const deleteItemThunk = (id: number) => {
    return (dispatch: Dispatch) => {

        asyncLocalStorage.deleteItem(id).then(() => {
            dispatch(removeItem({id: id}))
        })
    }
}

export const {addItems, setFetching, setItemCount, removeItem} = slice.actions

type SetFetchingType = ReturnType<typeof setFetching>
type AddItemsType = ReturnType<typeof addItems>

export const itemsCartReducer = slice.reducer