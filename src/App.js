import React from 'react'
import "../src/App.css"
import Nav from '../src/Component/Nav'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './Page/Home'
import Coin from './Page/Coin'
import { Provider } from 'react-redux'
import store from './Utils/Store'
const App = () => {

  return (
    <Provider store = {store}>
    <div className='w-screen h-screen bg-[#14161a]'>
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/coins/:id" element={<Coin />}></Route>
        </Routes>
      </Router>
    </div>
    </Provider>
  )
}
export default App

