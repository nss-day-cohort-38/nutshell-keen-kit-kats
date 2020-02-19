const renderChatRoom = chatHTML => {
    const chatContainer = document.getElementById("message-list");
    chatContainer.innerHTML += chatHTML;
  };

export { renderChatRoom as default }
