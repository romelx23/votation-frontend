import './App.css'
import { DashboardRoutes } from './router'
import { SocketProvider, VoteProvider } from './context'

function App() {
  return (
    <div className="App">
      <VoteProvider>
        <SocketProvider>
          <DashboardRoutes />
        </SocketProvider>
      </VoteProvider>
    </div>
  )
}

export default App
