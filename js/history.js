import { HistoryItem } from './history-item';

// chat history data
const chats = [
  {
    id: 1,
    profile_pic: "https://placeimg.com/640/480/people?1",
    name: "Augusto Costa",
    message: "Ok",
    date: "11:33",
    status: 2,
  },
  {
    id: 2,
    profile_pic: "https://placeimg.com/640/480/people?2",
    name: "David Quinta",
    message: "Posso",
    date: "yesterday",
    status: 3,
  },
  {
    id: 3,
    profile_pic: "https://placeimg.com/640/480/people?3",
    name: "Cláudio Lins",
    message: "Nuno, quando puder liga-me sff, estou a...",
    date: "yesterday",
    status: 0,
  }
];

// see profile
// refresh content
// new chat
// options

// search chat w/ arrow function
document.querySelector("[js-history-input]").addEventListener("keyup", (event) => {
  const label = event.target.value;
  
  filterChats(label.toLowerCase());
});

function filterChats(value) {
  chats.map( (chat, index) => {
    if( chat.name.toLowerCase().includes(value) || chat.message.toLowerCase().includes(value) ) {
      document.querySelectorAll('.history-chat')[index].classList.remove('hide');
    } else {
      document.querySelectorAll('.history-chat')[index].classList.add('hide');
    }
  });

  // fetch api - messages
}

// create chat template
function createHistoryChat(info) {
  new HistoryItem(info);
}

// check local storage to find chat history id if exists
// else activate first chat history
const chatHistoryId = localStorage.getItem('chatHistoryId');
if(chatHistoryId) {
  // with find
  //const element = chats.find( (chat) => chat.id == chatHistoryId );
  //element.isActive = true;

  // with findIndex
  const index = chats.findIndex( (chat) => chat.id == chatHistoryId );
  chats[index].isActive = true;
} else {
  chats[0].isActive = true;
  localStorage.setItem('chatHistoryId', chats[0].id);
}

// loop to create
for (let item of chats) {
  createHistoryChat(item);
}