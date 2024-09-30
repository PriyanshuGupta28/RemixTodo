import { Todo } from "~/models/todo.model";

export async function getAllTodos() {
  return await Todo.find().sort({ createdAt: -1 });
}

export async function createTodo(data: {
  title: string;
  desc: string;
  status: string;
}) {
  const todo = new Todo(data);
  return await todo.save();
}

export async function updateTodo(
  id: string,
  data: { title: string; desc: string; status: string }
) {
  return await Todo.findByIdAndUpdate(id, data, { new: true });
}

export async function deleteTodoById(id: string) {
  return await Todo.findByIdAndDelete(id);
}
