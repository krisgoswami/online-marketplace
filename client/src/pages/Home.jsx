import React from 'react'
import Categories from '../components/Categories'
import Featured from '../components/Featured'
import ImageSlider from '../components/ImageSlider'

const Home = () => {
    return (
        <div className='p-10 mt-14'>
            <div className='my-5'>
                <ImageSlider />
            </div>
            <div className='my-5'>
                <Featured />
            </div>
            <div className='my-5'>
                <Categories />
            </div>
        </div>
    )
}

export default Home