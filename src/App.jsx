import { useState } from 'react';

import NewBook from './components/newBook/NewBook';
import Books from './components/books/Books';

import './App.css'

const books = [
  {
    id: 1,
    title: "100 años de soledad",
    author: "Gabriel García Marquez",
    rating: 5,
    pageCount: 410,
    imageUrl:
      "https://images.cdn3.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg",
    available: true
  },
  {
    id: 2,
    title: "Asesinato en el Orient Express",
    author: "Agatha Christie",
    rating: 4,
    pageCount: 256,
    imageUrl:
      "https://m.media-amazon.com/images/I/71RFyM95qwL._AC_UF1000,1000_QL80_.jpg",
    available: true
  },
  {
    id: 3,
    title: "Las dos torres",
    author: "J.R.R Tolkien",
    rating: 5,
    pageCount: 352,
    imageUrl:
      "https://m.media-amazon.com/images/I/A1y0jd28riL._AC_UF1000,1000_QL80_.jpg",
    available: true
  },
  {
    id: 4,
    title: "50 sombras de Grey",
    author: "E.L James",
    rating: 1,
    pageCount: 514,
    imageUrl:
      "https://prodimage.images-bn.com/pimages/9781728260839_p0_v2_s1200x630.jpg",
    available: true
  },
];


const App = () => {
  const [bookList, setBookList] = useState(books);



  const handleBookAdded = (enteredBook) => {
    const bookData = {
      ...enteredBook,
      id: Math.random()
    }

    setBookList(prevBookList => [bookData, ...prevBookList])
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <h2>Book champions app</h2>
      <p>¡Quiero leer libros!</p>
      <NewBook onBookAdded={handleBookAdded} />
      <Books books={bookList} />
    </div>
  )
}

export default App
