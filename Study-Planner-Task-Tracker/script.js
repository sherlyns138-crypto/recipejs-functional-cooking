function addTask() {
  let task = document.getElementById("taskInput").value;
  let subject = document.getElementById("subjectInput").value;
  let date = document.getElementById("dateInput").value;

  if (task === "") {
    alert("Please enter a task!");
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
}

function markDone(button) {
  button.parentElement.parentElement.classList.toggle("completed");
}

function deleteTask(button) {
  button.parentElement.parentElement.remove();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  let button = document.getElementById("themeToggle");

  if (document.body.classList.contains("dark-mode")) {
    button.innerText = "☀ Light Mode";
  } else {
    button.innerText = "🌙 Dark Mode";
  }
}

// Save theme
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");

  let isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");

  let button = document.getElementById("themeToggle");
  button.innerText = isDark ? "☀️" : "🌙";
}

// Load theme on page load
window.onload = function () {
  let savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("themeToggle").innerText = "☀️";
  }
};

function updateTaskCount() {
  let total = document.querySelectorAll("#taskList li").length;
  document.getElementById("taskCount").innerText = total + " tasks";
}
// After adding task
updateTaskCount();

// After deleting task
updateTaskCount();

function checkEmpty() {
  let list = document.getElementById("taskList");
  let message = document.getElementById("emptyMessage");

  message.style.display = list.children.length === 0 ? "block" : "none";
}
checkEmpty();