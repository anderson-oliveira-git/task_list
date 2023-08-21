const input_task   = document.querySelector('.input-task');
const btn_add_task = document.querySelector('.btn-add-task');
const tasks_list   = document.querySelector('.tasks');

// Salva as tasks no localStorage ::
function saveTasks () {
  const tasks = tasks_list.querySelectorAll('.task');
  const task_list = [];

  /**
   * Limpa as tasks deixando apenas o nome dela ::
   * Adiciona cada task em um array ::
   */
  for (let task of tasks) {
    let task_text = task.innerText;
    task_list.push(task_text);
  }

  const task_json = JSON.stringify(task_list);
  localStorage.setItem('tasks', task_json);
}

// Cria a task ::
function createTask (value) {
  tasks_list.innerHTML += `
    <div class="card-body border rounded task mb-3 d-flex align-items-center justify-content-between">
      ${value} 
      <button class="btn btn-outline-primary remove">
        <i class="ti ti-trash remove"></i>
      </button>
    </div>
  `;

  saveTasks();
}

// Limpa o campo de texto ::
function cleatInputTask () {
  input_task.value = '';
  input_task.focus();
}

// Lista todas as tasks salvas no localStorage ::
function listTask () {
  const tasks = localStorage.getItem('tasks');
  const data = JSON.parse(tasks);
  for (let task of data) {
    createTask(task);
  }
}

// Cria uma task quando o enter é pressionado ::
input_task.addEventListener('keypress', event => {
  if (event.keyCode === 13) {
    if (!input_task.value) return;
    createTask(input_task.value);
    cleatInputTask();
  }
});

// Cria uma task quando o botão criar é clicado ::
btn_add_task.addEventListener('click', () => {
  if (!input_task.value) return;
  createTask(input_task.value);
  cleatInputTask();
});

// Remove os items da lista ::
document.addEventListener('click', event => {
  const element = event.target;
  if (element.classList.contains('remove')) {
    if (window.confirm('Deseja realmente deletar a tarefa? ')) {
      element.parentElement.remove();
      saveTasks();
    }
  }
});

listTask();
