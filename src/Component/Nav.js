import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Select from 'react-select';
import { setCurrency } from '../Utils/currencySlice';
import { selectuser, setlogoutuser } from '../Utils/userSlice';
import { auth } from '../firebase';

const Nav = ({ openmodal, closemodal, modal }) => {
    const options = [
        { value: 'usd', label: 'USD' },
        { value: 'inr', label: 'INR' }
    ];
    const dispatch = useDispatch();
    const user = useSelector(selectuser)
    console.log(user);
    const handleCurrencyChange = (e) => {
        dispatch(setCurrency(e.value));
    }
    const handlelogout = (e)=>{
        try{
            auth.signOut()
            dispatch(setlogoutuser())
            alert("Logout Successfull")
        }
        catch(error){
            alert(error.message);
        }
    }
    return (
        <ul className='flex gap-[10vw] sm:gap-[30vw] md:gap-[60vw] justify-around bg-[#14161a] p-2 top-0 items-center w-full sticky nav z-[1]'>
            <Link className='font-bold text-[#87CEEB]' to="/">Cryptoverse</Link>
            <div className='flex text-white gap-[1vw]'>
                <Select
                    options={options}
                    defaultValue={options[1]}
                    onChange={handleCurrencyChange}
                />
                {
                    user ? 
                    <button onClick={handlelogout}>Logout</button>
                    :
                    <button onClick={openmodal}>Login</button>
                }
            </div>
        </ul>
    )
}


export default Nav;