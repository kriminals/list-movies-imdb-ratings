import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import axios from 'axios';

function SearchComponent() {
  const [moviesToSearch, setMoviesToSearch] = useState([]);
  const [imdbId, setImdbId] = useState([]);
  const [value, setValue] = useState('');
  const [isPressed, setPressed] = useState(false);
  
  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = (event) => {
    setMoviesToSearch(value.split('\n'));
    event.preventDefault();
    setPressed(true);
  };

  useEffect(() => {
    moviesToSearch.forEach((movie) => {
      const fetchImdbID = async () => {
        const result = await axios(
          `http://www.omdbapi.com/?s=${movie}&apikey=3dc3957f`
        );
        const firstResult = result.data.Search[0].imdbID;
        console.log(firstResult);
        setImdbId(imdbId => [...imdbId, firstResult]);
        //setImdbId(imdbId.push(firstResult));
        console.log(imdbId);
      };
      fetchImdbID();
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
