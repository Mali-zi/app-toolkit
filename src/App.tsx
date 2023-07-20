import './App.css';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ViewCard from './components/ViewCard';
import Watchlist from './components/Watchlist';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <Container fluid="lg" className='page'>
      <Header />
      <div className='bg-light shadow-1-strong'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path='/watchlist/:id' element={<ViewCard />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;