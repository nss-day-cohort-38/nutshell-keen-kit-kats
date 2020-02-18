const createMessageBoard = message => {
  const currentUserObj = JSON.parse(sessionStorage.getItem("user"));
  return `
      <div class="chat-room-landing-page">
        <div id="messages">
          ${currentUserObj.username}: ${message}
        </div>
      </div>
  `;
};
export { createMessageBoard as default };

/* <div class="chat-room-landing-page">
<section>
  <h1>Chat Room</h1>
</section>
<div id="messages">
${message}
</div>
<div class="chat-room-field">
<fieldset>
<label for="writeMessage">${currentUserObj.username}:</label>
<input type="text" name="writeMessage" id="writeMessage">
</fieldset>
</div>
</div> */
