let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    } else {
        alert('Please enter a task.');
    }
}

function toggleTaskCompleted(id) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = true;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasksString = localStorage.getItem('tasks');
    tasks = tasksString ? JSON.parse(tasksString) : [];
    renderTasks();
}

function renderTasks() {
    const taskListContainer = document.getElementById('taskList');
    taskListContainer.innerHTML = '';
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item', 'mb-2', 'd-flex', 'align-items-center', 'justify-content-between');
        taskItem.innerHTML = `
            <span class="task-text ${task.completed ? 'completed mr-2' : ''}">${task.text}</span>
            <div>
                ${!task.completed ? `<button class="btn btn-outline-success btn-sm mr-2" onclick="toggleTaskCompleted(${task.id})">Marcar como completada</button>` : ''}
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Borrar</button>
            </div>
        `;
        taskListContainer.appendChild(taskItem);
    });
}

// Cargar tareas almacenadas al cargar la página
window.onload = function() {
    loadTasks();
};
