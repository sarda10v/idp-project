import { Button } from "@admiral-ds/react-ui";
import { toast } from "react-toastify";
import { Input } from "../Input/Input";

export const Form = () => {
  const notify = () => toast.success("Задача добавлена!");

  return (
    <>
      <Input />
      <Button dimension="m" onClick={notify}>
        Добавить
      </Button>
    </>
  );
};

