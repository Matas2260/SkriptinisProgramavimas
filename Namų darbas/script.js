var draggedTask; // Global variable to store the dragged task

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedTask = event.target;
  event.dataTransfer.setData("text", event.target.id);
  console.log("Task Dragged: ", draggedTask.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);

  // If the drop occurs inside the timetable, proceed with the normal drop logic
  if (event.target.closest(".column")) {
    var dropZone = event.target.closest(".column");
    dropZone.appendChild(draggedElement);
    console.log("Task Dropped to:", dropZone.id);
  } else {
    // If the drop occurs outside the timetable, move the task back to its original position
    var originalColumn = draggedElement.closest(".column");
    originalColumn.appendChild(draggedElement);
    console.log("Task Returned to Original Position");
  }
}
//-----------------------------------------------------vvvvvvvvvvvvvvvvvvv
// Open the popup for adding a new task
function openNewTaskPopup(columnId) {
  console.log("Opening popup for column:", columnId);

  // Set the current column ID
  currentColumnId = columnId;

  // Display the popup
  var popupContainer = document.getElementById("new-task-popup-container");
  if (popupContainer) {
    popupContainer.style.display = "flex";
  } else {
    console.error("Popup container not found!");
  }

  // Update the save button to include the columnId as an argument
  var saveButton = document.getElementById("save-new-task-button");
  if (saveButton) {
    // Remove previous event listener to avoid multiple bindings
    saveButton.removeEventListener("click", saveNewTask);

    // Add new event listener with the current columnId
    saveButton.addEventListener("click", function () {
      console.log("Save button clicked for column:", currentColumnId);
      saveNewTask();
    });
  } else {
    console.error("Save button not found!");

    // Log all button IDs to help identify the issue
    var allButtons = document.querySelectorAll(".save-task-button");
    console.log("All button IDs:", Array.from(allButtons).map(button => button.id));
  }
}

//-----------------------------------------------------^^^^^^^^^^^^^^^^

// Close the popup for adding a new task
function closeNewTaskPopup() {
  resetNewTaskPopupFields();
  document.getElementById("new-task-popup-container").style.display = "none";
}

// Reset fields in the popup for adding a new task
function resetNewTaskPopupFields() {
  document.getElementById("new-task-name").value = "";
  document.getElementById("new-task-description").value = "";
}
//-----------------------------------------------------vvvvvvvvvvvvvvvvvvvv
// Save a new task
function saveNewTask() {
  console.log("Saving task to column:", currentColumnId);

  // Retrieve the column using the stored column ID
  var currentColumn = document.getElementById(currentColumnId);

  if (currentColumn) {
    var taskName = document.getElementById("new-task-name").value;
    var taskDescription = document.getElementById("new-task-description").value;

    if (taskName.trim() !== "") {
      var newTask = createTask(taskName, taskDescription);
      currentColumn.appendChild(newTask);
      closeNewTaskPopup();
    } else {
      // Display an error message, but don't use alert for a better user experience
      console.error("Task name cannot be empty!");
    }
  } else {
    console.error("Column not found for ID:", currentColumnId);
  }
}

//-----------------------------------------------------^^^^^^^^^^^^^^^^^^^^^^^
// Open the popup for editing a task
function openEditTaskPopup(task) {
  var taskContent = task.querySelector("div");
  var taskName = taskContent.querySelector("strong");
  var taskDescription = taskContent.querySelector("p");

  // Populate the fields in the popup for editing
  document.getElementById("edit-task-name").value = taskName.innerText.trim();
  document.getElementById("edit-task-description").value = taskDescription ? taskDescription.innerText.trim() : "";

  // Save the reference to the task being edited
  document.currentTaskBeingEdited = task;

  // Open the popup for editing
  document.getElementById("edit-task-popup-container").style.display = "flex";
}

// Close the popup for editing a task
function closeEditTaskPopup() {
  resetEditTaskPopupFields();
  document.getElementById("edit-task-popup-container").style.display = "none";
}

// Reset fields in the popup for editing a task
function resetEditTaskPopupFields() {
  document.getElementById("edit-task-name").value = "";
  document.getElementById("edit-task-description").value = "";
}

// Save edits to a task
function saveEditTask() {
  var editedName = document.getElementById("edit-task-name").value;
  var editedDescription = document.getElementById("edit-task-description").value;

  var task = document.currentTaskBeingEdited;

  if (editedName.trim() !== "") {
    var taskContent = task.querySelector("div");
    var taskName = taskContent.querySelector("strong");
    var taskDescription = taskContent.querySelector("p");

    // Update the task name if it's not empty, otherwise keep the existing name
    taskName.innerText = editedName.trim() !== "" ? editedName : taskName.innerText;

    // Update or remove the task description based on the edited description
    if (editedDescription.trim() !== "") {
      if (!taskDescription) {
        taskDescription = document.createElement("p");
        taskContent.appendChild(taskDescription);
      }
      taskDescription.innerText = editedDescription;
    } else if (taskDescription) {
      taskContent.removeChild(taskDescription);
    }

    // Close the popup for editing
    closeEditTaskPopup();
  } else {
    alert("Task name cannot be empty!");
  }
}

// Create a new task element
function createTask(taskName, taskDescription) {
  var newTask = document.createElement("div");
  newTask.className = "task";
  newTask.id = "task-" + Date.now(); // Unique ID for each task
  newTask.draggable = true;
  newTask.addEventListener("dragstart", drag);

  var taskContent = document.createElement("div");
  taskContent.innerHTML = "<strong>" + taskName + "</strong>";
  if (taskDescription) {
    taskContent.innerHTML += "<p>" + taskDescription + "</p>";
  }

  // Add Edit and Remove buttons below the task description
  var taskButtons = document.createElement("div");
  taskButtons.className = "task-buttons";

  var editButton = document.createElement("button");
  editButton.innerText = "Edit";
  editButton.onclick = function () {
    openEditTaskPopup(newTask);
  };

  var removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.onclick = function () {
    newTask.parentNode.removeChild(newTask);
  };

  taskButtons.appendChild(editButton);
  taskButtons.appendChild(removeButton);

  // Append task content and buttons to the new task
  newTask.appendChild(taskContent);
  newTask.appendChild(taskButtons);

  return newTask;
}
