function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let template = document.getElementById("taskTemplate");
    let taskClone = template.content.cloneNode(true);
    let taskLi = taskClone.querySelector("li");

    taskLi.classList.add("new-task"); 

    taskClone.querySelector(".task-text").textContent = taskText;

    document.getElementById("taskList").appendChild(taskClone);
    taskInput.value = "";
    taskInput.focus();

    saveTasks();
}

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {  
        addTask(); 
    }
});

function editTask(button) {
    let li = button.closest('li');
    let span = li.querySelector(".task-text");
    let newText = prompt("Edite sua tarefa:", span.textContent);

    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
        saveTasks();
    }
}

function completeTask(button) {
    let li = button.closest('li');
    li.classList.toggle("completed");  
    saveTasks();
}

function removeTask(button) {
    let li = button.closest('li');  
    li.parentElement.removeChild(li);
    saveTasks();
}

// Função para salvar as tarefas no localStorage
function saveTasks() {
    const taskList = [];
    const tasks = document.querySelectorAll("#taskList li");
    tasks.forEach(task => {
        const taskText = task.querySelector(".task-text").textContent;
        const taskCompleted = task.classList.contains("completed");
        taskList.push({ text: taskText, completed: taskCompleted });
    });
    localStorage.setItem("tasks", JSON.stringify(taskList));  // Salva no localStorage
}

// Função para carregar as tarefas do localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
        savedTasks.forEach(taskData => {
            const taskText = taskData.text;
            const taskCompleted = taskData.completed;
            addTaskToList(taskText, taskCompleted);
        });
    }
}

// Função reutilizável para adicionar tarefa na lista
function addTaskToList(taskText, completed) {
    let template = document.getElementById("taskTemplate");
    let taskClone = template.content.cloneNode(true);
    let taskLi = taskClone.querySelector("li");

    taskLi.classList.add("new-task");
    if (completed) taskLi.classList.add("completed");  // Marca a tarefa como concluída, se necessário

    taskClone.querySelector(".task-text").textContent = taskText;

    document.getElementById("taskList").appendChild(taskClone);
}

// Carrega as tarefas ao iniciar a página
window.onload = loadTasks;
