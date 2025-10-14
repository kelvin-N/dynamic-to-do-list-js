// Wait until the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // Select DOM elements
  const addButton = document.getElementById('addButton');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // --- Load tasks from Local Storage ---
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => {
      addTaskToDOM(taskText);
    });
  }

  // --- Save tasks to Local Storage ---
  function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li span').forEach(span => {
      tasks.push(span.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // --- Helper: Add a task to the DOM ---
  function addTaskToDOM(taskText) {
    // Create <li> element
    const li = document.createElement('li');

    // Add text inside a <span> (for easy retrieval later)
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    // Create Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Add event listener to remove button
    removeBtn.onclick = function () {
      taskList.removeChild(li);
      saveTasks(); // Update storage after removal
    };

    // Append button to <li>
    li.appendChild(removeBtn);

    // Append <li> to the task list
    taskList.appendChild(li);
  }

  // --- Function to add a new task ---
  function addTask() {
    const taskText = taskInput.value.trim();

    // Validate input
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Add to DOM
    addTaskToDOM(taskText);

    // Save to Local Storage
    saveTasks();

    // Clear input
    taskInput.value = '';
  }

  // --- Event listener for button click ---
  addButton.addEventListener('click', addTask);

  // --- Event listener for pressing Enter key ---
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // --- Load tasks when the page loads ---
  loadTasks();
});
