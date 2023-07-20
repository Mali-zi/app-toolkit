import React from 'react';
import { Card, Col, Container, ListGroup } from "react-bootstrap";
import { useAppSelector } from "../app/hooks";
import Star from "./Star";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const movieList = useAppSelector((state) => state.movies.movieList);

  return (
    <Container className="px-5">
      <h4 className="text-primary py-4">My watchlist</h4>
      <ListGroup as='ul' className="d-grid gap-3">
        {movieList.map((item) => {
          return (
            <ListGroup.Item as="li" key={item.imdbID}>
              <Link to={`/watchlist/${item.imdbID}`}>
                <Card
                  bg={'Light'.toLowerCase()}
                  text={'dark'}
                  className="flex-row py-3 px-3 border-0"
                >
                  <Col xs={6} md={3}>
                    <Card.Img 
                      src={item.Poster}
                      className="img-fluid"
                    />
                  </Col>
                  <Card.Body className="container-fluid py-0 ms-2">
                    <Card.Title className="text-primary">{item.Title}
                      <span className="fw-normal text-dark"> ({item.Year})</span>
                    </Card.Title>
                    <Card.Subtitle>
                      <small className="text-muted">{item.Runtime} | {item.Genre}</small>
                    </Card.Subtitle>
                    <Card.Subtitle className="mt-2">
                      <Star />
                      {item.imdbRating}
                    </Card.Subtitle>
                    <Card.Text className="mt-3">
                      {item.Plot}
                    </Card.Text>
                    <Card.Footer className="px-0">
                      <small className="text-muted">
                        Director: <span className="text-primary">{item.Director}</span> | 
                        Writer: <span className="text-primary">{item.Writer}</span> | 
                        Actors: <span className="text-primary">{item.Actors}</span>
                      </small>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Link>
            </ListGroup.Item>
          )}
        )}
      </ListGroup>
    </Container>
  )
}