// Wait until the HTML document has fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // Select DOM elements
  const addButton = document.getElementById('addButton');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // --- Function to add new task ---
  function addTask() {
    // Get and trim task input value
    const taskText = taskInput.value.trim();

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
    removeBtn.onclick = function () {
      taskList.removeChild(li);
    };

    // Append remove button to <li>
    li.appendChild(removeBtn);

    // Append <li> to task list
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = '';
  }

  // --- Add event listener for button click ---
  addButton.addEventListener('click', addTask);

  // --- Add event listener for pressing Enter key ---
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // --- Invoke addTask when DOM is ready (as specified) ---
  addTask();
});