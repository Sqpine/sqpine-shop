import React, {Suspense} from 'react';
import s from './App.module.css'
import Header from "./components/Common/Header/Header";
import {Route, Routes} from "react-router-dom";
import store from "./Redux/store";
import {Provider} from "react-redux";
import Preloader from "./components/Preloader/Preloader";
import ErrorSnackbar from "./components/Common/ErrorSnackbar/ErrorSnackbar";
import {Navigate} from "react-router-dom";

const ShopContainer = React.lazy(() => import("./components/Shop/ShopContainer"))
const ItemContainer = React.lazy(() => import('./components/Item/ItemContainer'))
const CartContainer = React.lazy(() => import('./components/Cart/CartContainer'))
const SuccessContainer = React.lazy(() => import('./components/Success/SuccessContainer'))

const App = () => {
    return (
        <Provider store={store}>
            <div className={s.App}>
                <div className={s.headerContent}>
                    <ErrorSnackbar/>
                    <Header/>
                    <Routes>
                        <Route path='/store/*' element={<Suspense fallback={<Preloader/>}>
                            <ShopContainer/>
                        </Suspense>}>
                            <Route path=':category' element={<Suspense fallback={<Preloader/>}>
                                <ShopContainer/>
                            </Suspense>}/>
                        </Route>
                        <Route path='/item/*' element={<Suspense fallback={<Preloader/>}>
                            <ItemContainer/>
                        </Suspense>}>
                            <Route path=':id' element={<Suspense fallback={<Preloader/>}>
                                <ItemContainer/>
                            </Suspense>}/>
                        </Route>
                        <Route path='/cart' element={<Suspense fallback={<Preloader/>}>
                            <CartContainer/>
                        </Suspense>}/>
                        <Route path='/redirect' element={<Suspense fallback={<Preloader/>}>
                            <SuccessContainer/>
                        </Suspense>}/>
                        <Route path='/' element={<Navigate to="/store" />}/>
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}
export default App;
