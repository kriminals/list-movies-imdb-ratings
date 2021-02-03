import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import axios from 'axios';
import { Input, Button } from 'antd';

function SearchComponent() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [moviesToSearch, setMoviesToSearch] = useState([]);
  const [imdbId, setImdbId] = useState([]);
  const [value, setValue] = useState('');
  const [isPressed, setPressed] = useState(false);

  const { TextArea } = Input;

  const onChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setMoviesToSearch(value.split('\n'));
    setPressed(true);
  };
  const onReset = () => {
    setValue('');
    setPressed(false);
    setImdbId([]);
  };

  useEffect(() => {
    moviesToSearch.forEach((movie) => {
      let didCancel = false;
      const fetchImdbID = async () => {
        const result = await axios(
          `https://www.omdbapi.com/?s=${movie}&apikey=${API_KEY}`
        );
        const firstResult = result.data.Search[0].imdbID;
        if (!didCancel) {
          setImdbId((imdbId) => [...imdbId, firstResult]);
        }
      };
      fetchImdbID();
      return () => {
        didCancel = true;
      };
    });
  }, [moviesToSearch]);

  return (
    <div>
      <TextArea
        placeholder="copy here your movies one per line"
        rows={4}
        value={value}
        onChange={onChange}
      />
      <Button type="primary" htmlType="submit" onClick={onSubmit}>
        Submit
      </Button>
      <Button htmlType="button" onClick={onReset}>
        Reset
      </Button>
      {isPressed ? <MovieList imdbId={imdbId} /> : <p></p>}
    </div>
  );
}

export default SearchComponent;
