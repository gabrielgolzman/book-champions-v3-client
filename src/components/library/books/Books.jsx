import { useState } from "react"
import BookItem from "../bookItem/BookItem"
import BookSearch from "../bookSearch/BookSearch";
import DeleteModal from "../../ui/modals/deleteModal/DeleteModal";

const Books = ({ books, onDeleteBook }) => {
    const [bookSelected, setBookSelected] = useState("");
    const [search, setSearch] = useState("");
    const [modal, setModal] = useState({
        show: false,
        bookId: 0,
        title: ""
    });

    const handleBookSelected = (title) => {
        setBookSelected(title)
    }

    const handleSearch = (value) => {
        setSearch(value);
    }

    const handleDeleteBook = (id, title) => {
        setModal({
            show: true,
            bookId: id,
            title,
        })
    }

    const handleDeleteFromModal = () => {
        onDeleteBook(modal.bookId);
        setModal({
            show: false,
            bookId: 0,
            title: ''
        });
    }

    const handleHideModal = () => {
        setModal({
            show: false,
            bookId: 0,
            title: ''
        });
    }

    const booksMapped = books
        .filter(book => search ? book.title.toLowerCase().includes(search.toLowerCase()) : book)
        .map((book => (
            <BookItem
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                rating={book.rating}
                pageCount={book.pageCount}
                imageUrl={book.imageUrl}
                available={book.available}
                summary={book.summary}
                onBookSelected={handleBookSelected}
                onDeleteBook={handleDeleteBook}
            />
        )));

    return (
        <>
            <DeleteModal
                headerText="Eliminar libro"
                onHide={handleHideModal}
                onDelete={handleDeleteFromModal}
                entity={modal.title}
                show={modal.show}

            />
            {bookSelected && <p>El libro seleccionado es: <span className="fw-bold">{bookSelected}</span></p>}
            <BookSearch onSearch={handleSearch} search={search} />
            <div className="d-flex justify-content-center flex-wrap my-5">
                {booksMapped.length ? booksMapped : <p>No se encontraron libros</p>}
            </div>
        </>
    )
}

export default Books