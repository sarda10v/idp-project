import { Form } from "./components/Form/Form";
import { ToastContainer } from "react-toastify";
import { StyleMainContainer, StyleWrapper } from "./App.style";
import "react-toastify/dist/ReactToastify.css";

export const App: React.FC = () => {
  return (
    <StyleMainContainer>
      <StyleWrapper>
        <Form />
      </StyleWrapper>
      <ToastContainer />
    </StyleMainContainer>
  );
};
