import { useState } from 'react'
import Content from './Content'
import { BrowserRouter } from 'react-router-dom'



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
