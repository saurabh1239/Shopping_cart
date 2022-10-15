import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { CartState } from '../contexts/Context'
import Rating from './Rating'


const Filters = () => {
    const { productState: { byStock, byFastDelivery, sort, byRating }, productDispatch } = CartState();
    console.log(byStock, byFastDelivery, sort, byRating );
    return (
        <div className='filters'>
            <span className='title'>Filter Products</span>
            <span>
                <Form.Check
                    inline
                    label="Ascending"
                    name="grp1"
                    type="radio"
                    id={`inline-1`}
                    onChange={() =>
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "lowToHigh",
                        })}
                    checked={sort === "lowToHigh" ? true : false}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Descending"
                    name="grp1"
                    type="radio"
                    id={`inline-2`}
                    onChange={() =>
                        productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "highToLow",
                        })}
                    checked={sort === "highToLow" ? true : false} />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Include out of stock"
                    name="grp1"
                    type="CheckBox"
                    id={`inline-2`}
                    onChange={() =>
                        productDispatch({
                            type: "FILTER_BY_STOCK",
                        })}
                    checked={byStock}
                />
            </span>
            <span>
                <Form.Check
                    inline
                    label="Fast Delivery"
                    name="grp1"
                    type="CheckBox"
                    id={`inline-2`} 
                    onChange={() =>
                        productDispatch({
                            type: "FILTER_BY_DELIVERY",
                        })}
                    checked={byFastDelivery}/>
            </span>
            <span>
                <label style={{ paddingRight: 10 }}>Rating:</label>
                <Rating rating={byRating} onClick={(i) => productDispatch({
                    type: "FILTER_BY_RATING",
                    payload: i + 1,
                })}
                    style={{ cursor: "pointer" }} />
            </span>
            <Button variant="light"
                onClick={() =>
                    productDispatch({
                        type: "CLEAR_FILTERS",
                    })}
                >Clear Filter</Button>
        </div>
    )
}

export default Filters