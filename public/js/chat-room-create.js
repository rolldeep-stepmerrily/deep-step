const headers = { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` };

const createChatRoom = async () => {
  const name = document.querySelector('#chat-room-name').value.trim();

  if (name.length > 20) {
    alert('채팅방 이름은 20자 이하로 입력해주세요.');
    return;
  }

  const description = document.querySelector('#chat-room-description').value.trim();

  if (description.length > 100) {
    alert('채팅방 설명은 100자 이하로 입력해주세요.');
    return;
  }

  try {
    await axios.post('/api/chat/room', { name, description }, { headers });

    window.location.href = '/chat-room-list';
  } catch (e) {
    alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#back-button').addEventListener('click', () => {
    window.location.href = '/chat-room-list';
  });

  document.querySelector('#create-button').addEventListener('click', createChatRoom);
});
