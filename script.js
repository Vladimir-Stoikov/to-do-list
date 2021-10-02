const toDoUl = document.getElementById('todos');
const input = document.getElementById('input');
const form = document.getElementById('form');
const btnClear = document.querySelector('button.btn#btn');

const todoLS = JSON.parse(localStorage.getItem('todos'));

if (todoLS) {
  todoLS.forEach(todo => {
    const { text, complited } = todo;
    newToDo(text, complited);
  });
}

btnClear.addEventListener('click', () => {
  const todoEl = document.querySelectorAll('li');
  todoEl.forEach(todo => {
    todo.remove();
  });
  input.value = ``;
  updateLS();
});

toDoUl.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('complited');

    updateLS();
  }
});

toDoUl.addEventListener('contextmenu', e => {
  e.preventDefault();
  e.target.remove();
  updateLS();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  newToDo(input.value);
});

function newToDo(text, comp = null) {
  const newTodoLi = document.createElement('li');
  newTodoLi.textContent = `${text}`;
  comp ? newTodoLi.classList.add('complited') : '';
  newTodoLi.textContent ? toDoUl.appendChild(newTodoLi) : '';
  input.value = ``;
  updateLS();
}

function updateLS() {
  const todoEl = document.querySelectorAll('li');

  const todos = [];

  todoEl.forEach(todo => {
    todos.push({
      text: todo.innerHTML,
      complited: todo.classList.contains('complited'),
    });
  });

  localStorage.setItem('todos', JSON.stringify(todos));
  uppearBtn(todos);
}

function uppearBtn(arrayToDo) {
  if (arrayToDo.length !== 0) {
    btn.classList.add('show');
  } else {
    btn.classList.remove('show');
  }
}
