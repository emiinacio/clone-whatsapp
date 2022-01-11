import { ChatMessage } from './chat-message';

const messages = []; // load from  local storage if exists
const patterns = ['?', 'ajuda', 'help'];
let botTimeout = null;
let messageId = 1;

// list chat history
// status
// 0 - null - clock
// 1 - sending - 1 visto cinza
// 2 - delivered - 2 vistos cinza
// 3 - read - 2 vistos azuis
// 4 - error - clock

const onSubmit = (event) => {
  event.preventDefault();
  const input = document.querySelector('.chat__input');
  const message = input.value;

  input.value = '';

  postMessage(message);
  botMessage(message);
}

const botMessage = (text) => {
  const match = patterns.includes(text.toLowerCase());
  // 1. css fix overflow of parent and create scroll
  // 2. on post send scroll to bottom

  if(match) {
    // update user messages state
    const messages = document.querySelectorAll('.chat-message--user');
    for(let msg of messages) {
      msg.setAttribute('status', 'read');
    }

    // random timeout to write answer
    const randomTime = Math.floor(Math.random() * 5000) + 1000;
    const randomPost = Math.floor(Math.random() * 100) + 1;

    if(botTimeout) {
      clearTimeout(botTimeout);
    }
    botTimeout = setTimeout(() => {
      // bot message
      //postMessage(text, true);
      //fetch('https://jsonplaceholder.typicode.com/posts/' + randomPost)
      fetch(`https://jsonplaceholder.typicode.com/posts/${randomPost}`)
        .then(response => response.json())
        .then(json => {
          postMessage(json.body, true);
        });

    }, randomTime);
  } 

  
}

const postMessage = (text, isBot) => {
  const talkId = localStorage.getItem('chatHistoryId');
  new ChatMessage(messageId, text, talkId, isBot);

  messageId++;
}

document.querySelector('.chat__form').addEventListener('submit', onSubmit);