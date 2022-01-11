export class HistoryItem {

  constructor(info) {
    this.data = info;

    this.create();
  }

  onClick(evt) {
    const element = evt.target.closest('.history-chat');

    // save to local storage to load current chat
    localStorage.setItem('chatHistoryId', element.getAttribute('id'));

    if(element) {
      document.querySelector('.history-chat--active').classList.remove('history-chat--active');
      element.classList.add('history-chat--active');
    }

    this.filterMessages(element.getAttribute('id'));
  }

  filterMessages(talk) {
    const messages = document.querySelectorAll('.chat-message');
    messages.forEach( (message) => {
      message.setAttribute('visible', message.getAttribute('talk-id') == talk);
    } );
  }

  create() {
    const divContainer = document.createElement("div");
    divContainer.classList.add("history-chat");
    divContainer.setAttribute('id', this.data.id);
    divContainer.addEventListener("click", event => this.onClick(event) );

    if(this.data.isActive) {
      divContainer.classList.add("history-chat--active");
    }

    const divProfile = document.createElement("div");
    divProfile.classList.add("history-chat__profile");

    const pic = document.createElement("img");
    pic.classList.add("history-chat__pic", "avatar");
    pic.setAttribute("src", this.data.profile_pic);
    pic.setAttribute("alt", this.data.name);

    const divInfo = document.createElement("div");
    divInfo.classList.add("history-chat__info");

    const pName = document.createElement("p");
    pName.classList.add("history-chat__name");
    pName.textContent = this.data.name;

    const pMessage = document.createElement("p");
    pMessage.classList.add("history-chat__message");
    pMessage.textContent = this.data.message;

    const divDate = document.createElement("div");
    divDate.classList.add("history-chat__date");
    divDate.textContent = this.data.date;

    divInfo.appendChild(pName);
    divInfo.appendChild(pMessage);

    divProfile.appendChild(pic);
    divProfile.appendChild(divInfo);
    divProfile.appendChild(divDate);

    divContainer.appendChild(divProfile);

    const chatsContainer = document.querySelector(".history__talks");
    chatsContainer.appendChild(divContainer);
  }
}