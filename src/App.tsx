import './App.css'
import { DashboardRoutes } from './router'
import { SocketProvider, VoteProvider } from './context'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className="App">
      <Toaster richColors />
      <VoteProvider>
        <SocketProvider>
          <DashboardRoutes />
        </SocketProvider>
      </VoteProvider>
    </div>
  )
}

export default App
