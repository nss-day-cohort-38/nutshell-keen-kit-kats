const createMessageBoard = (message, userId, username, id) => {
  return `
      <div class="chat-room-landing-page">
        <div id="messages" data-user-id="${userId}">
          <p><em>${username}:</em> ${message}</p>
          <section class="edit-message-button">
          <button id="editMessage--${id}>Edit</button>
          </section>
        </div>
      </div>
  `;
};
export { createMessageBoard as default };
