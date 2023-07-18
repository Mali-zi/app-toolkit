import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { IQueryByTitle, IQueryById } from "../models";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fetchMovieById } from '../store/movieSlice'
import ViewCard from "./ViewCard";
import LoadingSpinner from "./LoadingSpinner";

export default function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies);
  const {movie, movieList, status, error, toggleBtn} = movies;

  const url = 'https://www.omdbapi.com?apikey=64405bd2&i=tt0103065';

  const initialQueryByTitle = {
    Title: '',
    Year: '',
    Plot: '',
    Response: '',
  };

  const initialQueryById = {
    Id: '',
    Plot: '',
    Response: '',
  };

  const [toggleQuery, setToggleQuery] = useState('');
  const [queryByTitle, setQueryByTitle] = useState<IQueryByTitle>(initialQueryByTitle);
  const [queryById, setQueryById] = useState<IQueryById>(initialQueryById);


  function searchByTitle() {
    setToggleQuery('queryByTitle');
  }

  function resetSearchByTitle() {
    setQueryByTitle(initialQueryByTitle);
    setToggleQuery('');
  };
  

  
  function resetSearchById() {
    setQueryById(initialQueryById);
    setToggleQuery('');
  };

  const searchResultMovie = () => {
    return (
      <>
        {toggleQuery === 'queryById' ? <h3>Результаты поиска фильма по imdbID:</h3> : 
        toggleQuery === 'queryByTitle' ? <h3>Результаты поиска фильма по названию:</h3> :
        <></>}
      <ViewCard />
      </>
    )
  };

  const searchResult = (status === 'pending' && toggleQuery) ? <LoadingSpinner /> :
    (status === 'fulfilled' && toggleQuery) ? searchResultMovie() :
    (status === 'rejected' && toggleQuery) ? <h5>По вашему запросу ничего не найдено</h5> :
    <></>;

  return (
    <Container className="p-3">
      
      <Container className="my-4">
        <h4 className="text-primary pb-3">Search for a movie by title:</h4>
        <Form.Group className="mb-2" controlId="form-title">
          <Form.Control 
            type="text" 
            autoFocus
            value={queryByTitle.Title} 
            onChange={(e) => setQueryByTitle({
              ...queryByTitle,
              Title: e.target.value,
            })}
          />
          <Form.Label>Enter a movie title</Form.Label>
        </Form.Group>
        <Col xs={6}>
          <Row>
            <Form.Group className="mb-2 w-50" controlId="form-year">
              <Form.Control 
                type="text" 
                value={queryByTitle.Year} 
                onChange={(e) => setQueryByTitle({
                  ...queryByTitle,
                  Year: e.target.value,
                })}
              />
              <Form.Label>Enter a year of release</Form.Label>
            </Form.Group>
          </Row>
          <Row>
          <Col>
            <h5>Plot:</h5>
            <Form>
              <Form.Check
                label="Short plot"
                name="plot"
                type='radio'
                id='short-plot'
                defaultChecked
                value="Short"
                onChange={(e) => setQueryByTitle({
                  ...queryByTitle,
                  Plot: "Short",
                })}
              />
              <Form.Check
                label="Full plot"
                name="plot"
                type='radio'
                id='full-plot'
                value="Full"
                onChange={(e) => setQueryByTitle({
                  ...queryByTitle,
                  Plot: "Full",
                })}
              />
            </Form>
          </Col>
          <Col>
            <h5>Response:</h5>
            <Form>
              <Form.Check
                label="JSON"
                name="response"
                type='radio'
                id='json-response'
                defaultChecked
                value="JSON"
                onChange={(e) => setQueryByTitle({
                  ...queryByTitle,
                  Response: "JSON",
                })}
              />
              <Form.Check
                label="XML"
                name="response"
                type='radio'
                id='xml-response'
                value='XML'
                onChange={(e) => setQueryByTitle({
                  ...queryByTitle,
                  Response: "XML",
                })}
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Container className="mt-3">
            <Button 
              variant="primary" 
              className="me-2 text-uppercase" 
              style={{ fontWeight: 600 }}
              onClick={searchByTitle}
            >
              Search
            </Button>
            <Button 
              variant="secondary" 
              className='text-uppercase' 
              style={{ fontWeight: 600 }}
              onClick={resetSearchByTitle}  
            >
              Reset
            </Button>
          </Container>
        </Row>
      </Col>
    </Container>
    <hr className="bg-primary"></hr>

    <Container className="my-5">
      <h4 className="text-primary pb-4">Search for a movie by ID:</h4>
      <Col xs={6}>
        <Row>
          <Form.Group className="mb-3" controlId="form-title">
            <Form.Control 
              type="text" 
              value={queryById.Id} 
              onChange={(e) => setQueryById({
                ...queryById,
                Id: e.target.value,
              })}  
            />
            <Form.Label>Enter a valid IMDb ID</Form.Label>
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <h5>Plot:</h5>
            <Form>
              <Form.Check
                label="Short plot"
                name="plot"
                type='radio'
                id='short-plot-by-id'
                defaultChecked
                value="Short"
                onChange={(e) => setQueryById({
                  ...queryById,
                  Plot: "Short",
                })}
              />
              <Form.Check
                label="Full plot"
                name="plot"
                type='radio'
                id='full-plot-by-id'
                value="Full"
                onChange={(e) => setQueryById({
                  ...queryById,
                  Plot: "Full",
                })}
              />
            </Form>
          </Col>

          <Col>
            <h5>Response:</h5>
            <Form>
              <Form.Check
                label="JSON"
                name="group1"
                type='radio'
                id='json-response-by-id'
                defaultChecked
                value="JSON"
                onChange={(e) => setQueryById({
                  ...queryById,
                  Response: "JSON",
                })}
              />
              <Form.Check
                label="XML"
                name="group1"
                type='radio'
                id='xml-response-by-id'
                value='XML'
                onChange={(e) => setQueryById({
                  ...queryById,
                  Response: "XML",
                })}
              />
            </Form>
          </Col>
        </Row>
        <Row>
          <Container className="mt-4">
            <Button 
              variant="primary" 
              className="me-2 text-uppercase" 
              style={{ fontWeight: 600 }}
              onClick={() => {
                dispatch(fetchMovieById(url));
                setToggleQuery('queryById');
              }}
            >
              Search
            </Button>
            <Button 
              variant="secondary" 
              className='text-uppercase' 
              style={{ fontWeight: 600 }}
              onClick={resetSearchById}
            >
              Reset
            </Button>
          </Container>
        </Row>
      </Col>
    </Container>

    <hr className="mt-5"></hr>
    {searchResult}
  </Container>
  )
}