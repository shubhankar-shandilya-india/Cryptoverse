import React, { useState } from 'react'

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <div className='flex flex-col gap-[10px] items-center w-full'>
            <input type="text" placeholder='  Enter Email' className='w-full' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder='  Enter password' className='w-full' onChange={(e)=>setPassword(e.target.value)}/>
            <input type="text" placeholder='  Confirm password' className='w-full' onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <button>Submit</button>
        </div>
    )
}

export default Signup