import React from 'react'
import { ToastContainer, toast,Bounce } from 'react-toastify';

export const successToast= (message) => {
    toast.success(message)
}
export const errorToast= (message) => {
    toast.error(message)
}

const Toaster = () => {
  return (
    <>
     <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
/>
    </>
  )
}

export default Toaster
    