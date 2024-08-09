const signin = async () => {
  const username = document.querySelector('#username').value.trim();

  const isValidUsername = validateUsername(username);

  if (!isValidUsername) {
    return;
  }

  const password = document.querySelector('#password').value.trim();

  const isValidPassword = validatePassword(password);

  if (!isValidPassword) {
    return;
  }

  try {
    const response = await axios.post('/api/users/signin', { username, password });

    const { accessToken } = response.data;

    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken);

      window.location.href = '/chat-room-list';
    }
  } catch (e) {
    const message = e.response.data.message;

    alert(message);
  }
};

const handleEnter = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();

    document.querySelector('#signin-button').click();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.querySelector('#username');
  const passwordInput = document.querySelector('#password');
  const signinButton = document.querySelector('#signin-button');

  usernameInput.addEventListener('keypress', handleEnter);
  passwordInput.addEventListener('keypress', handleEnter);
  signinButton.addEventListener('click', signin);
});
