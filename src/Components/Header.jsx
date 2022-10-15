import Container from 'react-bootstrap/Container';
import { MdShoppingCart } from 'react-icons/md'
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Badge, Dropdown, FormControl, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import "../App.css"
import { CartState } from '../contexts/Context';
import { AiFillDelete } from 'react-icons/ai';
import { Button } from 'react-bootstrap';

const Header = () => {
    const { state: { cart }, dispatch, productDispatch } = CartState()
    return (
        <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
            <Container>
                <Navbar.Brand >
                    <Link to="/">Shopping Cart</Link>
                </Navbar.Brand>
                <Navbar.Text className='search'>
                    <FormControl style={{ width: 500 }} placeholder="search a product"
                        className='m-auto' 
                        onChange={(e)=>{productDispatch({
                            type: "FILTER_BY_SEARCH",
                            payload: e.target.value
                        })
                        }}/>
                </Navbar.Text>
                <Nav>
                    <Dropdown alignRight>
                        <Dropdown.Toggle variant='success'>
                            <MdShoppingCart color='white' fontSize="25px" />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: 370 }}>
                            {
                                cart.length > 0 ? (
                                    <>
                                        {cart.map((item) =>
                                            <span className='cartitem' key={item.id}>
                                                <img src={item.image} className="cartItemImg" alt={item.name} />
                                                <div className='cartItemDetail'>
                                                    <span>{item.name}</span>
                                                    <span>₹{item.price.split(".")[0]}</span>
                                                </div>
                                                <AiFillDelete
                                                    fontSize="20px"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() =>
                                                        dispatch({
                                                            type: "REMOVE_FROM_CART",
                                                            payload: item,
                                                        })}
                                                />
                                            </span>
                                        )}
                                        <Link to="/Cart">
                                            <Button style={{width:"95%", margin:"0 10px"}}>View cart</Button>
                                        </Link>
                                    </>
                                ) : (
                                    <span style={{ padding: 10 }}>Cart is empty</span>
                                )
                            }
                        </Dropdown.Menu>

                    </Dropdown>
                </Nav>

            </Container>
        </Navbar>
    );
};

export default Header