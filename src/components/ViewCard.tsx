import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { ReactComponent as StarSvg } from './star.svg';
import { IResponseById } from "../models";
import { useState } from "react";

export default function ViewCard() {
  const initialMovie = require('../models/data.json');
  const [movie, setMovie] = useState<IResponseById>(initialMovie);
  const [movieList, setMovieList] = useState<IResponseById[]>([]);
  const [toggle, setToggle] = useState(true);

  function addMovie(movie: IResponseById) {
    setMovieList([
      ...movieList,
      movie,
    ])
    setToggle(false);
  };

  function removeMovie(movieId: string) {
    setMovieList(movieList.filter(item => movieId !== item.imdbID));
    setToggle(true);
  }

  function handleClick(movie: IResponseById) {
    toggle ? addMovie(movie) : removeMovie(movie.imdbID);
  };


  return (
    <Container className="mt-4">

      <Container>
        <Row className="flex-row fw-bold">
          <Col>
          <h2 className="text-primary">{movie.Title}</h2>
          <span className="fs-6 text-black-50">{movie.Year} | {movie.Runtime} | {movie.Genre}</span>
          </Col>
          <Col>
            <div className="text-end me-4">IMDb RATING</div>
            <div className="text-end me-4">
              <StarSvg width="24" height="24" fill="#DDBC32" className="mb-2 me-2" />
              <span className="fs-4 fw-weight-bold">{movie.imdbRating}</span>
              <span className="fs-5 text-black-50">/10</span>
            </div>
          </Col>
        </Row>
      </Container>

      <Card
        bg={'light'}
        text={'dark'}
        className="flex-row py-3 px-3 border-0"
      >
        <Col xs={6} md={4} className="text-center">
          <Card.Img 
            src={movie.Poster}
            className="img-fluid"
          />
        </Col>
        <Card.Body className="container-fluid py-0 ms-2">
          <Card.Text className="mb-4 h6">
            {movie.Plot}
          </Card.Text>
          <Card.Footer className="px-0">
            <p className="text-muted h6">Director: <span className="text-primary">{movie.Director}</span></p>
            <hr></hr>
            <p className="text-muted h6">Writer: <span className="text-primary">{movie.Writer}</span></p>
            <hr></hr>
            <p className="text-muted h6">Actors: <span className="text-primary">{movie.Actors}</span></p>
            <hr></hr>
            <p className="text-muted h6">Release date <span className="text-primary">{movie.Released}</span></p>
            <hr></hr>
            <p className="text-muted h6">Countries of origin <span className="text-primary">{movie.Country}</span></p>
            <hr></hr>
            <p className="text-muted h6">Languages <span className="text-primary">{movie.Language}</span></p>
            <hr></hr>
            <p className="text-muted h6">Budget <span className="text-primary">{movie.BoxOffice}</span></p>
          </Card.Footer>
          <Button 
            variant="primary" 
            className="px-3 mt-3 fs-6"
            onClick={() => handleClick(movie)}
          >
            {toggle ? <span>Add to Watchlist</span> : <span>&#10004; In Watchlist</span>}
          </Button>
        </Card.Body>
      </Card>

    </Container>
  )
}