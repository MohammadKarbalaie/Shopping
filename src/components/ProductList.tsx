import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../redux/store';
import { addToCart } from '../redux/CartSlice';
import { fetchProducts } from '../api/servies/products.service';
import { Product } from '../types/Product';
import { AiOutlineShopping } from 'react-icons/ai';

const ProductList: React.FC = () => {
  const { page } = useParams<{ page: string }>();  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { sort, rating, outofstock, fastDelivery } = useSelector((state: RootState) => state.filters);

  const currentPage = parseInt(page || "1", 10);  
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  const { data, isLoading, error } = useQuery(['products', currentPage], () => fetchProducts(limit, skip), {
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data && data.total > 0 && currentPage > Math.ceil(data.total / limit)) {
      navigate(`/products/1`);  
    }
  }, [currentPage, data, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (error || !data) return <p>Error loading products</p>;

  const totalPages = Math.ceil(data.total / limit);

  const filteredProducts = data.products
    ?.filter((product: Product) => product.rating >= rating)
    .filter((product: Product) => (fastDelivery ? product.availabilityStatus === 'Fast' : true))
    .filter((product: Product) => (outofstock ? product.availabilityStatus === 'outofstock' : true))
    .sort((a: Product, b: Product) => (sort === 'asc' ? a.price - b.price : b.price - a.price));

  return (
    <div>
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
                <p className='flex font-medium items-center gap-2'> Add To Cart <AiOutlineShopping /></p>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={() => navigate(`/products/${currentPage - 1}`)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => navigate(`/products/${currentPage + 1}`)}
          disabled={currentPage >= totalPages}  
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
