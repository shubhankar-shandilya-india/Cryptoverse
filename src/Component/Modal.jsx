import React, { useState } from 'react';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

const Modal = ({ openmodal, closemodal }) => {
    const [activeTab, setActiveTab] = useState('login');
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
    return (
        <div className="modal">
            <div onClick={closemodal} className="overlay"></div>
            <div className="modal-content flex flex-col items-center bg-[#14161a] text-white">
                <div className='text-2xl font-bold flex justify-evenly w-full p-2'>
                    <button 
                        onClick={() => handleTabChange('login')}
                        style={{ textDecoration: activeTab === 'login' ? 'underline' : 'none',
                        textUnderlineOffset: activeTab === 'login' ? '8px' : '0px' }}
                    >
                        Login
                    </button>
                    <button 
                        onClick={() => handleTabChange('signup')}
                        style={{ textDecoration: activeTab === 'signup' ? 'underline' : 'none',
                        textUnderlineOffset: activeTab === 'signup' ? '8px' : '0px'  }}
                    >
                        Sign Up
                    </button>
                    <span className="close" onClick={closemodal}>&times;</span>
                </div>
                <div className="tab-content gap-[10px] p-4 w-full">
                    {activeTab === 'login' && <Login closemodal={closemodal}/>}
                    {activeTab === 'signup' && <Signup closemodal={closemodal}/>}
                </div>
            </div>
        </div>
    );
};

export default Modal;
