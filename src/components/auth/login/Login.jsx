import { useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import AuthContainer from "../authContainer/AuthContainer";

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
        fetch("http://localhost:3000/login", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(token => {
                localStorage.setItem("book-champions-token", token)
                navigate("/library");
            })
            .catch(err => console.log(err))
    }

    const handleRegisterClick = () => {
        navigate("/register")
    }

    return (
        <AuthContainer>
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
                <Row className="mt-4">
                    <p className="text-center fw-bold">¿Aún no tenés cuenta?</p>
                    <Button onClick={handleRegisterClick}>Registrarse</Button>
                </Row>
            </Form>
        </AuthContainer>
    );
};


export default Login;