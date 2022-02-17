export type cartData = {
    [id: number]: number
}

export const asyncLocalStorage = {
    setItem: function (id: number, count: number = 1) {
        return Promise.resolve().then(function () {

            let cartData: cartData = {}
            const cart = localStorage.getItem('cart')
            cartData[id] = count

            if (cart === null) {
                localStorage.setItem('cart', JSON.stringify(cartData))
                console.log(cart)
            } else {
                const parseCart = JSON.parse(cart)
                if (!parseCart.hasOwnProperty(id)) {
                    cartData = {...parseCart, ...cartData}
                    localStorage.setItem('cart', JSON.stringify(cartData))
                }
            }
        });
    },
    setItemCount: function (id: number, count: number = 1) {
        return Promise.resolve().then(function () {

            let cartData: cartData = {}
            const cart = localStorage.getItem('cart')
            cartData[id] = count

            if (cart === null) {
                localStorage.setItem('cart', JSON.stringify(cartData))
                console.log(cart)
            } else {
                const parseCart = JSON.parse(cart)
                cartData = {...parseCart, ...cartData}
                localStorage.setItem('cart', JSON.stringify(cartData))
            }
        });
    },
    getCount: function (id: number) {
        return Promise.resolve().then(function () {
            const cart = localStorage.getItem('cart')
            if (cart) {
                const parseCart: cartData = JSON.parse(cart)
                return parseCart[id]
            }
        });
    },
    deleteItem: function (id: number) {
        return Promise.resolve().then(function () {
            const cart = localStorage.getItem('cart')
            const parseCart: cartData = cart && JSON.parse(cart)
            delete parseCart[id]
            localStorage.setItem('cart', JSON.stringify(parseCart))
        })
    }
}
