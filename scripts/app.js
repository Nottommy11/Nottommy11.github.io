alert('Just click on the "+" icons and insert a YouTube link!');

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

//AUTOFILL THE TODO NAME WITH YOUTUBE VIDEO TITLE
addTodoAutofill.addEventListener("click", function () {
  if (addTodoLink.value == "") {
    alert("Please enter a link first!");
    addTodoAutofill.checked = false;
    return;
  }

  if (addTodoAutofill.checked) {
    const youtubeAPIKey = YOUTUBE_TITLE_API_KEY;

    const videoID = GetYouTubeVideoID(addTodoLink.value);

    GetYouTubeVideoTitle(videoID, youtubeAPIKey);
  } else {
    addTodoName.value = "";
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

  const videoID = GetYouTubeVideoID(link);

  const thumbnail = getYouTubeThumbnail(videoID);

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
