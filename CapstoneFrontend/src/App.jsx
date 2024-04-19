import { useState } from 'react'
import Content from './Content'
import { BrowserRouter } from 'react-router-dom'


function App() {


  return (
    <>
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    </>
  )
}

export default App
