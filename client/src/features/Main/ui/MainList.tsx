import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useAppSelector } from "../../../shared/lib/hooks";

export default function MainList(): React.JSX.Element {
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  return (
    <Container
      className="d-flex flex-column align-items-center"
      style={{ height: "100vh", paddingTop: "2rem" }}
    >
      {/* Заголовок с анимацией появления */}
      <motion.h1
        style={{
          fontSize: "8rem",
          fontFamily: "'Pacifico', 'Comic Sans MS', cursive",
          color: "#f57f17",
          marginBottom: "1rem",
          letterSpacing: "4px",
          textShadow: "2px 2px 6px rgba(0, 0, 0, 0.2)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }} // Плавное появление через 0.5 секунд
      >
        NOTES
      </motion.h1>

      {/* Карточка с анимацией появления и увеличением при наведении */}
      <motion.div
        style={{
          width: "40rem",
          paddingTop: "2.5rem",
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }} // Плавное появление карточки через 1 секунду
      >
        {/* Используем motion.div для оборачивания карточки */}
        <motion.div
          style={{
            backgroundColor: "#fff59d",
            borderRadius: "20px",
            boxShadow: "4px 4px 20px rgba(0,0,0,0.1)",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            padding: "2.5rem",
          }}
          whileHover={{ scale: 1.01 }} // Увеличение карточки при наведении
          transition={{ duration: 0.3 }}
        >
          <Card.Body>
            <Card.Title
              style={{ fontSize: "2rem" }}
              className="text-center mb-4"
            >
              📝 Добро пожаловать в Notes!
            </Card.Title>

            <div style={{ fontSize: "1.2rem", lineHeight: "1.7" }}>
              <p>
                Это небольшое приложение для создания, хранения и редактирования
                заметок.
              </p>

              <p>Вы можете:</p>
              <ul>
                <li>📌 Добавлять заметки</li>
                <li>🗃️ Организовывать их по блокнотам</li>
                <li>🖊️ Редактировать и удалять в пару кликов</li>
              </ul>

              <p>Войдите или зарегистрируйтесь, чтобы начать ✨</p>
            </div>

            {/* Добавляем кнопки "Вход" и "Регистрация" */}
            {user ? (
              <></>
            ) : (
              <div className="d-flex justify-content-center mt-4">
                <Button
                  onClick={() => navigate("/login")}
                  style={{
                    backgroundColor: "#ffcc80", // теплый персиковый
                    border: "none",
                    color: "#4e342e",
                    fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
                    fontSize: "1.2rem",
                    padding: "0.6rem 1.8rem",
                    borderRadius: "12px",
                    boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
                    marginRight: "1rem",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.transform =
                      "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.transform =
                      "scale(1)";
                  }}
                >
                  Вход
                </Button>

                <Button
                  onClick={() => navigate("/register")}
                  style={{
                    backgroundColor: "#a5d6a7", // мягкий зелёный
                    border: "none",
                    color: "#1b5e20",
                    fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
                    fontSize: "1.2rem",
                    padding: "0.6rem 1.8rem",
                    borderRadius: "12px",
                    boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLButtonElement).style.transform =
                      "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLButtonElement).style.transform =
                      "scale(1)";
                  }}
                >
                  Регистрация
                </Button>
              </div>
            )}
          </Card.Body>
        </motion.div>
      </motion.div>
    </Container>
  );
}
