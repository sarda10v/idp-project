import Stub from "../Stub/Stub";
import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { useTooltip } from "../../hooks";
import Skeleton from "../Skeleton/Skeleton";
import { AppDispatch } from "../../app/store";
import { IAppState, ITodo } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Checkbox, T, Tag, TextInput } from "@admiral-ds/react-ui";
import {
  editTodoStatus,
  editTodoText,
  fetchTodos,
  removeTodo,
} from "../../features/todosSlice";
import { formatDateAndTimeToRussian } from "../../utils/formatDate";
import {
  BtnWrapper,
  ButtonBox,
  Container,
  EditFormBox,
  Icon,
  Tags,
  TagsBox,
  TextTodo,
  TextViewBox,
  Wrapper,
} from "./Todo.style";
import DeleteOutline from "@admiral-ds/icons/build/system/DeleteOutline.svg";
import EditOutline from "@admiral-ds/icons/build/system/EditOutline.svg";
import CheckOutline from "@admiral-ds/icons/build/service/CheckOutline.svg";
import EditSolid from "@admiral-ds/icons/build/system/EditSolid.svg";
import LinkOutline from "@admiral-ds/icons/build/system/LinkOutline.svg";

const Todo: React.FC = () => {
  const { todos, loading, error } = useSelector(
    (state: IAppState) => state.todos
  );
  const [editTodoId, setEditTodoId] = React.useState<string | null>(null);
  const [editText, setEditText] = React.useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const [parent] = useAutoAnimate();

  const { Tooltip: TooltipDelete, tooltipTargetRef: tooltipDeleteRef } =
    useTooltip({
      renderContent: () => "Удалить",
    });
  const { Tooltip: TooltipEdit, tooltipTargetRef: tooltipEditRef } = useTooltip(
    {
      renderContent: () => "Редактировать",
    }
  );
  const { Tooltip: TooltipSave, tooltipTargetRef: tooltipSaveRef } = useTooltip(
    {
      renderContent: () => "Сохранить",
    }
  );
  const { Tooltip: TooltipCopy, tooltipTargetRef: tooltipCopyRef } = useTooltip(
    {
      renderContent: () => "Копировать",
    }
  );

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
    toast.warning("Задача на редактировании!");
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

  const handleCopyTodo = async (todoText: string) => {
    try {
      await navigator.clipboard.writeText(todoText);
      toast.success("Текст задачи скопирован!");
    } catch (err) {
      toast.error("Ошибка при копировании текста!");
      console.error("Ошибка при копировании: ", err);
    }
  };

  //  type guards
  if (typeof error === "string") {
    toast.error(error);
  }

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
              {!loading ? (
                <TagsBox>
                  <Tags>
                    <Checkbox
                      dimension="s"
                      checked={item.favorite}
                      onChange={() => handleChecked(item)}
                    />
                    <Tag kind={"warning"}>TASK-{index + 1}</Tag>
                    <Tag kind="neutral">{formattedDate}</Tag>
                    <T font="Body/Body 2 Long" skeleton={loading}>
                      <Tag
                        statusViaBackground
                        kind={item.favorite ? "success" : "neutral"}
                      >
                        {item.favorite ? "Выполнено" : "Создано"}
                      </Tag>
                    </T>
                  </Tags>
                  <ButtonBox>
                    <BtnWrapper
                      ref={tooltipCopyRef}
                      onClick={() => handleCopyTodo(item.todo)}
                    >
                      <Icon src={LinkOutline} alt="CopyIcon" />
                      <TooltipCopy />
                    </BtnWrapper>
                    <BtnWrapper
                      onClick={() => handleEditClick(item)}
                      ref={tooltipEditRef}
                      disabled={editTodoId === item._id}
                    >
                      <Icon
                        src={editTodoId === item._id ? EditSolid : EditOutline}
                        alt="EditIcon"
                      />
                      <TooltipEdit />
                    </BtnWrapper>
                    <BtnWrapper
                      ref={tooltipDeleteRef}
                      onClick={() => handleRemoveTodo(item._id)}
                    >
                      <Icon src={DeleteOutline} alt="DeleteIcon" />
                      <TooltipDelete />
                    </BtnWrapper>
                  </ButtonBox>
                </TagsBox>
              ) : (
                <Skeleton />
              )}
              {editTodoId === item._id ? (
                <EditFormBox>
                  <TextInput
                    style={{ width: "100%" }}
                    displayClearIcon
                    placeholder="Введите название задачи"
                    dimension="s"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <BtnWrapper
                    ref={tooltipSaveRef}
                    onClick={() => handleSaveEdit(item)}
                  >
                    <Icon src={CheckOutline} alt="SaveIcon" />
                    <TooltipSave />
                  </BtnWrapper>
                </EditFormBox>
              ) : (
                <TextViewBox>
                  <TextTodo $font="Subtitle/Subtitle 2" skeleton={loading}>
                    {item.todo}
                  </TextTodo>
                </TextViewBox>
              )}
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
