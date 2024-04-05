export interface ITodo {
  _id: string;
  todo: string;
  favorite: boolean;
}

export interface ITodosState {
  todos: ITodo[];
  loading: boolean;
  error: string | null;
}
export interface FetchTodosResponse {
  todos: ITodo[];
}
