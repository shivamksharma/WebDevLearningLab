function addTask() {
  let taskInput = document.getElementById("input");
  let taskList = document.getElementById("taskList");
  let newTask = document.createElement("li");
  newTask.textContent = taskInput.value;
  taskList.appendChild(newTask);
  taskInput.value = "";
}
