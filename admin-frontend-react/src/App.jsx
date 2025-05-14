import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/UI/Header/Header.jsx'
import AppRouter from './components/AppRouter.jsx'
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop.jsx'
import AuthProvider from './components/context/AuthProvider.jsx'
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <AppRouter/>
        <ScrollToTop />
      </BrowserRouter>
    </AuthProvider>
  )

}

export default App
