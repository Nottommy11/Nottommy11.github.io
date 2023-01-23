alert('Just click on the "+" icons!');

//SELECTORS
const tabList = document.querySelector(".tab-list");
const tabButton = document.querySelector(".add-tab-btn");
const todoList = document.querySelector(".todo-list");
const todoButton = document.querySelector(".add-todo-btn");

//EVENT LISTENERS
tabButton.addEventListener("click", addTab);
todoButton.addEventListener("click", addTodo);

//FUNCTIONS
function addTab(event) {
  //Prevent form from submitting
  event.preventDefault();

  const tabBtn = document.createElement("button");
  tabBtn.classList.add("tab-btn");

  const tabItem = document.createElement("div");
  tabItem.innerText = "NEW TAB!!";
  tabItem.classList.add("tab-item");
  tabBtn.appendChild(tabItem);

  tabList.appendChild(tabBtn);
}

function addTodo(event) {
  //Prevent form from submitting
  event.preventDefault();

  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const todoImg = document.createElement("img");
  todoImg.src = "./img/youtube.jpg";
  todoImg.classList.add("todo-img");
  todoItem.appendChild(todoImg);

  const todoName = document.createElement("div");
  todoName.innerText = "JAVASCRIPT!!";
  todoName.classList.add("todo-name");
  todoItem.appendChild(todoName);

  const todoOptions = document.createElement("div");
  todoOptions.classList.add("todo-options");
  todoItem.appendChild(todoOptions);

  const todoCompleteBtn = document.createElement("button");
  todoCompleteBtn.classList.add("todo-complete-btn");
  todoOptions.appendChild(todoCompleteBtn);

  const completeIcon = document.createElement("i");
  completeIcon.classList.add("bi", "bi-check-square");
  todoCompleteBtn.appendChild(completeIcon);

  const todoSettingsBtn = document.createElement("button");
  todoSettingsBtn.classList.add("todo-settings-btn");
  todoOptions.appendChild(todoSettingsBtn);

  const settingsIcon = document.createElement("i");
  settingsIcon.classList.add("bi", "bi-gear");
  todoSettingsBtn.appendChild(settingsIcon);

  const todoDeleteBtn = document.createElement("button");
  todoDeleteBtn.classList.add("todo-delete-btn");
  todoOptions.appendChild(todoDeleteBtn);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi", "bi-trash3");
  todoDeleteBtn.appendChild(deleteIcon);

  todoList.appendChild(todoItem);
}
