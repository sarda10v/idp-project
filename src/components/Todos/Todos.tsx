import { Button, T } from "@admiral-ds/react-ui";
import { toast } from "react-toastify";
import {
  StyleFormWrapper,
  StyleInputWrapper,
  StyleTextInput,
  TasksCount,
} from "./Todos.style";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo } from "../../features/todosSlice";
import { handleAddEnter } from "../../utils/keyHandlers";
import { AppDispatch } from "../../app/store";
import { IAppState } from "../../types/types";

export const Todos: React.FC = () => {
  const [text, setText] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const { todos } = useSelector((state: IAppState) => state.todos);

  const handleAddTodo = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      toast.success("Задача добавлена!");
      setText("");
    } else {
      toast.error("Поле не может быть пустым!");
    }
  };

  return (
    <StyleFormWrapper>
      <T font="Header/H4" as="h4">
        Todo-list
        <TasksCount>{todos.length}</TasksCount>
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
