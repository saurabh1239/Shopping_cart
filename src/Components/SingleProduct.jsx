import React from 'react'
import { Card } from 'react-bootstrap/esm'
import Button from 'react-bootstrap/Button';
import Rating from './Rating'
import { CartState } from '../contexts/Context';

const SingleProduct = ({ prod }) => {
    const { state: { cart }, dispatch } = CartState()
    // console.log(cart,"cart");
    return (
        <div className='products'>
            <Card className='Card-items'>
                <Card.Img variant="top" src={prod.image} alt={prod.name} />
                <Card.Body>
                    <Card.Title>{prod.name}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom:10 }}>
                        <span>₹{prod.price.split('.')[0]}</span>
                        {prod.fastDelivery ? (
                            <div>Fast Delivery</div>
                        ) : (
                            <div>4 Days Delivery</div>
                        )}
                    </Card.Subtitle>
                    <Rating rating={prod.ratings} />
                    <br/>
                    {cart.some((p) => p.id === prod.id) ? (
                        <Button
                            onClick={() => {
                                dispatch({
                                    type: "REMOVE_FROM_CART",
                                    payload: prod
                                })
                            }}
                            variant="danger"> Remove From Cart</Button>
                    ) : (
                        <Button
                            onClick={() => {
                                dispatch({
                                    type: "ADD_TO_CART",
                                    payload: prod
                                })
                            }}
                            disabled={!prod.inStock}>
                            {!prod.inStock ? ("Out of Stock") : ("Add To Cart")}</Button>
                    )}
                </Card.Body>
            </Card>

        </div>
    )
}

export default SingleProduct