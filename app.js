//alert('Just click on the "+" icons!');

//SELECTORS

//TABS
const tabList = document.querySelector(".tab-list");
const tabButton = document.querySelector(".add-tab-btn");
const addTabContainer = document.querySelector(".add-tab-container");
const closeAddTab = document.querySelector(".close-add-tab-btn");
const addTabForm = document.querySelector(".add-tab-form");
const addTabName = document.querySelector(".add-tab-name");

//TODOS
const todoList = document.querySelector(".todo-list");

const todoButton = document.querySelector(".add-todo-btn");
const addTodoContainer = document.querySelector(".add-todo-container");
const closeAddTodo = document.querySelector(".close-add-todo-btn");
const addTodoForm = document.querySelector(".add-todo-form");
const addTodoAutofill = document.querySelector(".add-todo-autofill");
const addTodoLink = document.querySelector(".add-todo-link");
const addTodoName = document.querySelector(".add-todo-name");
const addTodoDesc = document.querySelector(".add-todo-desc");

const todoSettingsBtn = document.querySelector(".todo-settings-btn");

//EVENT LISTENERS

//TABS
tabButton.addEventListener("click", function () {
  addTabContainer.style.display = "flex";
  addTabName.focus();
});

closeAddTab.addEventListener("click", function () {
  addTabContainer.style.display = "none";
});

addTabForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = addTabName.value;

  if (!name) {
    alert("Please enter a tab name!");
    return;
  }

  addTab(name);

  addTabContainer.style.display = "none";

  addTabName.value = "";
});

//TODOS
todoButton.addEventListener("click", function () {
  addTodoContainer.style.display = "flex";
  addTodoName.focus();
});

closeAddTodo.addEventListener("click", function () {
  addTodoContainer.style.display = "none";
});

addTodoAutofill.addEventListener("click", function () {
  if (addTodoLink.value == "") {
    alert("Please enter a link first!");
    addTodoAutofill.checked = false;
    return;
  }

  if (addTodoAutofill.checked) {
    //addTodoName.value = "Autofilled!";
    addTodoName.value = loadInfo(addTodoLink.value);
    addTodoDesc.value = "This is an autofilled todo!";
  } else {
    addTodoName.value = "";
    addTodoDesc.value = "";
  }
});

addTodoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const link = addTodoLink.value;
  const name = addTodoName.value;
  const desc = addTodoDesc.value;

  if (!link) {
    alert("Please enter a link!");
    return;
  }

  const thumbnail = get_youtube_thumbnail(link, "max");

  if (!name) {
    alert("Please enter a todo name!");
    return;
  }

  addTodo(thumbnail, name, desc);

  addTodoContainer.style.display = "none";

  addTodoLink.value = "";
  addTodoName.value = "";
  addTodoDesc.value = "";
  addTodoAutofill.checked = false;
});

//FUNCTIONS

//TABS
function addTab(name) {
  //Prevent form from submitting
  event.preventDefault();

  const tabBtn = document.createElement("button");
  tabBtn.classList.add("tab-btn");

  const tabItem = document.createElement("div");
  tabItem.innerText = name;
  tabItem.classList.add("tab-item");
  tabBtn.appendChild(tabItem);

  const tabDelete = document.createElement("button");
  tabDelete.classList.add("tab-delete-btn");
  tabBtn.appendChild(tabDelete);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi", "bi-x");
  tabDelete.appendChild(deleteIcon);

  tabList.appendChild(tabBtn);

  tabDelete.addEventListener("click", tabStatusCheck);
}

function tabStatusCheck(e) {
  const item = e.target;

  //DELETE TAB
  const tab = item.parentElement;

  //Animation
  tab.classList.add("tab-fall");
  tab.addEventListener("transitionend", function () {
    tabList.removeChild(tab);
  });
}

//TODOS
function addTodo(thumbnail, name, desc) {
  //Prevent form from submitting
  event.preventDefault();

  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const todoImg = document.createElement("img");
  todoImg.src = thumbnail;
  todoImg.classList.add("todo-img");
  todoItem.appendChild(todoImg);

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

//TESTING GET YOUTUBE THUMBNAIL
function get_youtube_thumbnail(url, quality) {
  if (url) {
    let video_id, thumbnail, result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      video_id = result.pop();
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      video_id = result.pop();
    }

    if (video_id) {
      if (typeof quality == "undefined") {
        quality = "high";
      }

      const quality_key = "maxresdefault"; // Max quality
      if (quality == "low") {
        quality_key = "sddefault";
      } else if (quality == "medium") {
        quality_key = "mqdefault";
      } else if (quality == "high") {
        quality_key = "hqdefault";
      }

      const thumbnail =
        "http://img.youtube.com/vi/" + video_id + "/" + quality_key + ".jpg";
      return thumbnail;
    }
  }
  return "./img/youtube.jpg";
}

var loadInfo = function (url) {
  if (url) {
    let videoId, result;
    if ((result = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/))) {
      videoId = result.pop();
    } else if ((result = url.match(/youtu.be\/(.{11})/))) {
      videoId = result.pop();
    }

    const gdata = document.createElement("script");
    gdata.src =
      "https://www.googleapis.com/youtube/v3/videos?id=" +
      videoId +
      "&key=YOUTUBE_TITLE_API_KEY%20&part=snippet";
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(gdata);
  }
};

const storeInfo = function (info) {
  console.log(info.data.title);
};
