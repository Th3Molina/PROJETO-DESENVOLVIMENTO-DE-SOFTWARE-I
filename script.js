function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;

    let template = document.getElementById("taskTemplate");
    let taskClone = template.content.cloneNode(true);
    let taskLi = taskClone.querySelector("li");  // Pegando o <li> do clone

    taskLi.classList.add("new-task");  // Adicionando a classe de fundo para a nova tarefa

    taskClone.querySelector(".task-text").textContent = taskText;

    document.getElementById("taskList").appendChild(taskClone);
    taskInput.value = "";
    taskInput.focus();
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
    }
}

function completeTask(button) {
    let li = button.closest('li');
    li.classList.toggle("completed");  
}

function removeTask(button) {
    let li = button.closest('li');  
    li.parentElement.removeChild(li);
}