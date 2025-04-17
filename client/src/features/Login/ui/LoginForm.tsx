import React, { useState } from "react";
import { Button, Form, Card, Container } from "react-bootstrap";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { login } from "../../../entities/user/model/userThunks";
import { useNavigate } from "react-router";
import { loginFormSchema } from "../../../entities/user/model/schema"; 
import { LoginFormT } from "../../../entities/user/model/types";

export default function LoginForm(): React.JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormT>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Валидация с помощью Zod
    const result = loginFormSchema.safeParse(formData);

    if (!result.success) {
      // Собираем ошибки
      const validationErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors); // Устанавливаем ошибки
    } else {
      setErrors({}); // Если ошибок нет, очищаем ошибки
      void dispatch(login(formData)); // Отправляем данные логина
      setFormData({ email: "", password: "" });
      navigate("/notebook"); // Переход после успешного логина
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#fffde7" }}
    >
      <Card
        style={{
          width: "28rem",
          backgroundColor: "#fff59d",
          borderRadius: "20px",
          boxShadow: "6px 6px 16px rgba(0,0,0,0.1)",
          fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
          padding: "2rem",
          transform: "rotate(-1.5deg)",
        }}
      >
        <Card.Body>
          <Card.Title
            className="text-center mb-4"
            style={{
              fontSize: "2rem",
              color: "#f57f17",
            }}
          >
            🔐 Вход в заметочник
          </Card.Title>

          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label style={{ fontSize: "1.1rem" }}>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="введи свой email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={{
                  borderRadius: "10px",
                  boxShadow: "inset 2px 2px 6px #e0e0e0",
                }}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label style={{ fontSize: "1.1rem" }}>Пароль</Form.Label>
              <Form.Control
                type="password"
                placeholder="и пароль, конечно :)"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                style={{
                  borderRadius: "10px",
                  boxShadow: "inset 2px 2px 6px #e0e0e0",
                }}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
            </Form.Group>

            <div className="text-center">
              <Button
                type="submit"
                style={{
                  backgroundColor: "#81d4fa",
                  border: "none",
                  borderRadius: "12px",
                  padding: "0.6rem 2.4rem",
                  fontSize: "1.1rem",
                  boxShadow: "3px 3px 6px rgba(0,0,0,0.1)",
                  fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
                }}
              >
                🔓 Войти
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
