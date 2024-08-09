const headers = { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` };

const findChatRooms = async () => {
  try {
    const response = await axios.get('/api/chat/rooms/all', { headers });

    const { chatRooms } = response.data;

    const chatRoomList = document.querySelector('#chat-room-list');

    chatRoomList.innerHTML = '';

    const chatRoomListFragment = document.createDocumentFragment();

    chatRooms.forEach(({ id, name, description, chatRoomUsers, owner }) => {
      const ownerNickname = owner.profile.nickname;

      const chatRoomElement = createChatRoomElement(id, name, description, chatRoomUsers.length, ownerNickname);

      chatRoomListFragment.appendChild(chatRoomElement);
    });

    chatRoomList.appendChild(chatRoomListFragment);
  } catch (e) {
    alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

const createChatRoomElement = (id, name, description, userCount, ownerNickname) => {
  const chatRoomElement = document.createElement('div');
  chatRoomElement.classList.add('chat-room-item');
  chatRoomElement.addEventListener('click', () => (window.location.href = `/chat-room/${id}`));

  chatRoomElement.innerHTML = `
    <div class="chat-room-name">${name} <span class="chat-room-owner">(${ownerNickname})</span></div> 
    <div class="chat-room-description">${description || ''}</div>
    <div class="chat-room-user-count">${userCount}명 참여 중</div>
  `;

  return chatRoomElement;
};

const signout = () => {
  sessionStorage.removeItem('accessToken');

  window.location.href = '/';
};

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = sessionStorage.getItem('accessToken');

  if (!accessToken) {
    alert('로그인이 필요합니다.');

    window.location.href = '/';
  }

  findChatRooms();

  document.querySelector('#create-room-button').addEventListener('click', () => {
    window.location.href = '/chat-room-create';
  });

  document.querySelector('#signout-button').addEventListener('click', signout);
});
