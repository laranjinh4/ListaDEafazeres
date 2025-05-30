function addTodo() {
  const input = document.getElementById('todo-input');
  const text = input.value.trim();

  if (text === '') {
    alert('Por favor, digite uma tarefa.');
    return;
  }

  const list = document.getElementById('todo-list');
  const li = createTodoItem(text);
  list.appendChild(li);
  input.value = '';
}

function createTodoItem(text) {
  const li = document.createElement('li');
  li.setAttribute('draggable', true);

  const span = document.createElement('span');
  span.textContent = text;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.onclick = () => {
    li.classList.toggle('completed');
  };

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Remover';
  deleteBtn.onclick = () => {
    li.remove();
  };

  actions.appendChild(checkbox);
  actions.appendChild(deleteBtn);
  li.appendChild(span);
  li.appendChild(actions);

  // Drag & Drop
  li.addEventListener('dragstart', () => {
    li.classList.add('dragging');
  });

  li.addEventListener('dragend', () => {
    li.classList.remove('dragging');
  });

  return li;
}

// Drag and drop logic
const list = document.getElementById('todo-list');

list.addEventListener('dragover', e => {
  e.preventDefault();
  const draggingItem = document.querySelector('.dragging');
  const afterElement = getDragAfterElement(list, e.clientY);
  if (afterElement == null) {
    list.appendChild(draggingItem);
  } else {
    list.insertBefore(draggingItem, afterElement);
  }
});

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('li:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}