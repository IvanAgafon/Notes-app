import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { updateNote } from "../../../entities/note/model/noteThunks";
import { closeEditNoteModal } from "../../../entities/note/model/noteSlice";

export default function NoteEditModal() {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.notes.isNoteEditModalOpen);
  const selectedNoteId = useAppSelector((state) => state.notes.selectedNoteId);

  const note = useAppSelector((state) =>
    state.notes.notes.find((note) => note.id === selectedNoteId)
  );

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = async () => {
    if (!note) return;
    await dispatch(updateNote({ id: note.id, title, content }));
    dispatch(closeEditNoteModal());
  };

  return (
    <Modal show={show} onHide={() => dispatch(closeEditNoteModal())} centered>
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#fff9c4",
          fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
          borderBottom: "none",
        }}
      >
        <Modal.Title style={{ color: "#f57f17", fontSize: "1.8rem" }}>
          🖊️ Редактировать заметку
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
              style={{
                borderRadius: "10px",
                boxShadow: "inset 2px 2px 5px #e0e0e0",
              }}
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
          onClick={() => dispatch(closeEditNoteModal())}
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
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
