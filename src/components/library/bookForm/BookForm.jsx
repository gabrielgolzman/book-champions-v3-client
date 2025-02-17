import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { errorToast } from "../../ui/toast/notifications";
import { editBook } from "./BookForm.services";

const BookForm = ({
    book,
    onBookAdded = () => { },
    onBookSaved = () => { },
    isEditing = false
}) => {
    const [title, setTitle] = useState(book?.title);
    const [author, setAuthor] = useState(book?.author);
    const [rating, setRating] = useState(book?.rating);
    const [pageCount, setPageCount] = useState(book?.pageCount);
    const [imageUrl, setImageUrl] = useState(book?.imageUrl);
    const [available, setAvailable] = useState(book?.available);

    const navigate = useNavigate();

    const handleChangeTitle = (event) => {
        setTitle(event.target.value);
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    }

    const handleRatingChange = (event) => {
        setRating(event.target.value)
    }
    const handlePageCountChange = (event) => {
        setPageCount(event.target.value)
    }

    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    }

    const handleAvailabilityChange = (event) => {
        setAvailable(event.target.checked);
    }

    const handleAddBook = (event) => {
        event.preventDefault();

        const bookData = {
            title,
            author,
            rating: parseInt(rating, 10),
            pageCount: parseInt(pageCount, 10),
            imageUrl,
            available
        };

        onBookAdded(bookData);
        setTitle("");
        setAuthor("");
        setRating("");
        setPageCount("");
        setImageUrl("");
        setAvailable(false);
    }

    const handleSaveBook = (event) => {
        event.preventDefault();
        if (!title || !author) {
            errorToast("Título / autor requeridos");
            return;
        }
        const bookData = {
            title,
            author,
            rating: parseInt(rating, 10),
            pageCount: parseInt(pageCount, 10),
            summary: book.summary,
            imageUrl,
            available
        };

        editBook(
            book.id,
            bookData,
            () => {
                onBookSaved(bookData);
            },
            err => errorToast(err.message)
        );
    }

    const handleGoBack = () => {
        navigate("/library");
    }

    return (
        <Card className="m-4 w-50" bg="success">
            <Card.Body>
                <Form className="text-white" onSubmit={isEditing ? handleSaveBook : handleAddBook}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar título"
                                    onChange={handleChangeTitle}
                                    value={title} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar autor"
                                    onChange={handleAuthorChange}
                                    value={author} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Puntuación</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de estrellas"
                                    max={5}
                                    min={0}
                                    onChange={handleRatingChange}
                                    value={rating} />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="pageCount">
                                <Form.Label>Cantidad de páginas</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de páginas"
                                    min={1}
                                    onChange={handlePageCountChange}
                                    value={pageCount} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresar url de imagen"
                                onChange={handleImageUrlChange}
                                value={imageUrl} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Col className="d-flex flex-column justify-content-end align-items-end">
                            <Form.Check
                                type="switch"
                                id="available"
                                className="mb-3"
                                label="¿Disponible?"
                                onChange={handleAvailabilityChange}
                                checked={available} />

                        </Col>
                    </Row>
                    <Row>
                        <Col />
                        <Col md={6} className="d-flex justify-content-end">
                            <Button onClick={handleGoBack} className="px-3 me-3" variant="secondary">Volver</Button>
                            <Button variant="primary" type="submit">
                                {isEditing ? "Editar lectura" : "Agregar lectura"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default BookForm;