document.addEventListener("DOMContentLoaded", getTabs());

function displayAddTab() {
  tl.fromTo(
    ".add-tab-container",
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

function hideAddTab() {
  tl.fromTo(
    ".add-tab-container",
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

function addTab(name) {
  //Prevent form from submitting
  event.preventDefault();

  const tabItem = createTab(name);

  const activeTab = document.querySelector(".tab.active");
  if (activeTab != null && activeTab != "undefined") {
    activeTab.classList.remove("active");
  }
  tabItem.classList.add("active");

  const activeTodos = document.querySelectorAll(".todo.active");
  activeTodos.forEach(function (todo) {
    todo.classList.remove("active");
  });

  const todos = document.querySelectorAll("#" + name);
  todos.forEach(function (todo) {
    todo.classList.add("active");
  });

  saveLocalTabs(name);
}

function createTab(name) {
  const tabItem = document.createElement("li");
  tabItem.innerText = name;
  tabItem.classList.add("tab");

  const tabDelete = document.createElement("button");
  tabDelete.classList.add("tab-delete-btn");
  tabItem.appendChild(tabDelete);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi", "bi-x");
  tabDelete.appendChild(deleteIcon);

  tabList.appendChild(tabItem);

  tabItem.addEventListener("click", function () {
    const activeTab = document.querySelector(".tab.active");
    if (activeTab != null && activeTab != "undefined") {
      activeTab.classList.remove("active");
    }
    tabItem.classList.add("active");

    const activeTodos = document.querySelectorAll(".todo.active");
    activeTodos.forEach(function (todo) {
      todo.classList.remove("active");
    });

    const todos = document.querySelectorAll("#" + name);
    todos.forEach(function (todo) {
      todo.classList.add("active");
    });
  });

  tabDelete.addEventListener("click", tabStatusCheck);

  return tabItem;
}

//DELETING A TAB
function tabStatusCheck(e) {
  const item = e.target;

  //DELETE TAB
  const tab = item.parentElement;

  //Animation
  tab.classList.add("tab-fall");

  removeLocalTabs(tab.innerText);

  tab.addEventListener("transitionend", function () {
    const childrenTodos = document.querySelectorAll("#" + tab.innerText);
    childrenTodos.forEach(function (todo) {
      todo.classList.remove("active");
    });
    tabList.removeChild(tab);
  });
}

function saveLocalTabs(tab) {
  let tabs = checkLocalTabs();
  tabs.push(tab);
  localStorage.setItem("tabs", JSON.stringify(tabs));
}

function checkLocalTabs() {
  let tabs;
  if (localStorage.getItem("tabs") === null) {
    tabs = [];
  } else {
    tabs = JSON.parse(localStorage.getItem("tabs"));
  }
  return tabs;
}

function getTabs() {
  let tabs = checkLocalTabs();
  tabs.forEach(function (tab) {
    createTab(tab);
  });
  const activeTab = document.querySelector(".tab");
  activeTab.classList.add("active");
}

function removeLocalTabs(tab) {
  let tabs = checkLocalTabs();
  const tabIndex = tabs.indexOf(tab);
  tabs.splice(tabIndex, 1);
  localStorage.setItem("tabs", JSON.stringify(tabs));
}
