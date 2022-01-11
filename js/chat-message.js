export class ChatMessage {
  constructor(id, text, talk, isBot) {
    this.id = id;
    this.text = text;
    this.talk = talk;
    this.isBot = isBot;
    this.status = "sending";

    this.create();
  }

  getStatus() {
    return this.status;
  }

  setStatus(newStatus) {
    this.status = newStatus;
  }

  // format time with hh:mm
  getTime() {
    const date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) {
      hours = "0" + hours;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return `${hours}:${minutes}`;
  }

  // return html content
  getHTML(text, messageTime) {
    return `<p class="chat-message__text">${text}</p>
<div class="chat-message__info">
  <span class="chat-message__date">${messageTime}</span>
  <div class="chat-message__icons"></div>
</div>`;
  }

  // create div with values
  create() {
    const divContainer = document.createElement("div");
    divContainer.classList.add("chat-message");
    divContainer.setAttribute("id", `chat-message-${this.id}`);
    divContainer.setAttribute("talk-id", this.talk);

    if (this.isBot) {
      divContainer.classList.add("chat-message--bot");
    } else {
      divContainer.classList.add("chat-message--user");
      divContainer.setAttribute("status", "sending");
      this.setStatus("sending");
    }

    // ternary condition
    //divContainer.classList.add( (isBot) ? 'chat-message--bot' : 'chat-message--user');

    const messageTime = this.getTime();

    divContainer.innerHTML = this.getHTML(this.text, messageTime);

    if (!this.isBot) {
      this.updateStatus();
    }

    // refactor?!!!
    const messagesParent = document.querySelector(".chat__messages");
    messagesParent.appendChild(divContainer);
  }

  // update status
  updateStatus() {
    setTimeout(() => {
      const message = document.querySelector(`[id="chat-message-${this.id}"]`);
      console.log("updatestatus", this.id, message.getAttribute("status"));
      if (message.getAttribute("status") == "sending") {
        message.setAttribute("status", "delivered");
      }
    }, 500);
  }
}
