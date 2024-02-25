import React from 'react'
import Carousel from '../Component/Carousel'
import Table from '../Component/Table'

const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <Carousel/>
        <Table/>
    </div>
  )
}

export default Home