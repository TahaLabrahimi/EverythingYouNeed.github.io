/** @format */

const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

// Retrieve data from localStorage
// Since the data is in object, use JSON.parse()
const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
  todos.forEach((todo) => addTodo(todo));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTodo();
});

function addTodo(todo) {
  let todoText = input.value; // when user inserts a list

  // from localStorage
  if (todo) {
    todoText = todo.text;
  }

  // from input field or localStorage
  if (todoText) {
    const todoEl = document.createElement('li');

    if (todo && todo.completed) {
      todoEl.classList.add('completed');
    }

    todoEl.innerText = todoText;

    // mark selected list item as completed
    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed');
      updateLS();
    });

    // delete selected list item
    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      todoEl.remove();
      updateLS();
    });

    todosUL.appendChild(todoEl);
    input.value = '';
    updateLS();
  }
}

function updateLS() {
  const todosEl = document.querySelectorAll('li');

  const todos = [];

  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

// Dealing localStorage with obj
// localStorage.setItem('name', JSON.stringify(obj))
// JSON.parse(localStorage.getItem(obj))
