import React from 'react';
//import * as BooksAPI from './BooksAPI';
import './App.css';
import { BrowserRouter as Router, 
          Route } from 'react-router-dom';
import ListMyReads from './ListMyReads';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  
  state = {
    books: [],
    myReadsBooks: []
   
  }


  render() {
    return (
      <Router>
        <div className="app">
        <Route exact path='/' render={() => (
            <ListMyReads              
            />
          )}/>
          <Route path='/search' render={() => (
            <SearchBooks         
            />
          )}/>        
        </div>
      </Router>
    )
  }
}

export default BooksApp
