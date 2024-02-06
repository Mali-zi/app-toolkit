import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchMovieById, resetSearch } from '../store/movieSlice';
import ViewCard from './ViewCard';
import LoadingSpinner from './LoadingSpinner';

export default function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies);
  const movie = movies.movie;
  const status = movies.status;
  const fetchError = movies.error;
  const [formerrors, setFormErrors] = useState('');
  const [queryById, setQueryById] = useState('');
  const [queryByTitle, setQueryByTitle] = useState('');
  const [searchParams, setSearchParams] = useState('');

  const searchResult =
    status === 'pending' ? (
      <LoadingSpinner />
    ) : movie.Response === 'True' ? (
      <ViewCard />
    ) : status === 'fulfilled' && movie.Response === 'False' ? (
      <h4 className='text-danger'>{movie.Error}</h4>
    ) : status === 'rejected' ? (
      <h4 className='text-danger'>{fetchError}</h4>
    ) : (
      <></>
    );

  function handleSearch(par: string, query: string) {
    setSearchParams(par);
    if (par === 'i') {
      setQueryByTitle('');

      if (!query.trim()) {
        setFormErrors('IMDb ID is required');
      } else {
        if (query.trim().length < 9) {
          setFormErrors('You entered an invalid IMDb ID');
        } else {
          dispatch(fetchMovieById({ par, query }));
          setFormErrors('');
        }
      }
    }

    if (par === 't') {
      setQueryById('');

      if (!query.trim()) {
        setFormErrors('Movie title is required');
      } else {
        if (query.trim().length < 4) {
          setFormErrors('Movie title must be longer than 3 letters');
        } else {
          dispatch(fetchMovieById({ par, query }));
          setFormErrors('');
        }
      }
    }
  }

  function handleReset() {
    setQueryById('');
    setQueryByTitle('');
    setFormErrors('');
    dispatch(resetSearch());
  }

  useEffect(() => {
    handleReset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className='p-3'>
      <Container className='my-5'>
        <h4 className='text-primary pb-4'>Search for a movie by ID:</h4>
        <div className='d-flex flex-column flex-sm-row gap-2'>
          <div className=''>
            <Form.Group className='mb-3 ' controlId='form-title'>
              <Form.Control
                type='text'
                placeholder='tt0103064'
                style={{ minWidth: 250 }}
                autoFocus
                required={true}
                pattern='tt[0-9]{7}'
                maxLength={9}
                value={queryById}
                onChange={(e) => setQueryById(e.target.value)}
              />
              {formerrors && searchParams === 'i' ? (
                <h6 className='text-danger'>{formerrors}</h6>
              ) : (
                <Form.Label>Enter a valid IMDb ID</Form.Label>
              )}
            </Form.Group>
          </div>
          <div>
            <Button
              variant='primary'
              data-testid='search'
              className='me-2 text-uppercase'
              style={{ fontWeight: 600 }}
              onClick={() => handleSearch('i', queryById)}
            >
              Search
            </Button>
            <Button variant='secondary' className='text-uppercase' style={{ fontWeight: 600 }} onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </Container>

      <Container className='my-5'>
        <h4 className='text-primary pb-4'>Search for a movie by Title:</h4>
        <div className='d-flex flex-column flex-sm-row gap-2'>
          <div className=''>
            <Form.Group className='mb-3 ' controlId='form-title'>
              <Form.Control
                type='text'
                placeholder='The Fifth Element'
                style={{ minWidth: 250 }}
                autoFocus
                required={true}
                value={queryByTitle}
                onChange={(e) => setQueryByTitle(e.target.value)}
              />
              {formerrors && searchParams === 't' ? (
                <h6 className='text-danger'>{formerrors}</h6>
              ) : (
                <Form.Label>Enter a title</Form.Label>
              )}
            </Form.Group>
          </div>
          <div>
            <Button
              variant='primary'
              className='me-2 text-uppercase'
              style={{ fontWeight: 600 }}
              onClick={() => handleSearch('t', queryByTitle)}
            >
              Search
            </Button>
            <Button variant='secondary' className='text-uppercase' style={{ fontWeight: 600 }} onClick={handleReset}>
              Reset
            </Button>
          </div>
        </div>
      </Container>
      {status !== 'idle' ? <h1 className='text-bg-primary text-center py-4 mb-5'>Search Result</h1> : <></>}
      {searchResult}
    </Container>
  );
}
