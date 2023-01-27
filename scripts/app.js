alert('Just click on the "+" icons and insert a YouTube link!');

//SELECTORS

const modalBg = document.querySelector(".modal-bg");
let thumbnail;

//TABS
const tabList = document.querySelector(".tab-list");
const tabItem = document.querySelector(".tab-btn");
const tabName = document.querySelector(".tab-item");
const addTabBtn = document.querySelector(".add-tab-btn");
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
const addTodoImg = document.querySelector(".add-todo-img");
const addTodoPreviewImg = document.getElementById("add-todo-preview-img");
const addTodoLink = document.querySelector(".add-todo-link");
const addTodoName = document.querySelector(".add-todo-name");
const addTodoDesc = document.querySelector(".add-todo-desc");

const todoSettingsBtn = document.querySelector(".todo-settings-btn");

//EVENT LISTENERS

//CLOSE MODALS WITH ESCAPE KEY
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    addTabContainer.style.display = "none";
    addTodoContainer.style.display = "none";
    modalBg.style.display = "none";
  }
});

function displayPreviewImg(event) {
  var reader = new FileReader();
  reader.onload = function () {
    addTodoPreviewImg.src = reader.result;
    thumbnail = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

function displayYouTubePreviewImg(youtubeImg) {
  addTodoPreviewImg.src = youtubeImg;
  thumbnail = youtubeImg;
}

//TABS
addTabBtn.addEventListener("click", function () {
  addTabContainer.style.display = "flex";
  modalBg.style.display = "flex";
  addTabName.focus();
});

closeAddTab.addEventListener("click", function () {
  addTabContainer.style.display = "none";
  modalBg.style.display = "none";
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
  modalBg.style.display = "none";

  addTabName.value = "";
});

//TODOS
todoButton.addEventListener("click", function () {
  addTodoContainer.style.display = "flex";
  modalBg.style.display = "flex";
  addTodoLink.focus();
});

closeAddTodo.addEventListener("click", function () {
  addTodoContainer.style.display = "none";
  modalBg.style.display = "none";
});

//AUTOFILL THE TODO NAME WITH YOUTUBE VIDEO TITLE
addTodoAutofill.addEventListener("click", function () {
  if (addTodoLink.value == "") {
    alert("Please enter a link first!");
    addTodoAutofill.checked = false;
    return;
  }

  if (addTodoAutofill.checked) {
    //Would like to hide this, but it's not working through GitHub and requires more work to figure out, but the API key is limited to this website
    const youtubeAPIKey = "AIzaSyBXEUbzPW5RpHxdsxii4a4Ug4vHyyUYc4Y%20";
    //const youtubeAPIKey = YOUTUBE_TITLE_API_KEY

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

  if (!name) {
    alert("Please enter a todo name!");
    return;
  }

  addTodo(thumbnail, name, desc);

  addTodoLink.value = "";
  clearAddTodoFileInput(".add-todo-image");
  addTodoPreviewImg.src = "";
  addTodoName.value = "";
  addTodoDesc.value = "";
  addTodoAutofill.checked = false;

  addTodoContainer.style.display = "none";
  modalBg.style.display = "none";
});
