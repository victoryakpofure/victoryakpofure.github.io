const create = document.querySelector('[name = "to-do"]');
const container = document.querySelector(".container");
const list = document.querySelector(".todo-list__items");
const clear = document.querySelector(".clear");
const info = document.querySelectorAll(".info");
const all = document.querySelectorAll(".all");
const active = document.querySelectorAll(".unfinished");
const finished = document.querySelectorAll(".finished");

let lists;

active.forEach((element) => element.addEventListener("click", activeTodos));
all.forEach((element) => element.addEventListener("click", allTodos));
clear.addEventListener("click", clearCompleted);
create.addEventListener("keypress", addTodo);
document.addEventListener("DOMContentLoaded", allTodos);
finished.forEach((element) =>
  element.addEventListener("click", completedTodos)
);

container.addEventListener("click", (e) => {
  if (e.target.className.includes("info")) {
    info.forEach((elem) => {
      elem.classList.remove("active");
      if (elem == e.target) {
        elem.classList.add("active");
      }
    });
  }
});

list.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() == "input") {
    const todos = list.querySelectorAll("[name='todo-item']");
    todos.forEach((todo) => todo.addEventListener("change", completed));
  } else if (e.target.tagName.toLowerCase() == "button") {
    deleteItem(e.target.previousElementSibling.textContent);
  }
});

function clearElement(element) {
  element.replaceChildren();
}

function render() {
  clearElement(list);
  //   console.log(localStorage);
  if (localStorage.getItem("todos") === null) {
    lists = [];
    console.log(lists);
  } else {
    lists = JSON.parse(localStorage.getItem("todos"));
  }
  document.querySelector(".left").textContent = `${lists.reduce(
    (total, previous) => {
      if (!previous.completed) {
        return (total += 1);
      }
      return total;
    },
    0
  )} items left`;
}

function save() {
  localStorage.setItem("todos", JSON.stringify(lists));
}

function listElement(item, index) {
  let div = document.createElement("div");
  div.classList.add("item");
  div.innerHTML = `
    <input type="checkbox" name="todo-item" id="item${index + 1}" data-key=${
    index + 1
  } />
    <label for="item${index + 1}" class="label">${item.content}</label>
    <button class="delete-item" />`;
  list.appendChild(div);
}

function allTodos() {
  render();

  if (lists.length === 0) {
    let div = document.createElement("div");
    div.classList.add("item");
    let text = document.createElement("span");
    text.classList.add("label");
    text.textContent = "Add new todo";
    div.appendChild(text);
    list.appendChild(div);

    document.querySelector(".left").textContent = "No items yet";
  } else {
    lists.forEach((item, index) => {
      listElement(item, index);
      if (item.completed) {
        document.querySelector(`input[data-key="${index + 1}"]`).checked = true;
      }
    });
  }
}

function activeTodos() {
  render();

  lists
    .filter((item) => !item.completed)
    .map((active, index) => {
      listElement(active, index);
    });
  //   document.querySelector(".all").classList.add("active");
}

//add checkmark to completed todos
function completed(e) {
  let index = lists.findIndex(
    (element) => element.content == e.target.nextElementSibling.textContent
  );
  if (e.target.checked) {
    lists[index].completed = true;
  } else {
    lists[index].completed = false;
  }
  save();
  document.querySelector(".left").textContent = `${lists.reduce(
    (total, previous) => {
      if (!previous.completed) {
        return (total += 1);
      }
      return total;
    },
    0
  )} items left`;
  setTimeout(() => {
    info.forEach((element) => {
      if (
        element.classList.contains("active") &&
        element.classList.contains("unfinished")
      ) {
        activeTodos();
      } else if (
        element.classList.contains("active") &&
        element.classList.contains("finished")
      ) {
        completedTodos();
      }
    });
  }, 500);
}
function completedTodos() {
  render();

  lists
    .filter((item) => item.completed)
    .map((complete, index) => {
      listElement(complete, index);
      if (complete.completed) {
        document.querySelector(`input[data-key="${index + 1}"]`).checked = true;
      }
    });
}

function addTodo(e) {
  if (e.key == "Enter") {
    render();
    
    lists.push({
      content: create.value,
      completed: false,
    });
    localStorage.setItem("todos", JSON.stringify(lists));
    allTodos();
    create.value = ''
  }
}

function deleteItem(value) {
  let index = lists.findIndex((element) => element.content == value);

  lists.splice(index, 1);
  save();
  render();
  console.log(lists);
  console.log(localStorage.getItem("todos"));

  info.forEach((element) => {
    if (
      element.classList.contains("active") &&
      element.classList.contains("unfinished")
    ) {
      activeTodos();
    } else if (
      element.classList.contains("active") &&
      element.classList.contains("all")
    ) {
      allTodos();
    } else if (
      element.classList.contains("active") &&
      element.classList.contains("finished")
    ) {
      completedTodos();
    }
  });
}

function clearCompleted() {
  lists = lists.filter((item) => !item.completed);
  console.log(lists);
  save();
  render();
  allTodos();

  info.forEach((elem) => {
    elem.classList.remove("active");
  });
  all.forEach((element) => element.classList.add("active"));
}

//theme
const icon = document.querySelector(".theme");

window
  .matchMedia("(prefers-color-scheme: light)")
  .addEventListener("change", (e) => {
    window.location.reload();
    if (e.matches) {
      icon.style.background = `url('/images/icon-moon.svg')`;
    } else {
      icon.style.background = `url('/images/icon-sun.svg')`;
    }
  });

//click on the theme switch button
icon.addEventListener("click", () => {
  window.matchMedia("(prefers-color-scheme: light)").matches
    ? darkmode()
    : lightmode();
});

function darkmode() {
  document.body.classList.toggle("dark-theme");
  icon.classList.toggle("sun-bg");
}
function lightmode() {
  document.body.classList.toggle("light-theme");
  icon.classList.toggle("moon-bg");
}

//drag to reorder
list.addEventListener("mousedown", (e) => {
  all.forEach((item) => {
    if (
      e.target.tagName.toLowerCase() === "div" &&
      item.classList.contains("active")
    ) {
      const items = document.querySelectorAll(".item");
      items.forEach((item) => {
        item.classList.add("draggable"); //from listelement
        item.setAttribute("draggable", "true"); //from listelement
      });

      const draggables = list.querySelectorAll(".draggable");
      draggables.forEach((item) => {
        item.addEventListener("dragstart", dragStart);
        item.addEventListener("dragend", dragEnd);
      });
      list.addEventListener("dragover", dragOver);
    }
  });
});

list.addEventListener("mouseup", (e) => {
  list.removeEventListener("dragover", dragOver);
});
// list.addEventListener("mousedown", (e) => {
//   if (e.target.tagName.toLowerCase() == "div") {
//     const draggables = list.querySelectorAll(".draggable");
//     draggables.forEach((item) => {
//       item.addEventListener("dragstart", dragStart);
//       item.addEventListener("dragend", dragEnd);
//     });
//   }
// });
// list.addEventListener("dragover", dragOver);

function dragStart(e) {
  e.target.classList.add("dragging");
}

function dragEnd(e) {
  e.target.classList.remove("dragging");

  const todos = list.querySelectorAll(".item");
  const todolist = [];
  todos.forEach((todo) => {
    todolist.push({
      content: `${todo.children[1].innerText}`,
      completed: todo.children[0].checked,
    });
  });
  localStorage.setItem("todos", JSON.stringify(todolist));
}

function dragOver(e) {
  e.preventDefault();

  const afterElement = getDragAfterElement(e.clientY);
  const draggableElement = document.querySelector(".dragging");

  if (afterElement === null) list.appendChild(draggableElement);
  else list.insertBefore(draggableElement, afterElement);
}

function getDragAfterElement(y) {
  const draggableElements = Array.from(
    list.querySelectorAll(".draggable:not(.dragging)")
  );

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
