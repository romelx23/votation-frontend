import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { HomePage } from './pages'
import { DashboardRoutes } from './router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <DashboardRoutes />
    </div>
  )
}

export default App
