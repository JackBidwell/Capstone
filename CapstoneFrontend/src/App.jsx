import { useState } from 'react'
import Content from './Content'
import { BrowserRouter } from 'react-router-dom'
import './App.css';



function App() {


  return (
    <div>
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </div>
  )
}

export default App
