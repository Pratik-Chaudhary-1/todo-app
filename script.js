let todos = [];

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

//add todo
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") {
    return;
  }

  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodos();
}

//delete todo
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

//Toggle complete
function toggleComplete(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

//edit todo
function editTodo(id) {
  const li = document.querySelector(`[data-id="${id}"]`);
  const textSpan = li.querySelector(".todo-text");
  const actions = li.querySelector(".todo-actions");

  const currentText = todos.find((t) => t.id === id).text;

  textSpan.innerHTML = `<input type="text" class="edit-input" value="${currentText}">`;
  const editInput = textSpan.querySelector(".edit-input");
  editInput.focus();

  actions.innerHTML = `
        <button class="save-btn" onclick="saveTodo(${id})">Save</button>
        <button class="cancel-btn" onclick="renderTodos()">Cancel</button>
    `;
}

//save edited todo
function saveTodo(id) {
  const li = document.querySelector(`[data-id="${id}"]`);
  const editInput = li.querySelector(".edit-input");
  const newText = editInput.value.trim();

  if (newText === "") return;

  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.text = newText;
    renderTodos();
  }
}

// Render all todos
function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.setAttribute("data-id", todo.id);

    li.innerHTML = `
            <input type="checkbox" ${todo.completed ? "checked" : ""} 
                   onchange="toggleComplete(${todo.id})">
            <span class="todo-text ${todo.completed ? "completed" : ""}">${
      todo.text
    }</span>
            <div class="todo-actions">
                <button class="edit-btn" onclick="editTodo(${
                  todo.id
                })">Edit</button>
                <button class="delete-btn" onclick="deleteTodo(${
                  todo.id
                })">Delete</button>
            </div>
        `;

    todoList.appendChild(li);
  });
}
