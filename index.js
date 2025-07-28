console.log(localStorage.length)
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();

  document.getElementById("addTask").addEventListener("click", () => {
    const taskInputEl = document.getElementById("taskinput");
    const taskValue = taskInputEl.value.trim();

    if (taskValue !== "") {
      const taskObj = {
        text: taskValue,
        completed: false,
      };

      tasks.push(taskObj);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
      taskInputEl.value = "";
    } else {
      alert("Please enter a valid task.");
    }
  });
});

function renderTasks() {
  const taskList = document.getElementById("tasklist");
  taskList.innerHTML = ""; // Clear existing items

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;

    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) span.classList.add("completed");

    const editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = task.completed
      ? '<i class="fa-solid fa-circle-check"></i>'
      : '<i class="fa-solid fa-trash"></i>';

    // Checkbox functionality
    checkBox.addEventListener("change", () => {
      tasks[index].completed = checkBox.checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    // Edit functionality
    editBtn.addEventListener("click", () => {
      const newText = prompt("Edit your task:", task.text);
      if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
      }
    });

    // Delete functionality
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    });

    li.appendChild(checkBox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}
