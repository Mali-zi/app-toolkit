import { Row, Card, Col } from "react-bootstrap";
import Star from "./Star";
import { useState } from "react";
import { IResponseById } from "../models";

export default function MovieCard({movie}: IResponseById | any) {

  return (
    <Row>
      <Card
        bg={'Light'.toLowerCase()}
        text={'dark'}
        className="flex-row py-3 px-3 border-0"
      >
        <Col xs={6} md={3}>
        <Card.Img 
          src={movie.Poster}
          className="img-fluid"
        />
        </Col>
        <Card.Body className="container-fluid py-0 ms-2">
          <Card.Title className="text-primary">{movie.Title}
            <span className="fw-normal text-dark"> ({movie.Year})</span>
          </Card.Title>
          <Card.Subtitle>
            <small className="text-muted">{movie.Runtime} | {movie.Genre}</small>
          </Card.Subtitle>
          <Card.Subtitle className="mt-2">
            <Star />
            {movie.imdbRating}
          </Card.Subtitle>
          <Card.Text className="mt-3">
            {movie.Plot}
          </Card.Text>
          <Card.Footer className="px-0">
            <small className="text-muted">
              Director: <span className="text-primary">{movie.Director}</span> | 
              Writer: <span className="text-primary">{movie.Writer}</span> | 
              Actors: <span className="text-primary">{movie.Actors}</span>
            </small>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Row>
  )
}