let tasks = [
    {
        id: 1,
        name: 'Project Planning',
        startDate: '2024-11-10',
        endDate: '2024-11-20',
        completion: 75,
        members: ['Alice', 'Bob']
    },
    {
        id: 2,
        name: 'Design Phase',
        startDate: '2024-11-15',
        endDate: '2024-11-25',
        completion: 30,
        members: ['Charlie']
    }
];

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function updateChart() {
    // Calculate date range
    const dates = getAllDates();
    updateDateHeader(dates);
    updateTasks(dates);
}

function getAllDates() {
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
                                background-color: rgba(37, 99, 235, ${task.completion / 100});
                            "></div>
                        </div>
                    </div>
                `;
    }).join('');
}

function addTask() {
    const name = document.getElementById('taskName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const completion = parseInt(document.getElementById('completion').value) || 0;
    const members = document.getElementById('members').value.split(',').map(m => m.trim());

    if (name && startDate && endDate) {
        tasks.push({
            id: tasks.length + 1,
            name,
            startDate,
            endDate,
            completion,
            members
        });

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
    tasks = tasks.filter(task => task.id !== taskId);
    updateChart();
}

function updateCompletion(taskId, newCompletion) {
    tasks = tasks.map(task =>
        task.id === taskId
            ? {...task, completion: parseInt(newCompletion)}
            : task
    );
    updateChart();
}

// Initialize the chart
updateChart();