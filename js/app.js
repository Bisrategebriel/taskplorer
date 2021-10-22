// UI variables
const dateElement = document.querySelector("#date");
const formTask = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collections");
const filterTask = document.querySelector("#filter");
const clearAndRefresh = document.querySelector(".clear-and-refresh");

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
  formTask.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearAndRefresh.addEventListener("click", clearTasks);
  filterTask.addEventListener("keyup", filterTasks);
}

loadAllEvents();

function addTask(e) {
  if (taskInput.value === "") {
    alert("Please add task first!");
  }

  const itemList = document.createElement("li");
  itemList.className = "collection-list";

  itemList.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");
  link.className = "trashed";

  link.innerHTML = `<i class="fas fa-trash-alt"></i>`;

  itemList.appendChild(link);

  taskList.appendChild(itemList);

  taskInput.value = "";

  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains("trashed")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
    }
  }
}

function clearTasks(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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

function storeToLocalStorage(e) {}

function removeFromLocalStorage(e) {}
