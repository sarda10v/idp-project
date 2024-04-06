export interface ITodo {
  date: string | number | Date;
  _id: string;
  todo: string;
  favorite: boolean;
}

export interface ITodosState {
  todos: ITodo[];
  loading: boolean;
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