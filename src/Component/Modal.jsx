import React, { useState } from 'react';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

const Modal = ({ openmodal, closemodal }) => {
    const [activeTab, setActiveTab] = useState('login');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className="modal ">
            <div onClick={closemodal} className="overlay"></div>
            <div className="modal-content flex flex-col items-center bg-[#14161a] text-white">
                <div className='text-2xl font-bold flex justify-evenly w-full p-2'>
                    <button onClick={() => handleTabChange('login')}>Login</button>
                    <button onClick={() => handleTabChange('signup')}>Sign Up</button>
                </div>
                <div className="tab-content gap-[10px] p-4 w-full">
                    {activeTab === 'login' && <Login/>}
                    {activeTab === 'signup' && <Signup/>}
                </div>
                <button onClick={closemodal} >
                    Close Modal
                </button>
            </div>
        </div>


    );
};

export default Modal;
