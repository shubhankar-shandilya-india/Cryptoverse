import React from 'react'
import Carousel from '../Component/Carousel'
import Table from '../Component/Table'
import { useSelector } from 'react-redux'
import { selectuser } from '../Utils/userSlice'
import Wishlist from '../Component/Wishlist'

const Home = () => {
  const user = useSelector(selectuser);
  return (
    <div className='flex flex-col items-center justify-center'>
        <Carousel/>
        {user?<Wishlist/>:null}
        <Table/>
    </div>
  )
}

export default Home