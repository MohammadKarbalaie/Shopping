import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '../components/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { clearCart } from '../redux/CartSlice';

const CheckoutSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is invalid"),
  address: z.string().min(5, "Address is required"),
  landline: z.string().optional(),
});

type CheckoutFormInputs = z.infer<typeof CheckoutSchema>;

const CheckoutPage: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  const [formData, setFormData] = React.useState<CheckoutFormInputs | null>(null);

 
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormInputs>({
    resolver: zodResolver(CheckoutSchema),
  });

  const onSubmit = (data: CheckoutFormInputs) => {
    setFormData(data);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    dispatch(clearCart()); 
  };

 
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold">Enter Your Details</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-4">
        <input placeholder="Name" className='rounded-xl outline-none px-2 py-2 border' {...register("name")} />
        <p className="text-red-500">{errors.name?.message}</p>

        <input placeholder="Email" className='rounded-xl outline-none px-2 py-2 border' {...register("email")} />
        <p className="text-red-500">{errors.email?.message}</p>

        <input placeholder="Phone" className='rounded-xl outline-none px-2 py-2 border' {...register("phone")} />
        <p className="text-red-500">{errors.phone?.message}</p>

        <input placeholder="Address" className='rounded-xl outline-none px-2 py-2 border' {...register("address")} />
        <p className="text-red-500">{errors.address?.message}</p>

        <input placeholder="Landline (optional)" className='rounded-xl outline-none px-2 py-2 border' {...register("landline")} />

        <button className='px-6 py-2 bg-sky-600 w-40 mx-auto mt-4 text-white font-semibold hover:bg-sky-400 hover:text-gray-900' type="submit">
          Submit
        </button>
      </form>

      {showModal && formData && (
        <Modal onClose={handleModalClose}>
          <h2 className='bg-sky-500 mb-2 text-white font-semibold text-2xl px-4 py-2'>Order</h2>
          <div className='px-4 py-2'>
            <p className='text-lg'><strong>Customer Details:</strong></p>
            <p>Name: {formData.name}</p>
            <p>Email: {formData.email}</p>
            <p>Phone: {formData.phone}</p>
            <p>Address: {formData.address}</p>
            <p>Landline: {formData.landline || "N/A"}</p>

            <div className="mt-8 flex gap-6">
              <p className="text-lg absolute"><strong>Cart Items:</strong></p>
              {cartItems.map((item) => (
                <div key={item.id} className="border-b mt-6 py-2 ">
                  <img src={item.images} alt="" width={80}  />
                  <p>{item.title}</p>
                  <p>Price: ${item.price}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-lg font-bold">Total Price: ${totalPrice.toFixed(2)}</p>

            <button className='px-4 mt-4 bg-sky-500 py-1 text-white' onClick={handleModalClose}>OK</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default CheckoutPage;
