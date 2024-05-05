export interface ITodo {
  date: DataType;
  _id: string;
  todo: string;
  favorite: boolean;
}

export interface ITodosState {
  todos: ITodo[];
  loading: boolean;
  error: ErrorResponseType;
}

export interface IFetchTodosResponse {
  todos: ITodo[];
}

export interface IAppState {
  todos: ITodosState;
}

export interface EditTodoTextParams {
  item: ITodo;
  editText: string;
}
export type DataType = string | number | Date;
export type ErrorResponseType = string | null | undefined;
export type AddTodoType = ITodo | string;
