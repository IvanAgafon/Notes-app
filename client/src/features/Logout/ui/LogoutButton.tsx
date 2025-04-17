import React from "react";
import { useAppDispatch } from "../../../shared/lib/hooks";
import { Button } from "react-bootstrap";
import { logout } from "../../../entities/user/model/userThunks";
import { useNavigate } from "react-router";

export default function LogoutButton(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Button
      variant="danger"
      onClick={logoutHandler}
      style={{
        backgroundColor: "#d84315", // Темный оранжевый цвет
        border: "none",
        borderRadius: "12px",
        padding: "0.5rem 1.8rem", // Уменьшена ширина кнопки
        fontSize: "1.1rem",
        boxShadow: "3px 3px 6px rgba(0,0,0,0.1)",
        fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive", // Тот же шрифт
      }}
    >
      🚪 Выйти
    </Button>
  );
}
