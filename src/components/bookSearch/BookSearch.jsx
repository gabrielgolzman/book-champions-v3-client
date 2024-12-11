import { Form } from "react-bootstrap"

const BookSearch = ({ search, onSearch }) => {

    const handleSearchChange = (e) => {
        onSearch(e.target.value)
    }
    return (
        <Form.Group className="mb-3" controlId="searchBook">
            <Form.Control
                type="text"
                placeholder="Buscar libro..."
                onChange={handleSearchChange}
                value={search}
            />
        </Form.Group>

    )
}

export default BookSearch;

