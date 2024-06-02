import "./style.css";
import { createTodo, newTodoModal, toggleTheme } from "./todo";

// import { createTodo } from "./newTodo";

const openTodoModal = document.querySelector(".add-icon");
const closeTodoModal = document.querySelector("#cancel-todo");
const addTodoBtn = document.querySelector("#submit-todo");
const todoModal = document.querySelector(".new-todo-modal");
const themeToggleBtn = document.querySelector(".theme-toggle-btn");

themeToggleBtn.addEventListener("click", toggleTheme);

//  Opening new todo modal //

openTodoModal.addEventListener("click", newTodoModal);

closeTodoModal.addEventListener("click", () => {
  todoModal.close();
});

addTodoBtn.addEventListener("click", createTodo);

//////////////////////////////////////////////////////////////////

export class Todo {
  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description || "No Description";
    this.dueDate = dueDate;
    this.priority = priority || "Low";
    this.project = project || "Inbox";
  }
}
