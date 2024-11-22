import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAbURzMdeO-6d2srBSiYXqZkvn8l9Z9G-U",
  authDomain: "planit-82761.firebaseapp.com",
  projectId: "planit-82761",
  storageBucket: "planit-82761.firebasestorage.app",
  messagingSenderId: "631213837702",
  appId: "1:631213837702:web:69096945b77502d1557007"
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
