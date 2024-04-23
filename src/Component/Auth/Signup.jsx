import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firebase';

const Signup = ({closemodal}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlesubmit = async () => {
        if(password!==confirmPassword){
            alert("passwords do not match.");
            return;
        }
        try{
            const result  = await createUserWithEmailAndPassword(auth,email,password);
            console.log(result);
            alert("Signup Successful");
            closemodal();
        }
        catch(error){
            alert(error.message)
        }
    }
    return (
        <div className='flex flex-col gap-[10px] items-center w-full '>
            <input   type="text" placeholder='  Enter Email' className='w-full  text-black' onChange={(e) => setEmail(e.target.value)} />
            <input  type="text" placeholder='  Enter password' className='w-full text-black' onChange={(e) => setPassword(e.target.value)} />
            <input  type="text" placeholder='  Confirm password' className='w-full text-black' onChange={(e) => setConfirmPassword(e.target.value)} />
            <button onClick={handlesubmit}>Submit</button>
        </ div>
    )
}

export default Signup