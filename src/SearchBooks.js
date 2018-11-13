import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import MyReadsDetail from './MyReadsDetail';

class SearchBooks extends Component {

 state = {
    books: [],
    allBooks: [],
    query: ''
  }

componentDidMount() {
   this.fetchAllBooks();
}

fetchAllBooks(){
   BooksAPI.getAll().then((data) => {
      this.setState({ allBooks: data })
    })
}

/* Function to Search book by query*/
searchBookByQuery(query){	
	BooksAPI.search(query).then(data => {
    if(data.error){
      this.setState({books : [] })
    } else {
      this.renderBookWithStatus(data);
    } 
	this.setState({query});

  });
}

/*Render book items in search page with default shelf value.*/
  renderBookWithStatus(data) {
    const searchBooks = data; 
      for(const book of searchBooks){
        book.shelf = "none";
        for(const sBook of this.state.allBooks){
          if(book.id === sBook.id) {
            book.shelf = sBook.shelf;
          }
        }
      }
      this.setState({books: searchBooks});
  }



/*Function to handle book shelf update at backend*/
updateShelf(book, shelf) {
  
  console.log({shelf})
  return new Promise(resolve => {BooksAPI.update(book, shelf).then(data => { 
          BooksAPI.getAll().then(data => {
            this.setState({
              allBooks: data
            }, resolve(data));
          });
        });
  });

}

/*Render the books with latest Shelf value*/
renderUpdatedBooks(books) {
    const searchBooks = this.state.books;
    for (const book of searchBooks) {
      for (const sBook of this.state.allBooks) {
        if (book.id === sBook.id) book.shelf = sBook.shelf;
      }
    }

    this.setState({ books: searchBooks });
    console.log('updated successfully');
  };

/*Handler for Book Shelf update*/
  handleBookUpdate = (book, shelf) => {
    this.updateShelf(book, shelf).then(books => this.renderUpdatedBooks(books))
  }

showSearchResults(){
	const { books, query} = this.state;
	if(query){
    if(books.error){
      return "No Results"
    } else {
      return books.map((book, index) => {return (<MyReadsDetail key={index} book={book} updateBookShelf={this.handleBookUpdate}/>)});
    }
		
	}
}

  render() {
  	

  	return (

        	<div className="search-books">
                    <div className="search-books-bar">
                    	<Link to="/" className="close-search">Close </Link>
                     
                      <div className="search-books-input-wrapper">
                        
                        <input type="text" placeholder="Search by title or author" value={this.state.query}
                          onChange={event => this.searchBookByQuery(event.target.value)}/>

                      </div>
                    </div>
                    <div className="search-books-results">
                      <ol className="books-grid">
                      	{this.showSearchResults()}
                      </ol>
                    </div>
                  </div>

          )
      }
  }
  export default SearchBooks

  