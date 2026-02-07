(() => {
  console.log('Js Connected');
  // DOM Elements
  const addNoteBtn = document.getElementById('addNoteBtn');
  const emptyStateCta = document.getElementById('emptyStateCta');
  const addModal = document.getElementById('addModal');
  const editModal = document.getElementById('editModal');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const cancelAddBtn = document.getElementById('cancelAdd');
  const cancelEditBtn = document.getElementById('cancelEdit');
  const emptyState = document.getElementById('emptyState');
  const noteGrid = document.querySelector('.notes-grid');

  // Add Form Elements
  const addTitle = document.getElementById('addTitle');
  const addContent = document.getElementById('addContent');
  const addTags = document.getElementById('addTags');
  const addColor = document.getElementById('addColor');
  const addPin = document.getElementById('addPin');
  const saveAddBtn = document.getElementById('saveAdd');

  //Edit Form Elements
  const editTitle = document.getElementById('editTitle');
  const editContent = document.getElementById('editContent');
  const editTags = document.getElementById('editTags');
  const editColor = document.getElementById('editColor');
  const editPin = document.getElementById('editPin');
  const saveEditBtn = document.getElementById('saveEdit');

  let allNotes = loadFromLocalStorage();

  // Filter & Search State
  let currentFilter = 'all'; // 'all', 'personal', 'work', 'idea'
  let currentSearch = '';
  let currentSort = 'date-newest';

  // Toast notification system
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message, type = 'info') {
    toastMessage.textContent = message;
    toast.style.display = 'flex';
    toast.classList.remove('toast-success', 'toast-error', 'toast-info');

    if (type === 'success') toast.classList.add('toast-success');
    if (type === 'error') toast.classList.add('toast-error');
    if (type === 'info') toast.classList.add('toast-info');

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
      toast.style.display = 'none';
    }, 3000);
  }

  // Toast close button
  document.querySelector('.toast-close')?.addEventListener('click', () => {
    toast.style.display = 'none';
  });

  // ===== SEARCH FUNCTIONALITY =====
  const searchBar = document.getElementById('search-bar');

  function debounce(func, delay) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const debouncedSearch = debounce((e) => {
    currentSearch = e.target.value.toLowerCase().trim();
    applyAllFilters();
  }, 300);

  searchBar.addEventListener('input', debouncedSearch);

  // ===== TAB/FILTER FUNCTIONALITY =====
  const tabs = document.querySelectorAll('.tab');

  function filterByCategory(notes, category) {
    if (category === 'all') {
      return notes;
    }

    return notes.filter(note =>
      note.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
    );
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      // Remove active from all tabs
      tabs.forEach(t => t.classList.remove('active'));

      // Add active to clicked tab
      e.target.classList.add('active');

      // Get category
      currentFilter = e.target.textContent.toLowerCase();

      // Apply all filters
      applyAllFilters();
    });
  });

  // ===== SORT FUNCTIONALITY =====
  const sortDropdown = document.getElementById('sorting');

  function sortNotes(notes, sortBy) {
    const notesCopy = [...notes];

    notesCopy.sort((a, b) => {
      // Pinned notes always first
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Then apply selected sort
      switch(sortBy) {
        case 'date-newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'date-oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return notesCopy;
  }

  sortDropdown.addEventListener('change', (e) => {
    currentSort = e.target.value;
    applyAllFilters();
  });

  // ===== COMBINED FILTER FUNCTION =====
  function applyAllFilters() {
    let results = [...allNotes];

    // 1. Apply search
    if (currentSearch !== '') {
      results = results.filter(note => {
        const titleMatch = note.title.toLowerCase().includes(currentSearch);
        const contentMatch = note.content.toLowerCase().includes(currentSearch);
        const tagsMatch = note.tags.some(tag =>
          tag.toLowerCase().includes(currentSearch)
        );
        return titleMatch || contentMatch || tagsMatch;
      });
    }

    // 2. Apply category filter
    results = filterByCategory(results, currentFilter);

    // 3. Apply sort (pinned notes handled inside sortNotes)
    results = sortNotes(results, currentSort);

    // 4. Render
    renderFilteredNotes(results);
  }

  function renderFilteredNotes(notes) {
    console.log('Rendering', notes.length, 'notes');

    if (notes.length === 0) {
      showEmptyState();
      noteGrid.innerHTML = '';

      // Show appropriate message
      if (currentSearch !== '') {
        document.querySelector('.empty-state h3').textContent = 'No notes found';
        document.querySelector('.empty-state p').textContent = `No results for "${currentSearch}"`;
      } else if (currentFilter !== 'all') {
        document.querySelector('.empty-state h3').textContent = 'No notes in this category';
        document.querySelector('.empty-state p').textContent = `Create a note with the "${currentFilter}" tag`;
      } else {
        document.querySelector('.empty-state h3').textContent = 'No notes yet';
        document.querySelector('.empty-state p').textContent = 'Create your first note to get started.';
      }
      return;
    }

    hideEmptyState();
    noteGrid.innerHTML = '';

    notes.forEach((note) => {
      noteGrid.innerHTML += createNoteHTML(note);
    });
  }

function generateId() {
  if (window.crypto && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `note_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
}


  function clearAddForm() {
    addTitle.value = '';
    addContent.value = '';
    addColor.value = '#FEE2E2';
    addTags.value = '';
    addPin.checked = false;
  }

 


  function createNote() {
    console.log('Creating new note...');
    const title = addTitle.value.trim();
    const content = addContent.value.trim();
    const tagsInput = addTags.value.trim();
    const color = addColor.value;
    const isPinned = addPin.checked;

    // Validation
    if (!title) {
      showToast('Please enter a title!', 'error');
      addTitle.focus();
      return;
    }

    if (title.length > 100) {
      showToast('Title is too long (max 100 characters)', 'error');
      addTitle.focus();
      return;
    }

    if (!content) {
      showToast('Please enter some content!', 'error');
      addContent.focus();
      return;
    }

    if (content.length > 5000) {
      showToast('Content is too long (max 5000 characters)', 'error');
      addContent.focus();
      return;
    }

    const tags =
      tagsInput === ''
        ? []
        : tagsInput
            .split(',')
            .map((tag) => tag.trim())
            .filter((tag) => tag !== '' && tag.length <= 20)
            .slice(0, 10); // Max 10 tags

    const newNote = {
      id: generateId(),
      title,
      content,
      tags,
      color,
      isPinned,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    console.log('New note Created!', newNote);
    allNotes.push(newNote);
    saveToLocalStorage(allNotes);
    applyAllFilters();
    clearAddForm();
    closeAllModals();
    showToast('Note created successfully!', 'success');
    console.log('Note Added SuccesFully');
  }

  function loadFromLocalStorage() {
    try {
      const notesJSON = localStorage.getItem('notes');
      if (notesJSON) {
        const parsed = JSON.parse(notesJSON);
        // Validate data structure
        if (Array.isArray(parsed)) {
          return parsed;
        } else {
          console.warn('Invalid notes data structure');
          return [];
        }
      }
      return [];
    } catch (error) {
      console.error('Error loading notes from localStorage:', error);

      if (error.name === 'SyntaxError') {
        showToast('Corrupted data detected. Starting fresh.', 'error');
      } else if (error.name === 'SecurityError') {
        showToast('Storage access denied. Check browser settings.', 'error');
      } else {
        showToast('Failed to load notes from storage.', 'error');
      }
      return [];
    }
  }

  function saveToLocalStorage(notes) {
    try {
      const jsonData = JSON.stringify(notes);

      // Check size (rough estimate - 5MB limit)
      const sizeInBytes = new Blob([jsonData]).size;
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (sizeInBytes > maxSize) {
        showToast('Storage limit reached! Please delete old notes.', 'error');
        console.warn(`Data size: ${(sizeInBytes / 1024 / 1024).toFixed(2)}MB exceeds limit`);
        return false;
      }

      localStorage.setItem('notes', jsonData);
      console.log('Notes saved successfully');
      return true;
    } catch (error) {
      console.error('Error saving notes to localStorage:', error);

      if (error.name === 'QuotaExceededError') {
        showToast('Storage full! Please delete some notes.', 'error');
      } else {
        showToast('Failed to save notes. Please try again.', 'error');
      }
      return false;
    }
  }

  function showEmptyState() {
    emptyState.classList.remove('hidden');
  }

  function hideEmptyState() {
    emptyState.classList.add('hidden');
  }

  function formatDate(isoDate) {
  if (!isoDate) return '—';

  const date = new Date(isoDate);
  if (isNaN(date)) return '—';

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}`;
}


  const tagColors = {
    personal: 'personal',
    work: 'work',
    ideas: 'ideas',
    idea: 'ideas',
    important: 'important',
  };

  function getTagColor(tagName) {
    return tagColors[tagName.toLowerCase()] || 'default';
  }

  function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

  function createNoteHTML(note) {
    const pinnedClass = note.isPinned ? 'pinned' : '';
    const safeTitle = escapeHTML(note.title);
    const safeContent = escapeHTML(note.content);
    const safeColor = escapeHTML(note.color);
    const safeId = escapeHTML(note.id);

    return `
      <div class="note ${pinnedClass}" style="--note-accent: ${safeColor}" id="${safeId}">
        <div class="note-card">
          <h2 class="note-title">${safeTitle}</h2>
          <p class="note-content">${safeContent}</p>
          <div class="card-footer">
            <div class="footer-top">
              <div class="date">${formatDate(note.createdAt)}</div>
              <div class="actions">
                <i class="fas fa-edit" data-id="${safeId}"></i>
                <i class="fas fa-trash" data-id="${safeId}"></i>
              </div>
            </div>
            <div class="footer-bottom">
              ${note.tags
                .map((tag) => `<span class="tag ${getTagColor(tag)}">${escapeHTML(tag)}</span>`)
                .join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function openAddModal() {
    console.log('Opening Add Modal');
    addModal.classList.remove('hidden');
  }


  function openEditModal(noteId) {
    console.log('Opening Edit Modal for note id:', noteId);
    editModal.dataset.noteId = noteId;
    editModal.classList.remove('hidden');
  }

  function closeAllModals() {
    console.log('Close All Modals');
    addModal.classList.add('hidden');
    editModal.classList.add('hidden');
  }

  function deleteNote(noteId) {
    // Simple confirmation using toast
    const note = allNotes.find(n => n.id === noteId);
    if (!note) return;

    // Immediately delete (can add proper modal later if needed)
    if (window.confirm(`Delete note "${note.title}"?`)) {
      allNotes = allNotes.filter((n) => n.id !== noteId);
      saveToLocalStorage(allNotes);
      applyAllFilters();
      showToast('Note deleted successfully', 'success');
    }
  }

  function editNote(noteId) {
  const note = allNotes.find(note => note.id === noteId);
  if (!note) return;
  editTitle.value = note.title;
  editContent.value = note.content;
  editColor.value = note.color;
  editTags.value = note.tags.join(', ');
  editPin.checked = note.isPinned;
  openEditModal(noteId);
}


  saveEditBtn.addEventListener('click', function() {
    const noteId = editModal.dataset.noteId;
    const existingNote = allNotes.find((note) => note.id === noteId);
    if (!existingNote) {
      console.warn('Note not found while saving edit:', noteId);
      showToast('Note not found!', 'error');
      return;
    }

    const title = editTitle.value.trim();
    const content = editContent.value.trim();

    // Validation
    if (!title) {
      showToast('Please enter a title!', 'error');
      editTitle.focus();
      return;
    }

    if (title.length > 100) {
      showToast('Title is too long (max 100 characters)', 'error');
      editTitle.focus();
      return;
    }

    if (!content) {
      showToast('Please enter some content!', 'error');
      editContent.focus();
      return;
    }

    if (content.length > 5000) {
      showToast('Content is too long (max 5000 characters)', 'error');
      editContent.focus();
      return;
    }

    const updatedNote = {
      id: noteId,
      title,
      content,
      color: editColor.value,
      tags: editTags.value
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '' && tag.length <= 20)
        .slice(0, 10), // Max 10 tags
      isPinned: editPin.checked,
      createdAt: existingNote.createdAt,
      updatedAt: new Date().toISOString(),
    };

    allNotes = allNotes.map((note) => (note.id === noteId ? updatedNote : note));
    saveToLocalStorage(allNotes);
    renderAllNotes();
    closeAllModals();
    showToast('Note updated successfully!', 'success');
  });

  saveAddBtn.addEventListener('click', createNote);
  addNoteBtn.addEventListener('click', openAddModal);
  emptyStateCta.addEventListener('click', openAddModal);

  modalCloseButtons.forEach((closeBtn) => {
    closeBtn.addEventListener('click', closeAllModals);
  });

  modalOverlays.forEach((overlay) => {
    overlay.addEventListener('click', closeAllModals);
  });

  noteGrid.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('fa-trash')) {
      const noteId = target.dataset.id;
      deleteNote(noteId);
    }

    if(target.classList.contains('fa-edit')){
      console.log('Edit Button Clicked');
      const noteId = target.dataset.id;
      editNote(noteId);
    }
  });

  cancelAddBtn.addEventListener('click', closeAllModals);
  cancelEditBtn.addEventListener('click', closeAllModals);

  function init() {
    applyAllFilters();
  }

  init();
})();
