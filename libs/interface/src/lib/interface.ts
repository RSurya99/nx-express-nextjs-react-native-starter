export type TTodo = {
  id: string;
  title: string;
  status: boolean;
}

export type TTodoContext = {
  todos: TTodo[];
  getTodos: () => void,
  createTodo: (payload: { title: string }) => void,
  updateTodo: (id: string, payload: TTodo) => void,
  deleteTodo: (id: string) => void,
}
