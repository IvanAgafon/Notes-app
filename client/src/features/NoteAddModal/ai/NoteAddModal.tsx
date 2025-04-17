import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { postNote } from "../../../entities/note/model/noteThunks";

export default function NoteAddModal({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const dispatch = useAppDispatch();
  const notebookId = useAppSelector(
    (state) => state.notebooks.selectedNotebookId
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
    if (!notebookId) return;
    await dispatch(postNote({ title, content, notebookId }));
    onClose();
    setTitle("");
    setContent("");
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#fff9c4",
          fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
          borderBottom: "none",
        }}
      >
        <Modal.Title style={{ color: "#f57f17", fontSize: "1.8rem" }}>
          ✏️ Добавить заметку
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: "#fffde7",
          fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
        }}
      >
        <Form>
          <Form.Group controlId="noteTitle">
            <Form.Label style={{ fontSize: "1.1rem" }}>Заголовок</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ borderRadius: "10px", boxShadow: "inset 2px 2px 5px #e0e0e0" }}
            />
          </Form.Group>

          <Form.Group controlId="noteContent" className="mt-3">
            <Form.Label style={{ fontSize: "1.1rem" }}>Содержание</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                borderRadius: "10px",
                resize: "none",
                boxShadow: "inset 2px 2px 5px #e0e0e0",
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: "#fff9c4",
          borderTop: "none",
        }}
      >
        <Button
          variant="secondary"
          onClick={onClose}
          style={{
            backgroundColor: "#e0e0e0",
            border: "none",
            color: "#424242",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            padding: "0.4rem 1.2rem",
            borderRadius: "10px",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Отмена
        </Button>

        <Button
          variant="success"
          onClick={handleSubmit}
          style={{
            backgroundColor: "#81c784",
            border: "none",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            padding: "0.4rem 1.2rem",
            borderRadius: "10px",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
