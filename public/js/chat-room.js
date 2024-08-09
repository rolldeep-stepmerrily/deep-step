const socket = io();
const chatRoomId = parseInt(window.location.pathname.split('/').pop());
const defaultAvatar = 'https://da9ck3uz4lf5y.cloudfront.net/assets/logos/icon.png';
const accessToken = sessionStorage.getItem('accessToken');

if (isNaN(chatRoomId) || !accessToken) {
  window.location.href = isNaN(chatRoomId) ? '/chat-room-list' : '/';
}

const headers = { Authorization: `Bearer ${accessToken}` };

socket.auth = { token: accessToken };

const createParticipantElement = (user) => {
  const participantElement = document.createElement('li');

  participantElement.classList.add('participant-item');
  participantElement.id = `participant-${user.id}`;
  participantElement.innerHTML = `
    <img src="${user.profile.avatar || defaultAvatar}" alt="${user.profile.nickname}" class="participant-avatar">
    <span>${user.profile.nickname}</span>
  `;

  return participantElement;
};

const createMessageElement = (message) => {
  const messageElement = document.createElement('div');

  messageElement.classList.add('message-item');
  messageElement.id = `message-${message.id}`;
  messageElement.innerHTML = `
    <span class="message-sender">${message.user.profile.nickname}:</span>
    <span class="message-content">${message.content}</span>
  `;

  return messageElement;
};

const findChatRoomInfo = async () => {
  try {
    const response = await axios.get(`/api/chat/rooms/${chatRoomId}`, { headers });

    const { chatRoomUsers } = response.data.chatRoom;

    const participantList = document.querySelector('#participant-list');

    chatRoomUsers.forEach((userData) => {
      participantList.appendChild(createParticipantElement(userData.user));
    });
  } catch (e) {
    alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

const findMessages = async () => {
  try {
    const response = await axios.get(`/api/chat/rooms/${chatRoomId}/messages`, { headers });

    const chatBody = document.querySelector('#chat-body');

    response.data.forEach((message) => {
      chatBody.appendChild(createMessageElement(message));
    });
  } catch (e) {
    alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

const sendMessage = () => {
  const messageInput = document.querySelector('#message-input');

  const content = messageInput.value.trim();

  if (content) {
    socket.emit('sendMessage', { chatRoomId, content });

    messageInput.value = '';
  }
};

const leaveRoom = () => {
  socket.emit('leaveRoom', chatRoomId);

  window.location.href = '/chat-room-list';
};

const joinRoom = () =>
  new Promise((resolve) => {
    socket.emit('joinRoom', chatRoomId);

    socket.once('userJoined', resolve);
  });

document.addEventListener('DOMContentLoaded', async () => {
  const messageInput = document.querySelector('#message-input');
  const sendButton = document.querySelector('#send-button');
  const chatBody = document.querySelector('#chat-body');
  const leaveButton = document.querySelector('#leave-button');

  try {
    const response = await axios.get(`/api/chat/rooms/${chatRoomId}/users`, { headers });

    if (Object.keys(response.data).length === 0) {
      await joinRoom();
    }

    await Promise.all([findChatRoomInfo(), findMessages()]);

    sendButton.addEventListener('click', sendMessage);

    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });

    socket.on('newMessage', (message) => {
      chatBody.appendChild(createMessageElement(message));
    });

    socket.on('userJoined', (user) => {
      document.querySelector('#participant-list').appendChild(createParticipantElement(user));
    });

    socket.on('userLeaved', (user) => {
      document.querySelector(`#participant-${user.id}`)?.remove();
    });

    leaveButton.addEventListener('click', leaveRoom);
  } catch (e) {
    alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
});
