// ============================================
// STATE MANAGEMENT
// ============================================
class TodoApp {
    constructor() {
        this.todos = this.loadFromStorage();
        this.darkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.applyDarkMode();
        this.render();
        this.updateStats();
    }

    // ============================================
    // STORAGE OPERATIONS
    // ============================================
    loadFromStorage() {
        const stored = localStorage.getItem('todos');
        return stored ? JSON.parse(stored) : [];
    }

    saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    // ============================================
    // CRUD OPERATIONS
    // ============================================
    addTodo(text, category, priority, dueDate) {
        const todo = {
            id: Date.now(),
            text: text.trim(),
            category,
            priority,
            dueDate: dueDate || null,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.saveToStorage();
        this.render();
        this.updateStats();
        this.showNotification('Todo added successfully!', 'success');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this todo?')) {
            this.todos = this.todos.filter(t => t.id !== id);
            this.saveToStorage();
            this.render();
            this.updateStats();
            this.showNotification('Todo deleted!', 'info');
        }
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        const newText = prompt('Edit todo:', todo.text);
        if (newText && newText.trim()) {
            todo.text = newText.trim();
            this.saveToStorage();
            this.render();
            this.showNotification('Todo updated!', 'success');
        }
    }

    // ============================================
    // FILTER & SEARCH
    // ============================================
    getFilteredTodos() {
        const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const categoryFilter = document.getElementById('filterCategory')?.value || 'all';
        const statusFilter = document.getElementById('filterStatus')?.value || 'all';

        return this.todos.filter(todo => {
            const matchesSearch = todo.text.toLowerCase().includes(search);
            const matchesCategory = categoryFilter === 'all' || todo.category === categoryFilter;
            const matchesStatus = statusFilter === 'all' || 
                (statusFilter === 'completed' && todo.completed) ||
                (statusFilter === 'active' && !todo.completed);

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }

    // ============================================
    // UI RENDERING
    // ============================================
    render() {
        const filteredTodos = this.getFilteredTodos();
        const listEl = document.getElementById('todoList');
        const emptyEl = document.getElementById('emptyState');

        if (filteredTodos.length === 0) {
            listEl.innerHTML = '';
            emptyEl?.classList.remove('hidden');
            return;
        }

        emptyEl?.classList.add('hidden');
        listEl.innerHTML = filteredTodos.map(todo => this.createTodoHTML(todo)).join('');
    }

    createTodoHTML(todo) {
        const priorityColors = {
            low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        };

        const categoryIcons = {
            personal: 'fa-user',
            work: 'fa-briefcase',
            shopping: 'fa-shopping-cart',
            health: 'fa-heartbeat'
        };

        const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

        return `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow ${todo.completed ? 'opacity-60' : ''}">
                <div class="flex items-start gap-4">
                    <input 
                        type="checkbox" 
                        ${todo.completed ? 'checked' : ''} 
                        onchange="app.toggleTodo(${todo.id})"
                        class="w-5 h-5 mt-1 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <div class="flex-1">
                        <p class="${todo.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white'} text-lg mb-2">
                            ${this.escapeHtml(todo.text)}
                        </p>
                        
                        <div class="flex flex-wrap gap-2 mb-2">
                            <span class="px-2 py-1 rounded text-xs ${priorityColors[todo.priority]}">
                                ${todo.priority.toUpperCase()}
                            </span>
                            <span class="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                <i class="fas ${categoryIcons[todo.category]}"></i> ${todo.category}
                            </span>
                            ${todo.dueDate ? `
                                <span class="px-2 py-1 rounded text-xs ${isOverdue ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}">
                                    <i class="fas fa-calendar"></i> ${this.formatDate(todo.dueDate)}
                                    ${isOverdue ? ' (Overdue)' : ''}
                                </span>
                            ` : ''}
                        </div>
                        
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                            Created: ${this.formatDateTime(todo.createdAt)}
                        </div>
                    </div>
                    
                    <div class="flex gap-2">
                        <button 
                            onclick="app.editTodo(${todo.id})"
                            class="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded transition-colors"
                            title="Edit"
                        >
                            <i class="fas fa-edit"></i>
                        </button>
                        <button 
                            onclick="app.deleteTodo(${todo.id})"
                            class="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded transition-colors"
                            title="Delete"
                        >
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ============================================
    // STATISTICS
    // ============================================
    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const active = total - completed;
        const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

        document.getElementById('statTotal').textContent = total;
        document.getElementById('statActive').textContent = active;
        document.getElementById('statCompleted').textContent = completed;
        document.getElementById('statRate').textContent = rate + '%';
    }

    // ============================================
    // DARK MODE
    // ============================================
    applyDarkMode() {
        if (this.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('darkMode', this.darkMode);
        this.applyDarkMode();
    }

    // ============================================
    // EXPORT/IMPORT
    // ============================================
    exportData() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        this.showNotification('Data exported successfully!', 'success');
    }

    // ============================================
    // UTILITIES
    // ============================================
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    showNotification(message, type = 'info') {
        // Simple notification (you can enhance this)
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

// ============================================
// INITIALIZE APP
// ============================================
const app = new TodoApp();

// ============================================
// GLOBAL FUNCTIONS (for HTML onclick)
// ============================================
function addTodo(event) {
    event.preventDefault();
    const text = document.getElementById('todoInput').value;
    const category = document.getElementById('todoCategory').value;
    const priority = document.getElementById('todoPriority').value;
    const dueDate = document.getElementById('todoDueDate').value;

    if (text.trim()) {
        app.addTodo(text, category, priority, dueDate);
        event.target.reset();
    }
}

function filterTodos() {
    app.render();
}

function toggleDarkMode() {
    app.toggleDarkMode();
}

function exportData() {
    app.exportData();
}