import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Todo from './Todo.jsx'
import { Create } from './Create.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/todo/:id' element={<Todo/>} />
      <Route path='/create' element={<Create/>} />

    </Routes>
  </BrowserRouter>


)
