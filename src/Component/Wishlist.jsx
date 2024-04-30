import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectWatchlist } from '../Utils/watchlistSlice'
import { FaTrash } from "react-icons/fa";
import { doc, setDoc } from 'firebase/firestore';
import { selectuser } from '../Utils/userSlice';
import { db } from '../firebase';
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const watchlist = useSelector(selectWatchlist);
    const [wishlistopen, setwishlistopen] = useState(true);
    let navigate = useNavigate();
    const clicked = (val) => (
        navigate(`/coins/${val}`)
    )
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
            <button onClick={()=>setwishlistopen(!wishlistopen)} className='w-full p-4 text-center  lg:text-2xl md:text-lg sm:text-base font-bold text-[#FAF0E6] flex justify-center items-center ' >Watchlist&nbsp;<FaChevronDown /></button>
            
            {wishlistopen? 
                <table className='w-full flex flex-col gap-[10px]'>
                <thead className='w-full'>
                    <tr className='flex w-full justify-evenly bg-[#87CEEB] rounded-md text-sm sm:text-base '>
                        <th className='p-2 w-1/2  font-bold text-black'>Your coins</th>
                    </tr>
                </thead>
                <tbody className='w-full mb-4'>
                    {
                        watchlist.map((coinid) => (
                            <tr  className=' flex w-full justify-evenly  py-2 text-xs vs:text-base hover:bg-[#87CEEB] text-[#FAF0E6] hover:font-bold hover:text-black rounded-md cursor-pointer'>
                                <td onClick={() => clicked(coinid)} className='p-2 w-[26%] sm:w-[20%] text-center'>{coinid}</td>
                                <td className='p-2 w-[26%] sm:w-[20%] text-center'><button onClick={()=>handleRemoveFromWatchlist(coinid)}> <FaTrash /></button></td>
                            </tr>
                        )) 
                    }
                </tbody>
            </table>
            :null}
        </div>
    )
}

export default Wishlist