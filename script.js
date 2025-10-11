// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-button');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // In-memory tasks array (keeps parity with localStorage)
  let tasks = [];

  // Save tasks array to localStorage
  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Render the tasks array into the DOM
  function renderTasks() {
    // Clear current list
    taskList.innerHTML = '';

    // Create list items for each task
    tasks.forEach((taskText, index) => {
      const li = document.createElement('li');

      // Create a span to hold the task text (keeps structure clean)
      const span = document.createElement('span');
      span.textContent = taskText;
      li.appendChild(span);

      // Create remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.className = 'remove-btn';

      // When the remove button is clicked:
      removeButton.addEventListener('click', () => {
        // Remove from the in-memory array
        tasks.splice(index, 1);
        // Persist updated array to localStorage
        saveTasks();
        // Re-render the list
        renderTasks();
      });

      // Append remove button and list item to the list
      li.appendChild(removeButton);
      taskList.appendChild(li);
    });
  }

  /**
   * Add a task.
   * @param {string|null} taskText - If provided, add this text; otherwise read from input.
   * @param {boolean} save - If true, persist the updated tasks array to localStorage.
   */
  function addTask(taskText = null, save = true) {
    // Determine the text to add (from parameter or input)
    const text = taskText !== null ? taskText : taskInput.value.trim();

    // If user attempted to add an empty task from the input, alert and return
    if (text === '') {
      if (taskText === null) alert('Please enter a task before adding.');
      return;
    }

    // Add to in-memory array
    tasks.push(text);

    // Save to localStorage if required
    if (save) saveTasks();

    // Update the DOM
    renderTasks();

    // Clear the input field only if the user added via the input (not when loading)
    if (taskText === null) taskInput.value = '';
  }

  // Load tasks from localStorage and populate the UI
  function loadTasks() {
    // Read stored tasks (default to empty array)
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');

    // Reset in-memory array to avoid duplicates
    tasks = [];

    // Add each stored task without re-saving (save = false)
    storedTasks.forEach(task => addTask(task, false));
  }

  // Attach event listeners
  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') addTask();
  });

  // Initialize app by loading existing tasks
  loadTasks();
});
