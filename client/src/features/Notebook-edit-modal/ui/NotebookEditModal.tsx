import { Modal, Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { updateNotebook } from "../../../entities/notebook/model/notebookThunks";
import { useEffect, useState } from "react";
import { closeEditModal } from "../../../entities/notebook/model/notebookSlice";

export default function NotebookEditModal(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const show = useAppSelector((state) => state.notebooks.isEditModalOpen);
  const notebookId = useAppSelector(
    (state) => state.notebooks.selectedNotebookId
  );

  const notebook = useAppSelector((state) =>
    state.notebooks.notebooks.find((notebook) => notebook.id === notebookId)
  );

  const [name, setName] = useState("");

  useEffect(() => {
    if (notebook) {
      setName(notebook.name);
    }
  }, [notebook]);

  const handleEdit = () => {
    if (notebookId !== null) {
      void dispatch(updateNotebook({ id: notebookId, name }));
      void dispatch(closeEditModal());
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => dispatch(closeEditModal())}
      centered
      backdrop="static"
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#fff9c4",
          fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
          borderBottom: "none",
        }}
      >
        <Modal.Title style={{ fontSize: "1.8rem", color: "#f57f17" }}>
          ✏️ Редактировать блокнот
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          backgroundColor: "#fffde7",
          fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
          fontSize: "1.2rem",
        }}
      >
        <Form>
          <Form.Group controlId="notebookName">
            <Form.Label>Название блокнота</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название"
              style={{
                borderRadius: "10px",
                border: "2px dashed #fbc02d",
                padding: "0.5rem 1rem",
                backgroundColor: "#fffde7",
                fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: "#fff9c4",
          borderTop: "none",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          onClick={() => dispatch(closeEditModal())}
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
          onClick={handleEdit}
          disabled={!name.trim()}
          style={{
            backgroundColor: "#aed581",
            border: "none",
            color: "#33691e",
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
