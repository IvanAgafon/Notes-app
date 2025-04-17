import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import NoteCard from "../../../entities/note/ui/NoteCard/NoteCard";
import { fetchNotes } from "../../../entities/note/model/noteThunks";
import NoteAddModal from "../../../features/NoteAddModal/ai/NoteAddModal";
import NoteEditModal from "../../../features/Note-edit-modal/ui/NoteEditModal";

export default function NoteList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const notes = useAppSelector((state) => state.notes.notes);
  const notebookId = useAppSelector(
    (state) => state.notebooks.selectedNotebookId
  );

  useEffect(() => {
    void dispatch(fetchNotes());
  }, [dispatch]);

  const filteredNotes = notes.filter((note) => note.notebookId === notebookId);

  return (
    <Container className="mt-4">
      <Row className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id} xs={12} md={6} lg={4}>
            <NoteCard note={note} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="warning"
          onClick={() => setIsAddModalOpen(true)}
          style={{
            borderRadius: "14px",
            padding: "0.5rem 2rem",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            fontSize: "1.1rem",
            boxShadow: "3px 3px 6px rgba(0,0,0,0.1)",
          }}
        >
          📝 Добавить заметку
        </Button>
      </div>

      <NoteAddModal
        show={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <NoteEditModal />
    </Container>
  );
}
