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
