import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import Auth from './pages/Auth';

function App() {

  return (
    <>
      <Provider store={store}>
        <Toaster />
        <Router>
          {/* <Navbar /> */}
          <Routes>
            {/* <Route path="/" exact element={<Landing />} /> */}
            <Route path="/login" element={<Auth />} />
            {/* <Route path="/ground/:id" element={<GroundDetails />} /> */}
            {/* <Route path="/bookings" element={<Bookings />} /> */}
            {/* <Route path="/grounds" element={<Grounds />} /> */}
          </Routes>
        </Router>
        {/* <Footer /> */}
      </Provider>
    </>
  )
}

export default App
