// let taskList = document.getElementById("taskList");
// let taskInput = document.getElementById("taskInput");
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function addTask(event) {
    // let task = taskInput.value;
    // console.log(task);

    let taskObject = {
        // taskName: task,
        taskName: event.target.elements.taskName.value,
        taskId: new Date().getTime(),
        status: false
    };
    tasks.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
    taskInput.value = '';

}

function displayTasks(completedTask = false, pandingTask = false) {
    taskList.innerHTML = '';
    tasks.forEach(function (taskObject) {
        //condition for buttons 
        if ((completedTask && taskObject.status) || (pandingTask && !taskObject.status) || (!completedTask && !pandingTask)) {

            let li = document.createElement('li');
            li.innerHTML = taskObject.taskName;
            //disply task
            li.onclick = function () {
                // console.log(taskObject.status);
                taskObject.status = !taskObject.status;
                // console.log(taskObject.status);
                localStorage.setItem('tasks', JSON.stringify(tasks));
                displayTasks(completedTask, pandingTask);
            }
            let statusoftask = taskObject.status ? 'x' : 'o';
            li.innerHTML += ' ' + statusoftask + ' ' + ' ';
            // console.log(li.innerHTML);
            let deleteButton = document.createElement('button');
            deleteButton.innerHTML = 'Delete';
            deleteButton.onclick = function () {
                tasks = tasks.filter(function (obj) {
                    // console.log(obj.taskId);
                    // console.log(taskObject.taskId);
                    return obj.taskId !== taskObject.taskId;
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
                displayTasks(completedTask, pandingTask);
            }
            li.appendChild(deleteButton);
            // taskList.appendChild(li);
            document.getElementById("taskList").appendChild(li);
        }
    });
}
function allTask() {
    displayTasks(true, true);
}

function pandingTask() {
    displayTasks(false, true);
}
function completedTask() {
    displayTasks(true, false);
}
displayTasks();

























