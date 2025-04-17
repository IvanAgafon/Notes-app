import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { closeNotebookDetails } from "../../../entities/notebook/model/notebookSlice";
import NoteList from "../../../widgets/note-list/ui/NoteList";

export default function NotebookDetailsModal(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const open = useAppSelector((state) => state.notebooks.isDetailsModalOpen);
  const notebookId = useAppSelector(
    (state) => state.notebooks.selectedNotebookId
  );
  const notebookName = useAppSelector((state) => state.notebooks.notebooks);

  const currentNotebook = notebookName.find(
    (notebook) => notebook.id === notebookId
  );

  return (
    <Modal
      show={open}
      onHide={() => dispatch(closeNotebookDetails())}
      size="xl"
      centered
      backdrop="static"
      scrollable
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#fff9c4",
          fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
          borderBottom: "none",
        }}
      >
        <Modal.Title
          style={{
            fontSize: "2rem",
            color: "#f57f17",
            fontWeight: "bold",
          }}
        >
          📚 Заметки блокнота: {currentNotebook?.name}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          minHeight: "70vh",
          backgroundColor: "#fffde7",
          fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
          fontSize: "1.2rem",
        }}
      >
        <NoteList />
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: "#fff9c4",
          borderTop: "none",
        }}
      >
        <Button
          variant="secondary"
          onClick={() => dispatch(closeNotebookDetails())}
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
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
