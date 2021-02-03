//import Movies from './Movies';
import React from 'react';
import SearchComponent from './SearchComponent';
import {Layout} from 'antd';
import './App.css';

function App() {
  const {Header, Content} = Layout;
  return (
   <>
     <Layout>

     <Header>
       <h1>Fetch Imdb Ratings of Movies</h1>
     </Header>
     <Content>
      <SearchComponent /> 
     </Content>
     </Layout>
    </>
  );
}

export default App;
