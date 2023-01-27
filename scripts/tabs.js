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
