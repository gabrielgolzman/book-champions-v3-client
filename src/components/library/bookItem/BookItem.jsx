import { Badge, Card, Button } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";

const BookItem = ({ id, title, author, rating, pageCount, imageUrl, available, onBookSelected, onDeleteBook }) => {

    const handleClick = () => {
        onBookSelected(title)
    }

    const handleDeleteBook = () => {
        onDeleteBook(id, title);
    }

    const ratingStars = Array.from({ length: 5 }, (_, index) =>
        index < rating ? <StarFill key={index} /> : <Star key={index} />
    );

    return (
        <Card style={{ width: "22rem" }} className="mx-3 my-2">
            <Card.Img
                height={400}
                variant="top"
                src={imageUrl !== "" ? imageUrl : "https://bit.ly/47NylZk"}
            />
            <Card.Body>
                <div className="mb-2">
                    {available ?
                        <Badge bg="success">Disponible</Badge>
                        :
                        <Badge bg="danger">Reservado</Badge>
                    }
                </div>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle>{author}</Card.Subtitle>
                {ratingStars}
                <p>{pageCount} páginas</p>
                <Button variant="danger" className="me-4" onClick={handleDeleteBook}>
                    Eliminar libro
                </Button>
                <Button onClick={handleClick}>
                    Seleccionar libro
                </Button>
            </Card.Body>
        </Card>

    )
}

export default BookItem;


