// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-button');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
    // Get the input value and trim whitespace
    const taskText = taskInput.value.trim();

    // Check if the input is empty
    if (taskText === "") {
      alert("Please enter a task before adding.");
      return;
    }

    // Create a new list item (li) for the task
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a remove button for each task
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.className = 'remove-btn';

    // Assign event to remove the task when clicked
    removeButton.onclick = function() {
      taskList.removeChild(li);
    };

    // Append remove button to list item, then to list
    li.appendChild(removeButton);
    taskList.appendChild(li);

    // Clear the input field after adding
    taskInput.value = "";
  }

  // Add event listener to the Add Task button
  addButton.addEventListener('click', addTask);

  // Allow pressing "Enter" to add a task
  taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
