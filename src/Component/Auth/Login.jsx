import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handlesubmit = () => {
        
    }
    return (
        <div className='flex flex-col gap-[10px] items-center w-full'>
            <input type="text" placeholder='  Enter Email' className='w-full' onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='  Enter password' className='w-full' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handlesubmit}>Submit</button>
        </div>
    )
}

export default Login