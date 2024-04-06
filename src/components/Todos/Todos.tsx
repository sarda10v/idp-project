import { Button, TextInput } from "@admiral-ds/react-ui";
import { toast } from "react-toastify";
import { StyleFormWrapper } from "./Todos.style";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo } from "../../features/todosSlice";
import { handleAddEnter } from "../../utils/keyHandlers";
import { AppDispatch } from "../../app/store";

export const Todos: React.FC = () => {
  const [text, setText] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      toast.success("Задача добавлена!");
      setText("");
    } else {
      toast.error("Задача не может быть пустой!");
    }
  };

  return (
    <StyleFormWrapper>
      <TextInput
        value={text}
        placeholder={"Введите текст"}
        onChange={(event) => setText(event.target.value)}
        onKeyPress={(event) => handleAddEnter(event, handleAddTodo)}
        displayClearIcon={true}
      />
      <Button dimension="m" onClick={handleAddTodo}>
        Добавить
      </Button>
    </StyleFormWrapper>
  );
};
