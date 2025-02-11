const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messageList = document.getElementById("messageList");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pageInfo = document.getElementById("pageInfo");
const submitButton = document.getElementById("submitButton");

// Pagination variables
let currentPage = 1;
const messagesPerPage = 5;

// Function to fetch messages from the server
async function fetchMessages(page = 1) {
  try {
    const response = await fetch(
      `/api/messages?page=${page}&limit=${messagesPerPage}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { messages: [], totalPages: 0, currentPage: 1 };
  }
}

// Function to display messages
async function displayMessages() {
  // Show loading state
  messageList.innerHTML = '<div class="loading">Loading messages...</div>';

  try {
    const data = await fetchMessages(currentPage);

    if (data.messages.length === 0) {
      messageList.innerHTML =
        '<div class="no-messages">No messages yet. Be the first to add one!</div>';
      return;
    }

    messageList.innerHTML = data.messages
      .map(
        (message) => `
        <div class="message">
          <p class="message-content">${message.content}</p>
          <div class="message-footer">
            <small class="message-date">${new Date(
              message.createdAt
            ).toLocaleString()}</small>
          </div>
        </div>
      `
      )
      .join("");

    // Update pagination info
    pageInfo.textContent = `Page ${data.currentPage} of ${data.totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled =
      currentPage === data.totalPages || data.totalPages === 0;
  } catch (error) {
    console.error("Error displaying messages:", error);
    messageList.innerHTML =
      '<div class="error">Error loading messages. Please try again later.</div>';
  }
}

// Function to add a new message
async function addMessage(event) {
  event.preventDefault();
  const content = messageInput.value.trim();

  if (!content) return;

  // Disable submit button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = "Adding...";

  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error("Failed to add message");
    }

    // Clear input and refresh messages
    messageInput.value = "";
    await displayMessages();

    // Optionally, scroll to top of message list
    messageList.scrollTop = 0;
  } catch (error) {
    console.error("Error adding message:", error);
    alert("Failed to add message. Please try again.");
  } finally {
    // Re-enable submit button
    submitButton.disabled = false;
    submitButton.textContent = "Add Message";
  }
}

// Event listeners
messageForm.addEventListener("submit", addMessage);

prevButton.addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage--;
    await displayMessages();
  }
});

nextButton.addEventListener("click", async () => {
  const data = await fetchMessages(currentPage);
  if (currentPage < data.totalPages) {
    currentPage++;
    await displayMessages();
  }
});

// Load messages when page loads
displayMessages();
