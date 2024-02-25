import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <ul className='flex gap-[4px] justify-around bg-[#14161a] p-2 top-0 items-center w-full sticky nav z-[1]'>
            <Link className='font-bold text-[#87CEEB]' to="/">Cryptoverse</Link>
            <li><a href="https://en.wikipedia.org/wiki/Cryptocurrency" target="_blank" className='font-bold text-[#87CEEB]'>Crypto Wiki</a></li>
        </ul>
    )
}

export default Nav