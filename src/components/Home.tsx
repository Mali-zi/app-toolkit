import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchMovieById, resetSearch } from '../store/movieSlice'
import ViewCard from "./ViewCard";
import LoadingSpinner from "./LoadingSpinner";
import RecpComp from "./RespComp";

export default function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies);
  const {movie, status, error, toggleBtn} = movies;

  const [queryById, setQueryById] = useState('');
  const url = `https://www.omdbapi.com?apikey=64405bd2&i=${queryById}`;

  const searchResult = (status === 'pending') ? <LoadingSpinner /> :
    (movie.Response === "True") ? <ViewCard /> :
    (movie.Response === 'False') ? <h4>{movie.Error}</h4> :
    <></>;

  return (
    <Container className="p-3">
      
    <Container className="my-5">
      <h4 className="text-primary pb-4">Search for a movie by ID:</h4>
      <Col xs={6}>
        <Row>
          <Form.Group className="mb-3" controlId="form-title">
            <Form.Control 
              type="text" 
              value={queryById} 
              onChange={(e) => setQueryById(e.target.value)}  
            />
            <Form.Label>Enter a valid IMDb ID</Form.Label>
          </Form.Group>
        </Row>
        <Row>
          <Container className="mt-4">
            <Button 
              variant="primary" 
              className="me-2 text-uppercase" 
              style={{ fontWeight: 600 }}
              onClick={() => {
                dispatch(fetchMovieById(url));
              }}
            >
              Search
            </Button>
            <Button 
              variant="secondary" 
              className='text-uppercase' 
              style={{ fontWeight: 600 }}
              onClick={() => {
                setQueryById('');
                dispatch(resetSearch())
              }}
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
    <RecpComp
          url={url}
          opts={'GET'}
        />
  </Container>
  )
}