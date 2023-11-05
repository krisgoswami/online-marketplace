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
import MyItems from './pages/MyItems';
import ItemDetails from './pages/ItemDetails';
import EditItem from './pages/EditItem';
import Purchase from './pages/Purchase';
import Purchases from './pages/Purchases';
import Search from './pages/Search';

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
            <Route path="/listed-items" element={<MyItems />} />
            <Route path="/item-details/:id" element={<ItemDetails />} />
            <Route path="/update-item/:id" element={<EditItem />} />
            <Route path="/purchase/:id" element={<Purchase />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Router>
        <Footer />
      </Provider>
    </>
  )
}

export default App
