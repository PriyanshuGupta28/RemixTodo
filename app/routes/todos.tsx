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
import { Vortex } from "~/components/ui/vortex";
import { Button } from "~/components/ui/button";

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
  const [isAddOpen, setIsAddOpen] = useState(false); // New state for Add Todo modal
  const [selectedTodo, setSelectedTodo] = useState(null);
  useEffect(() => {
    if (fetcher.state === "submitting") {
      toast.loading("Processing...");
    } else if (fetcher.state === "idle" && fetcher.data) {
      toast.dismiss();
      if (fetcher.data.message) {
        toast.success(fetcher.data.message);
      }
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
  const closeAddModal = () => {
    setIsAddOpen(false);
  };

  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseHue={120}
      >
        <div className="container p-4">
          <h1 className="text-2xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent font-bold">
              Todo List
            </span>
          </h1>

          <div className="flex justify-end">
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-transparent text-white px-4 py-2 rounded-lg border border-zinc-100 hover:bg-zinc-500 hover:border-transparent transition duration-300 "
            >
              Add New Todo
            </button>
          </div>

          {/* Todo List Table */}
          <div className="mt-6 overflow-x-auto rounded-xl text-zinc-200  shadow lg:px-4">
            <table
              className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2 md:gap-5"
              style={{
                background: "rgba(28,30,39,0.5)",
                WebkitBackdropFilter: "blur(7px)",
                backdropFilter: "blur(5px)",
                border: "1px solid rgba(43,50,87,0.25)",
              }}
            >
              <thead className="border-b lg:table-header-group">
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
              <tbody className=" lg:border-zinc-200 text-zinc-200">
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
          {/* Add Todo Modal */}
          {isAddOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
              <div
                className="bg-zinc-800 rounded-lg p-6 w-96"
                style={{
                  background: "rgba(28,30,39,0.5)",
                  WebkitBackdropFilter: "blur(7px)",
                  backdropFilter: "blur(2px)",
                  border: "1px solid rgba(43,50,87,0.25)",
                }}
              >
                <h2 className="text-xl font-bold mb-4">Add New Todo</h2>
                <fetcher.Form
                  method="post"
                  className="space-y-4"
                  onSubmit={closeAddModal}
                >
                  <input type="hidden" name="id" />
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    className="w-full px-3 py-2 border rounded-lg text-zinc-100 bg-transparent "
                  />
                  <textarea
                    name="desc"
                    placeholder="Description"
                    className="w-full px-3 py-2 border rounded-lg text-zinc-900 bg-transparent "
                  ></textarea>
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="status"
                      className="text-sm font-medium text-gray-300"
                    >
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="completed">Completed</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    name="_action"
                    value="create"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-4"
                    onClick={closeAddModal}
                  >
                    Cancel
                  </button>
                </fetcher.Form>
              </div>
            </div>
          )}

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
      </Vortex>
    </div>
  );
}
