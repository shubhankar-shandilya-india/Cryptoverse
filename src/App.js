import React, { useState } from 'react'
import "../src/App.css"
import Nav from '../src/Component/Nav'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Page/Home'
import Coin from './Page/Coin'
import { Provider } from 'react-redux'
import store from './Utils/Store'
import Modal from './Component/Modal'
const App = () => {
  const [modal, setModal] = useState(false);
  const openmodal = () => {
    setModal(true);
    document.body.classList.add('active-modal');
  }
  const closemodal = () => {
    setModal(false);
    document.body.classList.remove('active-modal');

  }
  return (
    <Provider store={store}>
      <div className='w-screen h-screen bg-[#14161a]'>
        <Router>
          <Nav openmodal={openmodal} />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/coins/:id" element={<Coin />}></Route>
          </Routes>
        </Router>
        {modal && <Modal openmodal={openmodal} closemodal={closemodal} modal={modal}/>}
      </div>
    </Provider>
  )
}
export default App

