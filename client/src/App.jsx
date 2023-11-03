import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import Auth from './pages/Auth';
import Navbar from './components/Navbar';
import ShowNavbar from './components/ShowNavbar';
import Home from './pages/Home';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Router>
          <ShowNavbar>
            <Navbar />
          </ShowNavbar>

          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Auth />} />
            {/* <Route path="/ground/:id" element={<GroundDetails />} /> */}
            {/* <Route path="/bookings" element={<Bookings />} /> */}
            {/* <Route path="/grounds" element={<Grounds />} /> */}
          </Routes>
        </Router>
        <Footer />
      </Provider>
    </>
  )
}

export default App
