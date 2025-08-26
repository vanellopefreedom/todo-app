const todoForm = document.querySelector("form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todoListItems = loadTodos();
updateTodoList();

todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText.length > 0) {
        const todoObject = {
            text: todoText,
            completed: false
        };
        todoListItems.push(todoObject);
        updateTodoList();
        saveTodos();
        todoInput.value = "";
    }
}
function createTodoItem(todo, todoIndex) {
    const todoId = "todo-" + todoIndex;
    const li = document.createElement("li");
    const todoText = todo.text;

    li.className = "todo-item";
    li.innerHTML = `
        <input type="checkbox" id="${todoId}" />

        <label class="custom-checkbox" for="${todoId}">
          <i class="fa-solid fa-check"></i>
        </label>

        <label for="${todoId}" class="todo-text">
          ${todoText}
        </label>

        <button class="delete">
          <i class="fa-solid fa-trash"></i>
        </button> 
    `;
    const deleteButton = li.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
        deleteTodo(todoIndex);
    });
    const checkbox = li.querySelector("input");
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        saveTodos();
    });
    checkbox.checked = todo.completed;
    return li;
}
function deleteTodo(index) {
    todoListItems.splice(index, 1);
    updateTodoList();
    saveTodos();
}
function updateTodoList() {
    todoList.innerHTML = "";
    todoListItems.forEach((todo, todoIndex) => {
        todoItem = createTodoItem(todo, todoIndex);
        todoList.appendChild(todoItem);
    });
}

function saveTodos() {
    let todoJson = JSON.stringify(todoListItems);
    localStorage.setItem("todos", todoJson);

}
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
}
