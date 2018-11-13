import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyReadsDetail from './MyReadsDetail';
import * as BooksAPI from './BooksAPI';

class ListMyReads extends Component {
  

  state = {
    
    books: [],
    
    myReads: []
    
  }

  
 componentDidMount() {
   this.fetchAllBooks();
}

fetchAllBooks(){
	 BooksAPI.getAll().then((data) => {
      this.setState({ books: data })
    })
}

/*Function to handle book shelf update at backend*/
updateShelf = (book, shelf) => {  
  
  return new Promise(resolve => {BooksAPI.update(book, shelf).then(data => { 
          BooksAPI.getAll().then(data => {
            this.setState({
              books: data
            }, resolve(data));
          });
        });
  });
}

 /*Render books by Shelf category*/
fetchMyReadsByTitle(shelf, title) {
	//console.log({title},this.state.currentlyReading);
  let books = this.state.books.filter((book) => book.shelf === shelf);

//console.log(books)
	
	return(
		<div className="bookshelf">
			<h2 className="bookshelf-title">{title}</h2>
	          <div className="bookshelf-books">
	            <ol className="books-grid">
	             {books.map((book, index) =>  
                <MyReadsDetail key={index} book={book} updateBookShelf={this.updateShelf}/> )}  
				  


	            </ol>
	          </div>
        </div>
		)

}

  render() {   

    return (
		
			<div className="list-books">
		    	 <div className="list-books-title">
		              <h1>MyReads</h1>
		         </div>
		         <div className="list-books-content">
		         	<div>
		         		{this.fetchMyReadsByTitle("currentlyReading", "Currently Reading")}
                {this.fetchMyReadsByTitle("wantToRead", "Want to Read")}
                {this.fetchMyReadsByTitle("read", "Read")}
		         		          	
		            </div>
		         </div>
		         <div className="open-search">
		            <Link to="/search">Add a book</Link>
             </div>
		    </div>     
    	)
  	}
}

export default ListMyReads
