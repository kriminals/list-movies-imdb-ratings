import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import axios from 'axios';

function SearchComponent() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [moviesToSearch, setMoviesToSearch] = useState([]);
  const [imdbId, setImdbId] = useState([]);
  const [value, setValue] = useState('');
  const [isPressed, setPressed] = useState(false);
  
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setMoviesToSearch(value.split('\n'));
    setPressed(true);
  };

  useEffect(() => {
    moviesToSearch.forEach((movie) => {
      let didCancel = false;
      const fetchImdbID = async () => {
        const result = await axios(
          `https://www.omdbapi.com/?s=${movie}&apikey=${API_KEY}`
        );
        const firstResult = result.data.Search[0].imdbID;
        // console.log(firstResult);
        if (!didCancel) {setImdbId(imdbId => [...imdbId, firstResult]);}
        //setImdbId(imdbId.push(firstResult));
        // console.log(imdbId);
      };
      fetchImdbID();
      return () => {didCancel = true}
    });
  }, [moviesToSearch]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          Movies:
          <textarea value={value} onChange={onChange} />
        </label>
        <input type="submit" value="Search" />
      </form>
      
      {isPressed ? (<MovieList imdbId={imdbId} />) : (<p>waiting...</p>)}
      
    </div>
  );
}


export default SearchComponent;
