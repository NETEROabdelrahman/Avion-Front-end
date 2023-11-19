'use client'
import { ProductButtonProps } from '@/types'
import { ToastContainer, toast } from 'react-custom-alert';



const ProductButton = ({ data, pathname }: ProductButtonProps) => {
  const alertSuccess = () => toast.success('added to cart');
  const alertError = () => toast.error('please login first');

  const addToCart = () => {
    if (localStorage.getItem("theOrder")) {
      const oldProduct = JSON.parse(localStorage.getItem("theOrder")!)
      localStorage.setItem("theOrder", JSON.stringify(Array.from(new Set([...oldProduct, pathname]))))
    } else {
      localStorage.setItem("theOrder", JSON.stringify([pathname]))
    }
    if (localStorage.getItem("user")) {
      alertSuccess()
    } else {
      alertError()
    }
  }


  return (
    <>
      <ToastContainer floatingTime={5000} />
      <button disabled={data.amount > 0 ? false : true} className=' disabled:bg-slate-500 bg-[#2A254B] p-4 md:w-fit my-5 text-white w-full' onClick={addToCart}>{data.amount > 0 ? "add to cart" : "out of stock"}</button>
    </>
  )
};

export default ProductButton