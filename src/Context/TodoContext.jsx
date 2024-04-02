/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  function addTodo(todo) {
    setTodos((prev) => [{ id: Date.now(), completed: false, todo }, ...prev]);
  }

  function updateTodo(id, todo) {
    setTodos((prev) =>
      prev.map((eachTodo) =>
        eachTodo.id === id ? { ...eachTodo, todo } : eachTodo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function toggleComplete(id) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  useEffect(function () {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(
    function () {
      localStorage.setItem("todos", JSON.stringify(todos));
    },
    [todos]
  );

  return (
    <TodoContext.Provider
      value={{ todos, updateTodo, deleteTodo, addTodo, toggleComplete }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined)
    throw new Error("TodoContext is used outside TodoProvider");
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { TodoProvider, useTodo };
