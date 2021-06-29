/* ============ Selectors ============ */
const todoInput     = document.querySelector('.todo-input');
const todoButton    = document.querySelector('.todo-button');
const todoList      = document.querySelector('.todo-list');
const filterOption  = document.querySelector('.filter-todo');
/* =================================== */



/* ============ Event Listeners ============ */
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
/* ========================================= */



/* ============ Functions ============ */

// ADD TODO ITEM
function addTodo(event){

    // PREVENT FORM FROM SUBMITTING
    event.preventDefault();

    // CREATE TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // CREATE LI
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);

    // ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    // DELETE BUTTON
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    
    // APPEND TO LIST
    todoList.appendChild(todoDiv);

    // CLEAR TODO INPUT VALUE
    todoInput.value = '';
}

// DELETE & COMPLETE BUTTON
function deleteCheck(e){

    // GET THE CLICKED ITEM
    const item = e.target;

    // DELETE TODO
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');     
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove(); 
        });
    }

    // COMPLETE TODO
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
} 

// FILTER ITEMS
function filterTodo(e){
  const todos = todoList.childNodes;
   todos.forEach(function(todo) {
    switch(e.target.value){
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if(todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        }
        else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if(todo.classList.contains('completed') == false) {
          todo.style.display = 'flex';
        }
        else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

// SAVE LOCAL TODO ITEMS
function saveLocalTodos(todo){

  // CHECK IF THERE'S ALREADY SOMETHING IN IT
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  // PUSH THE todo INTO THE todos[]
  todos.push(todo);
  // PUSH THE todos[] BACK INTO LOCAL STORAGE
  localStorage.setItem('todos', JSON.stringify(todos));
}

// GET TODO'S FROM THE LOCAL STORAGE
function getTodos(){

  // CHECK IF THERE'S ALREADY SOMETHING IN IT
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // LOOP THROUGH ALL TODO ITEMS
  todos.forEach(function(todo) {

    // CREATE TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // CREATE LI
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);

    // DELETE BUTTON
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

// REMOVE TODO'S FROM THE LOCAL STORAGE
function removeLocalTodos(todo){

  // CHECK IF THERE'S ALREADY SOMETHING IN IT
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  // GET THE INNER TEXT OF THE TODO ITEM
  const todoIndex = todo.children[0].innerText;

  // REMOVE ONE TODO ITEM BY THE INDEX NUMBER 
  todos.splice(todos.indexOf(todoIndex), 1);

  // PUSH THE todos[] BACK INTO LOCAL STORAGE
  localStorage.setItem("todos", JSON.stringify(todos));
}
/* =================================== */