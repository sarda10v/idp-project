import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ITodosState } from "./types";
import { BASE_URL } from "./constants";

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(`${BASE_URL}/todos`);
      console.log(res, "res");
      
      return await res.json();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const removeTodo = createAsyncThunk(
  "todo/remove",
  async (id, thunkAPI) => {
    try {
      await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
      });
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const editTodo = createAsyncThunk(
  "todo/edit",
  async (item, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  "todo/add",
  async (text, thunkAPI) => {
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
      return thunkAPI.rejectWithValue(err);
    }
  }
);

const initialState: ITodosState = {
  todos: [],
  loading: false,
  error: null,
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
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })

      .addCase(removeTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter((item: any) => {
          return item._id !== action.payload;
        });
        state.loading = false;
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })

      .addCase(editTodo.fulfilled, (state, action) => {
        state.todos = state.todos.map((item: any) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
        state.loading = false;
      })
      .addCase(editTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })

      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.todos.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      });
  },
});

export default todosSlice.reducer;