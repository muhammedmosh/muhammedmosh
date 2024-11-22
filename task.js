import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("task-title").value;
  const priority = document.getElementById("task-priority").value;
  const deadline = document.getElementById("task-deadline").value;

  try {
    await addDoc(collection(db, "tasks"), { title, priority, deadline });
    alert("Task added successfully!");
    taskForm.reset();
    loadTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
});

async function loadTasks() {
  taskList.innerHTML = "";
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      const div = document.createElement("div");
      div.className = "task-item";
      div.innerHTML = `
        <h3>${task.title}</h3>
        <p>Priority: ${task.priority}</p>
        <p>Deadline: ${task.deadline}</p>
      `;
      taskList.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

loadTasks();
