import { Badge, Card, Button } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";

const BookItem = ({ title, author, rating, pageCount, imageUrl, available, onBookSelected }) => {

    const handleClick = () => {
        onBookSelected(title)
    }

    const ratingStars = Array.from({ length: 5 }, (_, index) =>
        index < rating ? <StarFill key={index} /> : <Star key={index} />
    );

    return (
        <Card style={{ width: "22rem" }} className="mx-3">
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
                <Button onClick={handleClick}>
                    Seleccionar libro
                </Button>
            </Card.Body>
        </Card>

    )
}

export default BookItem;


