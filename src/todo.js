import { Todo } from ".";
import deleteIcon_light from "./imgs/delete(light_version).png";
import deleteIcon_dark from "./imgs/delete(dark_version).png";
import infoIcon_light from "./imgs/info(light_version).png";
import infoIcon_dark from "./imgs/info(dark_version).png";
import menuIcon_light from "./imgs/menu(light_version).png";
import menuIcon_dark from "./imgs/menu(dark_version).png";
import inboxIcon_light from "./imgs/inbox(light-version).png";
import inboxIcon_dark from "./imgs/inbox(dark-version).png";
import projectIcon_light from "./imgs/projects(light-version).png";
import projectIcon_dark from "./imgs/projects(dark-version).png";
import addIcon_dark from "./imgs/add(dark-version).png";
import addIcon_light from "./imgs/add(light_version).png";
import closeIcon_dark from "./imgs/close(dark_version).png";
import closeIcon_light from "./imgs/close(light_version).png";

import closeIcon from "./imgs/close(light_version).png";

const openTodoModal = document.querySelector(".add-icon");
const closeTodoModal = document.querySelector("#cancel-todo");
const addTodoBtn = document.querySelector("#submit-todo");
const todoModal = document.querySelector(".new-todo-modal");
const projectModal = document.querySelector(".new-project-modal");
const todosContainer = document.querySelector(".allTodos");
const closeInfoModal = document.querySelector(".close-icon");
const plusIcon = document.querySelector(".plus-icon");
const closeProjModal = document.querySelector("#cancel-proj");
const addProjBtn = document.querySelector("#submit-project");
const projNameInput = document.querySelector("#proj-name");

const titleInput = document.querySelector("#title");
const descInput = document.querySelector("#description");
const dateInput = document.querySelector("#date");
const priorityInput = document.querySelector("#priority");
const projectInput = document.querySelector("#project");
const projectList = document.querySelector(".project-list");
const projectListItems = document.querySelectorAll(".project-list-item");
const allTask = document.querySelector(".inbox-div");
const inbox = document.querySelector(".inbox");
const sidebar = document.querySelector(".sidebar");
const body = document.querySelector("body");

const menuIcon = document.querySelector(".menu-icon");
const inboxIcon = document.querySelector(".inbox-icon");
const projectsIcon = document.querySelector(".projects-icon");
const addIcon = document.querySelector(".add-icon");
const allTxt = document.querySelector(".all-tasks");
const projectTxt = document.querySelector(".prj");

let allTodos = JSON.parse(localStorage.getItem("todoStorage"))
  ? JSON.parse(localStorage.getItem("todoStorage"))
  : [];
let allProjects = ["inbox"];
let activeProj = "All";
let theme = "light";

if (allTodos) {
  for (const todo of allTodos) {
    let title = todo.title;
    let description = todo.description;
    let dueDate = todo.dueDate;
    let priority = todo.priority;
    let project = todo.project;

    createTodoHtml(title, description, dueDate, priority, project);
  }
}

// Making new todo

function createTodoHtml(title, description, dueDate, priority, project) {
  const LOW_PRIORITY = "#29D429";
  const MEDIUM_PRIORITY = "#f0b429";
  const HIGH_PRIORITY = "#FF3939";

  let priorityLvl;

  if (priority == "low") priorityLvl = LOW_PRIORITY;
  else if (priority == "medium") priorityLvl = MEDIUM_PRIORITY;
  else if (priority == "high") priorityLvl = HIGH_PRIORITY;

  const [year, month, day] = dueDate.split("-");

  const html = `<div class="todo" style="border-left:15px solid ${priorityLvl}">
      <div class="checkbox-wrapper-1">
        <input
          id="${title}-checkbox"
          class="substituted"
          type="checkbox"
          aria-hidden="true"
        />
        <label for="${title}-checkbox">${title}</label>
      </div>
      <h3>${day}/${month}/${year}</h3>
    
      <div class="todo-icons">
        <img
          src = ${deleteIcon_light}
          alt="Delete icon"
          class="delete-icon icon "
        />
    
        <img
          src=${infoIcon_light}
          alt="More info icon"
          class="info-icon icon"
        />
      </div>
    </div>`;

  if (activeProj == project || activeProj == "All") {
    todosContainer.insertAdjacentHTML("beforeend", html);
  }
}

export function createTodo() {
  let title = titleInput.value;
  let description = descInput.value;
  let dueDate = dateInput.value;
  let priority = priorityInput.value;
  let project = projectInput.value;

  if (title != "" && dueDate != "") {
    allTodos.push(new Todo(title, description, dueDate, priority, project));
    localStorage.clear();
    localStorage.setItem("todoStorage", JSON.stringify(allTodos));

    console.log(allTodos);

    createTodoHtml(title, description, dueDate, priority, project);

    setTimeout(() => {
      titleInput.value = "";
      descInput.value = "";
      dateInput.value = "";
      projectInput.value = "";
    }, 500);
  }
}

function createInfoModal(todo) {
  const [year, month, day] = todo.dueDate.split("-");

  let html = `<dialog class="info-modal">
    <img
    src=${closeIcon_dark}
    alt="Close icon"
    class="close-icon icon"
    />
    <h1>${todo.title}</h1>
    <h3><span>Project:</span> ${todo.project}</h3>
    <h3><span>Priority:</span> ${todo.priority}</h3>
    <h3><span>Due Date:</span> ${day}/${month}/${year}</h3>
    <h3><span>Description:</span> ${todo.description}</h3>
    </dialog>`;

  todosContainer.insertAdjacentHTML("afterbegin", html);
}

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("info-icon")) {
    const todoTitle =
      e.target.closest(".todo").children[0].children[1].textContent;
    let curTodo;

    for (const todo of allTodos) {
      if (todoTitle === todo.title) {
        curTodo = todo;
      }
    }

    createInfoModal(curTodo);

    const infoModal = document.querySelector(".info-modal");
    infoModal.showModal();
    infoModal.style.opacity = "100";
  } else if (e.target.classList.contains("close-icon")) {
    const infoModal = document.querySelector(".info-modal");
    infoModal.close();
  }
});

// Delete todo //

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-icon")) {
    const todoTitle =
      e.target.closest(".todo").children[0].children[1].textContent;

    allTodos = allTodos.filter((todo) => !(todo.title == todoTitle));
    localStorage.setItem("todoStorage", JSON.stringify(allTodos));

    e.target.closest(".todo").remove();

    console.log(allTodos);
  }
});

function showTodos(projName) {
  todosContainer.textContent = "";
  const todos = allTodos.filter((todo) => todo.project == projName);

  for (const todo of todos) {
    let title = todo.title;
    let description = todo.description;
    let dueDate = todo.dueDate;
    let priority = todo.priority;
    let project = todo.project;

    if (title != "" && dueDate != "") {
      createTodoHtml(title, description, dueDate, priority, project);
    }
  }
}
//////////////////////////////////////////////////////////////////

plusIcon.addEventListener("click", () => {
  projectModal.showModal();
});

closeProjModal.addEventListener("click", () => {
  projectModal.close();
});

inbox.addEventListener("click", function () {
  const projectListItems = document.querySelectorAll(".project-list-item");
  for (const li of projectListItems) {
    li.classList.remove("active");
    allTask.classList.remove("active");
  }
  inbox.classList.add("active");
  activeProj = "inbox";
  showTodos("inbox");
});

addProjBtn.addEventListener("click", () => {
  const projName = projNameInput.value;
  allProjects.push(projName);

  projectList.textContent = "";

  for (const project of allProjects) {
    const element = document.createElement("li");
    element.textContent = project;
    element.classList.add("project-list-item");

    element.addEventListener("click", (e) => {
      const projectListItems = document.querySelectorAll(".project-list-item");
      for (const li of projectListItems) {
        li.classList.remove("active");
        allTask.classList.remove("active");
      }
      e.target.classList.add("active");
      activeProj = e.target.textContent;
      showTodos(e.target.textContent);
    });
    projectList.appendChild(element);
  }

  setTimeout(() => {
    projNameInput.value = "";
  }, 500);
});

allTask.addEventListener("click", function () {
  const projectListItems = document.querySelectorAll(".project-list-item");

  for (const li of projectListItems) {
    li.classList.remove("active");
  }

  allTask.classList.add("active");

  todosContainer.textContent = "";
  activeProj = "All";
  for (const todo of allTodos) {
    let title = todo.title;
    let description = todo.description;
    let dueDate = todo.dueDate;
    let priority = todo.priority;
    let project = todo.project;

    if (title != "" && dueDate != "") {
      createTodoHtml(title, description, dueDate, priority, project);
    }
  }
});

export function newTodoModal() {
  todoModal.showModal();
  todoModal.style.opacity = "100";
  projectInput.textContent = "";

  for (const project of allProjects) {
    let html = `<option value="${project}">${project}</option>`;
    projectInput.insertAdjacentHTML("beforeend", html);
  }
}

export function toggleSidebar() {
  sidebar.classList.toggle("sidebar-toggled");
}

export function toggleTheme() {
  const deleteIcon = document.querySelectorAll(".delete-icon");
  const infoIcon = document.querySelectorAll(".info-icon");
  const closeIcon = document.querySelectorAll(".close-icon");
  const projectListItems = document.querySelectorAll(".project-list-item");

  body.classList.toggle("dark");

  switch (theme) {
    case "light":
      menuIcon.src = menuIcon_dark;
      addIcon.src = addIcon_dark;
      allTxt.style.color = "#eee";
      projectTxt.style.color = "#eee";

      for (const icon of deleteIcon) {
        icon.src = deleteIcon_dark;
      }
      for (const icon of infoIcon) {
        icon.src = infoIcon_dark;
      }
      for (const icon of closeIcon) {
        icon.src = closeIcon_dark;
      }

      for (const li of projectListItems) {
        li.style.color = "#eee";
      }

      theme = "dark";
      break;

    case "dark":
      menuIcon.src = menuIcon_light;
      addIcon.src = addIcon_light;
      allTxt.style.color = "#eee";
      projectTxt.style.color = "#eee";

      for (const icon of deleteIcon) {
        icon.src = deleteIcon_light;
      }
      for (const icon of infoIcon) {
        icon.src = infoIcon_light;
      }
      for (const icon of closeIcon) {
        icon.src = closeIcon_light;
      }
      theme = "light";
      break;
  }
}
