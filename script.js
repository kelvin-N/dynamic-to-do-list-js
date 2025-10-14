// Wait until the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // Select DOM elements
  const addButton = document.getElementById('addButton');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // --- Load tasks from Local Storage when page loads ---
  loadTasks();

  // --- Function to add new task ---
  function addTask(taskText, save = true) {
    // If taskText not provided (from manual input), get from input field
    if (!taskText) {
      taskText = taskInput.value.trim();
    }

    // Validate input
    if (taskText === "") {
      alert("Please enter a task!");
      return;
    }

    // Create <li> element for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create Remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Add event listener to remove button
    removeBtn.addEventListener('click', () => {
      taskList.removeChild(li);
      removeTaskFromLocalStorage(taskText);
    });

    // Append remove button to <li>
    li.appendChild(removeBtn);

    // Append <li> to task list
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = '';

    // Save to Local Storage (only when manually added)
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // --- Function to load tasks from Local Storage ---
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(task => addTask(task, false)); // don't re-save
  }

  // --- Function to remove task from Local Storage ---
  function removeTaskFromLocalStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  // --- Add event listener for button click ---
  addButton.addEventListener('click', () => addTask());

  // --- Add event listener for pressing Enter key ---
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
