import { useState } from "react"
import BookItem from "../bookItem/BookItem"

const Books = ({ books }) => {
    const [bookSelected, setBookSelected] = useState("");

    const handleBookSelected = (title) => {
        setBookSelected(title)
    }

    return (
        <>
            {bookSelected && <p>El libro seleccionado es: <span className="fw-bold">{bookSelected}</span></p>}
            <div className="d-flex justify-content-center flex-wrap">
                <BookItem
                    title={books[0].title}
                    author={books[0].author}
                    rating={books[0].rating}
                    pageCount={books[0].pageCount}
                    imageUrl={books[0].imageUrl}
                    available={books[0].available}
                    onBookSelected={handleBookSelected}
                />
                <BookItem
                    title={books[1].title}
                    author={books[1].author}
                    rating={books[1].rating}
                    pageCount={books[1].pageCount}
                    imageUrl={books[1].imageUrl}
                    available={books[1].available}
                    onBookSelected={handleBookSelected}
                />
                <BookItem
                    title={books[2].title}
                    author={books[2].author}
                    rating={books[2].rating}
                    pageCount={books[2].pageCount}
                    imageUrl={books[2].imageUrl}
                    available={books[2].available}
                    onBookSelected={handleBookSelected}
                />
                <BookItem
                    title={books[3].title}
                    author={books[3].author}
                    rating={books[3].rating}
                    pageCount={books[3].pageCount}
                    imageUrl={books[3].imageUrl}
                    available={books[3].available}
                    onBookSelected={handleBookSelected}
                />
            </div>
        </>
    )
}

export default Books