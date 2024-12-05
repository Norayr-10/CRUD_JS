let task = [
  {
    title: "React Course",
    date: "15-12-2024",
    isDone: false,
  },
];

let tasks = [
  {
    title: "Read Book",
    date: "01-01-2025",
    isDone: true,
  },
  {
    title: "Studing JavaScript",
    date: "10-12-2024",
    isDone: false,
  },
  {
    title: "JavaScript Tasks",
    date: "5-12-2024",
    isDone: false,
  },
  {
    title: "Solving JavaScript Tasks ",
    date: "5-12-2024",
    isDone: true,
  },
];

const getTasksFromStorage = () => {
  let retriveTasks = JSON.parse(localStorage.getItem("tasks"));
  // if (retriveTasks == null) {
  //   tasks = [];
  // } else {
  //   tasks = retriveTasks;
  // }
  tasks = retriveTasks ?? [];
};
getTasksFromStorage();

document.getElementById("tasks").innerHTML = "";
let btn = document.getElementById("btn");
function fillThetasks() {
  document.getElementById("tasks").innerHTML = "";

  let index = 0;
  for (task of tasks) {
    let content = `
       <div id="tasks" >
                <!-- taks -->
                <div class="task ${task.isDone ? "done" : ""} ">
                  <!-- taskInfo -->
                  <div id="taskInfo">
                    <h2>${task.title}</h2>
      
                    <div>
                      <span> ${task.date}</span>
                    </div>
                  </div>
                  <!--// taskInfo //-->
      
                  <!-- tasksAction -->
                  <div class="btn_container">
                    <button class="circular">
                      <span onclick="deletTask(${index})" class="material-symbols-outlined"> D</span>
                    </button>
                    ${
                      task.isDone
                        ? `
                        
                        <button onclick="toggleTaskCompletion(${index})" class="circular" id="clear_button" >C</button>
                       <span class="material-symbols-outlined">
                       X
                       </span>
                        `
                        : `<button onclick="toggleTaskCompletion(${index})" class="circular" id="clear_button">C</button>
`
                    }
                    <button onclick="editTask(${index})" class="circular" id="Edit_button">E</button>
                  </div>
                  <!--// taskAction //-->
                </div>
                
        `;
    document.getElementById("tasks").innerHTML += content;
    index++;
  }
}
fillThetasks();

btn.onclick = () => {
  let taskName = prompt("please Fill The Input");
  let now = new Date();
  let date =
    now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
  let taskObj = {
    title: taskName,
    date: date,
    isDone: "true",
  };
  tasks.push(taskObj);

  fillThetasks();
};

const deletTask = (index) => {
  // alert(index);
  let task = tasks[index];
  let isComfirmed = confirm(`You Sure To Delete The: ${task.title}`);

  if (isComfirmed) {
    tasks.splice(index, 1);
    storeTasks();
    fillThetasks();
  }
  console.log(isComfirmed);
};

const editTask = (index) => {
  let task = tasks[index];
  let newTaskName = prompt("Please Edite The Input", task.title);
  task.title = newTaskName;
  storeTasks();
  fillThetasks();
};

const toggleTaskCompletion = (index) => {
  let task = tasks[index];
  task.isDone = !task.isDone;
  storeTasks();
  fillThetasks();
};

const storeTasks = () => {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
};
