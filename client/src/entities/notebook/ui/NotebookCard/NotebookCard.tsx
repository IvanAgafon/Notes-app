import React from "react";
import { Button, Card } from "react-bootstrap";
import { NotebookT } from "../../model/types";
import { useAppDispatch } from "../../../../shared/lib/hooks";
import { deleteNotebook } from "../../model/notebookThunks";
import { openEditModal, openNotebookDetails } from "../../model/notebookSlice";
import { FaEdit, FaFolderOpen, FaTrash } from "react-icons/fa";

type Props = {
  notebook: NotebookT;
};

export default function NotebookCard({ notebook }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    void dispatch(deleteNotebook(notebook.id));
  };

  return (
    <Card
      style={{
        width: "16rem",
        height: "14rem",
        backgroundColor: "#fff58f",
        borderRadius: "12px",
        boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
        transform: "rotate(-1deg)",
        fontFamily: "'Comic Sans MS', 'Patrick Hand', cursive",
        padding: "1rem",
        margin: "1rem",
        position: "relative",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          "scale(1.03) rotate(-1deg)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "rotate(-1deg)";
      }}
    >
      <Card.Body style={{ height: "100%", paddingBottom: "2.5rem" }}>
        <Card.Title style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {notebook.name}
        </Card.Title>
      </Card.Body>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          right: "10px",
          display: "flex",
          justifyContent: "space-between",
          gap: "0.4rem", // небольшой отступ между кнопками
        }}
      >
        <Button
          onClick={() => dispatch(openNotebookDetails(notebook.id))}
          style={{
            backgroundColor: "#81d4fa",
            border: "none",
            color: "#01579b",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            fontSize: "0.85rem",
            padding: "0.3rem 0.6rem",
            borderRadius: "6px",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
            transition: "all 0.2s ease-in-out",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.transform = "scale(1)")
          }
        >
          <FaFolderOpen size={14} />
          Open
        </Button>

        <Button
          onClick={() => dispatch(openEditModal(notebook.id))}
          style={{
            backgroundColor: "#ffd54f",
            border: "none",
            color: "#ff6f00",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            fontSize: "0.85rem",
            padding: "0.3rem 0.6rem",
            borderRadius: "6px",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
            transition: "all 0.2s ease-in-out",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.transform = "scale(1)")
          }
        >
          <FaEdit size={14} />
          Edit
        </Button>

        <Button
          onClick={deleteHandler}
          style={{
            backgroundColor: "#ef9a9a",
            border: "none",
            color: "#b71c1c",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            fontSize: "0.85rem",
            padding: "0.3rem 0.6rem",
            borderRadius: "6px",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
            transition: "all 0.2s ease-in-out",
            display: "flex",
            alignItems: "center",
            gap: "0.3rem",
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.transform = "scale(1)")
          }
        >
          <FaTrash size={14} />
          Delete
        </Button>
      </div>
    </Card>
  );
}
