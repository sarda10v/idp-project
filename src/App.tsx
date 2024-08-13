import { Todos } from "./components/Todos/Todos";
import { ToastContainer } from "react-toastify";
import { StyleMainContainer } from "./App.style";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./components/Todo/Todo";
import Header from "./components/Header/Header";

export const App: React.FC = () => {
  return (
    <StyleMainContainer>
      <Header />
      <Todos />
      <Todo />
      <ToastContainer position="bottom-right" />
    </StyleMainContainer>
  );
};
