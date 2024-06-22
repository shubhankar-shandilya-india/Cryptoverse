import React, { useState, lazy, Suspense } from 'react'
import "../src/App.css"
import Nav from '../src/Component/Nav'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './Utils/Store'
import Modal from './Component/Modal'

const Home = lazy(() => import('./Page/Home'));
const Coin = lazy(() => import('./Page/Coin'));

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
            <Route exact path="/" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            }></Route>
            <Route exact path="/coins/:id" element={
              <Suspense fallback={<div>Loading...</div>}>
                <Coin />
              </Suspense>
            }></Route>
          </Routes>
        </Router>
        {modal && <Modal openmodal={openmodal} closemodal={closemodal} modal={modal} />}
      </div>
    </Provider>
  )
}
export default App

