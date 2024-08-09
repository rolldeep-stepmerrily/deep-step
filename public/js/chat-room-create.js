const headers = { Authorization: `Bearer ${sessionStorage.getItem('accessToken')}` };

const createChatRoom = async () => {
  try {
    await axios.post(
      '/api/chat/room',
      {
        name: document.querySelector('#chat-room-name').value,
        description: document.querySelector('#chat-room-description').value,
      },
      { headers },
    );

    window.location.href = '/chat-room-list';
  } catch (e) {
    console.log(e);
    alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('#back-button').addEventListener('click', () => {
    window.location.href = '/chat-room-list';
  });

  document.querySelector('#create-button').addEventListener('click', createChatRoom);
});
