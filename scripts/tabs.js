//TABS
function addTab(name) {
  //Prevent form from submitting
  event.preventDefault();

  const tabItem = document.createElement("li");
  tabItem.innerText = name;
  tabItem.setAttribute("data-tab-target", "#" + name.toLowerCase());
  tabItem.classList.add("tab");

  const tabDelete = document.createElement("button");
  tabDelete.classList.add("tab-delete-btn");
  tabItem.appendChild(tabDelete);

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("bi", "bi-x");
  tabDelete.appendChild(deleteIcon);

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

  tabList.appendChild(tabItem);

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

  tabDelete.addEventListener("click", tabStatusCheck);
}

//DELETING A TAB
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
