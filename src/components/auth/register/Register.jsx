import { useState } from "react"
import { useNavigate } from "react-router"
import { Form, Button, Col, FormGroup, Row } from "react-bootstrap"

import AuthContainer from "../authContainer/AuthContainer"
import { errorToast, successToast } from "../../ui/toast/notifications"
import { validateEmail, validatePassword, validateString } from "../auth.helpers"
import { registerUrser } from "./Register.services"

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
    });

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = (event) => {
        event.preventDefault();

        if (!name.length || !validateString(name, null, 13)) {
            errorToast("¡Nombre de usuario incorrecto!");
            setErrors({ ...errors, name: true });
            return;
        }
        if (!email.length || !validateEmail(email)) {
            errorToast("¡Email incorrecto!");
            setErrors({ ...errors, email: true });
            return;
        }

        else if (!password.length || !validatePassword(password, 7, null, true, true)) {
            errorToast("¡Password incorrecto!");
            setErrors({ ...errors, password: true });
            return;
        }

        setErrors({ email: false, password: false })

        registerUrser(
            name,
            email,
            password,
            () => {
                successToast("¡Usuario creado exitosamente!")
                navigate("/login");
            },
            err => errorToast(err.message)
        )

    }

    const handleLoginClick = () => {
        navigate("/login")
    }
    return (
        <AuthContainer>
            <Form onSubmit={handleRegister}>
                <FormGroup className="mb-4">
                    <Form.Control
                        autoComplete="username"
                        type="text"
                        className={errors.name && "border border-danger"}
                        placeholder="Ingresar nombre de usuario"
                        onChange={handleNameChange}
                        value={name} />
                    {errors.name && <p className="mt-2 text-danger">Debe ingresar un nombre de usuario</p>}
                </FormGroup>
                <FormGroup className="mb-4">
                    <Form.Control
                        autoComplete="email"
                        type="email"
                        className={errors.email && "border border-danger"}
                        placeholder="Ingresar email"
                        onChange={handleEmailChange}
                        value={email} />
                    {errors.email && <p className="mt-2 text-danger">Debe ingresar un email correcto</p>}
                </FormGroup>
                <FormGroup className="mb-4">
                    <Form.Control
                        autoComplete="current-pasword"
                        type="password"
                        className={errors.password && "border border-danger"}
                        placeholder="Ingresar contraseña"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                    {errors.password && <p className="mt-2 text-danger">Debe ingresar un password correcto</p>}
                </FormGroup>
                <Row>
                    <Col>
                        <Button variant="secondary" onClick={handleLoginClick} >Iniciar sesión</Button>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            Registrarse
                        </Button>
                    </Col>
                </Row>
            </Form>
        </AuthContainer>
    )
}

export default Register