// JavaScript to handle form submission, display messages, and pagination
const messageForm = document.getElementById("messageForm");
const messageInput = document.getElementById("messageInput");
const messageList = document.getElementById("messageList");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pageInfo = document.getElementById("pageInfo");

// Load saved messages from localStorage
let messages = JSON.parse(localStorage.getItem("messages")) || [];

// Pagination variables
let currentPage = 1;
const messagesPerPage = 5; // Number of messages per page

// Function to display messages for the current page
function displayMessages() {
  const startIndex = (currentPage - 1) * messagesPerPage;
  const endIndex = startIndex + messagesPerPage;
  const messagesToShow = messages.slice(startIndex, endIndex);

  messageList.innerHTML = messagesToShow
    .map(
      (message, index) => `
    <div class="message">
        <p>${message}</p>
    </div>
`
    )
    .join("");

  // Update pagination buttons and page info
  pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(
    messages.length / messagesPerPage
  )}`;
  prevButton.disabled = currentPage === 1;
  nextButton.disabled =
    currentPage === Math.ceil(messages.length / messagesPerPage);
}

// Function to add a new message
function addMessage(event) {
  event.preventDefault();
  const newMessage = messageInput.value.trim();
  if (newMessage) {
    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));
    messageInput.value = "";
    currentPage = Math.ceil(messages.length / messagesPerPage); // Go to the last page
    displayMessages();
  }
}

// Event listener for form submission
messageForm.addEventListener("submit", addMessage);

// Event listener for previous button
prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayMessages();
  }
});

// Event listener for next button
nextButton.addEventListener("click", () => {
  if (currentPage < Math.ceil(messages.length / messagesPerPage)) {
    currentPage++;
    displayMessages();
  }
});

// Display messages on page load
displayMessages();
