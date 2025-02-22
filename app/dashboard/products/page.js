"use client";
import React, { useState } from "react";
import {
  useAddTodoMutation,
  useGetTodosQuery,
} from "@/lib/features/api/userSlice";

const Page = () => {
  const [title, setTitle] = useState("");
  const [addTodo, { isLoading, isError, isSuccess }] = useAddTodoMutation();
  const { data: todos, isFetching } = useGetTodosQuery();

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      await addTodo({ title, completed: false }).unwrap();
      // The unwrap() method is specific to RTK Query and is used to handle fulfilled or rejected results as a standard promise.
      setTitle(""); // Clear the input
      alert("Todo added successfully!");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>

      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Todo"}
        </button>
      </form>

      {/* Show Todos */}
      <h2 className="text-xl font-semibold mb-2">Todos List</h2>
      {isFetching ? (
        <p>Loading todos...</p>
      ) : (
        <ul className="list-disc pl-6">
          {todos?.slice(0, 10).map((todo) => (
            <li key={todo.id} className="mb-2">
              {todo.title} {todo.completed ? "(Completed)" : "(Pending)"}
            </li>
          ))}
        </ul>
      )}

      {isSuccess && (
        <p className="text-green-500 mt-2">Todo added successfully!</p>
      )}
      {isError && <p className="text-red-500 mt-2">Failed to add todo!</p>}
    </div>
  );
};

export default Page;
