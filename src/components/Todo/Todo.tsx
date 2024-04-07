import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, ITodo } from "../../types/types";
import { Container, Icon, TextTodo, Wrapper } from "./Todo.style";
import { formatDateAndTimeToRussian } from "../../utils/formatDate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Checkbox, T, Tag, TextInput } from "@admiral-ds/react-ui";
import {
  editTodoStatus,
  editTodoText,
  fetchTodos,
  removeTodo,
} from "../../features/todosSlice";

import DeleteOutline from "@admiral-ds/icons/build/system/DeleteOutline.svg";
import EditOutline from "@admiral-ds/icons/build/system/EditOutline.svg";
import CheckOutline from "@admiral-ds/icons/build/service/CheckOutline.svg";
import Stub from "../Stub/Stub";

const Todo: React.FC = () => {
  const { todos, loading } = useSelector((state: IAppState) => state.todos);
  const [editTodoId, setEditTodoId] = React.useState<string | null>(null);
  const [editText, setEditText] = React.useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const [parent] = useAutoAnimate();

  const handleRemoveTodo = (_id: string) => {
    toast.success("Задача удалена!");
    dispatch(removeTodo(_id));
  };

  const handleChecked = (item: ITodo) => {
    toast.info("Задача обновлена!");
    dispatch(editTodoStatus(item));
  };

  const handleEditClick = (item: ITodo) => {
    setEditTodoId(item._id);
    setEditText(item.todo);
  };

  const handleSaveEdit = (item: ITodo) => {
    if (editText.trim()) {
      dispatch(editTodoText({ item, editText }));
      toast.success("Заголовок обновлен!");
      setEditTodoId(null);
      setEditText("");
    } else {
      toast.error("Заголовок не может быть пустым!");
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <Wrapper ref={parent}>
      {todos.length ? (
        todos.map((item, index) => {
          const formattedDate = formatDateAndTimeToRussian(item.date);
          return (
            <Container key={index}>
              <Checkbox
                dimension="s"
                checked={item.favorite}
                onChange={() => handleChecked(item)}
                disabled={loading}
              />
              <Tag kind={"warning"}>TASK-{index + 1}</Tag>
              {editTodoId === item._id ? (
                <>
                  <TextInput
                    displayClearIcon
                    placeholder="Введите название задачи"
                    dimension="s"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <Icon
                    src={CheckOutline}
                    alt="SaveIcon"
                    onClick={() => handleSaveEdit(item)}
                  />
                </>
              ) : (
                <TextTodo font="Subtitle/Subtitle 2" skeleton={loading}>
                  {item.todo}
                </TextTodo>
              )}
              <T font="Body/Body 2 Long" skeleton={loading}>
                {!loading ? (
                  <Tag
                    statusViaBackground
                    kind={item.favorite ? "success" : "neutral"}
                  >
                    {item.favorite ? "Выполнено" : "Создано"}
                  </Tag>
                ) : null}
              </T>
              <Tag kind="neutral">{formattedDate}</Tag>
              <Icon
                src={DeleteOutline}
                alt="DeleteIcon"
                onClick={() => handleRemoveTodo(item._id)}
              />
              <Icon
                src={EditOutline}
                alt="EditIcon"
                onClick={() => handleEditClick(item)}
              />
            </Container>
          );
        })
      ) : (
        <Stub />
      )}
    </Wrapper>
  );
};

export default Todo;
