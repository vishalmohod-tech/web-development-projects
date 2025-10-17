let notes = JSON.parse(localStorage.getItem("vaultNotes")) || [];
    let activeNote = null;

    const noteList = document.getElementById("noteList");
    const titleInput = document.getElementById("noteTitle");
    const contentInput = document.getElementById("noteContent");
    const searchInput = document.getElementById("searchInput");

    function renderNotes(filter = "") {
      noteList.innerHTML = "";
      notes
        .filter(
          (n) =>
            n.title.toLowerCase().includes(filter.toLowerCase()) ||
            n.content.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach((note) => {
          const div = document.createElement("div");
          div.className = "note-item";
          div.textContent = note.title || "Untitled Note";
          div.onclick = () => selectNote(note.id);
          if (note.id === activeNote) div.style.background = "#4b4b7f";
          noteList.appendChild(div);
        });
    }

    function createNote() {
      const newNote = {
        id: Date.now(),
        title: "Untitled Note",
        content: "",
        date: new Date().toISOString(),
      };
      notes.push(newNote);
      activeNote = newNote.id;
      renderNotes();
      loadActiveNote();
      saveToStorage();
    }

    function selectNote(id) {
      activeNote = id;
      loadActiveNote();
      renderNotes(searchInput.value);
    }

    function loadActiveNote() {
      const note = notes.find((n) => n.id === activeNote);
      if (!note) return;
      titleInput.value = note.title;
      contentInput.value = note.content;
    }

    function saveNote() {
      if (!activeNote) return;
      const note = notes.find((n) => n.id === activeNote);
      note.title = titleInput.value.trim() || "Untitled Note";
      note.content = contentInput.value.trim();
      saveToStorage();
      renderNotes(searchInput.value);
    }

    function deleteNote() {
      if (!activeNote) return;
      notes = notes.filter((n) => n.id !== activeNote);
      activeNote = null;
      titleInput.value = "";
      contentInput.value = "";
      saveToStorage();
      renderNotes(searchInput.value);
    }

    function saveToStorage() {
      localStorage.setItem("vaultNotes", JSON.stringify(notes));
    }

    searchInput.addEventListener("input", (e) => {
      renderNotes(e.target.value);
    });

    renderNotes();