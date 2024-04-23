import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../Api';
import ReactHtmlParser from "react-html-parser";
import { useSelector } from 'react-redux';
import { selectuser } from '../Utils/userSlice';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { selectWatchlist } from '../Utils/watchlistSlice';
const CoinLeftBar = () => {
    const [coin, setcoin] = useState();
    const currency = useSelector((store) => store.currency.currency)
    const { id } = useParams();
    const user = useSelector(selectuser);
    const watchlist = useSelector(selectWatchlist);
    const [inWatchlist, setinWatchlist] = useState(watchlist.includes(id));
    console.log(inWatchlist)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(SingleCoin(id))
                setcoin(response.data);
            }
            catch (err) {
                console.log(err.message);
            }
        }
        fetchdata();
    }, [id]);
    const handleAddToWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.user.uid);
        try {
            await setDoc(
                coinRef,
                { coins: watchlist ? [...watchlist, coin?.id] : [coin?.id] },
                { merge: true }
            );
            setinWatchlist(true)
            alert(`${coin?.name} Added to the Watchlist !`);
        } catch (error) {
            alert(error.message)
        }
    };
    console.log(watchlist);
    
    const handleRemoveFromWatchlist = async () => {
        const coinRef = doc(db, "watchlist", user.user.uid);
        try {
            await setDoc(
                coinRef,
                { coins: watchlist.filter((wish) => wish !== coin?.id) },
                { merge: true }
            );
            setinWatchlist(false)
            alert(`${coin?.name} Removed from the Watchlist !`);
        } catch (error) {
            alert(error.message)
        }
    };
    return (
        <div className='w-[100vw] lg:w-[25vw] h-screen flex flex-col text-[#FAF0E6] p-3'>
            <div className='w-full flex flex-col items-center'>
                <img className='p-2 pb-0 w-[180px] h-[180px]' src={coin?.image.large} alt="" />
                <h3 className='p-2 pb-0 text-5xl font-bold'>{coin?.name}</h3>
            </div>
            <div className='w-full flex flex-col items-start'>
                <h6 className='p-2 pb-0 text-sm'>{ReactHtmlParser(coin?.description.en.split(". ")[0])}.</h6>
                <h5 className='p-2 pb-0 text-lg flex justify-start'>Rank: {coin?.market_cap_rank}</h5>
                <h5 className='p-2 pb-0 text-lg flex justify-start'>Current Price: {currency === 'usd' ? "$" : "₹"} {coin?.market_data.current_price[currency].toLocaleString()}</h5>
                <h5 className='p-2  text-lg flex justify-start'>Market Cap: {currency === 'usd' ? "$" : "₹"} {Number((coin?.market_data.market_cap[currency] / 1000000).toFixed(0)).toLocaleString()} M</h5>
                {
                    user
                        ?
                        <button onClick={inWatchlist ? handleRemoveFromWatchlist : handleAddToWatchlist} className=' text-center text-black px-2 py-1 w-[90%] text-lg flex justify-start bg-[#87CEEB]'>{inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}</button>
                        :
                        null
                }
            </div>
        </div>
    )
}
export default CoinLeftBar