import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import HomePage from './page/HomePage'
import SignIn from './page/SignIn'
import Signup from './page/Signup'
import Profile from './page/Profile'
import Settings from './page/Settings'
import { useAuthStore } from './store/useAuthStore.js'
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react"
import { Loader2 } from 'lucide-react'
import { useThemeStore } from './store/useThemeStore.js'

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  console.log({ authUser })

  if (isCheckingAuth && !authUser) return (
    <div className="flex justify-center h-screen item-center" >
      <Loader2 className="size-10 animate-spin" />
    </div>
  )




  return (
    <div data-theme={theme}>
      <NavBar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/signin' />} />
        <Route path='/signin' element={!authUser ? <SignIn /> : <Navigate to='/' />} />
        <Route path='/signup' element={!authUser ? <Signup /> : <Navigate to='/' />} />
        <Route path='/profile' element={authUser ? <Profile /> : <Navigate to='/' />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
      <Toaster />

    </div>
  )
}

export default App
