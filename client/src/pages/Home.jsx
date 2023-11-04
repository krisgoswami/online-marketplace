import React from 'react'
import Categories from '../components/Categories'
import Featured from '../components/Featured'

const Home = () => {
    return (
        <div className='p-10'>
            <div className='my-5'>
                <Categories />
            </div>
            <Featured />
        </div>
    )
}

export default Home