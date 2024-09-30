import {
  LoaderFunction,
  ActionFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, useFetcher } from "@remix-run/react";
import { connectDB } from "~/db/mongo";

import { SetStateAction, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  createTodo,
  deleteTodoById,
  getAllTodos,
  updateTodo,
} from "~/services/todo.service";

export const loader: LoaderFunction = async () => {
  await connectDB();
  const todos = await getAllTodos();
  return json(todos);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const desc = formData.get("desc") as string;
  const status = formData.get("status") as string;
  const actionType = formData.get("_action") as string;

  await connectDB();

  try {
    if (actionType === "create") {
      await createTodo({ title, desc, status });
      return json({ message: "Todo created successfully" }, { status: 200 });
    } else if (actionType === "update") {
      await updateTodo(id, { title, desc, status });
      return json({ message: "Todo updated successfully" }, { status: 200 });
    } else if (actionType === "delete") {
      await deleteTodoById(id);
      return json({ message: "Todo deleted successfully" }, { status: 200 });
    }
  } catch (error) {
    toast.error("An error occurred during operation");
    return json({ message: "An error occurred" }, { status: 500 });
  }

  return redirect("/todos");
};

export default function TodoPage() {
  const todos = useLoaderData();
  const [status, setStatus] = useState("pending");
  const [isOpen, setIsOpen] = useState(false);
  const fetcher = useFetcher(); // Use this to detect form submission status
  const [selectedTodo, setSelectedTodo] = useState(null);
  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data) {
      toast.success(fetcher.data.message);
    }
  }, [fetcher.state, fetcher.data]);

  // Function to open modal and set selected todo
  const handleUpdateClick = (todo: SetStateAction<null>) => {
    setSelectedTodo(todo);
    setStatus(todo.status);
    setIsOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsOpen(false);
    setSelectedTodo(null); // Reset after closing modal
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {/* Create Todo Form */}
      <fetcher.Form method="post" className="space-y-4">
        <input type="hidden" name="id" />
        <input
          type="text"
          name="title"
          placeholder="Title"
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <textarea
          name="desc"
          placeholder="Description"
          className="w-full px-3 py-2 border rounded-lg"
        ></textarea>
        <select
          name="status"
          className="w-full px-3 py-2 border rounded-lg"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
        <button
          type="submit"
          name="_action"
          value="create"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Add Todo
        </button>
      </fetcher.Form>

      {/* Todo List Table */}
      <div className="mt-6 overflow-x-auto rounded-xl bg-zinc-900 text-zinc-200 px-6 shadow lg:px-4">
        <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2 md:gap-5">
          <thead className=" border-b lg:table-header-group">
            <tr>
              <td className="py-4 text-sm font-semibold text-zinc-200 sm:px-3 whitespace-nowrap">
                Created At
              </td>
              <td className="py-4 text-sm font-medium sm:px-3 whitespace-nowrap">
                ID
              </td>
              <td className="py-4 text-sm font-medium sm:px-3 whitespace-nowrap">
                Title
              </td>
              <td className="py-4 text-sm font-medium sm:px-3 whitespace-nowrap">
                Description
              </td>
              <td className="py-4 text-sm font-medium sm:px-3 whitespace-nowrap">
                Updated At
              </td>
              <td className="py-4 text-sm font-medium sm:px-3 whitespace-nowrap">
                Status
              </td>
              <td className="py-4 text-sm font-medium sm:px-3 whitespace-nowrap">
                Actions
              </td>
            </tr>
          </thead>
          <tbody className="bg-zinc-800 lg:border-zinc-200 text-zinc-200">
            {todos?.map((todo, index) => (
              <tr key={index}>
                <td className="py-4 text-sm sm:px-3">{todo?.createdAt}</td>
                <td className="py-4 text-sm sm:px-3">{index + 1}</td>
                <td className="py-4 text-sm sm:px-3">{todo?.title}</td>
                <td className="py-4 text-sm sm:px-3">{todo?.desc}</td>
                <td className="py-4 text-sm sm:px-3">{todo?.updatedAt}</td>
                <td className="py-4 text-sm sm:px-3">{todo?.status}</td>
                <td className="py-4 text-sm flex gap-3">
                  <button
                    type="button"
                    className="bg-gradient-to-r from-emerald-300 to-blue-500 px-4 py-2 text-white rounded-lg"
                    onClick={() => handleUpdateClick(todo)}
                  >
                    Update
                  </button>
                  <fetcher.Form method="post">
                    <input type="hidden" name="id" value={todo._id} />
                    <button
                      type="submit"
                      name="_action"
                      value="delete"
                      className="border border-zinc-100 px-4 py-2"
                    >
                      Delete
                    </button>
                  </fetcher.Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Update Todo */}
      {isOpen && selectedTodo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-zinc-800 rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Update Todo</h2>
            <fetcher.Form
              method="post"
              className="space-y-4"
              onSubmit={closeModal}
            >
              <input type="hidden" name="id" value={selectedTodo._id} />
              <input
                type="text"
                name="title"
                defaultValue={selectedTodo?.title}
                required
                className="w-full px-3 py-2 border rounded-lg text-zinc-900"
              />
              <textarea
                name="desc"
                defaultValue={selectedTodo?.desc}
                className="w-full px-3 py-2 border rounded-lg text-zinc-900"
              ></textarea>
              <select
                name="status"
                className="w-full px-3 py-2 border rounded-lg text-zinc-900"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
              </select>
              <button
                type="submit"
                name="_action"
                value="update"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-4"
                onClick={closeModal}
              >
                Cancel
              </button>
            </fetcher.Form>
          </div>
        </div>
      )}
    </div>
  );
}
