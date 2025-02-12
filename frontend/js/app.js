class TaskManager {
  constructor() {
    this.apiUrl = "/api";
    this.taskList = null;
    this.categoryMapping = {
      all: "all",
      "job search": "job_search",
      applications: "applications",
      interviews: "interviews",
      "skill development": "skill_dev",
      networking: "networking",
    };
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
    if (prioritySelect) {
      prioritySelect.innerHTML = this.getPriorityOptions();
    }

    const categorySelect = document.getElementById("taskCategory");
    if (categorySelect) {
      categorySelect.innerHTML = this.getCategoryOptions();
    }
  }

  getPriorityOptions() {
    return `
      <option value="">Select Priority</option>
      <option value="p1">P1 - Critical (This Week)</option>
      <option value="p2">P2 - High (Next 2 Weeks)</option>
      <option value="p3">P3 - Medium (This Month)</option>
      <option value="p4">P4 - Low (Flexible)</option>
    `;
  }

  getCategoryOptions() {
    return `
      <option value="">Select Category</option>
      <option value="job_search">Job Search</option>
      <option value="applications">Applications</option>
      <option value="interviews">Interviews</option>
      <option value="skill_dev">Skill Development</option>
      <option value="networking">Networking</option>
    `;
  }

  bindEvents() {
    // Form submission
    const form = document.querySelector("form");
    if (form) {
      form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    }

    // Filter buttons
    const filterButtons = document.querySelectorAll(".btn-filter");
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => this.handleFilter(button));
    });

    // Task actions using event delegation
    this.taskList = document.querySelector(".row:last-child .col-md-8");
    if (this.taskList) {
      this.taskList.addEventListener("click", (e) => this.handleTaskAction(e));
    }
  }

  handleTaskAction(e) {
    const toggleBtn = e.target.closest(".btn-outline-success");
    const deleteBtn = e.target.closest(".btn-outline-danger");

    if (toggleBtn) {
      const taskId = toggleBtn.dataset.taskId;
      this.toggleTaskComplete(taskId);
    } else if (deleteBtn) {
      const taskId = deleteBtn.dataset.taskId;
      this.deleteTask(taskId);
    }
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    try {
      const taskTitle = document.getElementById("taskTitle");
      const taskPriority = document.getElementById("taskPriority");
      const taskCategory = document.getElementById("taskCategory");
      const taskDueDate = document.getElementById("taskDueDate");

      const taskData = {
        title: taskTitle ? taskTitle.value : "",
        priority: taskPriority ? taskPriority.value : "",
        category: taskCategory ? taskCategory.value : "",
        dueDate: taskDueDate ? taskDueDate.value : "",
        userId: "test-user",
      };

      const response = await fetch(`${this.apiUrl}/tasks`, {
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
      console.error(error);
    }
  }

  async loadTasks() {
    try {
      const response = await fetch(`${this.apiUrl}/tasks/user/test-user`);
      if (!response.ok) throw new Error("Failed to load tasks");
      const tasks = await response.json();
      this.renderTasks(tasks);
    } catch (error) {
      this.showError("Failed to load tasks");
      console.error(error);
    }
  }

  async handleFilter(button) {
    try {
      const buttonText = button.textContent.trim().toLowerCase();
      const category = this.categoryMapping[buttonText] || buttonText;

      const response = await fetch(
        `${this.apiUrl}/tasks/user/test-user/filter?category=${category}`
      );

      if (!response.ok) throw new Error("Failed to filter tasks");

      const tasks = await response.json();
      this.renderTasks(tasks);

      // Update active state
      document
        .querySelectorAll(".btn-filter")
        .forEach((btn) => btn.classList.toggle("active", btn === button));
    } catch (error) {
      this.showError("Failed to filter tasks");
      console.error(error);
    }
  }

  async toggleTaskComplete(taskId) {
    try {
      const response = await fetch(`${this.apiUrl}/tasks/${taskId}/toggle`, {
        method: "PATCH",
      });
      if (!response.ok) throw new Error("Failed to update task");

      await this.loadTasks();
      this.showSuccess("Task status updated");
    } catch (error) {
      this.showError("Failed to update task status");
      console.error(error);
    }
  }

  async deleteTask(taskId) {
    try {
      const response = await fetch(`${this.apiUrl}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");

      await this.loadTasks();
      this.showSuccess("Task deleted successfully");
    } catch (error) {
      this.showError("Failed to delete task");
      console.error(error);
    }
  }

  showNotification(message, type) {
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    const container = document.querySelector(".container");
    const firstRow = container?.querySelector(".row");
    if (container && firstRow) {
      container.insertBefore(alertDiv, firstRow);
      setTimeout(() => alertDiv.remove(), 3000);
    }
  }

  showError(message) {
    this.showNotification(message, "danger");
  }

  showSuccess(message) {
    this.showNotification(message, "success");
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
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (dueDate.toDateString() === today.toDateString()) return "Today";
    if (dueDate.toDateString() === tomorrow.toDateString()) return "Tomorrow";
    if (dueDate.toDateString() === yesterday.toDateString()) return "Yesterday";
    return dueDate.toLocaleDateString();
  }

  createTaskElement(task) {
    return `
      <div class="card mb-3 task-item priority-${task.priority}${task.completed ? " completed" : ""}">
        <div class="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 class="card-title mb-1${task.completed ? " completed" : ""}">${task.title}</h5>
            <small class="text-muted">
              <i class="bi bi-calendar me-2"></i>${this.formatDueDate(task.dueDate)}
              <span class="badge bg-${this.getPriorityColor(task.priority)} ms-2">
                ${this.getPriorityLabel(task.priority)}
              </span>
              <span class="badge bg-${this.getCategoryColor(task.category)} ms-2">
                ${this.getCategoryLabel(task.category)}
              </span>
            </small>
          </div>
          <div class="btn-group">
            <button class="btn btn-outline-success btn-sm${task.completed ? " active" : ""}" 
                    data-task-id="${task._id}">
              <i class="bi bi-check-lg"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" 
                    data-task-id="${task._id}">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderTasks(tasks) {
    if (!this.taskList) return;

    if (tasks.length === 0) {
      this.taskList.innerHTML = `
        <div class="alert alert-info">
          No tasks found. Add your first task above!
        </div>
      `;
      return;
    }

    this.taskList.innerHTML = tasks
      .map((task) => this.createTaskElement(task))
      .join("");
  }
}

// Initialize TaskManager when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.taskManager = new TaskManager();
});
