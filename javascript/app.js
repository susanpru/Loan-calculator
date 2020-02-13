//define our ui variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event Listeners
function loadEventListeners()  {
  //add task Event
form.addEventListener('submit', addTask);
//remove tasks
taskList.addEventListener('click', removeTask);
//remove all Tasks event
clearBtn.addEventListener("click", removeAll);
//filter tasks event
filter.addEventListener("keyup", filterTasks);
//DOM load Event
document.addEventListener('DOMContentLoaded', getTasks);

}
//get tasks from ls
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    //create li element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    //create textNode
    li.appendChild(document.createTextNode(task));
    //create new link Element
    const link = document.createElement('a');
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);
  });
}

//add task
function addTask(e) {
  if (taskInput.value === ' ') {
    alert("add a task");
  }
//create li element
const li = document.createElement('li');
// Add Class
li.className = 'collection-item';
//create textNode and append
li.appendChild(document.createTextNode(taskInput.value));
//create new link Element
const link = document.createElement('a');
//add class
link.className = "delete-item secondary-content";
//add icon html
link.innerHTML = '<i class="fa fa-remove"></i>';
//append link to li
li.appendChild(link);
//append li to ul
taskList.appendChild(li);
//store in Local Storage
storeTaskInLocalStorage(taskInput.value);
//clear taskInput
taskInput.value = "";

e.preventDefault();
}
//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove task
function removeTask(e) {
  if(e.target.parentElement.classList.contains("delete-item")) {
    if(confirm("are you sure?")){
    e.target.parentElement.parentElement.remove();
    //remove from ls
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
  }
}
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove all Tasks
function removeAll (e) {
  while(taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
}
clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}


function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function(task){
    const item = task.firstChild.textContent;

    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }


  });
}
