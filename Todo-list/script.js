var taskList = document.getElementById("myUL");
var inputBox = document.getElementById("myInput");
var taskCounter = document.getElementById("task-note");
var testVar = document.getElementById("test");

function addTask(){
    if (isDuplicate()===true){
        alert("Task already on the list");
    }
    else if (inputBox.value === ''){
        alert("You must write something!!!");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        taskList.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        span.className = "close";
    }
    inputBox.value = "";
    saveData();
    updateTask();
}

taskList.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
        updateTask();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        updateTask();
    }
}, false);

function updateTask(){
    const totalTask = taskList.getElementsByTagName("li").length;
    const completedTask = taskList.getElementsByClassName("checked").length;
    taskCounter.textContent = completedTask + "/" + totalTask + " tasks completed.";
}

function saveData(){
    localStorage.setItem("data", taskList.innerHTML);
}

function updateTaskLists(){
var tasks = taskList.querySelectorAll("li");
let taskTexts = [];
tasks.forEach(task => {
    // Get each <li> element's content without the "X" button
    const taskContent = task.firstChild.textContent.trim();
    taskTexts.push(taskContent); // Add to the list
});
return taskTexts;
}

function isDuplicate(){
  let taskTexts = updateTaskLists();
  for (let i = 0; i < taskTexts.length; i++){
        if (inputBox.value === taskTexts[i]){
            return true;
        }
    }
  
  console.log(taskTexts)
}


// Log to console


function showData(){
    taskList.innerHTML = localStorage.getItem("data");
}


showData();

