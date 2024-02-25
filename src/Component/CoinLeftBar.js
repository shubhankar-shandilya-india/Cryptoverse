import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Api';
import ReactHtmlParser from "react-html-parser";
const CoinLeftBar = () => {
    const [arr, setarr] = useState();
    const { id } = useParams();
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(SingleCoin(id))
                console.log(response.data);
                setarr(response.data);
            }
            catch (err) {
                console.log(err.message);
            }
        }
        fetchdata();
    }, [id]);
    return (
        <div className='w-[100vw] lg:w-[25vw] h-screen flex flex-col text-[#FAF0E6] p-3'>
            <div className='w-full flex flex-col items-center'>
                <img className='p-2 w-[180px] h-[180px]' src={arr?.image.large} alt="" />
                <h3 className='p-2 text-5xl font-bold'>{arr?.name}</h3>
            </div>
            <div className='w-full flex flex-col items-start'>
                <h6 className='p-2 text-sm'>{ReactHtmlParser(arr?.description.en.split(". ")[0])}.</h6>
                <h5 className='p-2 text-lg flex justify-start'>Rank: {arr?.market_cap_rank}</h5>
                <h5 className='p-2 text-lg flex justify-start'>Current Price: ₹ {arr?.market_data.current_price.inr.toLocaleString()}</h5>
                <h5 className='p-2 text-lg flex justify-start'>Market Cap: ₹ {Number((arr?.market_data.market_cap.inr / 1000000).toFixed(0)).toLocaleString()} M</h5>
            </div>
        </div>
    )
}
export default CoinLeftBar