import axios from "axios";
import {RatingType} from "../Redux/Reducers/ShopReducer";

const instance = axios.create({
    baseURL: 'https://fakestoreapi.com/'
})
export type ItemType = {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: RatingType
}
export type Item = {
    id: number
    title: string
    price: number
    cartPrice: number
    description: string
    category: string
    image: string
    rating: RatingType
}

export const shopAPI = {
    getSinglePorduct(id:string){
        return instance.get<Item>(`products/${id}`)
    },
    getSomethingItems(category:string) {
        return instance.get<ItemType[]>(`products/category/${category}`);
    },
    getAllProducts(){
        return instance.get<ItemType[]>(`products`);
    }
}
