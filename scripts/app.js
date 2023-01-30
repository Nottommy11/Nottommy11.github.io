//alert('Just click on the "+" icons and insert a YouTube link!');

//SELECTORS
const modalBg = document.querySelector(".modal-bg");
let thumbnail;

const tl = gsap.timeline({
  defaults: { duration: 0.25, ease: "power2.inOut" },
});

//TABS
const tabList = document.querySelector(".tab-list");
const tabs = document.querySelectorAll("[data-tab-target]");
const tabName = document.querySelector(".tab");
const addTabBtn = document.querySelector(".add-tab-btn");
const addTabContainer = document.querySelector(".add-tab-container");
const closeAddTab = document.querySelector(".close-add-tab-btn");
const addTabForm = document.querySelector(".add-tab-form");
const addTabName = document.querySelector(".add-tab-name");

//TODOS
const tabContents = document.querySelectorAll("[data-tab-content]");

const todoList = document.querySelector(".todo-list");

const todoButton = document.querySelector(".add-todo-btn");
const addTodoContainer = document.querySelector(".add-todo-container");
const closeAddTodo = document.querySelector(".close-add-todo-btn");
const addTodoForm = document.querySelector(".add-todo-form");
const addTodoAutofill = document.querySelector(".add-todo-autofill");
const addTodoImg = document.querySelector(".add-todo-img");
const addTodoPreviewImg = document.querySelector("#add-todo-preview-img");
const addTodoLink = document.querySelector(".add-todo-link");
const addTodoName = document.querySelector(".add-todo-name");
const addTodoDesc = document.querySelector(".add-todo-desc");

const todoSettingsBtn = document.querySelector(".todo-settings-btn");

//EVENT LISTENERS

//CLOSE MODALS WITH ESCAPE KEY
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (addTodoContainer.style.display == "flex") {
      hideAddTodo();
      addTodoPreviewImg.style.display = "none";
      addTodoPreviewImg.src = "";
      clearAddTodoFileInput(".add-todo-image");

      addTodoLink.value = "";
      addTodoName.value = "";
      addTodoDesc.value = "";

      addTodoAutofill.checked = false;
    }

    if (addTabContainer.style.display == "flex") {
      hideAddTab();
      addTabName.value = "";
    }
  }
});

//TABS
addTabBtn.addEventListener("click", function () {
  displayAddTab();

  addTabName.focus();
});

closeAddTab.addEventListener("click", function () {
  hideAddTab();

  addTabName.value = "";
});

addTabForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = addTabName.value;

  if (!name) {
    alert("Please enter a tab name!");
    return;
  }

  const tabNames = document.querySelectorAll(".tab");
  tabNames.forEach((tabName) => {
    if (tabName.innerText.toLowerCase() == name.toLowerCase()) {
      alert("Tab name already exists!");
      return;
    }
  });

  addTab(name);

  hideAddTab();

  addTabName.value = "";
});

//TODOS
todoButton.addEventListener("click", function () {
  const activeTab = document.querySelector(".tab.active");
  if (activeTab == null) {
    alert("Please create or select a tab first!");
    return;
  }

  displayAddTodo();

  while (addTodoContainer.style.display == "flex") {
    console.log("waiting");

    addTodoLink.focus();
  }
});

closeAddTodo.addEventListener("click", function () {
  hideAddTodo();

  addTodoPreviewImg.style.display = "none";
  addTodoPreviewImg.src = "";
  clearAddTodoFileInput(".add-todo-image");

  addTodoLink.value = "";
  addTodoName.value = "";
  addTodoDesc.value = "";

  addTodoAutofill.checked = false;
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

  if (!thumbnail) {
    thumbnail = "../img/youtube.jpg";
  }

  addTodo(link, thumbnail, name, desc);

  tl.fromTo(
    ".add-todo-container",
    { display: "flex", opacity: 1, y: 0 },
    { opacity: 0, y: -50, display: "none" }
  );

  tl.fromTo(
    ".loading-circle",
    { rotation: "0deg" },
    {
      display: "flex",
      rotation: "360deg",
      repeat: 1,
      ease: "none",
      duration: 1,
    }
  );

  tl.to("#bar", { display: "none", opacity: 0, duration: 0.25 }, "<85%");

  tl.to("#circle", { fill: "rgb(34, 218, 50)", opacity: 1 });
  tl.to(".modal-check", { display: "flex", opacity: 1 }, "<");
  tl.to(".modal-added-text", { display: "flex", opacity: 1 }, "<");

  tl.to(".modal-bg", { duration: 1 });

  tl.to(".loading-circle", { display: "none", opacity: 0 });

  tl.to(".modal-check", { display: "none", opacity: 0 }, "<");
  tl.to(".modal-added-text", { display: "none", opacity: 0 }, "<");

  tl.fromTo(
    ".modal-bg",
    { display: "flex", opacity: 1 },
    { opacity: 0, display: "none" },
    "<"
  );

  tl.to(".loading-circle", { opacity: 1 });
  tl.to("#bar", { display: "flex", opacity: 1 });
  tl.to("#circle", { fill: "black", opacity: 0.2 });

  clearAddTodoFileInput(".add-todo-image");
  addTodoPreviewImg.src = "";
  addTodoPreviewImg.style.display = "none";

  addTodoLink.value = "";
  addTodoName.value = "";
  addTodoDesc.value = "";

  addTodoAutofill.checked = false;
});
