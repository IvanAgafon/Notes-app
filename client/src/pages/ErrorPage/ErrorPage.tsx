import React from "react";
import { Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function ErrorPage(): React.JSX.Element {
  const navigate = useNavigate();

  const goHome = () => navigate("/");

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "#fffde7",
        fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
      }}
    >
      <Card
        style={{
          backgroundColor: "#ffe082",
          borderRadius: "20px",
          boxShadow: "6px 6px 16px rgba(0,0,0,0.1)",
          padding: "3rem",
          textAlign: "center",
          transform: "rotate(-1.5deg)",
          maxWidth: "500px",
        }}
      >
        <h1 style={{ fontSize: "3rem", color: "#f57f17" }}>😕 Упс!</h1>
        <p style={{ fontSize: "1.3rem", marginBottom: "2rem" }}>
          Такой страницы не существует... <br /> Пора вернуться в блокнотики!
        </p>
        <Button
          onClick={goHome}
          style={{
            backgroundColor: "#81d4fa",
            border: "none",
            borderRadius: "12px",
            padding: "0.6rem 2.4rem",
            fontSize: "1.1rem",
            boxShadow: "3px 3px 6px rgba(0,0,0,0.1)",
            color: "#01579b",
          }}
        >
          🔙 На главную
        </Button>
      </Card>
    </Container>
  );
}
