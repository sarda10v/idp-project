import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:4000/todos");
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
      await fetch(`http://localhost:4000/todos/${id}`, {
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
      const res = await fetch(`http://localhost:4000/todos/${item}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ favorite: !item.favorite }),
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
      const res = await fetch("http://localhost:4000/todos", {
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

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state: any, action: any) => {
        state.todos = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.rejected, (state: any, action: any) => {
        state.error = action.payload.message;
        state.loading = false;
      })

      .addCase(removeTodo.fulfilled, (state: any, action: any) => {
        state.todos = state.todos.filter((item: any) => {
          return item._id !== action.payload;
        });
        state.loading = false;
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTodo.rejected, (state: any, action: any) => {
        state.error = action.payload.message;
        state.loading = false;
      })

      .addCase(editTodo.fulfilled, (state: any, action: any) => {
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
      .addCase(editTodo.rejected, (state: any, action: any) => {
        state.error = action.payload.message;
        state.loading = false;
      })

      .addCase(addNewTodo.fulfilled, (state: any, action: any) => {
        state.todos.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTodo.rejected, (state: any, action: any) => {
        state.error = action.payload.message;
        state.loading = false;
      });
  },
});

export default todosSlice.reducer;
