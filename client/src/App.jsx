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
import CreateItem from './pages/CreateItem';
import Items from './pages/Items';

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
            <Route path="/create-item" element={<CreateItem />} />
            <Route path="/items" element={<Items />} />
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
