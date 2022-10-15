import { Filter } from '@mui/icons-material';
import React from 'react'
import SingleProduct from '../Components/SingleProduct';
import { CartState } from '../contexts/Context'
import Filters from '../Components/Filters';
import "../Components/style.css"

const Homepage = () => {
    const { state:{products},productState:{sort, byStock, byFastDelivery, byRating, searchQuery}, } = CartState();
    const transformProducts = ()=>{
        let sortedProducts = products;
        if(sort){
            sortedProducts = sortedProducts.sort((a,b)=>
            (sort === "lowToHigh" )? (a.price - b.price) :(b.price-a.price))
            
        }

        if(!byStock){
            sortedProducts = sortedProducts.filter((prod)=>prod.inStock);
        }
        if(byFastDelivery){
            sortedProducts = sortedProducts.filter((prod)=>prod.fastDelivery);
        }
        if(byRating){
            sortedProducts = sortedProducts.filter((prod)=>prod.ratings>=byRating);
        }
        
        if(searchQuery){
            sortedProducts = sortedProducts.filter((prod)=>
                prod.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
            return sortedProducts
        }
        return sortedProducts;
    }
    return (
        <div className='home'>
             <Filters/>
            <div className='productContainer'>
            {transformProducts().map((product)=>{
                return <SingleProduct prod={product} key={product.id} />
            })
        }
        </div>
        </div>
    )
}

export default Homepage