function addTask() {
  let task = document.getElementById("taskInput").value;
  let subject = document.getElementById("subjectInput").value;
  let date = document.getElementById("dateInput").value;

  if (subject.toLowerCase() === "math") {
  li.style.borderLeft = "5px solid #ff6b6b";
} else if (subject.toLowerCase() === "science") {
  li.style.borderLeft = "5px solid #4ecdc4";
} else {
  li.style.borderLeft = "5px solid #4facfe";
}

   if (task === "" || subject === "" || date === "") {
  alert("Please fill all fields!");
  return;
}

  let li = document.createElement("li");
  li.innerHTML = `
    <span>📌 ${task} (${subject}) - ${date}</span>
    <div>
      <button onclick="markDone(this)">✔</button>
      <button onclick="deleteTask(this)">❌</button>
    </div>
  `;

  document.getElementById("taskList").appendChild(li);

  // Clear inputs
  document.getElementById("taskInput").value = "";
  document.getElementById("subjectInput").value = "";
  document.getElementById("dateInput").value = "";

  updateTaskCount();
  checkEmpty();
}

function markDone(button) {
  button.parentElement.parentElement.classList.toggle("completed");
  saveTasks();
}

function deleteTask(button) {
  if (confirm("Delete this task?")) {
    button.parentElement.parentElement.remove();
    updateTaskCount();
    checkEmpty();
    saveTasks();
  }
}

/* Dark mode toggle + save */
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  let isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  let button = document.getElementById("themeToggle");
  button.innerText = isDark ? "☀️" : "🌙";
}

/* Load theme on startup */
window.onload = function () {
  let savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").innerText = "☀️";
  }

  loadTasks(); // ✅ ADD THIS

  updateTaskCount();
  checkEmpty();
};

/* Task counter */
function updateTaskCount() {
  let total = document.querySelectorAll("#taskList li").length;
  document.getElementById("taskCount").innerText = total + " tasks";
  }
/* Empty message */
function checkEmpty() {
  let list = document.getElementById("taskList");
  let message = document.getElementById("emptyMessage");

  message.style.display = list.children.length === 0 ? "block" : "none";
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  let saved = JSON.parse(localStorage.getItem("tasks")) || [];

  saved.forEach(task => {
    let li = document.createElement("li");
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="markDone(this)">✔</button>
        <button onclick="deleteTask(this)">❌</button>
      </div>
    `;

    if (task.completed) li.classList.add("completed");

    document.getElementById("taskList").appendChild(li);
  });
}

document.getElementById("taskInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    addTask();
  }
});

loadTasks();
saveTasks();

function deleteTask(button) {
  button.parentElement.parentElement.remove();
  updateTaskCount();
  checkEmpty();
  saveTasks();
}

let time = 25 * 60;
let timerInterval = null;
let isRunning = false;
let isBreak = false;

function updateDisplay() {
let minutes = Math.floor(time / 60);
let seconds = time % 60;

document.getElementById("timer").innerText =
`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
if (isRunning) {
clearInterval(timerInterval);
isRunning = false;
return;
}

isRunning = true;

timerInterval = setInterval(() => {
if (time > 0) {
time--;
updateDisplay();
} else {
clearInterval(timerInterval);
isRunning = false;

```
  if (!isBreak) {
    alert("Break time!");
    time = 5 * 60;
    isBreak = true;
  } else {
    alert("Back to work!");
    time = 25 * 60;
    isBreak = false;
  }

  updateDisplay();
}
```

} 1000);
}

  () => {
    clearInterval(timerInterval);
    isRunning = false;
    isBreak = false;
    time = 25 * 60;
    updateDisplay();
  }

updateDisplay();
