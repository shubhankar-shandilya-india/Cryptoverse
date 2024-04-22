import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import Select from 'react-select';
import { setCurrency } from '../Utils/currencySlice';

const Nav = ({ openmodal, closemodal, modal }) => {
    const options = [
        { value: 'usd', label: 'USD' },
        { value: 'inr', label: 'INR' }
    ];
    const dispatch = useDispatch();
    const handleCurrencyChange = (e) => {
        dispatch(setCurrency(e.value));
    }
    return (
        <ul className='flex gap-[50vw] justify-around bg-[#14161a] p-2 top-0 items-center w-full sticky nav z-[1]'>
            <Link className='font-bold text-[#87CEEB]' to="/">Cryptoverse</Link>
            <div className='flex text-white gap-[1vw]'>
                <Select
                    options={options}
                    defaultValue={options[1]}
                    onChange={handleCurrencyChange}
                />
                <button onClick={openmodal}>Login</button>
            </div>
        </ul>
    )
}


export default Nav;