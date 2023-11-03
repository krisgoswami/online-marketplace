import React from 'react'

const Footer = () => {
    return (
        <div>
            <div className='flex flex-col lg:flex-row bg-teal-500 lg:h-60'>
                <div className='lg:w-1/2 ml-5 lg:ml-12 mt-5 lg:mt-10'>
                    <p className='text-white text-2xl font-bold mb-3'>Settyl Market</p>
                    <p className='text-white mb-5 w-96 lg:w-1/2 text-justify'>Settyl Market is an online marketplace where you can list items for sale, buy items from other people, and engage in real-time auctions for unique items. </p>
                </div>
                <div className='lg:w-1/4 mx-5 lg:ml-48 mt-5 lg:mt-10'>
                    <p className='text-white text-lg font-bold mb-3'>Contact</p>
                    <p className='text-white'>Email: <span className='text-teal-100 hover:text-teal-700 cursor-pointer'>JohnDoe@xyz.com</span></p>
                </div>
                <div className='lg:w-1/4 mx-5 lg:mr-10 mt-5 lg:mt-10'>
                    <p className='text-white text-lg font-bold mb-3'>Links</p>
                    <p className='text-teal-100 hover:text-teal-700 cursor-pointer mb-2'>FAQs</p>
                    <p className='text-teal-100 hover:text-teal-700 cursor-pointer mb-2'>Facebook</p>
                    <p className='text-teal-100 hover:text-teal-700 cursor-pointer mb-2'>Instagram</p>
                    <p className='text-teal-100 hover:text-teal-700 cursor-pointer mb-2'>LinkedIn</p>
                </div>
            </div>

            <div className='bg-teal-700 py-4 flex flex-col lg:flex-row items-center justify-between'>
                <p className='text-white font-semibold lg:ml-10'> &#169; Krishanu Goswami</p>
                <div className='flex gap-2 lg:mr-10 lg:gap-10'>
                    <a href='#' className='text-white font-medium'>Privacy Policy</a>
                    <a href='#' className='text-white font-medium'>Terms</a>
                    <a href='#' className='text-white font-medium'>Legal</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;