import { Todos } from "./components/Todos/Todos";
import { ToastContainer } from "react-toastify";
import { StyleMainContainer } from "./App.style";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./components/Todo/Todo";

export const App: React.FC = () => {
  return (
    <StyleMainContainer>
      <Todos />
      <Todo />
      <ToastContainer />
    </StyleMainContainer>
  );
};
