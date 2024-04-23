import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectWatchlist } from '../Utils/watchlistSlice'
import { FaTrash } from "react-icons/fa";
import { doc, setDoc } from 'firebase/firestore';
import { selectuser } from '../Utils/userSlice';
import { db } from '../firebase';
import { FaChevronDown } from "react-icons/fa";

const Wishlist = () => {
    const watchlist = useSelector(selectWatchlist);
    const [wishlistopen, setwishlistopen] = useState(false);
    console.log(watchlist);
    const user = useSelector(selectuser);
    const handleRemoveFromWatchlist = async (coinid) => {
        const coinRef = doc(db, "watchlist", user.user.uid);
        try {
            await setDoc(
                coinRef,
                { coins: watchlist.filter((wish) => wish !== coinid) },
                { merge: true }
            );
            alert(`${coinid} Removed from the Watchlist !`);
        } catch (error) {
            alert(error.message)
        }
    };

    return (
        <div className='flex items-center flex-col w-[95vw] sm:w-[85vw] md:w-[80vw] text-[#FAF0E6]'>
            <div onClick={()=>setwishlistopen(!wishlistopen)} className='w-full p-4 text-center pb-0 lg:text-2xl md:text-lg sm:text-base font-bold text-[#FAF0E6] flex justify-center items-center' >Watchlist&nbsp;<FaChevronDown /></div>
            {wishlistopen? watchlist.map((coinid) => (
                <div className='flex gap-[1vw] pt-1'>
                    <p>{coinid}</p>
                    <button onClick={()=>handleRemoveFromWatchlist(coinid)}> <FaTrash /></button>
                </div>
            )) :null}
        </div>
    )
}

export default Wishlist