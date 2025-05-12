import { useContext, useRef, useState } from "react";
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

import { useTranslate } from "../../../custom/useTranslate/useTranslate";
import { validateEmail, validatePassword } from "../auth.helpers";
import { errorToast } from "../../ui/toast/notifications";
import { loginUser } from "./Login.services";
import { AuthenticationContext } from "../../../services/auth/auth.context";

import AuthContainer from "../authContainer/AuthContainer";
import ToggleTheme from "../../ui/shared/toggleTheme/ToggleTheme";
import ComboLanguage from "../../ui/shared/comboLanguage/ComboLanguage";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const { handleUserLogin } = useContext(AuthenticationContext);

    const t = useTranslate();

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

        if (!emailRef.current.value.length || !validateEmail(email)) {
            setErrors({ ...errors, email: true });
            errorToast(`${t("email")} ${t("incorrect")}`);
            emailRef.current.focus();
            return;
        }

        else if (!password.length || !validatePassword(password, 7, null, true, true)) {
            setErrors({ ...errors, password: true });
            errorToast(`${t("password")} ${t("incorrect")}`);
            passwordRef.current.focus();
            return;
        }

        setErrors({ email: false, password: false })

        loginUser(
            email,
            password,
            token => {
                handleUserLogin(token)
                navigate("/library");
            },
            err => {
                errorToast(err.message)
            }
        )
    }

    const handleRegisterClick = () => {
        navigate("/register")
    }

    return (
        <AuthContainer>
            <Form onSubmit={handleLogin}>
                <FormGroup>
                    <ComboLanguage />
                    <ToggleTheme />
                </FormGroup>
                <FormGroup className="mb-4">
                    <Form.Control
                        autoComplete="email"
                        type="email"
                        className={errors.email && "border border-danger"}
                        ref={emailRef}
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
                        ref={passwordRef}
                        placeholder={`${t("enter")} ${t("password")}`}
                        onChange={handlePasswordChange}
                        value={password}
                    />
                    {errors.password && <p className="mt-2 text-danger">{t("password_empty")}</p>}
                </FormGroup>
                <Row>
                    <Col />
                    <Col md={6} className="d-flex justify-content-end">
                        <Button variant="secondary" type="submit">
                            {t("login")}
                        </Button>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <p className="text-center fw-bold">{t("login_no_account")}</p>
                    <Button onClick={handleRegisterClick}>{t("register")}</Button>
                </Row>
            </Form>
        </AuthContainer>
    );
};


export default Login;