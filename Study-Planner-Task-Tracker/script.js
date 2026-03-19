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
    ${task} (${subject}) - ${date}
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