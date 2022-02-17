import React, {useEffect} from "react";
import {getAllItems, getSomethingItemsInCategory, ItemsType} from "../../Redux/Reducers/ShopReducer";
import {useDispatch, useSelector} from "react-redux";
import Shop from "./Shop";
import Categories from "./Category/Categories";
import {AppRootStateType} from "../../Redux/store";
import Preloader from "../Common/Preloader/Preloader";
import {useParams} from "react-router-dom";
import {asyncLocalStorage} from "./cartLocalStorage";

const CurrentTabs = (category: string | undefined) => {
    let currentCategory = 0
    switch (category) {
        case 'electronics': {
            currentCategory = 1
            break
        }
        case 'jewelery': {
            currentCategory = 2
            break
        }
        case 'men\'s clothing': {
            currentCategory = 3
            break
        }
        case 'women\'s clothing': {
            currentCategory = 4
            break
        }
        default: {
            currentCategory = 0
        }
    }
    return currentCategory
}


const ShopContainer = () => {

    const {category} = useParams();
    const currentCategory = CurrentTabs(category)
    const dispatch = useDispatch();

    const buy = asyncLocalStorage.setItem

    useEffect(() => {
        if ((itemsState.items?.length === 0 || itemsState.items?.length < 20) && (category === 'all' || category === undefined)) {
            dispatch(getAllItems())
        } else if (category) {
            const items = itemsState.items.filter(e => e.category === category)
            if (items.length === 0 && category !== 'all') {
                dispatch(getSomethingItemsInCategory(category))
            }
        }
    }, [category])

    const itemsState = useSelector<AppRootStateType, ItemsType>(store => store.itemsPage)

    return (
        <div>
            <Categories currentCategory={currentCategory} isFetching={itemsState.isFetching}/>
            {itemsState.isFetching ?
                <Preloader/>
                :
                <Shop buy={buy} category={category} state={itemsState}/>
            }
        </div>
    )
}

export default ShopContainer