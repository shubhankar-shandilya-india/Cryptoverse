import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setactiveuser } from '../../Utils/userSlice';

const Login = ({ closemodal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handlesubmit = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log(result);
            dispatch(setactiveuser({
                user: result.user
            }))
            alert("Login Successful");
            closemodal();
        }
        catch (error) {
            alert(error.message);
        }
    }
    return (
        <div className='flex flex-col gap-[10px] items-center w-full'>
            <input type="text" placeholder='  Enter Email' className='w-full text-black' onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder='  Enter password' className='w-full text-black' onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handlesubmit}>Submit</button>
        </div>
    )
}

export default Login