import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editTodo, fetchTodos, removeTodo } from "../../features/todosSlice";
import { AppDispatch } from "../../app/store";
import { Container, DeleteIcon, Row, StyleList } from "./Todo.style";
import { Button, Checkbox, Tag } from "@admiral-ds/react-ui";
import { format } from "date-fns";
import DeleteOutline from "@admiral-ds/icons/build/system/DeleteOutline.svg";
import { ITodo } from "../../features/types";

const Todo: React.FC = () => {
  const todos = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const dispatch: AppDispatch = useDispatch();

  const handleRemoveTodo = (_id: string) => {
    dispatch(removeTodo(_id));
  };
  const handleChecked = (item: ITodo) => {
    dispatch(editTodo(item));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <ul>
      {todos.map((item: ITodo, index: string) => {
        const formattedDate = format(new Date(item.date), "dd.MM.yyyy");
        return (
          <Container key={index}>
            <Row>
              <Checkbox
                dimension="s"
                checked={item.favorite}
                onChange={() => handleChecked(item)}
              />
              <StyleList font="Body/Body 2 Long" skeleton={loading}>
                {item.todo}
              </StyleList>
              <Tag statusViaBackground kind={item.favorite ? "success" : ""}>
                {item.favorite ? "Выполнено" : "Создано"}
              </Tag>
              <span>{formattedDate}</span>
              <Button
                dimension="s"
                displayAsSquare
                appearance="ghost"
                onClick={() => handleRemoveTodo(item._id)}
              >
                <DeleteIcon src={DeleteOutline} alt="DeleteIcon" />
              </Button>
            </Row>
          </Container>
        );
      })}
    </ul>
  );
};

export default Todo;
