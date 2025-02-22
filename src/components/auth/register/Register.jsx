import { useState } from "react"
import { useNavigate } from "react-router"
import { Form, Button, Col, FormGroup, Row } from "react-bootstrap"

import AuthContainer from "../authContainer/AuthContainer"
import { errorToast, successToast } from "../../ui/toast/notifications"
import { validateEmail, validatePassword, validateString } from "../auth.helpers"
import { registerUrser } from "./Register.services"
import ToggleTheme from "../../ui/shared/toggleTheme/ToggleTheme"
import ComboLanguage from "../../ui/shared/comboLanguage/ComboLangauge"
import { useTranslate } from "../../../custom/useTranslate/useTranslate"

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

    const t = useTranslate();

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
            errorToast(`${t("username")} ${t("incorrect")}`);
            setErrors({ ...errors, name: true });
            return;
        }
        if (!email.length || !validateEmail(email)) {
            errorToast(`${t("email")} ${t("incorrect")}`);
            setErrors({ ...errors, email: true });
            return;
        }

        else if (!password.length || !validatePassword(password, 7, null, true, true)) {
            errorToast(`${t("password")} ${t("incorrect")}`);
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
                <FormGroup>
                    <ComboLanguage />
                    <ToggleTheme />
                </FormGroup>
                <FormGroup className="mb-4">
                    <Form.Control
                        autoComplete="username"
                        type="text"
                        className={errors.name && "border border-danger"}
                        placeholder={`${t("enter")} ${t("username")}`}
                        onChange={handleNameChange}
                        value={name} />
                    {errors.name && <p className="mt-2 text-danger">{t("username_empty")}</p>}
                </FormGroup>
                <FormGroup className="mb-4">
                    <Form.Control
                        autoComplete="email"
                        type="email"
                        className={errors.email && "border border-danger"}
                        placeholder={`${t("enter")} ${t("email")}`}
                        onChange={handleEmailChange}
                        value={email} />
                    {errors.email && <p className="mt-2 text-danger">{t("email_empty")}</p>}
                </FormGroup>
                <FormGroup className="mb-4">
                    <Form.Control
                        autoComplete="current-pasword"
                        type="password"
                        className={errors.password && "border border-danger"}
                        placeholder={`${t("enter")} ${t("password")}`}
                        onChange={handlePasswordChange}
                        value={password}
                    />
                    {errors.password && <p className="mt-2 text-danger">{t("password_empty")}</p>}
                </FormGroup>
                <Row>
                    <Col>
                        <Button variant="secondary" onClick={handleLoginClick} >{t("login")}</Button>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <Button variant="primary" type="submit">
                            {t("register")}
                        </Button>
                    </Col>
                </Row>
            </Form>
        </AuthContainer>
    )
}

export default Register