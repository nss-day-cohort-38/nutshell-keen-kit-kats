
const chatButtonClickEvent = {
  exitMessages() {
    const exitMessagesButton = document.getElementById("chatButtonClose");
    exitMessagesButton.addEventListener("click", () => {
      const exitChat = document.getElementById("chatContainer");
      exitChat.classList.toggle("hidden");

      if ((event.target.id = exitMessagesButton.id)) {
        document.getElementById("chatButton").classList.toggle("display");
        document.getElementById("profileDropDown").classList.toggle("display");
        document.getElementById("body").classList.toggle("shrink");
      }
    });
  }
};

export default chatButtonClickEvent;
