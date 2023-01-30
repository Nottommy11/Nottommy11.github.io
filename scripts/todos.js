document.addEventListener("DOMContentLoaded", getTodos());

function displayPreviewImg(event) {
  var reader = new FileReader();
  reader.onload = function () {
    addTodoPreviewImg.src = reader.result;
    thumbnail = reader.result;
    addTodoPreviewImg.style.display = "flex";
  };
  reader.readAsDataURL(event.target.files[0]);
}

function displayYouTubePreviewImg(youtubeImg) {
  addTodoPreviewImg.src = youtubeImg;
  thumbnail = youtubeImg;
  addTodoPreviewImg.style.display = "flex";
}

function clearAddTodoFileInput(id) {
  const oldInput = document.querySelector(id);

  const newInput = document.createElement("input");

  newInput.type = "file";
  //newInput.id = oldInput.id;
  //newInput.name = oldInput.name;
  newInput.className = oldInput.className;
  newInput.style.cssText = oldInput.style.cssText;
  newInput.accept = oldInput.accept;
  newInput.onchange = oldInput.onchange;
  // TODO: copy any other relevant attributes

  oldInput.parentNode.replaceChild(newInput, oldInput);
}

function displayAddTodo() {
  tl.fromTo(
    ".add-todo-container",
    { opacity: 0, y: -50, display: "none" },
    { display: "flex", opacity: 1, y: 0 }
  );
  tl.fromTo(
    ".modal-bg",
    { opacity: 0, display: "none" },
    { display: "flex", opacity: 1 },
    "<"
  );
}

function hideAddTodo() {
  tl.fromTo(
    ".add-todo-container",
    { display: "flex", opacity: 1, y: 0 },
    { opacity: 0, y: -50, display: "none" }
  );
  tl.fromTo(
    ".modal-bg",
    { display: "flex", opacity: 1 },
    { opacity: 0, display: "none" },
    "<"
  );
}

function addTodo(link, thumbnail, name, desc) {
  //Prevent form from submitting
  event.preventDefault();

  const activeTab = document.querySelector(".tab.active");

  const todoItem = document.createElement("li");
  todoItem.classList.add("todo");
  todoItem.id = activeTab.innerText.toLowerCase();

  const todoLink = document.createElement("a");
  todoLink.href = link;
  todoLink.classList.add("todo-link");
  todoLink.target = "_blank";
  todoItem.appendChild(todoLink);

  const todoImg = document.createElement("img");
  todoImg.src = thumbnail;
  todoImg.classList.add("todo-img");
  todoLink.appendChild(todoImg);

  const todoTextContainer = document.createElement("div");
  todoTextContainer.classList.add("todo-text-container");
  todoItem.appendChild(todoTextContainer);

  const todoName = document.createElement("div");
  todoName.innerText = name;
  todoName.classList.add("todo-name");
  todoTextContainer.appendChild(todoName);

  const todoDesc = document.createElement("div");
  todoDesc.innerText = desc;
  todoDesc.classList.add("todo-desc");
  todoTextContainer.appendChild(todoDesc);

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

  const todoSettingsContainer = document.createElement("div");
  todoSettingsContainer.classList.add("todo-settings-container");
  todoOptions.appendChild(todoSettingsContainer);

  const editTodoTextBtn = document.createElement("button");
  editTodoTextBtn.innerText = "Edit Text";
  editTodoTextBtn.classList.add("edit-todo-text-btn");
  todoSettingsContainer.appendChild(editTodoTextBtn);

  const moveTodoBtn = document.createElement("button");
  moveTodoBtn.innerText = "Move Todo";
  moveTodoBtn.classList.add("move-todo-btn");
  todoSettingsContainer.appendChild(moveTodoBtn);

  const todoDeleteBtn = document.createElement("button");
  todoDeleteBtn.classList.add("todo-delete-btn");
  todoOptions.appendChild(todoDeleteBtn);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi", "bi-trash3");
  todoDeleteBtn.appendChild(deleteIcon);

  todoList.appendChild(todoItem);

  todoItem.classList.add("active");

  todoDeleteBtn.addEventListener("click", todoStatusCheck);
  todoCompleteBtn.addEventListener("click", todoStatusCheck);
  todoSettingsBtn.addEventListener("click", todoStatusCheck);

  const tab = activeTab.innerText.toLowerCase();

  saveLocalTodos({ tab, link, thumbnail, name, desc });
}

function createLocalTodo(tab, link, thumbnail, name, desc) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo");
  todoItem.id = tab;

  const todoLink = document.createElement("a");
  todoLink.href = link;
  todoLink.classList.add("todo-link");
  todoLink.target = "_blank";
  todoItem.appendChild(todoLink);

  const todoImg = document.createElement("img");
  todoImg.src = thumbnail;
  todoImg.classList.add("todo-img");
  todoLink.appendChild(todoImg);

  const todoTextContainer = document.createElement("div");
  todoTextContainer.classList.add("todo-text-container");
  todoItem.appendChild(todoTextContainer);

  const todoName = document.createElement("div");
  todoName.innerText = name;
  todoName.classList.add("todo-name");
  todoTextContainer.appendChild(todoName);

  const todoDesc = document.createElement("div");
  todoDesc.innerText = desc;
  todoDesc.classList.add("todo-desc");
  todoTextContainer.appendChild(todoDesc);

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

  const todoSettingsContainer = document.createElement("div");
  todoSettingsContainer.classList.add("todo-settings-container");
  todoOptions.appendChild(todoSettingsContainer);

  const editTodoTextBtn = document.createElement("button");
  editTodoTextBtn.innerText = "Edit Text";
  editTodoTextBtn.classList.add("edit-todo-text-btn");
  todoSettingsContainer.appendChild(editTodoTextBtn);

  const moveTodoBtn = document.createElement("button");
  moveTodoBtn.innerText = "Move Todo";
  moveTodoBtn.classList.add("move-todo-btn");
  todoSettingsContainer.appendChild(moveTodoBtn);

  const todoDeleteBtn = document.createElement("button");
  todoDeleteBtn.classList.add("todo-delete-btn");
  todoOptions.appendChild(todoDeleteBtn);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi", "bi-trash3");
  todoDeleteBtn.appendChild(deleteIcon);

  todoList.appendChild(todoItem);

  todoDeleteBtn.addEventListener("click", todoStatusCheck);
  todoCompleteBtn.addEventListener("click", todoStatusCheck);
  todoSettingsBtn.addEventListener("click", todoStatusCheck);
}

function todoStatusCheck(e) {
  const item = e.target;

  //DELETE TODO
  if (item.classList[0] === "todo-delete-btn") {
    const todo = item.parentElement.parentElement;

    //Animation
    todo.classList.add("todo-fall");

    removeLocalTodos(todo.innerText);

    console.log(todo.innerText);

    todo.addEventListener("transitionend", function () {
      todoList.removeChild(todo);
    });
  }

  //CHECK MARK
  if (item.classList[0] === "todo-complete-btn") {
    const todo = item.parentElement.parentElement;
    todo.classList.toggle("completed");

    item.classList.toggle("completed-btn");
  }

  //SETTINGS
  if (item.classList[0] === "todo-settings-btn") {
    const todoSettingsContainer = item.parentElement.children[2];

    if (todoSettingsContainer.style.display === "flex") {
      todoSettingsContainer.style.display = "none";
      item.classList.toggle("settings-displayed");
    } else {
      todoSettingsContainer.style.display = "flex";
      item.classList.toggle("settings-displayed");
    }
  }
}

function saveLocalTodos(todo) {
  let todos = checkLocalTodos();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function getTodos() {
  let todos = checkLocalTodos();
  todos.forEach(function (todo) {
    createLocalTodo(todo.tab, todo.link, todo.thumbnail, todo.name, todo.desc);
  });
}

function removeLocalTodos(todo) {
  let todos = checkLocalTodos();
  let todoIndex;

  for (let i = 0; i < todos.length; i++) {
    if (todos[i].name === todo) {
      todoIndex = i;
    }
  }

  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
