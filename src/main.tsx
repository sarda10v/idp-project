import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import {
  LIGHT_THEME,
  FontsVTBGroup,
  DropdownProvider,
  // DARK_THEME,
} from "@admiral-ds/react-ui";
import { App } from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={LIGHT_THEME}>
        <DropdownProvider>
          <FontsVTBGroup />
          <App />
        </DropdownProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
