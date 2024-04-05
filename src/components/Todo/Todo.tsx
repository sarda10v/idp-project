import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { AppDispatch } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { IAppState, ITodo } from "../../types/types";
import { Container, DeleteIcon, Row } from "./Todo.style";
import { formatDateToRussian } from "../../utils/formatDate";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Button, Checkbox, T, Tag } from "@admiral-ds/react-ui";
import { editTodo, fetchTodos, removeTodo } from "../../features/todosSlice";
import DeleteOutline from "@admiral-ds/icons/build/system/DeleteOutline.svg";

const Todo: React.FC = () => {
  const { todos, loading } = useSelector((state: IAppState) => state.todos);
  const dispatch: AppDispatch = useDispatch();
  const [parent] = useAutoAnimate();

  const handleRemoveTodo = (_id: string) => {
    toast.success("Задача удалена!");
    dispatch(removeTodo(_id));
  };

  const handleChecked = (item: ITodo) => {
    toast.info("Задача обновлена!");
    dispatch(editTodo(item));
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div ref={parent}>
      {todos.map((item, index) => {
        const formattedDate = formatDateToRussian(item.date);
        return (
          <Container key={index}>
            <Row>
              <T font="Body/Body 2 Long" skeleton={loading}>
                {index + 1}.
              </T>

              <T font="Body/Body 2 Long" skeleton={loading}>
                {item.todo}
              </T>
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
              <T font="Body/Body 2 Long" skeleton={loading}>
                {formattedDate}
              </T>
              <Checkbox
                dimension="s"
                checked={item.favorite}
                onChange={() => handleChecked(item)}
                disabled={loading}
              />
              <Button
                dimension="s"
                displayAsSquare
                appearance="ghost"
                onClick={() => handleRemoveTodo(item._id)}
                skeleton={loading}
              >
                <DeleteIcon src={DeleteOutline} alt="DeleteIcon" />
              </Button>
            </Row>
          </Container>
        );
      })}
    </div>
  );
};

export default Todo;
