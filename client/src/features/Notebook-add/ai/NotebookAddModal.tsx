import React from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { newNotebookSchema } from "../../../entities/notebook/model/schema";
import { postNotebook } from "../../../entities/notebook/model/notebookThunks";
import { closeAddModal } from "../../../entities/notebook/model/notebookSlice";

export default function NotebookAddModal(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.notebooks.isAddModalOpen);

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const validateData = newNotebookSchema.parse(data);
    void dispatch(postNotebook(validateData));
    void dispatch(closeAddModal());
  };

  return (
    <Modal
      show={open}
      onHide={() => dispatch(closeAddModal())}
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
          📒 Новый блокнот
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={submitHandler}>
        <Modal.Body
          style={{
            backgroundColor: "#fffde7",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            fontSize: "1.2rem",
          }}
        >
          <Form.Group controlId="notebookName">
            <Form.Label>Название блокнота</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Введите название"
              required
              style={{
                borderRadius: "10px",
                border: "2px dashed #fbc02d",
                padding: "0.5rem 1rem",
                backgroundColor: "#fffde7",
                fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
              }}
            />
          </Form.Group>
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
            variant="secondary"
            onClick={() => dispatch(closeAddModal())}
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
            type="submit"
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
            Добавить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
