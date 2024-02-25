import React from 'react'
import CoinLeftBar from '../Component/CoinLeftBar'
import Chart from '../Component/Chart'

const Coin = () => {
  return (
    <div className='flex flex-col lg:flex-row w-screen h-screen'>
      <CoinLeftBar />
      <Chart />
    </div>
  )
}

export default Coin