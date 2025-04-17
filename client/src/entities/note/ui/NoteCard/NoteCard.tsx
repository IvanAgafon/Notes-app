import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { NoteT } from "../../model/types";
import { useAppDispatch } from "../../../../shared/lib/hooks";
import { deleteNote } from "../../model/noteThunks";
import { openEditNoteModal } from "../../model/noteSlice";
import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

type Props = {
  note: NoteT;
};

export default function NoteCard({ note }: Props): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((prev) => !prev);

  const deleteHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    void dispatch(deleteNote(note.id));
  };

  const editHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openEditNoteModal(note.id));
  };

  return (
    <motion.div
      layout
      onClick={toggleExpand}
      style={{
        width: "16rem",
        backgroundColor: "#78DBE2",
        borderRadius: "12px",
        boxShadow: "4px 4px 10px rgba(0,0,0,0.1)",
        transform: "rotate(-1deg)",
        fontFamily: "'Comic Sans MS', 'Patrick Hand', cursive",
        padding: "1rem",
        margin: "1rem",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column", // Используем flexbox для расположения элементов
        height: expanded ? "auto" : "14rem", // динамическая высота
        transition: "transform 0.3s ease, box-shadow 0.3s ease", // Плавный переход для анимации
      }}
      whileHover={{
        scale: 1.05, // Увеличиваем размер при наведении
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)", // Добавляем более выраженную тень
      }}
      transition={{ layout: { duration: 0.4, type: "spring" } }}
    >
      <motion.h5 layout>{note.title}</motion.h5>

      {/* Контейнер для текста */}
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flexGrow: 1, // текст будет занимать всё пространство
          overflow: "hidden", // скрываем текст, который выходит за пределы
        }}
      >
        <motion.p
          layout
          style={{
            whiteSpace: "pre-wrap", // Поддержка переноса строк
            textOverflow: "ellipsis",
            maxHeight: expanded ? "100%" : "6rem", // Ограничиваем высоту текста
            overflowY: "auto", // Добавляем прокрутку
            marginBottom: "1rem", // Отступ для кнопок
          }}
        >
          {note.content}
        </motion.p>
      </motion.div>

      {/* Кнопки Edit и Delete — всегда видны */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
        }}
      >
        <Button
          size="sm"
          onClick={editHandler}
          style={{
            backgroundColor: "#81d4fa",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            padding: "0.3rem 1rem",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <FaEdit />
          Edit
        </Button>

        <Button
          size="sm"
          onClick={deleteHandler}
          style={{
            backgroundColor: "#ef9a9a",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            padding: "0.3rem 1rem",
            fontFamily: "'Patrick Hand', 'Comic Sans MS', cursive",
            boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <FaTrash />
          Delete
        </Button>
      </div>
    </motion.div>
  );
}
