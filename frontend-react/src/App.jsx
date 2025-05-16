import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Header from './components/UI/Header/Header.jsx'
import Footer from './components/UI/Footer/Footer.jsx'
import AppRouter from './components/AppRouter.jsx'
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop.jsx'
import ChatButton from './components/UI/ChatButton/ChatButton.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <AppRouter/>
      <Footer/>
      <ScrollToTop />
      <ChatButton />
    </BrowserRouter>
  )

}

export default App
