// UI variables
const dateElement = document.querySelector("#date");
const formTask = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collections");
const filterTask = document.querySelector("#filter");
const clearAndRefresh = document.querySelector(".clear-and-refresh");
const sortInAscending = document.querySelector(".ascend");
const sortInDescending = document.querySelector(".descend");

// show date
const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", options);

function loadAllEvents() {
  document.addEventListener("DOMContentLoaded", getTask);
  formTask.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearAndRefresh.addEventListener("click", clearTasks);
  filterTask.addEventListener("keyup", filterTasks);
  sortInAscending.addEventListener("click", sortAscending);
  sortInDescending.addEventListener("click", sortDesceding);
}

loadAllEvents();

function sortAscending() {
  let tasks;
  let sortedTasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    sortedTasks = tasks.sort();

    clearFromLocalStorage();

    window.location.reload(true);

    sortedTasks.forEach((task) => {
      const itemList = document.createElement("li");
      itemList.className = "collection-list";

      itemList.appendChild(document.createTextNode(task));

      const link = document.createElement("a");
      link.className = "trashed";

      link.innerHTML = `<i class="fas fa-trash-alt"></i>`;

      itemList.appendChild(link);

      taskList.appendChild(itemList);

      storeToLocalStorage(task);
    });
    // alert(tasks.sort());
  }
}

function sortDesceding() {
  let tasks;
  let sortedTasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    sortedTasks = tasks.reverse();

    clearFromLocalStorage();

    window.location.reload(true);

    sortedTasks.forEach((task) => {
      const itemList = document.createElement("li");
      itemList.className = "collection-list";

      itemList.appendChild(document.createTextNode(task));

      const link = document.createElement("a");
      link.className = "trashed";

      link.innerHTML = `<i class="fas fa-trash-alt"></i>`;

      itemList.appendChild(link);

      taskList.appendChild(itemList);

      storeToLocalStorage(task);
    });
    // alert(tasks.sort());
  }
}

function getTask() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const itemList = document.createElement("li");
    itemList.className = "collection-list";

    itemList.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "trashed";

    link.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    itemList.appendChild(link);

    taskList.appendChild(itemList);
  });
}

function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add task first!");
  } else {
    const itemList = document.createElement("li");
    itemList.className = "collection-list";

    itemList.appendChild(document.createTextNode(taskInput.value));

    const link = document.createElement("a");
    link.className = "trashed";

    link.innerHTML = `<i class="fas fa-trash-alt"></i>`;

    itemList.appendChild(link);

    taskList.appendChild(itemList);

    storeToLocalStorage(taskInput.value);

    taskInput.value = "";
  }

  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("trashed")) {
    let toBeDeleted;
    if (confirm("Are you sure?")) {
      toBeDeleted = e.target.parentElement.parentElement;
      toBeDeleted.remove();
      // console.log(toBeDeleted);
    }
    removeFromLocalStorage(toBeDeleted);
  }
}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearFromLocalStorage();
}

function clearFromLocalStorage() {
  localStorage.clear();
}

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-list").forEach((task) => {
    const item = task.firstChild.textContent;

    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}

function storeToLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
}
