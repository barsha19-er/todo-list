$(document).ready(function () {
  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  renderTasks();

  // Add task
  $("#addBtn").click(function () {
    let taskText = $("#taskInput").val().trim();
    if (taskText !== "") {
      tasks.push(taskText);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      $("#taskInput").val("");
      renderTasks();
    }
  });

  // Render tasks
  function renderTasks() {
    $("#taskList").empty();
    tasks.forEach((task, index) => {
      $("#taskList").append(`
        <li>
          <span class="task-text">${task}</span>
          <button class="edit" data-index="${index}">Edit</button>
          <button class="delete" data-index="${index}">Delete</button>
        </li>
      `);
    });
  }

  // Delete task
  $(document).on("click", ".delete", function () {
    let index = $(this).data("index");
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  });

  // Edit task
  $(document).on("click", ".edit", function () {
    let index = $(this).data("index");
    let newTask = prompt("Edit your task:", tasks[index]);
    if (newTask !== null && newTask.trim() !== "") {
      tasks[index] = newTask.trim();
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    }
  });
});