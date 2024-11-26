// Task Management Functions

// Local Storage Functions
function addTaskToLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (!tasks) {
    tasks = [
      {
        id: 3,
        name: 'Home/Landing Page',
        startDate: '2024-10-03',
        endDate: '2024-10-03',
        completion: 100,
        members: ['Everyone']
      },
      {
        id: 4,
        name: 'Project Charter Creation',
        startDate: '2024-10-03',
        endDate: '2024-10-03',
        completion: 100,
        members: ['Everyone']
      },
      {
        id: 5,
        name: 'Project Charter Approval',
        startDate: '2024-10-03',
        endDate: '2024-10-03',
        completion: 100,
        members: ['Samuel Powers']
      },
      {
        id: 6,
        name: 'Team Building Exercises',
        startDate: '2024-10-03',
        endDate: '2024-10-10',
        completion: 100,
        members: ['Samuel Powers']
      },
      {
        id: 7,
        name: 'Status Reports',
        startDate: '2024-10-03',
        endDate: '2024-11-30',
        completion: 100,
        members: ['Eric']
      },
      {
        id: 8,
        name: 'Framework and Systems Selections',
        startDate: '2024-10-03',
        endDate: '2024-10-10',
        completion: 100,
        members: ['Developers']
      },
      {
        id: 9,
        name: 'Work Breakdown Structure',
        startDate: '2024-10-03',
        endDate: '2024-10-17',
        completion: 100,
        members: ['Nick', 'Zach', 'Eric']
      },
      {
        id: 10,
        name: 'GitHub Repo Creation',
        startDate: '2024-10-03',
        endDate: '2024-10-05',
        completion: 100,
        members: ['Vinay']
      },
      {
        id: 11,
        name: 'Demonstration 1',
        startDate: '2024-10-17',
        endDate: '2024-10-17',
        completion: 100,
        members: ['Vinay', 'Jaecar', 'Sam']
      },
      {
        id: 12,
        name: 'Statements of Work',
        startDate: '2024-10-10',
        endDate: '2024-12-07',
        completion: 100,
        members: ['Everyone']
      },
      {
        id: 13,
        name: 'Gantt Chart',
        startDate: '2024-10-17',
        endDate: '2024-11-21',
        completion: 95,
        members: ['Jaecar']
      },
      {
        id: 14,
        name: 'Working Calendar',
        startDate: '2024-10-23',
        endDate: '2024-11-21',
        completion: 80,
        members: ['Jaecar', 'Vinay']
      },
      {
        id: 15,
        name: 'Demonstration 2',
        startDate: '2024-10-31',
        endDate: '2024-10-31',
        completion: 100,
        members: ['Vinay', 'Sam']
      },
      {
        id: 16,
        name: 'Network Diagram',
        startDate: '2024-11-12',
        endDate: '2024-11-21',
        completion: 100,
        members: ['Nick', 'Zach', 'Eric']
      },
      {
        id: 17,
        name: 'Critical Path Analysis',
        startDate: '2024-11-21',
        endDate: '2024-11-28',
        completion: 100,
        members: ['Nick', 'Zach', 'Eric']
      },
      {
        id: 18,
        name: 'Cost Estimates',
        startDate: '2024-11-14',
        endDate: '2024-11-16',
        completion: 100,
        members: ['Nick', 'Zach', 'Eric']
      },
      {
        id: 19,
        name: 'Risk Management Plans',
        startDate: '2024-11-14',
        endDate: '2024-11-16',
        completion: 100,
        members: ['Jaecar']
      },
      {
        id: 20,
        name: 'Demonstration 3',
        startDate: '2024-11-07',
        endDate: '2024-11-07',
        completion: 100,
        members: ['Vinay', 'Sam']
      },
      {
        id: 21,
        name: 'Reflections',
        startDate: '2024-11-23',
        endDate: '2024-11-30',
        completion: 0,
        members: ['Everyone']
      },
      {
        id: 22,
        name: 'Formatting Checks',
        startDate: '2024-11-30',
        endDate: '2024-12-02',
        completion: 0,
        members: ['Jaecar', 'Eric']
      },
      {
        id: 23,
        name: 'Writing Checks',
        startDate: '2024-11-30',
        endDate: '2024-12-02',
        completion: 0,
        members: ['Everyone']
      },
      {
        id: 24,
        name: 'Project Submission',
        startDate: '2024-11-30',
        endDate: '2024-12-03',
        completion: 0,
        members: ['Samuel Powers']
      }
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  return tasks;
}

// Date Formatting Function
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

// Chart Update Functions
function updateChart() {
    const tasks = getTasks(); // Ensure we're using latest tasks from local storage
    const dates = getAllDates(tasks);
    updateDateHeader(dates);
    updateTasks(dates);
}

function getAllDates(tasks) {
    const allDates = tasks.flatMap(task => [new Date(task.startDate), new Date(task.endDate)]);
    const minDate = new Date(Math.min(...allDates));
    const maxDate = new Date(Math.max(...allDates));

    const dates = [];
    const currentDate = new Date(minDate);

    while (currentDate <= maxDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

function updateDateHeader(dates) {
    const header = document.getElementById('dateHeader');
    header.innerHTML = dates.map(date =>
        `<div class="date-cell">${date.getDate()}</div>`
    ).join('');
}

function updateTasks(dates) {
    const tasks = getTasks(); // Ensure we're using latest tasks from local storage
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = tasks.map(task => {
        const startIdx = dates.findIndex(date =>
            date.toDateString() === new Date(task.startDate).toDateString()
        );
        const duration = Math.ceil(
            (new Date(task.endDate) - new Date(task.startDate)) / (1000 * 60 * 60 * 24)
        );
        const totalDays = dates.length;

        return `
            <div class="task-row">
                <div class="task-info">
                    <div class="task-name">${task.name}</div>
                    <div class="task-dates">
                        <span class="date-badge">Start: ${formatDate(task.startDate)}</span>
                        <span class="date-badge">End: ${formatDate(task.endDate)}</span>
                    </div>
                    <div class="task-members">${task.members.join(', ')}</div>
                    <div class="completion-control">
                        <input type="range" value="${task.completion}" 
                            onchange="updateCompletion(${task.id}, this.value)">
                        <span>${task.completion}%</span>
                        <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                    </div>
                </div>
                <div class="timeline">
                    <div class="task-bar" style="
                        left: ${(startIdx / totalDays) * 100}%;
                        width: ${(duration / totalDays) * 100}%;
                        background-color: rgba(37, 99, 235, Math.min(task.completion / 100, 1));
                    "></div>
                </div>
            </div>
        `;
    }).join('');
}

// Task Management Functions
function addTask() {
    const name = document.getElementById('taskName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const completion = parseInt(document.getElementById('completion').value) || 0;
    const members = document.getElementById('members').value.split(',').map(m => m.trim());

    if (name && startDate && endDate) {
        const tasks = getTasks();
        const newTask = {
            id: tasks.length + 1,
            name,
            startDate,
            endDate,
            completion,
            members
        };

        addTaskToLocalStorage(newTask);

        // Reset inputs
        document.getElementById('taskName').value = '';
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
        document.getElementById('completion').value = '0';
        document.getElementById('members').value = '';

        updateChart();
    }
}

function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateChart();
}

function updateCompletion(taskId, newCompletion) {
    let tasks = getTasks();
    tasks = tasks.map(task =>
        task.id === taskId
            ? {...task, completion: parseInt(newCompletion)}
            : task
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateChart();
}

// Initialize the chart on page load
document.addEventListener('DOMContentLoaded', updateChart);