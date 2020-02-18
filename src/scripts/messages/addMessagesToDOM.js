const addMessagesToDOM = {
  addMessageContainer() {
    document.getElementById("mainContainer").innerHTML += createMessageBoard(message);
  },
  exitMessages() {
    const exitMessagesButton = document.getElementById("chatButtonClose");
    exitMessagesButton.addEventListener("click", () => {
      const exitChat = document.getElementById("chatContainer");
      exitChat.classList.toggle("hidden");
      document.getElementById("chatContainer").classList.toggle("display");
      document.getElementById("chatButton").classList.toggle("display");
      document.getElementById("profileDropDown").classList.toggle("display");
      document.getElementById("mainContainer").classList.toggle("shrink");
    });
  },
  messageButtonEventListener() {
    document.getElementById("chatButton").addEventListener("click", () => {
      document.getElementById("chatContainer").classList.toggle("hidden");
      document.getElementById("mainContainer").classList.toggle("shrink");
      document.getElementById("profileDropDown").classList.toggle("hidden");
    });
  }
};

export default addMessagesToDOM
