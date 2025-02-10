class Task {
  constructor(id, title, priority, category, dueDate, completed = false) {
    this.id = id;
    this.title = title;
    this.priority = priority;
    this.category = category;
    this.dueDate = dueDate;
    this.completed = completed;
  }
}
class TaskManager {
  constructor() {
    this.apiUrl = "/api";
    this.init();
  }

  async init() {
    this.initializeFormElements();
    this.bindEvents();
    await this.loadTasks();
  }

  initializeFormElements() {
    const dueDateInput = document.getElementById("taskDueDate");
    if (dueDateInput) {
      dueDateInput.min = new Date().toISOString().split("T")[0];
    }

    const prioritySelect = document.getElementById("taskPriority");
    prioritySelect.innerHTML = `
      <option value="">Select Priority</option>
      <option value="p1">P1 - Critical (This Week)</option>
      <option value="p2">P2 - High (Next 2 Weeks)</option>
      <option value="p3">P3 - Medium (This Month)</option>
      <option value="p4">P4 - Low (Flexible)</option>
    `;

    const categorySelect = document.getElementById("taskCategory");
    categorySelect.innerHTML = `
      <option value="">Select Category</option>
      <option value="job_search">Job Search</option>
      <option value="applications">Applications</option>
      <option value="interviews">Interviews</option>
      <option value="skill_dev">Skill Development</option>
      <option value="networking">Networking</option>
    `;
  }

  bindEvents() {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => this.handleFormSubmit(e));

    const filterButtons = document.querySelectorAll(".btn-filter");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => this.handleFilter(button));
    });
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    try {
      const taskData = {
        title: document.getElementById("taskTitle").value,
        priority: document.getElementById("taskPriority").value,
        category: document.getElementById("taskCategory").value,
        dueDate: document.getElementById("taskDueDate").value,
        userId: "test-user",
      };

      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) throw new Error("Failed to create task");

      await this.loadTasks();
      e.target.reset();
      this.showSuccess("Task created successfully");
    } catch (error) {
      this.showError("Failed to create task");
    }
  }

  async loadTasks() {
    try {
      const response = await fetch(`/api/tasks/user/test-user`);
      if (!response.ok) throw new Error("Failed to load tasks");
      const tasks = await response.json();
      this.renderTasks(tasks);
    } catch (error) {
      this.showError("Failed to load tasks");
    }
  }

  async handleFilter(button) {
    const category = button.textContent.toLowerCase();
    try {
      const response = await fetch(
        `/api/tasks/user/test-user/filter?category=${category}`
      );
      if (!response.ok) throw new Error("Failed to filter tasks");

      const tasks = await response.json();
      this.renderTasks(tasks);

      document
        .querySelectorAll(".btn-filter")
        .forEach((btn) => btn.classList.toggle("active", btn === button));
    } catch (error) {
      this.showError("Failed to filter tasks");
    }
  }

  async toggleTaskComplete(taskId) {
    try {
      const response = await fetch(`/api/tasks/${taskId}/toggle`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Failed to update task");
      await this.loadTasks();
      this.showSuccess("Task status updated");
    } catch (error) {
      this.showError("Failed to update task");
    }
  }

  async deleteTask(taskId) {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      await this.loadTasks();
      this.showSuccess("Task deleted successfully");
    } catch (error) {
      this.showError("Failed to delete task");
    }
  }

  showError(message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-danger alert-dismissible fade show";
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    const container = document.querySelector(".container");
    const firstRow = container.querySelector(".row");
    if (firstRow) {
      container.insertBefore(alertDiv, firstRow);
    } else {
      container.appendChild(alertDiv);
    }
    setTimeout(() => alertDiv.remove(), 3000);
  }

  showSuccess(message) {
    const alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-success alert-dismissible fade show";
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    const container = document.querySelector(".container");
    const firstRow = container.querySelector(".row");
    if (firstRow) {
      container.insertBefore(alertDiv, firstRow);
    } else {
      container.appendChild(alertDiv);
    }
    setTimeout(() => alertDiv.remove(), 3000);
  }

  getPriorityColor(priority) {
    const colors = {
      p1: "danger",
      p2: "warning",
      p3: "info",
      p4: "success",
    };
    return colors[priority] || "secondary";
  }

  getPriorityLabel(priority) {
    const labels = {
      p1: "Critical",
      p2: "High",
      p3: "Medium",
      p4: "Low",
    };
    return labels[priority] || priority;
  }

  getCategoryColor(category) {
    const colors = {
      job_search: "primary",
      applications: "info",
      interviews: "warning",
      skill_dev: "success",
      networking: "secondary",
    };
    return colors[category] || "secondary";
  }

  getCategoryLabel(category) {
    const labels = {
      job_search: "Job Search",
      applications: "Applications",
      interviews: "Interviews",
      skill_dev: "Skill Development",
      networking: "Networking",
    };
    return labels[category] || category;
  }

  formatDueDate(date) {
    const today = new Date();
    const dueDate = new Date(date);

    if (dueDate.toDateString() === today.toDateString()) return "Today";
    if (
      dueDate.toDateString() ===
      new Date(today.setDate(today.getDate() + 1)).toDateString()
    )
      return "Tomorrow";
    if (
      dueDate.toDateString() ===
      new Date(today.setDate(today.getDate() - 1)).toDateString()
    )
      return "Yesterday";
    return dueDate.toLocaleDateString();
  }

  createTaskElement(task) {
    return `
      <div class="card mb-3 task-item priority-${task.priority}${
      task.completed ? " completed" : ""
    }">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title mb-1${task.completed ? " completed" : ""}">${
      task.title
    }</h5>
            <small class="text-muted">
              <i class="bi bi-calendar me-2"></i>${this.formatDueDate(
                task.dueDate
              )}
              <span class="badge bg-${this.getPriorityColor(
                task.priority
              )} ms-2">
                ${this.getPriorityLabel(task.priority)}
              </span>
              <span class="badge bg-${this.getCategoryColor(
                task.category
              )} ms-2">
                ${this.getCategoryLabel(task.category)}
              </span>
            </small>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-success btn-sm${
              task.completed ? " active" : ""
            }" 
                    onclick="taskManager.toggleTaskComplete('${task._id}')">
              <i class="bi bi-check-lg"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" 
                    onclick="taskManager.deleteTask('${task._id}')">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderTasks(tasks) {
    const taskList = document.querySelector(".row:last-child .col-md-8");
    if (tasks.length === 0) {
      taskList.innerHTML = `
        <div class="alert alert-info">
          No tasks found. Add your first task above!
        </div>
      `;
      return;
    }
    taskList.innerHTML = tasks
      .map((task) => this.createTaskElement(task))
      .join("");
  }
}

let taskManager;
document.addEventListener("DOMContentLoaded", () => {
  taskManager = new TaskManager();
  window.taskManager = taskManager;
});
