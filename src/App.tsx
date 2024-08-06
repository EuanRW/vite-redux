import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import './App.css'
import Notifications from './pages/notifications/Notifications'
import Home from './pages/home/Home'
import GovUkHeader from './components/GovUkHeader/GovUKHeader'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/notifications',
    element: <Notifications />,
  },
])

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GovUkHeader />
      </header>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
