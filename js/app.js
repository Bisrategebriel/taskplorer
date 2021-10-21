// UI variables
const dateElement = document.querySelector("#date");
const formTask = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collections");
const filterTask = document.querySelector("#filter");

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
  function addTask(e) {
    e.preventDefault();
  }

  function removeTask(e) {}

  function filterTask(e) {}

  function storeToLocalStorage(e) {}

  function removeFromLocalStorage(e) {}

  formTask.addEventListener("submit", addTask);
}

loadAllEvents();
