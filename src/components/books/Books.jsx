import { useState } from "react"
import BookItem from "../bookItem/BookItem"
import BookSearch from "../bookSearch/BookSearch";

const Books = ({ books }) => {
    const [bookSelected, setBookSelected] = useState("");
    const [search, setSearch] = useState("");

    const handleBookSelected = (title) => {
        setBookSelected(title)
    }

    const handleSearch = (value) => {
        setSearch(value);
    }

    const booksMapped = books
        .filter(book => search ? book.title.toLowerCase().includes(search.toLowerCase()) : book)
        .map((book => (
            <BookItem
                key={book.id}
                title={book.title}
                author={book.author}
                rating={book.rating}
                pageCount={book.pageCount}
                imageUrl={book.imageUrl}
                available={book.available}
                onBookSelected={handleBookSelected}
            />
        )));

    return (
        <>
            {bookSelected && <p>El libro seleccionado es: <span className="fw-bold">{bookSelected}</span></p>}
            <BookSearch onSearch={handleSearch} search={search} />
            <div className="d-flex justify-content-center flex-wrap my-5">
                {booksMapped}
            </div>
        </>
    )
}

export default Books