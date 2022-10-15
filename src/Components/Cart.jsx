import { Button, Col, Image, ListGroupItem, Row } from 'react-bootstrap';
import { AiFillDelete } from 'react-icons/ai';
import Form from 'react-bootstrap/Form';
import React from 'react'
import { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { CartState } from '../contexts/Context'
import "./style.css"
import { useEffect } from 'react';
import Rating from './Rating';

const Cart = () => {
    const {
        state: { cart },
        dispatch,
    } = CartState();
    const [total, setTotal] = useState()

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
    }, [cart])
    return (
        <div className='home'>
            <div className='productContainer'>
                <ListGroup>
                    {cart.map((item) =>
                        <ListGroup.Item key={item.id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded />
                                </Col>
                                <Col md={2}>
                                    <span>
                                        {item.name}
                                    </span>
                                </Col>
                                <Col md={2}>
                                    {item.price}
                                </Col>
                                <Col md={2}>
                                    <Rating rating={item.ratings} />
                                </Col>
                                <Col md={2}>
                                    <Form.Control as="select" value={item.qty}
                                        onChange={(e)=>
                                        dispatch({
                                            type: "CHANGE_CART_QTY",
                                            payload:{
                                                id:item.id,
                                                qty: e.target.value,
                                            },
                                        })}
                                    >
                                        {[...Array(item.inStock).keys()].map((x) => (
                                            <option key={x + 1}>{x + 1}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <AiFillDelete
                                        fontSize="30px"
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            dispatch({
                                                type: "REMOVE_FROM_CART",
                                                payload: item,
                                            })}
                                    />
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </div>
            <div className='filters summary'>
                <span className='title'>Subtotal ({cart.length}) Items</span>
                <span style={{ frontweight: 700, fontSize: 20 }}>Total: ₹{total}</span>
                <Button type="button" disabled={cart.length === 0}>
                    Proceed to Checkout
                </Button>
            </div>
        </div>
    )
}

export default Cart