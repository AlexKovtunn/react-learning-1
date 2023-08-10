import './scss/app.scss';
import './App.css';
import Header from './components/Header';
import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

export const SearchContext = createContext();

function App() {
  const [searchName, setSearchName] = useState('');
  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchName, setSearchName }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
