import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

function MovieList(props) {

    const [movieData, setMovieData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
      let didCancel = false;
      props.imdbId.forEach((id) => {
        const fetchImdbRating = async () => {
          const result = await axios(
            `http://www.omdbapi.com/?i=${id}&apikey=3dc3957f`
          );
          if (!didCancel) {setMovieData(movieData => [...movieData, result.data]);}
          
          setIsLoading(true);
          
        };
        fetchImdbRating();
      });
      return () => {didCancel = true}
    }, [props.imdbId]);
    const printMovies = movieData.map(movie => 
      <li key={movie.imdbID.toString()}>{movie.Title} Rating: {movie.imdbRating}</li>
     )
  
    return (
      <div>
        <Fragment>
        <ul>
          {printMovies}
        </ul>
        </Fragment>
      </div>
    )
  
  }

  export default MovieList;