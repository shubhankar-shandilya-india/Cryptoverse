import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react'
import { auth, provider } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setactiveuser } from '../../Utils/userSlice';

const Signup = ({closemodal}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();
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
    const handlegooglesignin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            dispatch(setactiveuser({
                user: result.user
            }))
            alert('Google sign-in successful');
            closemodal();
        }
        catch (error) {
            alert('Google sign-in error:', error.message);
        }
    };
    return (
        <div className='flex flex-col gap-[10px] items-center w-full '>
            <input   type="text" placeholder='  Enter Email' className='w-full  text-black' onChange={(e) => setEmail(e.target.value)} />
            <input  type="text" placeholder='  Enter password' className='w-full text-black' onChange={(e) => setPassword(e.target.value)} />
            <input  type="text" placeholder='  Confirm password' className='w-full text-black' onChange={(e) => setConfirmPassword(e.target.value)} />
            <button onClick={handlesubmit}>Submit</button>
            <button onClick={handlegooglesignin}>Signin with Google</button>
        </ div>
    )
}

export default Signup