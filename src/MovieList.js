import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Card, Rate, Row, Col } from 'antd';

function MovieList(props) {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [movieData, setMovieData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let didCancel = false;
    props.imdbId.forEach((id) => {
      const fetchImdbRating = async () => {
        const result = await axios(
          `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`
        );
        if (!didCancel) {
          setMovieData((movieData) => [...movieData, result.data]);
        }
        console.log(movieData);
        setIsLoading(true);
      };
      fetchImdbRating();
    });
    return () => {
      didCancel = true;
    };
  }, [props.imdbId]);
  const printMovies = movieData.map((movie) => (
    <Col span={6}>
      <Card
        title={movie.Title}
        cover={<img alt="Movie Poster" src={movie.Poster} />}
      >
        Rating: {movie.imdbRating}{' '}
        <Rate
          count={10}
          disabled
          allowHalf={true}
          defaultValue={movie.imdbRating}
        />
        <p>{movie.Plot}</p>
      </Card>
    </Col>
  ));

  return (
    <div>
      <Fragment>
        <Row justify="space-around">{printMovies}</Row>
      </Fragment>
    </div>
  );
}

export default MovieList;
