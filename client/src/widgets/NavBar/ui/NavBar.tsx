import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router";
import { useAppSelector } from "../../../shared/lib/hooks";
import LogoutButton from "../../../features/Logout/ui/LogoutButton";
import { FaBook, FaUser } from "react-icons/fa";

export default function NavBar(): React.JSX.Element {
  const userName = useAppSelector((state) => state.user.user?.name);

  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        {/* Логотип и кнопка "Мои блокноты" слева */}
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontFamily: "'Pacifico', 'Comic Sans MS', cursive",
            color: "#f57f17",
            letterSpacing: "2px",
            paddingTop: "0.5rem",
          }}
        >
          NOTES
        </Navbar.Brand>

        {userName && (
          <Nav.Link as={Link} to="/notebook" className="text-warning">
            <FaBook className="me-2" />
            Мои блокноты
          </Nav.Link>
        )}

        {/* Мобильный Тогглер */}
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {/* Элементы навигации справа */}
          <Nav className="ms-auto d-flex align-items-center gap-3">
            {userName !== undefined ? (
              <>
                <Navbar.Text className="text-white">
                  Привет, {userName}
                </Navbar.Text>
                <LogoutButton />
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="text-warning">
                  <FaUser className="me-2" />
                  Вход
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="text-warning">
                  <FaUser className="me-2" />
                  Регистрация
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
