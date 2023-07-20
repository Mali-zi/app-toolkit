import React from 'react';
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchMovieById, resetSearch } from '../store/movieSlice'
import ViewCard from "./ViewCard";
import LoadingSpinner from "./LoadingSpinner";

export default function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies);
  const movie = movies.movie;
  const status = movies.status;
  const fetchError = movies.error;
  const [formerrors, setFormErrors] = useState('');
  const [queryById, setQueryById] = useState('');
  const url = `https://www.omdbapi.com?apikey=64405bd2&i=${queryById}`;

  const searchResult = (status === 'pending') ? <LoadingSpinner /> :
    (movie.Response === "True") ? <ViewCard /> :
    (status === "fulfilled" && movie.Response === 'False') ? <h4 className="text-danger">{movie.Error}</h4> :
    (status === 'rejected') ? <h4 className="text-danger">{fetchError}</h4> :
    <></>;

  function handleSearch() {
    let errors = '';
    if (!queryById.trim()) {
      errors = "IMDb ID is required";
    } else {
      if (queryById.trim().length < 9) {
        errors = "You entered an invalid IMDb ID";
      } else {
        dispatch(fetchMovieById(url));
      }
    };
    setFormErrors(errors);
  };

  function handleReset() {
    setQueryById('');
    setFormErrors('');
    dispatch(resetSearch());
  };

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <Container className="p-3">
      <Container className="my-5">
        <h4 className="text-primary pb-4">Search for a movie by ID:</h4>
        <Col xs={6}>
          <Row>
            <Form.Group className="mb-3" controlId="form-title">
              <Form.Control 
                type="text" 
                placeholder="tt0103064"
                autoFocus
                required={true}
                pattern="tt[0-9]{7}"
                maxLength={9}
                value={queryById} 
                onChange={(e) => setQueryById(e.target.value)}
              />
              <Form.Label>Enter a valid IMDb ID</Form.Label>
              {formerrors && <h4 className="text-danger">{formerrors}</h4>}
            </Form.Group>
          </Row>
          <Row>
            <Container className="mt-4">
              <Button 
                variant="primary" 
                className="me-2 text-uppercase" 
                style={{ fontWeight: 600 }}
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button 
                variant="secondary" 
                className='text-uppercase' 
                style={{ fontWeight: 600 }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Container>
          </Row>
        </Col>
      </Container>
      <hr className="my-5"></hr>
      {(status !== 'idle') ? <h4>Результаты поиска фильма по imdbID: {queryById}</h4> : <></>}
      {searchResult}
    </Container>
  )
}