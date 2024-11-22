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

const exerciseForm = document.getElementById("gym-form");
const exerciseList = document.getElementById("exercise-list");

exerciseForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("exercise-name").value;
  const duration = document.getElementById("duration").value;
  const date = document.getElementById("exercise-date").value;

  try {
    await addDoc(collection(db, "gymExercises"), { name, duration, date });
    alert("Exercise added successfully!");
    exerciseForm.reset();
    loadExercises();
  } catch (error) {
    console.error("Error adding exercise:", error);
  }
});

async function loadExercises() {
  exerciseList.innerHTML = "";
  try {
    const querySnapshot = await getDocs(collection(db, "gymExercises"));
    querySnapshot.forEach((doc) => {
      const exercise = doc.data();
      const div = document.createElement("div");
      div.className = "exercise-item";
      div.innerHTML = `
        <h3>${exercise.name}</h3>
        <p>Duration: ${exercise.duration} mins</p>
        <p>Date: ${exercise.date}</p>
      `;
      exerciseList.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching exercises:", error);
  }
}

loadExercises();
