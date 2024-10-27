import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/CartSlice';
import { AiOutlineShopping } from 'react-icons/ai';
import { ProductResponse } from "../types/ProductResponse";
import { Product } from '../types/Product';

const ProductList: React.FC = () => {

  const dispatch = useDispatch();
  const { sort, rating,outofstock,fastDelivery } = useSelector((state: RootState) => state.filters);  

  const { data, isLoading, error } = useQuery<ProductResponse >('products', async () => {
    const res = await axios.get('https://dummyjson.com/products');
    return res.data;
  });


if (isLoading) return <p>Loading...</p>;
if (error) return <p>Error loading products</p>

const filteredProducts = data?.products
.filter((product: Product) => product.rating >= rating)
.filter((product: Product) => (fastDelivery ? product.availabilityStatus === 'Fast' : true))
.filter((product: Product) => (outofstock ? product.availabilityStatus === 'outofstock' : true))
.sort((a: Product, b: Product) => (sort === 'asc' ? a.price - b.price : b.price - a.price));

  
return (
  <div className="grid grid-cols-3 gap-4 p-4">
    {filteredProducts?.map((product: Product) => (
      <div key={product.id} className="border p-4">
        <img src={product.images} alt={product.title} className="w-full h-48 object-cover mb-2" />
        <div className='border-t-2 border-black bg-gray-100 rounded-bl-xl rounded-br-xl px-4 py-2'>
          <h2 className="text-xl font-bold">{product.title}</h2>
          <div className='flex flex-col items-start justify-start'>
            <p className='text-lg font-medium'>{product.price} $</p>
            <p className='text-lg font-medium'>Rating: {product.rating} ⭐</p>
            <p className='text-lg font-medium'>Brand: {product.brand}</p>
          </div>
        
        <button
          className="bg-blue-500 rounded-xl my-2 text-white px-6 py-3 mt-2"
          onClick={() => dispatch(addToCart(product))}
        >
         <p className='flex font-medium items-center gap-2'> Add To Cart
         <AiOutlineShopping /></p>
        </button>
        </div>
      </div>
    ))}
  </div>
);
}

export default ProductList
