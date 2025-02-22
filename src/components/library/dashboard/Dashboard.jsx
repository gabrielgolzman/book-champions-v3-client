import { useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Button, Col, Row } from "react-bootstrap";

import Books from "../books/Books";
import BookForm from "../bookForm/BookForm";
import BookDetails from "../bookDetails/BookDetails";
import { errorToast, successToast } from "../../ui/toast/notifications";
import { addBook, deleteBook, getBooks } from "./Dashboard.services";
import { AuthenticationContext } from "../../../services/auth/auth.context";
import ToggleTheme from "../../ui/shared/toggleTheme/ToggleTheme";

const Dashboard = () => {
    const [bookList, setBookList] = useState([]);

    const { handleUserLogout } = useContext(AuthenticationContext);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/library") {
            getBooks(
                data => setBookList([...data]),
                err => errorToast(err.message)
            )
        }

    }, [location])

    const handleBookAdded = (enteredBook) => {
        if (!enteredBook.title || !enteredBook.author) {
            errorToast('El autor y/o título son requeridos');
            return;
        }
        addBook(
            enteredBook,
            data => {
                setBookList(prevBookList => [data, ...prevBookList]);
                successToast(`¡Libro ${data.title} agregado correctamente!`)
            },
            err => errorToast(err.message))
    }

    const handleDeleteBook = (id) => {
        deleteBook(id,
            () => {
                setBookList(prevBookList => prevBookList.filter(book => book.id !== id));
                successToast("¡Libro eliminado!")
            },
            () => {
                errorToast("Error al eliminar libro");
            }
        )

    }

    const handleNavigateAddBook = () => {
        navigate("/library/add-book", { replace: true });
    }

    return (
        <>
            <Row className="w-100 my-3">
                <Col />
                <Col md={3} className="d-flex justify-content-end ">
                    <ToggleTheme />
                    <Button className="me-3" variant="success" onClick={handleNavigateAddBook}>Agregar libro</Button>
                    <Button onClick={handleUserLogout}>Cerrar sesión</Button>
                </Col>
            </Row>
            <h2>Book champions app</h2>
            <p>¡Quiero leer libros!</p>
            <Routes>
                <Route index element={<Books books={bookList} onDeleteBook={handleDeleteBook} />} />
                <Route path=":id" element={<BookDetails />} />
                <Route path="add-book" element={<BookForm onBookAdded={handleBookAdded} />} />
            </Routes>
        </>
    )
}

export default Dashboard