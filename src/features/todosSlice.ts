import { BASE_URL } from "./constants";
import {
  AddTodoType,
  EditTodoTextParams,
  ErrorResponseType,
  ITodo,
  ITodosState,
} from "../types/types";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

/* Первый параметр <ITodo[]> указывает тип результата успешного выполнения Thunk-функции. 
 Второй параметр <void> указывает тип входного параметра для Thunk-функции.
 Третий параметр { rejectValue: ErrorResponseType } указывает объект опций для createAsyncThunk. 
 rejectValue позволяет определить тип значения, передаваемого в rejectWithValue в случае возникновения ошибки при выполнении асинхронной операции. 
 Здесь ErrorResponseType представляет тип данных, описывающих ошибку, которую может вернуть операция удаления задачи. 
 Это позволяет типизировать rejectWithValue таким образом, что она принимает значение, соответствующее типу ErrorResponseType. */

export const fetchTodos = createAsyncThunk<
  ITodo[],
  void,
  { rejectValue: ErrorResponseType }
>("todos/fetch", async (_, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/todos`);
    return await res.json();
  } catch (err) {
    console.error(`Ошибка при загрузке данных: ${err}`);
    return thunkAPI.rejectWithValue(`Ошибка при загрузке данных: ${err}`);
  }
});

export const removeTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: ErrorResponseType }
>("todo/remove", async (id, thunkAPI) => {
  try {
    await fetch(`${BASE_URL}/todos/${id}`, {
      method: "DELETE",
    });
    return id;
  } catch (err) {
    console.error(`Ошибка при удалении данных: ${err}`);
    return thunkAPI.rejectWithValue(`Ошибка при удалении данных: ${err}`);
  }
});

export const editTodoStatus = createAsyncThunk<
  ITodo,
  ITodo,
  { rejectValue: ErrorResponseType }
>("todo/edit", async (item, thunkAPI) => {
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
    return thunkAPI.rejectWithValue(`Ошибка при редактировании данных: ${err}`);
  }
});

export const editTodoText = createAsyncThunk<
  ITodo,
  EditTodoTextParams,
  { rejectValue: ErrorResponseType }
>("todo/editText", async ({ item, editText }, thunkAPI) => {
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
    return thunkAPI.rejectWithValue(
      `Ошибка при редактировании текста задачи: ${err}`
    );
  }
});

export const addNewTodo = createAsyncThunk<
  ITodo,
  AddTodoType,
  { rejectValue: ErrorResponseType }
>("todo/add", async (text, thunkAPI) => {
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
    return thunkAPI.rejectWithValue(`Ошибка при добавлении данных: ${err}`);
  }
});

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
      // !! GET_TODOS
      .addCase(
        fetchTodos.fulfilled,
        (state, action: PayloadAction<ITodo[]>) => {
          state.todos = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // !! REMOVE_TODO
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter((item: ITodo) => {
          return item._id !== action.payload;
        });
        state.loading = false;
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // !! ADD_TODO
      .addCase(addNewTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
        state.todos.unshift(action.payload);
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // !! EDIT_STATUS_TODO
      .addCase(
        editTodoStatus.fulfilled,
        (state, action: PayloadAction<ITodo>) => {
          state.todos = state.todos.map((item: ITodo) => {
            if (item._id === action.payload._id) {
              return action.payload;
            }
            return item;
          });
          state.loading = false;
        }
      )
      .addCase(editTodoStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodoStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // !! EDIT_TEXT_TODO
      .addCase(
        editTodoText.fulfilled,
        (state, action: PayloadAction<ITodo>) => {
          state.todos = state.todos.map((item: ITodo) => {
            if (item._id === action.payload._id) {
              return action.payload;
            }
            return item;
          });
          state.loading = false;
        }
      )
      .addCase(editTodoText.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodoText.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default todosSlice.reducer;
