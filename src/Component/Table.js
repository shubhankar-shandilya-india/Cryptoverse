import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CoinList } from "../Api";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import { useSelector } from 'react-redux';

const Table = () => {
    const currency = useSelector((store)=>store.currency.currency)
    console.log(currency);
    
    const [arr, setarr] = useState([]);
    const [page, setpage] = useState(1);
    const [searchquery, setsearchquery] = useState("");
    
    let navigate = useNavigate();
    const clicked = (val) => (
        navigate(`/coins/${val}`)
    )
    const getclass = (val) => {
        const numericVal = Number(val);
        return numericVal < 0 ? "text-red-600 text-xs " : "text-green-600 text-xs ";
    };
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(CoinList(currency));
                console.log(response.data);
                setarr(response.data);
            } catch (err) {
                console.log(err.message);
            }
        };
        fetchdata();
    }, [currency]);
    const setthispage = (val) => {
        if (val <= 10 && val >= 1 && val !== page) {
            setpage(val);
        }

    }
    const len = arr.length > 0 ? Math.ceil(arr?.filter((coin) => coin.name.toLowerCase().includes(searchquery) || coin.symbol.toLowerCase().includes(searchquery)).length / 10) : 0;

    return (
        
        <div className='flex items-center flex-col w-[95vw] sm:w-[85vw] md:w-[80vw] '>
            <div className='w-full p-4 text-center pb-0 lg:text-2xl md:text-lg sm:text-base font-bold text-[#FAF0E6]'>Cryptocurrency Prices by Market Cap</div>
            <input className='w-full rounded-md bg-[#14161a] p-2 border-slate-600 text-white border-2 m-4' type="search" name="serach" id="" placeholder=' Search for a Crypto Coin' onChange={(e)=>setsearchquery(e.target.value)}/>
            <table className='w-full flex flex-col gap-[10px]'>
                <thead className='w-full'>
                    <tr className='flex w-full justify-around bg-[#87CEEB] rounded-md text-sm sm:text-base '>
                        <th className='p-2 sm:w-[42%]  justify-start text-left pl-[1.7vw] font-bold text-black'>Coin</th>
                        <th className='p-2 sm:w-[20%]  justify-start font-bold text-black'>Price </th>
                        <th className='p-2 sm:w-[18%]  justify-start font-bold text-black'>24h Change</th>
                        <th className='p-2 sm:w-[20%]  justify-start font-bold text-black'>Market Cap</th>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {arr?.filter((coin)=>coin.name.toLowerCase().includes(searchquery) || coin.symbol.toLowerCase().includes(searchquery)).slice(page * 10 - 10, page * 10).map((coin) => (
                        <tr onClick={() => clicked(coin.id)} className='text-xs vs:text-base w-full flex  hover:bg-[#87CEEB] text-[#FAF0E6] hover:font-bold hover:text-black rounded-md cursor-pointer' key={coin.id}>
 

                            <td className='flex items-center p-2 w-[38%] sm:w-[42%]  '>
                                <img className='h-10 pr-2 ' src={coin.image} alt="" />
                                <div className='flex flex-col'>
                                    <button className='font-bold'>{coin.name}</button>
                                    <button className='text-xs text-left'>{coin.symbol}</button>
                                </div>
                            </td>
                            <td className='p-2 w-[26%] sm:w-[20%] text-center'><button>{currency==='usd'?"$":"₹"}{coin.current_price.toLocaleString()}</button></td>
                            <td className={`${getclass(coin.price_change_percentage_24h)} p-2 w-[10%] sm:w-[18%] text-center`}>
                                <button>{coin.price_change_percentage_24h.toFixed(2)} %</button>
                            </td>
                            <td className='p-2 w-[26%] sm:w-[20%] text-center'><button>{(coin.market_cap / 1000000).toFixed(0).toLocaleString()} M</button></td>


                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex justify-center gap-[6px] sm:gap-[10px]  p-3 text-lg text-[#FAF0E6]'>
                <span onClick={() => setthispage(page - 1)} className={page > 1 ? "cursor-pointer flex items-center" : "opacity-0"}><FaCircleChevronLeft /></span>
                {
                    len > 0 &&
                    [...Array(len)].map((val, i) => {
                        return <span className={`${page === i + 1 ? "bg-slate-600" : ""}cursor-pointer hover:bg-[#87CEEB] hover:text-black  rounded-full w-[20px] sm:w-[25px] flex justify-center items-center`} onClick={() => setthispage(i + 1)}>{i + 1}</span>
                    })
                }
                <span onClick={() => setthispage(page + 1)} className={page < len ? "cursor-pointer flex items-center" : "opacity-0"}><FaCircleChevronRight />
                </span>
            </div>
        </div>
    );
}

export default Table;
