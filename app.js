const addBtn = document.querySelector(".addBtn");
let title = document.querySelector(".title");
let textFiled = document.querySelector(".notetext");
const containter = document.querySelector(".containter");
const note = document.querySelector(".note");

// Load existing notes from localStorage when the page loads
window.addEventListener("DOMContentLoaded", displayStoredNotes);

// Function to display a single note
function displayContent(noteData) {
  const displayCOnt = document.createElement("div");
  const displays = document.createElement("div");
  const delCOnt = document.createElement("button");
  const titleAdd = document.createElement("h4");
  const textAdd = document.createElement("p");

  displays.classList.add("display");
  displayCOnt.classList.add("output");
  delCOnt.classList.add("del");

  containter.append(displays);
  displays.append(displayCOnt);
  displays.append(delCOnt);
  displayCOnt.appendChild(titleAdd);
  displayCOnt.appendChild(textAdd);

  containter.insertBefore(displays, note);

  titleAdd.textContent = noteData.title;
  textAdd.textContent = noteData.text;
  delCOnt.innerHTML = "X";

  // Delete button logic
  delCOnt.addEventListener("click", () => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      deleteNote(noteData);
      displays.remove();
    }
  });
}

// Add new note to localStorage and display it
addBtn.addEventListener("click", () => {
  if (title.value.length > 0 && textFiled.value.length > 0) {
    const noteData = {
      title: title.value,
      text: textFiled.value
    };

    saveNoteToStorage(noteData);
    displayContent(noteData);

    title.value = "";
    textFiled.value = "";
  }
});

// Save a note to localStorage
function saveNoteToStorage(noteData) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push(noteData);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Display all notes from localStorage on page load
function displayStoredNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(displayContent);
}

// Delete a note from localStorage
function deleteNote(noteData) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter(note => note.title !== noteData.title || note.text !== noteData.text);
  localStorage.setItem("notes", JSON.stringify(notes));
}
