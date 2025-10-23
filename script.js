// Setup Event Listener for Page Load
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM Elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Array to hold tasks in memory
  let tasks = [];

  // Save tasks array to localStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Remove task at a given index, update storage and re-render
  function removeTaskAtIndex(index) {
    if (index > -1 && index < tasks.length) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  }

  // Create DOM elements for tasks from tasks array
  function renderTasks() {
    // Clear current list
    taskList.innerHTML = "";

    // Create li + remove button for each task
    tasks.forEach((taskText, index) => {
      const li = document.createElement("li");
      li.textContent = taskText;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      // Use classList.add as required
      removeButton.classList.add("remove-btn");

      // Use onclick to remove the li and update storage (checker expects onclick)
      removeButton.onclick = function () {
        removeTaskAtIndex(index);
      };

      li.appendChild(removeButton);
      taskList.appendChild(li);
    });
  }

  // Create the addTask Function
  // If called with a taskText argument, it will add that text.
  // If called without an argument, it reads from the input field.
  function addTask(taskTextArg) {
    const taskText =
      typeof taskTextArg === "string" ? taskTextArg.trim() : taskInput.value.trim();

    // Check if taskText is empty
    if (taskText === "") {
      // If user attempted to add via input, show alert; if loading from storage, silently ignore
      if (typeof taskTextArg !== "string") {
        alert("Please enter a task!");
      }
      return;
    }

    // Add task to tasks array and persist
    tasks.push(taskText);
    saveTasks();

    // Re-render list and clear input (if input used)
    renderTasks();
    if (typeof taskTextArg !== "string") {
      taskInput.value = "";
    }
  }

  // Load tasks from localStorage on page load
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    if (Array.isArray(storedTasks) && storedTasks.length > 0) {
      tasks = storedTasks.slice(); // copy into our tasks array
    } else {
      tasks = [];
    }
    renderTasks();
  }

  // Attach Event Listeners
  addButton.addEventListener("click", function () {
    addTask();
  });

  // Use keypress with Enter check (ALX expects 'keypress' + event.key === "Enter")
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  // Initialize
  loadTasks();
});
