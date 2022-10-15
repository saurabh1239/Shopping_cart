import React, { useContext, useReducer } from 'react'
import { createContext } from 'react';
import { faker } from "@faker-js/faker"

import { CartReducer,productReducer } from './reducer';

const Cart = createContext();

const Context = ({ children }) => {

    const products = [...Array(30)].map(() => ({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.image(),
        inStock: Math.floor(Math.random() * 10),
        fastDelivery: Math.random() >= 0.5,
        ratings: Math.floor(Math.random() * 5),
    }));
    // console.log(products);

    const [state, dispatch] = useReducer(CartReducer, {
        products: products,
        cart: []
    })

    const [productState, productDispatch] = useReducer(productReducer, {
        byStock: false,
        byFastDelivery: false,
        byRating: 0,
        searchQuery: "",
    })

    return (
        <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
            {children}
        </Cart.Provider>
    )
}

export default Context

export const CartState = () => {
    return useContext(Cart)
}

