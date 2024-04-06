import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EditTodoTextParams, ITodo, ITodosState } from "../types/types";
import { BASE_URL } from "./constants";

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/todos`);
      console.log(res, "res");

      return await res.json();
    } catch (err) {
      console.error(`Ошибка при загрузке данных: ${err}`);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todo/remove",
  async (id: string, thunkAPI) => {
    try {
      await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (err) {
      console.error(`Ошибка при удалении данных: ${err}`);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const editTodoStatus = createAsyncThunk(
  "todo/edit",
  async (item: ITodo, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/todos/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ favorite: !item.favorite }),
      });
      return res.json();
    } catch (err) {
      console.error(`Ошибка при редактировании данных: ${err}`);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const editTodoText = createAsyncThunk<ITodo, EditTodoTextParams>(
  "todo/editText",
  async ({ item, editText }, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/todos/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: editText }),
      });
      return res.json();
    } catch (err) {
      console.error(`Ошибка при редактировании текста задачи: ${err}`);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todo/add",
  async (text: string, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo: text, favorite: false }),
      });
      const data = await res.json();
      return thunkAPI.fulfillWithValue(data);
    } catch (err) {
      console.error(`Ошибка при добавлении данных: ${err}`);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState: ITodosState = {
  todos: [],
  loading: false,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item: ITodo) => {
          return item._id !== action.payload;
        });
        state.loading = false;
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodoStatus.fulfilled, (state, action) => {
        state.todos = state.todos.map((item: ITodo) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
        state.loading = false;
      })
      .addCase(editTodoStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.loading = true;
      })

      .addCase(editTodoText.fulfilled, (state, action) => {
        state.todos = state.todos.map((item: ITodo) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
        state.loading = false;
      })
      .addCase(editTodoText.pending, (state) => {
        state.loading = true;
      });
  },
});

export default todosSlice.reducer;
