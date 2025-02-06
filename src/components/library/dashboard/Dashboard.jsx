import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Button, Col, Row } from "react-bootstrap";

import Books from "../books/Books";
import BookForm from "../bookForm/BookForm";
import BookDetails from "../bookDetails/BookDetails";
import { errorToast, successToast } from "../../ui/toast/notifications";




const Dashboard = ({ onLogout }) => {
    const [bookList, setBookList] = useState([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/library") {
            fetch("http://localhost:3000/books")
                .then(res => res.json())
                .then(data => setBookList([...data]))
                .catch(err => console.log(err));
        }

    }, [location])

    const handleBookAdded = (enteredBook) => {
        if (!enteredBook.title || !enteredBook.author) {
            errorToast('El autor y/o título son requeridos');
            return;
        }
        fetch("http://localhost:3000/books", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(enteredBook)
        })
            .then(res => res.json())
            .then(data => {
                setBookList(prevBookList => [data, ...prevBookList]);
                successToast(`¡Libro ${data.title} agregado correctamente!`)
            })
            .catch(err => console.log(err))

    }

    const handleDeleteBook = (id) => {
        fetch(`http://localhost:3000/books/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setBookList(prevBookList => prevBookList.filter(book => book.id !== id));
                successToast("¡Libro eliminado!")
            })
            .catch(err => {
                errorToast("Error al eliminar libro");
            })

    }

    const handleNavigateAddBook = () => {
        navigate("/library/add-book", { replace: true });
    }

    return (
        <>
            <Row className="w-100 my-3">
                <Col />
                <Col md={3} className="d-flex justify-content-end ">
                    <Button className="me-3" variant="success" onClick={handleNavigateAddBook}>Agregar libro</Button>
                    <Button onClick={onLogout}>Cerrar sesión</Button>
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