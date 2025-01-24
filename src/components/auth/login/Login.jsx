import { useRef, useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setErrors({ ...errors, email: false });
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setErrors({ ...errors, password: false });
    }

    const handleLogin = (event) => {
        event.preventDefault();

        if (!emailRef.current.value.length) {
            setErrors({ ...errors, email: true });
            alert("¡Email vacío!");
            emailRef.current.focus();
            return;
        }

        else if (!password.length || password.length < 7) {
            setErrors({ ...errors, password: true });
            alert("¡Password vacío!");
            passwordRef.current.focus();
            return;
        }

        setErrors({ email: false, password: false })
        onLogin();
        navigate("/library");
    }

    return (
        <Card className="mt-5 mx-3 p-3 px-5 shadow">
            <Card.Body>
                <Row className="mb-2">
                    <h5>¡Bienvenidos a Books Champion!</h5>
                </Row>
                <Form onSubmit={handleLogin}>
                    <FormGroup className="mb-4">
                        <Form.Control
                            autoComplete="email"
                            type="email"
                            className={errors.email && "border border-danger"}
                            ref={emailRef}
                            placeholder="Ingresar email"
                            onChange={handleEmailChange}
                            value={email} />
                        {errors.email && <p className="mt-2 text-danger">Debe ingresar un email</p>}
                    </FormGroup>
                    <FormGroup className="mb-4">
                        <Form.Control
                            autoComplete="current-pasword"
                            type="password"
                            className={errors.password && "border border-danger"}
                            ref={passwordRef}
                            placeholder="Ingresar contraseña"
                            onChange={handlePasswordChange}
                            value={password}
                        />
                        {errors.password && <p className="mt-2 text-danger">Debe ingresar un password</p>}
                    </FormGroup>
                    <Row>
                        <Col />
                        <Col md={6} className="d-flex justify-content-end">
                            <Button variant="secondary" type="submit">
                                Iniciar sesión
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};


export default Login;