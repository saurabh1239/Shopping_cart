import './App.css';
import Header from './Components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Cart from './Components/Cart';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route exact path="/" element={<Homepage/>}/>
        <Route exact path="/Cart" element={<Cart />}/>
      </Routes>
    </BrowserRouter>
   

  );
}

export default App;
