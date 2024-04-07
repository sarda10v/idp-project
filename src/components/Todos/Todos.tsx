import { Button, T } from "@admiral-ds/react-ui";
import { toast } from "react-toastify";
import {
  StyleFormWrapper,
  StyleInputWrapper,
  StyleTextInput,
} from "./Todos.style";
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
      <T font="Header/H4" as="h4">
        Todo-list
      </T>
      <StyleInputWrapper>
        <StyleTextInput
          dimension="s"
          value={text}
          placeholder={"Введите текст"}
          onChange={(event) => setText(event.target.value)}
          onKeyPress={(event) => handleAddEnter(event, handleAddTodo)}
          displayClearIcon={true}
        />
        <Button dimension="s" onClick={handleAddTodo}>
          Добавить
        </Button>
      </StyleInputWrapper>
    </StyleFormWrapper>
  );
};
