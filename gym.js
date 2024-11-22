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
