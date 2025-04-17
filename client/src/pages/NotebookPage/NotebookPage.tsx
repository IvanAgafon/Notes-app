import React from "react";
import { Container } from "react-bootstrap";
import NotebookList from "../../widgets/notebook-list/ui/NotebookList";

export default function NotebookPage(): React.JSX.Element {
  return (
    <Container>
      <NotebookList />
    </Container>
  );
}
