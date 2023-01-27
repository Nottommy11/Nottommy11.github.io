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
  tabItem.addEventListener("click", setActiveTab());
}

function setActiveTab() {
  for (let i = 0; i < tabList.childNodes.length; i++) {
    console.log(tabList.childNodes[i]);
  }

  console.log(tabList.childNodes[1]);
  console.log(tabList.childNodes[1]);
  console.log(tabName);
  if (!tabList.length == 0) {
    //Remove the active class from the current tab
    const currentTab = document.querySelector(".active");
    currentTab.classList.remove("active");

    //Add the active class to the clicked tab
    this.classList.add("active");

    //Remove the active class from the current todo list
    const currentTodoList = document.querySelector(".active-todo-list");
    currentTodoList.classList.remove("active-todo-list");

    console.log("Tab name: ", tabName);

    //Add the active class to the clicked todo list
    const todoListID = this.dataset.id;
    const todoList = document.getElementById(todoListID);
    todoList.classList.add("active-todo-list");
  }
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
