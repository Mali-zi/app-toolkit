import React, { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
// import PageNotFound from './components/PageNotFound';
import Home from './components/Home';
// import Watchlist from './components/Watchlist';
import ViewCard from './components/ViewCard';

function App() {

  // const [isLoading, setIsLoading] = useState(false);
  // const [hasErrored, setHasErrored] = useState(false);

  return (
    <Container fluid="lg" className='page'>
      <Header />
      <div className='bg-light shadow-1-strong'>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/watchlist' element={<Watchlist />} /> */}
          {/* <Route path='/viewcard' element={<ViewCard />} /> */}
          {/* <Route path='*' element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </Container>
  
  );
}

export default App;