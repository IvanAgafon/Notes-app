import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NotebookCard from "../../../entities/notebook/ui/NotebookCard/NotebookCard";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { fetchNotebooks } from "../../../entities/notebook/model/notebookThunks";
import { openAddModal } from "../../../entities/notebook/model/notebookSlice";
import NotebookAddModal from "../../../features/Notebook-add/ai/NotebookAddModal";
import NotebookDetailsModal from "../../../features/Notebook-details/ai/NotebookDetailsModal";
import NotebookEditModal from "../../../features/Notebook-edit-modal/ui/NotebookEditModal";

export default function NotebookList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const notebooks = useAppSelector((store) => store.notebooks.notebooks);

  useEffect(() => {
    void dispatch(fetchNotebooks());
  }, [dispatch]);

  return (
    <Container className="mt-4">
      {/* Modals for adding, editing, and viewing notebooks */}
      <NotebookAddModal />
      <NotebookDetailsModal />
      <NotebookEditModal />

      {/* Header */}
      <h1
        className="text-center mb-4"
        style={{ fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive" }}
      >
        📚 Your Notebooks
      </h1>

      <Row className="g-3">
        {notebooks.map((notebook) => (
          <Col key={notebook.id} xs={12} sm={6} md={4} lg={3}>
            <NotebookCard notebook={notebook} />
          </Col>
        ))}
      </Row>

      {/* Add notebook button */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          onClick={() => dispatch(openAddModal())}
          variant="warning"
          style={{
            borderRadius: "14px",
            padding: "0.6rem 2.5rem",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            fontSize: "1.1rem",
            boxShadow: "3px 3px 6px rgba(0,0,0,0.1)",
          }}
        >
          ➕ Add New Notebook
        </Button>
      </div>
    </Container>
  );
}
