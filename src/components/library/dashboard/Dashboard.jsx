import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import Books from "../books/Books";
import NewBook from "../newBook/NewBook";
import { Route, Routes, useNavigate } from "react-router";
import BookDetails from "../bookDetails/BookDetails";

const books = [
    {
        id: 1,
        title: "100 años de soledad",
        author: "Gabriel García Marquez",
        rating: 5,
        pageCount: 410,
        imageUrl:
            "https://images.cdn3.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg",
        available: true,
        summary: `
            “Muchos años después, frente al pelotón de fusilamiento, el coronel Aureliano Buendía había de recordar aquella tarde remota en que su padre lo llevó a conocer el hielo”.
Con estas palabras empieza una novela ya legendaria en los anales de la literatura universal, una de las aventuras literarias más fascinantes del siglo xx. Millones de ejemplares de Cien años de soledad leídos en todas las lenguas y el Premio Nobel de Literatura coronando una obra que se había abierto paso a “boca a boca” —como gusta decir el escritor— son la más palpable demostración de que la aventura fabulosa de la familia Buendía-Iguarán, con sus milagros, fantasías, obsesiones, tragedias, incestos, adulterios, rebeldías, descubrimientos y condenas, representaba al mismo tiempo el mito y la historia, la tragedia y el amor del mundo entero
        `
    },
    {
        id: 2,
        title: "Asesinato en el Orient Express",
        author: "Agatha Christie",
        rating: 4,
        pageCount: 256,
        imageUrl:
            "https://m.media-amazon.com/images/I/71RFyM95qwL._AC_UF1000,1000_QL80_.jpg",
        available: true,
        summary: " Un grupo de viajeros se ven atrapados en el Orient Express en plena tormenta de nieve. Entre ellos pronto se descubre un cadáver. El asesino tiene que ser uno de los presentes. Al detective más famoso de la historia le corresponde averiguar quién ha cometido el crimen. Un referente universal. Uno de los casos más famosos de Hércules Poirot."
    },
    {
        id: 3,
        title: "Las dos torres",
        author: "J.R.R Tolkien",
        rating: 5,
        pageCount: 352,
        imageUrl:
            "https://m.media-amazon.com/images/I/A1y0jd28riL._AC_UF1000,1000_QL80_.jpg",
        available: true,
        summary: `La Compañía se ha disuelto y sus integrantes emprenden caminos separados. Frodo y Sam avanzan solos en su viaje a lo largo del río Anduin, perseguidos por la sombra misteriosa de un ser extraño que también ambiciona la posesión del Anillo. Mientras, hombres, elfos y enanos se preparan para la batalla final contra las fuerzas del Señor del Mal.`
    },
    {
        id: 4,
        title: "50 sombras de Grey",
        author: "E.L James",
        rating: 1,
        pageCount: 514,
        imageUrl:
            "https://prodimage.images-bn.com/pimages/9781728260839_p0_v2_s1200x630.jpg",
        available: true,
        summary: "Cuando la joven Anastasia conoce al poderoso y enigmático Christian Grey, comienzan un excitante, sensual y atormentado romance. Erótica, entretenida y profundamente conmovedora, la serie Cincuenta sombras es una historia que te cautivará, te poseerá y se quedará contigo por siempre."
    },
];


const Dashboard = ({ onLogout }) => {
    const [bookList, setBookList] = useState(books);

    const navigate = useNavigate();

    const handleBookAdded = (enteredBook) => {
        const bookData = {
            ...enteredBook,
            id: Math.random()
        }

        setBookList(prevBookList => [bookData, ...prevBookList])
    }

    const handleDeleteBook = (id) => {
        setBookList(prevBookList => prevBookList.filter(book => book.id !== id));
    }

    const handleNavigateAddBook = () => {
        navigate("add-book");
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
                <Route path="add-book" element={<NewBook onBookAdded={handleBookAdded} />} />
            </Routes>
        </>
    )
}

export default Dashboard