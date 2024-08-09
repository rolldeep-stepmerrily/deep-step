const socket = io();
const chatRoomId = window.location.pathname.split('/').pop();

if (!chatRoomId || parseInt(chatRoomId) === isNaN) {
  window.location.href = '/chat-room-list';
}

const accessToken = sessionStorage.getItem('accessToken');

if (!accessToken) {
  window.location.href = '/';
}

const headers = { Authorization: `Bearer ${accessToken}` };

socket.auth = { token: accessToken };

const findChatRoomInfo = async () => {
  try {
    const response = await axios.get(`/api/chat/rooms/${chatRoomId}`, { headers });

    const { chatRoomUsers } = response.data.chatRoom;

    const defaultAvatar = 'https://da9ck3uz4lf5y.cloudfront.net/assets/logos/icon.png';

    chatRoomUsers.map((userData) => {
      const user = userData.user;
      const participantElement = document.createElement('li');
      participantElement.classList.add('participant-item');
      participantElement.id = `participant-${user.id}`;

      participantElement.innerHTML = `
      <img src="${user.profile.avatar || defaultAvatar}" alt="${user.profile.nickname}" class="participant-avatar">
        <span>${user.profile.nickname}</span>
      </img>`;
      const participantList = document.querySelector('#participant-list');
      participantList.appendChild(participantElement);
    });
  } catch (e) {
    alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

const findMessages = async () => {
  try {
    const chatBody = document.querySelector('#chat-body');

    const response = await axios.get(`/api/chat/rooms/${chatRoomId}/messages`, { headers });

    const { data: messages } = response;

    console.log(messages);
    messages.forEach((message) => {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message-item');
      messageElement.id = `message-${message.id}`;
      messageElement.innerHTML = `
      <span class="message-sender">${message.user.profile.nickname}:</span>
      <span class="message-content">${message.content}</span>`;

      chatBody.appendChild(messageElement);
    });
  } catch (e) {
    alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

const sendMessage = () => {
  const messageInput = document.querySelector('#message-input');
  const content = messageInput.value;

  if (!content) {
    return;
  }

  socket.emit('sendMessage', { chatRoomId: parseInt(chatRoomId), content });
  messageInput.value = '';
};

document.addEventListener('DOMContentLoaded', async () => {
  const messageInput = document.querySelector('#message-input');
  const sendButton = document.querySelector('#send-button');
  const chatBody = document.querySelector('#chat-body');

  await socket.emit('joinRoom', parseInt(chatRoomId));

  await findChatRoomInfo();

  await findMessages();

  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  socket.on('newMessage', (message) => {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message-item');
    messageElement.id = `message-${message.id}`;
    messageElement.innerHTML = `
    <span class="message-sender">${message.user.profile.nickname}:</span>
    <span class="message-content">${message.content}</span>`;

    chatBody.appendChild(messageElement);
  });
});
